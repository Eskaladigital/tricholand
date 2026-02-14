'use client'

import { useState, use } from 'react'
import type { OrderStatus, PaymentMethod } from '@/types/shop'

// Demo order detail (en producción: Supabase fetch)
const orderDemo = {
  id: 'ord_001',
  order_number: 'TRI-2025-0012',
  created_at: '2025-01-20T14:30:00Z',
  status: 'pending' as OrderStatus,
  customer_name: 'Marco Visser',
  customer_company: 'Garden Center Holanda B.V.',
  customer_email: 'marco@gcholanda.nl',
  customer_phone: '+31 20 123 4567',
  customer_country: 'Países Bajos',
  customer_city: 'Ámsterdam',
  customer_vat_id: 'NL123456789B01',
  customer_address: 'Keizersgracht 123, 1015 CJ Amsterdam',
  customer_notes: 'Preferimos entrega los martes o jueves por la mañana.',
  items: [
    { id: 'oi_1', product_name: 'Lote T. Pachanoi 15-20 cm', product_sku: 'TRI-PAC-015-100', quantity: 3, unit_price_cents: 35000, total_cents: 105000, notes: null },
    { id: 'oi_2', product_name: 'Lote T. Peruvianus 10-15 cm', product_sku: 'TRI-PER-010-100', quantity: 1, unit_price_cents: 38000, total_cents: 38000, notes: 'Si es posible, de los clones con más espinas' },
    { id: 'oi_3', product_name: 'Pack mixto 5 variedades', product_sku: 'TRI-MIX-005-50', quantity: 1, unit_price_cents: 22500, total_cents: 22500, notes: null },
  ],
  subtotal_cents: 165500,
  locale: 'en',
}

