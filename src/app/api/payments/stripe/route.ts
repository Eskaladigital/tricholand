import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServiceClient } from '@/lib/supabase/api'

/**
 * POST /api/payments/stripe
 * Crea una Stripe Checkout Session para un pedido.
 * Body: { order_id: string }
 */
export async function POST(request: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    return NextResponse.json(
      { error: 'Stripe no configurado. Contacta con info@tricholand.com para realizar el pago.' },
      { status: 503 }
    )
  }

  try {
    const { order_id } = await request.json()
    if (!order_id) {
      return NextResponse.json({ error: 'order_id requerido' }, { status: 400 })
    }

    const supabase = createServiceClient()
    const { data: order } = await supabase
      .from('orders')
      .select('*')
      .eq('id', order_id)
      .single()

    if (!order) {
      return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 })
    }

    if (order.status !== 'payment_pending') {
      return NextResponse.json({ error: 'Este pedido no está pendiente de pago' }, { status: 400 })
    }

    const { data: items } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', order_id)

    const stripe = new Stripe(secretKey)
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tricholand.com'

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = (items || []).map((item) => ({
      price_data: {
        currency: order.currency || 'eur',
        product_data: {
          name: item.product_name,
          description: item.product_sku || undefined,
        },
        unit_amount: item.unit_price_cents,
      },
      quantity: item.quantity,
    }))

    // Añadir envío si hay
    if (order.shipping_cents > 0) {
      lineItems.push({
        price_data: {
          currency: order.currency || 'eur',
          product_data: { name: 'Envío' },
          unit_amount: order.shipping_cents,
        },
        quantity: 1,
      })
    }

    // Descuento como cupón si hay
    const discounts: Stripe.Checkout.SessionCreateParams.Discount[] = []
    if (order.discount_cents > 0) {
      const coupon = await stripe.coupons.create({
        amount_off: order.discount_cents,
        currency: order.currency || 'eur',
        duration: 'once',
        name: `Descuento pedido ${order.order_number}`,
      })
      discounts.push({ coupon: coupon.id })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      discounts: discounts.length > 0 ? discounts : undefined,
      automatic_tax: { enabled: false }, // IVA ya incluido en precios
      customer_email: order.customer_email,
      metadata: {
        order_id: order.id,
        order_number: order.order_number,
      },
      success_url: `${baseUrl}/pedido/${order.order_number}?payment=success`,
      cancel_url: `${baseUrl}/pedido/${order.order_number}?payment=cancelled`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[Stripe] Error creando checkout session:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Error creando sesión de pago' },
      { status: 500 }
    )
  }
}
