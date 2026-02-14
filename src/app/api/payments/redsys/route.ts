import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/api'
import { createRedsysPayment } from '@/lib/payments/redsys'

/**
 * POST /api/payments/redsys
 * Genera los datos del formulario de Redsys para un pedido.
 * Body: { order_id: string }
 * Devuelve los datos para hacer POST al formulario de Redsys desde el cliente.
 */
export async function POST(request: NextRequest) {
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

    const result = createRedsysPayment({
      orderId: order.id,
      orderNumber: order.order_number,
      totalCents: order.total_cents,
      customerName: order.customer_name,
    })

    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: 503 })
    }

    return NextResponse.json(result)
  } catch (err) {
    console.error('[Redsys] Error creando pago:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Error creando pago' },
      { status: 500 }
    )
  }
}
