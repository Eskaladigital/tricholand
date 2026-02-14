import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/api'
import { sendMailPair } from '@/lib/email/transporter'
import { orderAdminEmail, orderClientEmail } from '@/lib/email/templates'

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

export async function POST(request: NextRequest) {
  try {
    const body: OrderPayload = await request.json()

    // Validación
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

    // Calcular totales
    const subtotal_cents = body.items.reduce(
      (sum, item) => sum + item.unit_price_cents * item.quantity, 0
    )

    const supabase = createServiceClient()

    // Número de pedido: RPC si existe, sino timestamp
    let order_number: string
    const { data: rpcNum } = await supabase.rpc('get_next_order_number')
    order_number = rpcNum ?? `TRI-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`

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
      console.error('Error guardando pedido:', orderError?.message ?? orderError, orderError?.details)
      return NextResponse.json({ error: 'Error al guardar el pedido' }, { status: 500 })
    }

    // Insertar todos los items en una sola operación batch
    const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    const itemsToInsert = body.items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id && UUID_REGEX.test(item.product_id) ? item.product_id : null,
      product_name: item.product_name,
      product_sku: item.product_sku,
      quantity: item.quantity,
      unit_price_cents: item.unit_price_cents,
      total_cents: item.unit_price_cents * item.quantity,
      notes: item.notes || null,
    }))

    console.log(`Insertando ${itemsToInsert.length} items para pedido ${order_number}:`, JSON.stringify(itemsToInsert))

    let itemsInserted = false
    const { error: itemsError } = await supabase.from('order_items').insert(itemsToInsert)

    if (itemsError) {
      console.error('Error en batch insert de items:', itemsError.message, itemsError.details, itemsError.code)

      // Fallback: reintentar sin product_id (por si falla la foreign key)
      const itemsWithoutFk = itemsToInsert.map((item) => ({ ...item, product_id: null }))
      const { error: retryError } = await supabase.from('order_items').insert(itemsWithoutFk)

      if (retryError) {
        console.error('Error en retry sin FK:', retryError.message, retryError.details, retryError.code)
      } else {
        itemsInserted = true
        console.log(`Items insertados sin product_id (fallback) para pedido ${order_number}`)
      }
    } else {
      itemsInserted = true
    }

    // Enviar emails (no bloquear la respuesta si falla)
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

    let emailsSent = false
    try {
      await sendMailPair(
        `[PEDIDO] ${order_number} — ${body.customer_name} (${body.customer_country})`,
        orderAdminEmail(emailData),
        body.customer_email,
        `Tu solicitud de pedido ${order_number} — Tricholand`,
        orderClientEmail(emailData),
      )
      emailsSent = true
      console.log(`Emails enviados para pedido ${order_number}`)
    } catch (err) {
      console.error('Error enviando emails de pedido:', err)
    }

    console.log('Nueva solicitud de pedido:', {
      order_number,
      customer: body.customer_name,
      email: body.customer_email,
      country: body.customer_country,
      items: body.items.length,
      itemsInserted,
      subtotal: `${(subtotal_cents / 100).toFixed(2)}€`,
      emailsSent,
    })

    return NextResponse.json({
      success: true,
      order_number,
      items_saved: itemsInserted,
      emails_sent: emailsSent,
      message: 'Solicitud de pedido recibida correctamente',
    })
  } catch (err) {
    console.error('Error procesando pedido:', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
