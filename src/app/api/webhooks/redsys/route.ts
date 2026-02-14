import { NextRequest, NextResponse } from 'next/server'
import { verifySignature, decodeMerchantParams } from '@/lib/payments/redsys'
import { confirmPayment } from '@/lib/actions/orders'

/**
 * POST /api/webhooks/redsys
 * Notificación de Redsys (DS_MERCHANT_MERCHANTURL).
 * Redsys envía los datos como form-urlencoded.
 */
export async function POST(request: NextRequest) {
  const merchantKey = process.env.REDSYS_SECRET_KEY

  if (!merchantKey) {
    console.error('[Redsys Webhook] REDSYS_SECRET_KEY no configurada')
    return NextResponse.json({ error: 'Not configured' }, { status: 503 })
  }

  try {
    const formData = await request.formData()
    const merchantParams = formData.get('Ds_MerchantParameters') as string
    const signature = formData.get('Ds_Signature') as string

    if (!merchantParams || !signature) {
      console.error('[Redsys Webhook] Faltan parámetros')
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
    }

    // Verificar firma
    if (!verifySignature(merchantKey, merchantParams, signature)) {
      console.error('[Redsys Webhook] Firma inválida')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const params = decodeMerchantParams(merchantParams)
    const responseCode = parseInt(params.Ds_Response || '9999', 10)
    const orderId = params.Ds_MerchantData // Nuestro UUID guardado en DS_MERCHANT_MERCHANTDATA
    const authorisationCode = params.Ds_AuthorisationCode || ''

    console.log(`[Redsys Webhook] Respuesta: código ${responseCode}, pedido ${orderId}`)

    // Código < 100 = pago exitoso
    if (responseCode >= 0 && responseCode < 100) {
      if (!orderId) {
        console.error('[Redsys Webhook] No order_id en Ds_MerchantData')
        return NextResponse.json({ error: 'No order_id' }, { status: 400 })
      }

      console.log(`[Redsys Webhook] Pago aprobado para pedido ${orderId}`)

      const result = await confirmPayment(orderId, authorisationCode, 'redsys')

      if (result.error) {
        console.error(`[Redsys Webhook] Error confirmando pago: ${result.error}`)
      } else {
        console.log(`[Redsys Webhook] Pago confirmado OK`, result.log)
      }
    } else {
      console.warn(`[Redsys Webhook] Pago rechazado: código ${responseCode}`)
    }

    // Redsys espera HTTP 200 para confirmar recepción
    return new NextResponse('OK', { status: 200 })
  } catch (err) {
    console.error('[Redsys Webhook] Error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
