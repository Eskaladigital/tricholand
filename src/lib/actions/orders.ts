'use server'

import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/api'
import type { OrderStatus, PaymentMethod } from '@/types/shop'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export interface OrderListItem {
  id: string
  order_number: string
  created_at: string
  status: OrderStatus
  customer_name: string
  customer_company: string | null
  customer_email: string
  customer_country: string
  items_count: number
  subtotal_cents: number
}

export async function getOrdersList(): Promise<OrderListItem[]> {
  const supabase = await createClient()
  const { data: orders } = await supabase
    .from('orders')
    .select('id, order_number, created_at, status, customer_name, customer_company, customer_email, customer_country, subtotal_cents')
    .order('created_at', { ascending: false })

  if (!orders || orders.length === 0) return []

  const orderIds = orders.map((o) => o.id)
  const { data: itemsCount } = await supabase
    .from('order_items')
    .select('order_id')
    .in('order_id', orderIds)

  const countMap = new Map<string, number>()
  for (const i of itemsCount ?? []) {
    countMap.set(i.order_id, (countMap.get(i.order_id) ?? 0) + 1)
  }

  return orders.map((o) => ({
    id: o.id,
    order_number: o.order_number,
    created_at: o.created_at,
    status: o.status as OrderStatus,
    customer_name: o.customer_name,
    customer_company: o.customer_company,
    customer_email: o.customer_email,
    customer_country: o.customer_country,
    items_count: countMap.get(o.id) ?? 0,
    subtotal_cents: o.subtotal_cents ?? 0,
  }))
}

export interface OrderItemRow {
  id: string
  product_id: string | null
  product_name: string
  product_sku: string
  quantity: number
  unit_price_cents: number
  total_cents: number
  notes: string | null
}

export interface OrderRow {
  id: string
  order_number: string
  created_at: string
  updated_at: string
  status: OrderStatus
  customer_name: string
  customer_company: string | null
  customer_email: string
  customer_phone: string | null
  customer_country: string
  customer_city: string | null
  customer_vat_id: string | null
  customer_address: string | null
  customer_notes: string | null
  admin_notes: string | null
  subtotal_cents: number
  discount_cents: number
  shipping_cents: number
  tax_cents: number
  total_cents: number
  currency: string
  payment_method: PaymentMethod | null
  payment_link: string | null
  shipping_tracking: string | null
  invoice_number: string | null
  invoice_url: string | null
  locale: string
}

export async function getOrderById(id: string): Promise<{ order: OrderRow; items: OrderItemRow[] } | null> {
  if (!UUID_REGEX.test(id)) return null
  const supabase = await createClient()

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single()

  if (orderError || !order) return null

  const { data: items, error: itemsError } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', id)

  if (itemsError) return { order: order as OrderRow, items: [] }

  return {
    order: order as OrderRow,
    items: (items || []).map((i) => ({
      id: i.id,
      product_id: i.product_id,
      product_name: i.product_name,
      product_sku: i.product_sku,
      quantity: i.quantity,
      unit_price_cents: i.unit_price_cents,
      total_cents: i.total_cents,
      notes: i.notes,
    })),
  }
}

export async function updateOrder(
  id: string,
  data: Partial<{
    status: OrderStatus
    discount_cents: number
    shipping_cents: number
    tax_cents: number
    total_cents: number
    admin_notes: string
    payment_method: PaymentMethod
    payment_link: string
    shipping_tracking: string
    invoice_number: string
    invoice_url: string
  }>
): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase.from('orders').update(data).eq('id', id)
  if (error) return { error: error.message }
  return {}
}

export async function addOrderItem(
  orderId: string,
  item: { product_id?: string; product_name: string; product_sku: string; quantity: number; unit_price_cents: number; notes?: string }
): Promise<{ error?: string; id?: string }> {
  const supabase = await createClient()
  const total_cents = item.quantity * item.unit_price_cents
  const productId = item.product_id && UUID_REGEX.test(item.product_id) ? item.product_id : null
  const { data, error } = await supabase
    .from('order_items')
    .insert({
      order_id: orderId,
      product_id: productId,
      product_name: item.product_name,
      product_sku: item.product_sku,
      quantity: item.quantity,
      unit_price_cents: item.unit_price_cents,
      total_cents,
      notes: item.notes || null,
    })
    .select('id')
    .single()
  if (error) return { error: error.message }
  return { id: data?.id }
}

export async function updateOrderItem(
  itemId: string,
  data: Partial<{ quantity: number; unit_price_cents: number; notes: string }>
): Promise<{ error?: string }> {
  const supabase = await createClient()
  if (data.quantity !== undefined && data.unit_price_cents !== undefined) {
    ;(data as Record<string, unknown>).total_cents = data.quantity * data.unit_price_cents
  }
  const { error } = await supabase.from('order_items').update(data).eq('id', itemId)
  if (error) return { error: error.message }
  return {}
}