const statusFlow: OrderStatus[] = ['pending', 'reviewing', 'quoted', 'payment_pending', 'paid', 'preparing', 'shipped', 'delivered']
const statusLabels: Record<string, string> = {
  pending: 'Pendiente', reviewing: 'Revisando', quoted: 'Presupuestado',
  payment_pending: 'Esperando pago', paid: 'Pagado', preparing: 'Preparando',
  shipped: 'Enviado', delivered: 'Entregado', cancelled: 'Cancelado', refunded: 'Reembolsado',
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const order = orderDemo // En producción: fetch por id

  const [status, setStatus] = useState<OrderStatus>(order.status)
  const [discount, setDiscount] = useState(0)
  const [shipping, setShipping] = useState(0)
  const [taxRate, setTaxRate] = useState(21)
  const [paymentLink, setPaymentLink] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe')
  const [adminNotes, setAdminNotes] = useState('')
  const [trackingNumber, setTrackingNumber] = useState('')

  const subtotal = order.subtotal_cents / 100
  const discountAmount = discount
  const shippingAmount = shipping
  const taxableAmount = subtotal - discountAmount + shippingAmount
  const taxAmount = taxableAmount * (taxRate / 100)
  const total = taxableAmount + taxAmount

  const fieldClass = 'w-full px-3 py-2 border border-linea text-sm focus:outline-none focus:border-naranja bg-blanco'
  const labelClass = 'block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1'

  return (
    <>
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
              {order.order_number}
            </h1>
            <p className="text-sm text-marron-claro mt-1">
              {new Date(order.created_at).toLocaleString('es-ES')} · ID: {id}
            </p>
          </div>
          <a href="/administrator/orders" className="text-sm text-naranja font-semibold hover:underline">
            ← Volver a pedidos
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          {/* Main */}
          <div className="space-y-6">
            {/* Items */}
            <section className="bg-blanco border border-linea p-6">
              <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-4 pb-2 border-b border-linea">
                Productos ({order.items.length})
              </h2>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start py-2 border-b border-linea/50">
                    <div>
                      <span className="font-bold text-sm">{item.quantity}× {item.product_name}</span>
                      <span className="block font-mono text-xs text-marron-claro">{item.product_sku}</span>
                      {item.notes && (
                        <span className="block text-xs text-terracota mt-1">📝 {item.notes}</span>
                      )}
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <span className="font-bold text-sm">{(item.total_cents / 100).toFixed(2)} €</span>
                      <span className="block text-xs text-marron-claro">{(item.unit_price_cents / 100).toFixed(2)} €/ud</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Pricing (admin adjustable) */}
            <section className="bg-blanco border border-linea p-6">
              <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-4 pb-2 border-b border-linea">
                Presupuesto final
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className={labelClass}>Descuento (€)</label>
                  <input type="number" step="0.01" min="0" value={discount} onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)} className={fieldClass} />
                </div>
                <div>
                  <label className={labelClass}>Envío (€)</label>
                  <input type="number" step="0.01" min="0" value={shipping} onChange={(e) => setShipping(parseFloat(e.target.value) || 0)} className={fieldClass} />
                </div>
                <div>
                  <label className={labelClass}>IVA (%)</label>
                  <input type="number" step="1" min="0" max="100" value={taxRate} onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)} className={fieldClass} />
                </div>
                <div>
                  <label className={labelClass}>Método de pago</label>
                  <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)} className={fieldClass}>
                    <option value="stripe">Stripe</option>
                    <option value="redsys">Redsys</option>
                    <option value="transfer">Transferencia</option>
                    <option value="other">Otro</option>
                  </select>
                </div>
              </div>

              <div className="bg-crudo p-4 space-y-1 text-sm">
                <div className="flex justify-between"><span>Subtotal productos</span><span>{subtotal.toFixed(2)} €</span></div>
                {discount > 0 && <div className="flex justify-between text-verde"><span>Descuento</span><span>-{discountAmount.toFixed(2)} €</span></div>}
                {shipping > 0 && <div className="flex justify-between"><span>Envío</span><span>{shippingAmount.toFixed(2)} €</span></div>}
                <div className="flex justify-between"><span>IVA ({taxRate}%)</span><span>{taxAmount.toFixed(2)} €</span></div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-linea mt-2">
                  <span>TOTAL</span>
                  <span className="text-naranja">{total.toFixed(2)} €</span>
                </div>
              </div>
            </section>

            {/* Payment link */}
            <section className="bg-blanco border border-linea p-6">
              <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-4 pb-2 border-b border-linea">
                Link de pago
              </h2>
              <div className="space-y-3">
                <div>
                  <label className={labelClass}>URL del link de pago (Stripe/Redsys)</label>
                  <input type="url" value={paymentLink} onChange={(e) => setPaymentLink(e.target.value)} className={fieldClass} placeholder="https://checkout.stripe.com/pay/..." />
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-[#635BFF] text-blanco text-xs font-bold uppercase hover:opacity-90 transition-opacity">
                    Crear link Stripe
                  </button>
                  <button className="px-4 py-2 bg-[#CC0000] text-blanco text-xs font-bold uppercase hover:opacity-90 transition-opacity">
                    Crear link Redsys
                  </button>
                  {paymentLink && (
                    <button className="px-4 py-2 bg-verde text-blanco text-xs font-bold uppercase hover:opacity-90 transition-opacity">
                      Enviar link al cliente →
                    </button>
                  )}
                </div>
              </div>
            </section>

            {/* Admin notes + tracking */}
            <section className="bg-blanco border border-linea p-6">
              <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-4 pb-2 border-b border-linea">
                Notas y envío
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Notas internas (no visibles)</label>
                  <textarea value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} rows={3} className={`${fieldClass} resize-none`} placeholder="Notas internas..." />
                </div>
                <div>
                  <label className={labelClass}>Número de seguimiento</label>
                  <input type="text" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} className={fieldClass} placeholder="Tracking del envío" />
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <section className="bg-blanco border border-linea p-6">
              <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide mb-3">
                Estado del pedido
              </h3>
              <select value={status} onChange={(e) => setStatus(e.target.value as OrderStatus)}
                className={`${fieldClass} mb-3`}>
                {statusFlow.map((s) => (
                  <option key={s} value={s}>{statusLabels[s]}</option>
                ))}
                <option value="cancelled">Cancelado</option>
                <option value="refunded">Reembolsado</option>
              </select>
              <button className="w-full py-2.5 bg-naranja text-blanco font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide hover:bg-verde transition-colors">
                Guardar cambios
              </button>
            </section>

            {/* Customer info */}
            <section className="bg-blanco border border-linea p-6">
              <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide text-naranja mb-3">
                Cliente
              </h3>
              <div className="space-y-2 text-sm">
                <p className="font-bold">{order.customer_name}</p>
                {order.customer_company && <p className="text-marron-claro">{order.customer_company}</p>}
                <p>
                  <a href={`mailto:${order.customer_email}`} className="text-naranja hover:underline">
                    {order.customer_email}
                  </a>
                </p>
                {order.customer_phone && <p>{order.customer_phone}</p>}
                {order.customer_vat_id && <p className="font-mono text-xs">VAT: {order.customer_vat_id}</p>}
                <p className="text-marron-claro">{order.customer_city}, {order.customer_country}</p>
                {order.customer_address && <p className="text-marron-claro text-xs">{order.customer_address}</p>}
              </div>
            </section>

            {/* Customer notes */}
            {order.customer_notes && (
              <section className="bg-yellow-50 border border-yellow-200 p-6">
                <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide text-yellow-700 mb-2">
                  Notas del cliente
                </h3>
                <p className="text-sm text-yellow-800">{order.customer_notes}</p>
              </section>
            )}

            {/* Quick actions */}
            <section className="bg-blanco border border-linea p-6 space-y-2">
              <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide mb-3">
                Acciones rápidas
              </h3>
              <button className="w-full py-2 border border-linea text-xs font-bold uppercase hover:bg-crudo transition-colors">
                📧 Enviar email al cliente
              </button>
              <button className="w-full py-2 border border-linea text-xs font-bold uppercase hover:bg-crudo transition-colors">
                🧾 Generar factura
              </button>
              <button className="w-full py-2 border border-linea text-xs font-bold uppercase hover:bg-crudo transition-colors">
                📋 Exportar a PDF
              </button>
            </section>
          </div>
        </div>
    </>
  )
}
