import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { confirmPayment } from '@/lib/actions/orders'

/**
 * POST /api/webhooks/stripe
 * Webhook de Stripe para confirmar pagos.
 * Configurar en Stripe Dashboard: https://dashboard.stripe.com/webhooks
 */
export async function POST(request: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!secretKey || !webhookSecret) {
    console.error('[Stripe Webhook] Variables no configuradas')
    return NextResponse.json({ error: 'Not configured' }, { status: 503 })
  }

  const stripe = new Stripe(secretKey)
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('[Stripe Webhook] Invalid signature:', err instanceof Error ? err.message : err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  console.log(`[Stripe Webhook] Evento recibido: ${event.type}`)

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const orderId = session.metadata?.order_id
    if (!orderId) {
      console.error('[Stripe Webhook] No order_id in metadata')
      return NextResponse.json({ error: 'No order_id' }, { status: 400 })
    }

    console.log(`[Stripe Webhook] Pago completado para pedido ${orderId}`)

    const result = await confirmPayment(orderId, session.payment_intent as string, 'stripe')

    if (result.error) {
      console.error(`[Stripe Webhook] Error confirmando pago: ${result.error}`)
    } else {
      console.log(`[Stripe Webhook] Pago confirmado OK`, result.log)
    }
  }

  return NextResponse.json({ received: true })
}