export async function deleteOrderItem(itemId: string): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase.from('order_items').delete().eq('id', itemId)
  if (error) return { error: error.message }
  return {}
}

export async function deleteOrder(id: string): Promise<{ error?: string }> {
  if (!UUID_REGEX.test(id)) return { error: 'ID inválido' }
  const supabase = await createClient()
  const { error } = await supabase.from('orders').delete().eq('id', id)
  if (error) return { error: error.message }
  return {}
}

const DEFAULT_TAX_RATE = 21

export async function recalcOrderTotals(orderId: string): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { data: items } = await supabase.from('order_items').select('total_cents').eq('order_id', orderId)
  const subtotal_cents = (items || []).reduce((s, i) => s + (i.total_cents || 0), 0)

  const { data: order } = await supabase
    .from('orders')
    .select('discount_cents, shipping_cents')
    .eq('id', orderId)
    .single()
  if (!order) return { error: 'Pedido no encontrado' }

  const discount = order.discount_cents ?? 0
  const shipping = order.shipping_cents ?? 0
  const taxable = subtotal_cents - discount + shipping
  const tax_cents = Math.round(taxable * (DEFAULT_TAX_RATE / 100))
  const total_cents = taxable + tax_cents

  const { error } = await supabase
    .from('orders')
    .update({ subtotal_cents, tax_cents, total_cents })
    .eq('id', orderId)
  if (error) return { error: error.message }
  return {}
}

// ============================================
// Acceso público: obtener pedido por order_number
// ============================================

const ORDER_NUMBER_RE = /^TRI-\d{4}-\d{4,}$/

export async function getOrderByNumber(
  orderNumber: string
): Promise<{ order: OrderRow; items: OrderItemRow[] } | null> {
  if (!ORDER_NUMBER_RE.test(orderNumber)) return null

  // Usamos service client para que no necesite auth (es página pública del cliente)
  const supabase = createServiceClient()

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('*')
    .eq('order_number', orderNumber)
    .single()

  if (orderError || !order) return null

  const { data: items } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', order.id)

  return {
    order: order as OrderRow,
    items: (items || []).map((i) => ({
      id: i.id,
      product_id: i.product_id,
      product_name: i.product_name,
      product_sku: i.product_sku,
      quantity: i.quantity,
      unit_price_cents: i.unit_price_cents,
      total_cents: i.total_cents,
      notes: i.notes,
    })),
  }
}

// ============================================
// PIPELINE: Validar pedido (genera proforma, envía emails, cambia estado)
// ============================================

export interface ValidateOrderResult {
  error?: string
  proforma_url?: string
  email_client: boolean
  email_admin: boolean
  log: string[]
}

