import crypto from 'crypto'

// ============================================
// Redsys TPV Virtual — Utilidades
// Documentación: https://pagosonline.redsys.es/
// ============================================

const REDSYS_URL_PROD = 'https://sis.redsys.es/sis/realizarPago'
const REDSYS_URL_TEST = 'https://sis-t.redsys.es:25443/sis/realizarPago'

export function getRedsysUrl(): string {
  return process.env.REDSYS_ENVIRONMENT === 'test' ? REDSYS_URL_TEST : REDSYS_URL_PROD
}

/**
 * Cifra los datos del comercio con 3DES usando la clave del comercio.
 */
function encrypt3DES(key: Buffer, data: string): Buffer {
  const cipher = crypto.createCipheriv(
    'des-ede3-cbc',
    key,
    Buffer.alloc(8, 0)
  )
  cipher.setAutoPadding(true)
  const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()])
  return encrypted
}

/**
 * Genera la firma HMAC SHA256 para Redsys.
 */
function createSignature(merchantKey: string, merchantParams: string, orderNumber: string): string {
  const keyBuffer = Buffer.from(merchantKey, 'base64')
  const orderKey = encrypt3DES(keyBuffer, orderNumber)
  const hmac = crypto.createHmac('sha256', orderKey)
  hmac.update(merchantParams)
  return hmac.digest('base64')
}

/**
 * Verifica la firma de la respuesta de Redsys.
 */
export function verifySignature(
  merchantKey: string,
  merchantParams: string,
  receivedSignature: string
): boolean {
  const params = JSON.parse(Buffer.from(merchantParams, 'base64').toString('utf8'))
  const orderNumber = params.Ds_Order || params.DS_ORDER
  if (!orderNumber) return false

  const expectedSignature = createSignature(merchantKey, merchantParams, orderNumber)

  // Redsys usa base64url en la firma de respuesta
  const normalizedReceived = receivedSignature.replace(/-/g, '+').replace(/_/g, '/')
  const normalizedExpected = expectedSignature.replace(/-/g, '+').replace(/_/g, '/')

  return normalizedReceived === normalizedExpected
}

/**
 * Decodifica los parámetros del comercio de Redsys.
 */
export function decodeMerchantParams(merchantParams: string): Record<string, string> {
  return JSON.parse(Buffer.from(merchantParams, 'base64').toString('utf8'))
}

interface RedsysPaymentData {
  orderId: string // UUID del pedido en nuestra BD
  orderNumber: string // TRI-2026-0001
  totalCents: number
  customerName: string
  currency?: string
}

/**
 * Genera los datos necesarios para el formulario de Redsys.
 */
export function createRedsysPayment(data: RedsysPaymentData): {
  url: string
  Ds_SignatureVersion: string
  Ds_MerchantParameters: string
  Ds_Signature: string
} | { error: string } {
  const merchantCode = process.env.REDSYS_MERCHANT_CODE
  const terminal = process.env.REDSYS_TERMINAL || '1'
  const merchantKey = process.env.REDSYS_SECRET_KEY

  if (!merchantCode || !merchantKey) {
    return { error: 'Redsys no configurado. Contacta con info@tricholand.com para realizar el pago.' }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tricholand.com'

  // Redsys necesita un número de pedido de 4-12 caracteres alfanuméricos
  // Usamos los últimos 12 caracteres del order_number sin guiones
  const dsOrder = data.orderNumber.replace(/-/g, '').slice(-12)

  const merchantParams = {
    DS_MERCHANT_AMOUNT: String(data.totalCents),
    DS_MERCHANT_ORDER: dsOrder,
    DS_MERCHANT_MERCHANTCODE: merchantCode,
    DS_MERCHANT_CURRENCY: '978', // EUR
    DS_MERCHANT_TRANSACTIONTYPE: '0', // Autorización
    DS_MERCHANT_TERMINAL: terminal,
    DS_MERCHANT_MERCHANTURL: `${baseUrl}/api/webhooks/redsys`, // Notificación
    DS_MERCHANT_URLOK: `${baseUrl}/pedido/${data.orderNumber}?payment=success`,
    DS_MERCHANT_URLKO: `${baseUrl}/pedido/${data.orderNumber}?payment=cancelled`,
    DS_MERCHANT_MERCHANTNAME: 'Tricholand',
    DS_MERCHANT_MERCHANTDATA: data.orderId, // Guardamos nuestro order UUID aquí
  }

  const encodedParams = Buffer.from(JSON.stringify(merchantParams)).toString('base64')
  const signature = createSignature(merchantKey, encodedParams, dsOrder)

  return {
    url: getRedsysUrl(),
    Ds_SignatureVersion: 'HMAC_SHA256_V1',
    Ds_MerchantParameters: encodedParams,
    Ds_Signature: signature,
  }
}
