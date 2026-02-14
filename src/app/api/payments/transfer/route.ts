import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/api'
import { sendMail } from '@/lib/email/transporter'
import { transferBankDetailsEmail } from '@/lib/email/templates'
import { resolveLocale, t } from '@/lib/email/i18n'

/**
 * POST /api/payments/transfer
 * Cliente elige pago por transferencia.
 * Envía email con datos bancarios (privado, no públicos en la web)
 * y actualiza payment_method a 'transfer'.
 */
export async function POST(request: NextRequest) {
  const iban = process.env.BANK_IBAN
  const accountHolder = process.env.BANK_ACCOUNT_HOLDER
  const bankName = process.env.BANK_NAME
  const bic = process.env.BANK_BIC

  if (!iban || !accountHolder || !bankName) {
    return NextResponse.json(
      { error: 'Pago por transferencia no configurado. Contacta con info@tricholand.com.' },
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

    const locale = resolveLocale(order.locale)
    const tr = t(locale)

    const html = transferBankDetailsEmail({
      order_number: order.order_number,
      customer_name: order.customer_name,
      total_cents: order.total_cents ?? 0,
      locale: order.locale,
      iban,
      account_holder: accountHolder,
      bank_name: bankName,
      bic: bic || undefined,
    })

    await sendMail(
      order.customer_email,
      tr.subjectTransferDetails.replace('{order}', order.order_number),
      html
    )

    await supabase
      .from('orders')
      .update({ payment_method: 'transfer' })
      .eq('id', order_id)

    return NextResponse.json({ success: true, message: 'Email con datos bancarios enviado' })
  } catch (err) {
    console.error('[Transfer] Error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Error enviando datos bancarios' },
      { status: 500 }
    )
  }
}