export async function validateOrder(orderId: string): Promise<ValidateOrderResult> {
  const log: string[] = []
  const result: ValidateOrderResult = { email_client: false, email_admin: false, log }

  if (!UUID_REGEX.test(orderId)) {
    result.error = 'ID inválido'
    return result
  }

  const supabase = await createClient()
  log.push('Obteniendo datos del pedido...')

  const { data: order } = await supabase.from('orders').select('*').eq('id', orderId).single()
  if (!order) { result.error = 'Pedido no encontrado'; return result }

  const { data: items } = await supabase.from('order_items').select('*').eq('order_id', orderId)
  if (!items || items.length === 0) { result.error = 'El pedido no tiene productos'; return result }

  log.push(`Pedido ${order.order_number} — ${items.length} items — Total: ${order.total_cents}`)

  // 1. Generar proforma PDF
  log.push('Generando proforma PDF...')
  let pdfBuffer: Buffer
  try {
    const { generateProformaPdf } = await import('@/lib/pdf/generate-pdf')
    pdfBuffer = generateProformaPdf(
      {
        order_number: order.order_number,
        created_at: order.created_at,
        customer_name: order.customer_name,
        customer_company: order.customer_company,
        customer_email: order.customer_email,
        customer_phone: order.customer_phone,
        customer_country: order.customer_country,
        customer_city: order.customer_city,
        customer_vat_id: order.customer_vat_id,
        customer_address: order.customer_address,
        subtotal_cents: order.subtotal_cents ?? 0,
        discount_cents: order.discount_cents ?? 0,
        shipping_cents: order.shipping_cents ?? 0,
        tax_cents: order.tax_cents ?? 0,
        total_cents: order.total_cents ?? 0,
      },
      items.map((i) => ({
        product_name: i.product_name,
        product_sku: i.product_sku,
        quantity: i.quantity,
        unit_price_cents: i.unit_price_cents,
        total_cents: i.total_cents,
      }))
    )
    log.push(`Proforma PDF generada: ${pdfBuffer.length} bytes`)
  } catch (err) {
    log.push(`ERROR generando PDF: ${err instanceof Error ? err.message : err}`)
    result.error = 'Error generando proforma PDF'
    return result
  }

  // 2. Subir a Supabase Storage
  log.push('Subiendo proforma a Supabase Storage...')
  let proformaUrl: string | null = null
  try {
    const { uploadDocument } = await import('@/lib/storage/documents')
    const uploadResult = await uploadDocument(order.id, order.order_number, 'proforma', pdfBuffer)
    if (uploadResult.error) {
      log.push(`WARN: Error subiendo a Storage: ${uploadResult.error} (se continúa sin URL)`)
    } else {
      proformaUrl = uploadResult.url
      result.proforma_url = proformaUrl ?? undefined
      log.push(`Proforma subida: ${proformaUrl}`)
    }
  } catch (err) {
    log.push(`WARN: Storage no disponible: ${err instanceof Error ? err.message : err}`)
  }

  // 3. Guardar URL en la orden
  if (proformaUrl) {
    await supabase.from('orders').update({ invoice_url: proformaUrl }).eq('id', orderId)
    log.push('URL proforma guardada en orden')
  }

  // 4. Enviar email al cliente con proforma adjunta
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tricholand.com'

  log.push('Enviando email al cliente...')
  try {
    const { paymentEmail } = await import('@/lib/email/templates')
    const { sendMail } = await import('@/lib/email/transporter')

    const html = paymentEmail({
      order_number: order.order_number,
      customer_name: order.customer_name,
      items: items.map((i) => ({
        product_name: i.product_name,
        product_sku: i.product_sku,
        quantity: i.quantity,
        unit_price_cents: i.unit_price_cents,
      })),
      subtotal_cents: order.subtotal_cents ?? 0,
      discount_cents: order.discount_cents ?? 0,
      shipping_cents: order.shipping_cents ?? 0,
      tax_cents: order.tax_cents ?? 0,
      total_cents: order.total_cents ?? 0,
      order_url: `${baseUrl}/pedido/${order.order_number}`,
    })

    await sendMail(
      order.customer_email,
      `Pedido ${order.order_number} validado — Ya puedes pagar | Tricholand`,
      html,
      [{ filename: `proforma-${order.order_number}.pdf`, content: pdfBuffer }]
    )
    result.email_client = true
    log.push('Email al cliente enviado OK')
  } catch (err) {
    log.push(`ERROR email cliente: ${err instanceof Error ? err.message : err}`)
  }

  // 5. Enviar email al admin
  log.push('Enviando email al admin...')
  try {
    const { validationSentAdminEmail } = await import('@/lib/email/templates')
    const { sendMail } = await import('@/lib/email/transporter')

    const adminHtml = validationSentAdminEmail({
      order_number: order.order_number,
      customer_name: order.customer_name,
      customer_email: order.customer_email,
      total_cents: order.total_cents ?? 0,
    })

    await sendMail('info@tricholand.com', `Pedido ${order.order_number} validado y enviado`, adminHtml)
    result.email_admin = true
    log.push('Email al admin enviado OK')
  } catch (err) {
    log.push(`ERROR email admin: ${err instanceof Error ? err.message : err}`)
  }

  // 6. Cambiar estado a payment_pending
  if (['pending', 'reviewing', 'quoted'].includes(order.status)) {
    await supabase.from('orders').update({ status: 'payment_pending' }).eq('id', orderId)
    log.push('Estado cambiado a payment_pending')
  }

  log.push('Pipeline de validación completado')
  return result
}

// ============================================
// PIPELINE: Confirmar pago (genera factura, envía emails)
// ============================================

export interface ConfirmPaymentResult {
  error?: string
  invoice_url?: string
  email_client: boolean
  email_admin: boolean
  log: string[]
}

