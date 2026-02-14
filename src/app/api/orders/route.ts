import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/api'
import { sendMailPair } from '@/lib/email/transporter'
import { orderAdminEmail, orderClientEmail } from '@/lib/email/templates'
import { resolveLocale, t } from '@/lib/email/i18n'

interface OrderItem {
  product_id: string
  product_name: string
  product_sku: string
  quantity: number
  unit_price_cents: number
  notes: string | null
}

interface OrderPayload {
  items: OrderItem[]
  customer_name: string
  customer_company: string | null
  customer_email: string
  customer_phone: string | null
  customer_country: string
  customer_city: string | null
  customer_vat_id: string | null
  customer_address: string | null
  customer_notes: string | null
  locale: string
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function POST(request: NextRequest) {
  const log: string[] = []
  const addLog = (msg: string) => { log.push(msg); console.log(`[Orders] ${msg}`) }
  const addError = (msg: string) => { log.push(`ERROR: ${msg}`); console.error(`[Orders] ${msg}`) }

  try {
    const body: OrderPayload = await request.json()

    // --- Validación ---
    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ error: 'El pedido debe tener al menos un producto' }, { status: 400 })
    }
    if (!body.customer_name || !body.customer_email || !body.customer_country) {
      return NextResponse.json({ error: 'Faltan campos obligatorios: nombre, email y país' }, { status: 400 })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.customer_email)) {
      return NextResponse.json({ error: 'El formato del email no es válido' }, { status: 400 })
    }

    addLog(`Nuevo pedido de ${body.customer_name} (${body.customer_email}) - ${body.items.length} items`)

    // --- Calcular totales ---
    const subtotal_cents = body.items.reduce(
      (sum, item) => sum + item.unit_price_cents * item.quantity, 0
    )

    const supabase = createServiceClient()

    // --- Número de pedido ---
    let order_number: string
    try {
      const { data: rpcNum } = await supabase.rpc('get_next_order_number')
      order_number = rpcNum ?? `TRI-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`
    } catch {
      order_number = `TRI-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`
    }
    addLog(`Número de pedido: ${order_number}`)

    // --- 1. Insertar orden ---
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number,
        status: 'pending',
        customer_name: body.customer_name,
        customer_company: body.customer_company,
        customer_email: body.customer_email,
        customer_phone: body.customer_phone,
        customer_country: body.customer_country,
        customer_city: body.customer_city,
        customer_vat_id: body.customer_vat_id,
        customer_address: body.customer_address,
        customer_notes: body.customer_notes,
        subtotal_cents,
        discount_cents: 0,
        shipping_cents: 0,
        tax_cents: 0,
        total_cents: subtotal_cents,
        currency: 'EUR',
        locale: body.locale || 'es',
      })
      .select('id')
      .single()

    if (orderError || !order) {
      addError(`Fallo al insertar orden: ${orderError?.message} | code: ${orderError?.code} | details: ${orderError?.details}`)
      return NextResponse.json({ error: 'Error al guardar el pedido', log }, { status: 500 })
    }

    addLog(`Orden creada en BD: ${order.id}`)

    // --- 2. Insertar items ---
    const itemsToInsert = body.items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id && UUID_RE.test(item.product_id) ? item.product_id : null,
      product_name: item.product_name,
      product_sku: item.product_sku,
      quantity: item.quantity,
      unit_price_cents: item.unit_price_cents,
      total_cents: item.unit_price_cents * item.quantity,
      notes: item.notes || null,
    }))

    let itemsSaved = false

    // Intento 1: con product_id
    const { error: itemsErr } = await supabase.from('order_items').insert(itemsToInsert)
    if (itemsErr) {
      addError(`Items insert falló: ${itemsErr.message} | code: ${itemsErr.code} | details: ${itemsErr.details}`)

      // Intento 2: sin product_id (por si falla foreign key)
      const itemsNoFk = itemsToInsert.map((i) => ({ ...i, product_id: null }))
      const { error: retryErr } = await supabase.from('order_items').insert(itemsNoFk)
      if (retryErr) {
        addError(`Items retry sin FK también falló: ${retryErr.message} | code: ${retryErr.code} | details: ${retryErr.details}`)
      } else {
        itemsSaved = true
        addLog('Items guardados OK (sin product_id, fallback)')
      }
    } else {
      itemsSaved = true
      addLog(`${itemsToInsert.length} items guardados OK`)
    }

    // --- 3. Enviar emails ---
    let emailAdmin = false
    let emailClient = false

    try {
      const emailData = {
        order_number,
        customer_name: body.customer_name,
        customer_company: body.customer_company,
        customer_email: body.customer_email,
        customer_phone: body.customer_phone,
        customer_country: body.customer_country,
        customer_city: body.customer_city,
        customer_vat_id: body.customer_vat_id,
        customer_address: body.customer_address,
        customer_notes: body.customer_notes,
        items: body.items.map((item) => ({
          product_name: item.product_name,
          product_sku: item.product_sku,
          quantity: item.quantity,
          unit_price_cents: item.unit_price_cents,
        })),
        subtotal_cents,
        locale: body.locale || 'es',
      }

      const locale = resolveLocale(body.locale)
      const tr = t(locale)
      const emailResult = await sendMailPair(
        `[PEDIDO] ${order_number} — ${body.customer_name} (${body.customer_country})`,
        orderAdminEmail(emailData),
        body.customer_email,
        tr.subjectOrderReceived.replace('{order}', order_number),
        orderClientEmail(emailData),
      )
      emailAdmin = emailResult.admin
      emailClient = emailResult.client
      addLog(`Emails: admin=${emailAdmin}, cliente=${emailClient}`)
    } catch (err) {
      addError(`Error general enviando emails: ${err instanceof Error ? err.message : err}`)
    }

    // --- Respuesta ---
    addLog(`Pedido ${order_number} completado. Items: ${itemsSaved}, Email admin: ${emailAdmin}, Email cliente: ${emailClient}`)

    return NextResponse.json({
      success: true,
      order_number,
      items_saved: itemsSaved,
      email_admin: emailAdmin,
      email_client: emailClient,
      log,
    })
  } catch (err) {
    addError(`Error general: ${err instanceof Error ? err.message : err}`)
    return NextResponse.json({ error: 'Error interno del servidor', log }, { status: 500 })
  }
}