export async function confirmPayment(
  orderId: string,
  paymentId: string,
  paymentMethod: string
): Promise<ConfirmPaymentResult> {
  const log: string[] = []
  const result: ConfirmPaymentResult = { email_client: false, email_admin: false, log }

  if (!UUID_REGEX.test(orderId)) {
    result.error = 'ID inválido'
    return result
  }

  const supabase = createServiceClient() // Usamos service client porque viene de webhooks
  log.push('Confirmando pago...')

  const { data: order } = await supabase.from('orders').select('*').eq('id', orderId).single()
  if (!order) { result.error = 'Pedido no encontrado'; return result }

  const { data: items } = await supabase.from('order_items').select('*').eq('order_id', orderId)

  const now = new Date().toISOString()
  log.push(`Pago confirmado para ${order.order_number} — ${paymentMethod} — ${paymentId}`)

  // 1. Actualizar estado y datos de pago
  await supabase.from('orders').update({
    status: 'paid' as OrderStatus,
    payment_method: paymentMethod as PaymentMethod,
    payment_link: paymentId, // Reutilizamos este campo para el payment_id
    paid_at: now,
  }).eq('id', orderId)
  log.push('Estado actualizado a paid')

  // 2. Generar factura PDF
  let invoiceBuffer: Buffer | null = null
  log.push('Generando factura PDF...')
  try {
    const { generateInvoicePdf } = await import('@/lib/pdf/generate-pdf')

    // Generar número de factura automático
    const year = new Date().getFullYear()
    const invoiceNumber = `FACT-${year}-${order.order_number.replace('TRI-', '').replace(`${year}-`, '')}`

    invoiceBuffer = generateInvoicePdf(
      {
        order_number: order.order_number,
        created_at: order.created_at,
        customer_name: order.customer_name,
        customer_company: order.customer_company,
        customer_email: order.customer_email,
        customer_phone: order.customer_phone,
        customer_country: order.customer_country,
        customer_city: order.customer_city,
        customer_vat_id: order.customer_vat_id,
        customer_address: order.customer_address,
        subtotal_cents: order.subtotal_cents ?? 0,
        discount_cents: order.discount_cents ?? 0,
        shipping_cents: order.shipping_cents ?? 0,
        tax_cents: order.tax_cents ?? 0,
        total_cents: order.total_cents ?? 0,
        invoice_number: invoiceNumber,
      },
      (items || []).map((i) => ({
        product_name: i.product_name,
        product_sku: i.product_sku,
        quantity: i.quantity,
        unit_price_cents: i.unit_price_cents,
        total_cents: i.total_cents,
      }))
    )

    // Guardar número de factura
    await supabase.from('orders').update({ invoice_number: invoiceNumber }).eq('id', orderId)
    log.push(`Factura generada: ${invoiceNumber} (${invoiceBuffer.length} bytes)`)
  } catch (err) {
    log.push(`ERROR generando factura: ${err instanceof Error ? err.message : err}`)
  }

  // 3. Subir factura a Storage
  let invoiceUrl: string | null = null
  if (invoiceBuffer) {
    try {
      const { uploadDocument } = await import('@/lib/storage/documents')
      const uploadResult = await uploadDocument(order.id, order.order_number, 'factura', invoiceBuffer)
      if (!uploadResult.error && uploadResult.url) {
        invoiceUrl = uploadResult.url
        result.invoice_url = invoiceUrl
        await supabase.from('orders').update({ invoice_url: invoiceUrl }).eq('id', orderId)
        log.push(`Factura subida: ${invoiceUrl}`)
      } else {
        log.push(`WARN: Error subiendo factura: ${uploadResult.error}`)
      }
    } catch (err) {
      log.push(`WARN: Storage no disponible: ${err instanceof Error ? err.message : err}`)
    }
  }

  // 4. Enviar email al cliente con factura
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tricholand.com'
  const emailData = {
    order_number: order.order_number,
    customer_name: order.customer_name,
    customer_email: order.customer_email,
    total_cents: order.total_cents ?? 0,
    payment_method: paymentMethod,
    paid_at: now,
    order_url: `${baseUrl}/pedido/${order.order_number}`,
  }

  log.push('Enviando email al cliente...')
  try {
    const { paymentConfirmedEmail } = await import('@/lib/email/templates')
    const { sendMail } = await import('@/lib/email/transporter')

    const attachments = invoiceBuffer
      ? [{ filename: `factura-${order.order_number}.pdf`, content: invoiceBuffer }]
      : undefined

    await sendMail(
      order.customer_email,
      `Pago confirmado — Pedido ${order.order_number} | Tricholand`,
      paymentConfirmedEmail(emailData),
      attachments
    )
    result.email_client = true
    log.push('Email al cliente enviado OK')
  } catch (err) {
    log.push(`ERROR email cliente: ${err instanceof Error ? err.message : err}`)
  }

  // 5. Enviar email al admin
  log.push('Enviando email al admin...')
  try {
    const { paymentConfirmedAdminEmail } = await import('@/lib/email/templates')
    const { sendMail } = await import('@/lib/email/transporter')

    await sendMail(
      'info@tricholand.com',
      `Pago recibido — ${order.order_number} (${paymentMethod})`,
      paymentConfirmedAdminEmail(emailData),
      invoiceBuffer ? [{ filename: `factura-${order.order_number}.pdf`, content: invoiceBuffer }] : undefined
    )
    result.email_admin = true
    log.push('Email al admin enviado OK')
  } catch (err) {
    log.push(`ERROR email admin: ${err instanceof Error ? err.message : err}`)
  }

  log.push('Pipeline de confirmación de pago completado')
  return result
}
