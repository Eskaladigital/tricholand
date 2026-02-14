'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { OrderStatus, PaymentMethod } from '@/types/shop'
import type { OrderRow, OrderItemRow } from '@/lib/actions/orders'
import type { ProductOption } from '@/lib/actions/products'
import {
  updateOrder,
  addOrderItem,
  updateOrderItem,
  deleteOrderItem,
  deleteOrder,
  recalcOrderTotals,
} from '@/lib/actions/orders'

const statusFlow: OrderStatus[] = ['pending', 'reviewing', 'quoted', 'payment_pending', 'paid', 'preparing', 'shipped', 'delivered']
const statusLabels: Record<string, string> = {
  pending: 'Pendiente',
  reviewing: 'Revisando',
  quoted: 'Presupuestado',
  payment_pending: 'Esperando pago',
  paid: 'Pagado',
  preparing: 'Preparando',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
  refunded: 'Reembolsado',
}

interface OrderDetailClientProps {
  order: OrderRow
  items: OrderItemRow[]
  products: ProductOption[]
}

export function OrderDetailClient({ order: initialOrder, items: initialItems, products }: OrderDetailClientProps) {
  const router = useRouter()
  const [order, setOrder] = useState(initialOrder)
  const [items, setItems] = useState(initialItems)
  const [status, setStatus] = useState<OrderStatus>(order.status)
  const [discount, setDiscount] = useState((order.discount_cents ?? 0) / 100)
  const [shipping, setShipping] = useState((order.shipping_cents ?? 0) / 100)
  const [taxRate, setTaxRate] = useState(21)
  const [paymentLink, setPaymentLink] = useState(order.payment_link ?? '')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(order.payment_method ?? 'stripe')
  const [adminNotes, setAdminNotes] = useState(order.admin_notes ?? '')
  const [trackingNumber, setTrackingNumber] = useState(order.shipping_tracking ?? '')
  const [invoiceNumber, setInvoiceNumber] = useState(order.invoice_number ?? '')
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [deletingOrder, setDeletingOrder] = useState(false)
  const [addingProduct, setAddingProduct] = useState(false)
  const [newProductId, setNewProductId] = useState('')
  const [newProductQty, setNewProductQty] = useState(1)
  const [newProductPrice, setNewProductPrice] = useState(0)
  const [newProductNotes, setNewProductNotes] = useState('')

  const subtotalCents = items.reduce((s, i) => s + i.total_cents, 0)
  const subtotal = subtotalCents / 100
  const discountAmount = discount
  const shippingAmount = shipping
  const taxableAmount = subtotal - discountAmount + shippingAmount
  const taxAmount = taxableAmount * (taxRate / 100)
  const total = taxableAmount + taxAmount
  const totalCents = Math.round(total * 100)

  const fieldClass = 'w-full px-3 py-2 border border-linea text-sm focus:outline-none focus:border-naranja bg-blanco'
  const labelClass = 'block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1'

  const showMsg = useCallback((ok: boolean, text: string) => {
    setSaveMsg({ ok, text })
    setTimeout(() => setSaveMsg(null), 3000)
  }, [])

  const handleSaveOrder = async () => {
    setSaving(true)
    const taxCents = Math.round(taxAmount * 100)
    const discountCents = Math.round(discount * 100)
    const shippingCents = Math.round(shipping * 100)
    const { error } = await updateOrder(order.id, {
      status,
      discount_cents: discountCents,
      shipping_cents: shippingCents,
      tax_cents: taxCents,
      total_cents: totalCents,
      admin_notes: adminNotes,
      payment_method: paymentMethod,
      payment_link: paymentLink || undefined,
      shipping_tracking: trackingNumber || undefined,
      invoice_number: invoiceNumber || undefined,
    })
    setSaving(false)
    if (error) showMsg(false, error)
    else {
      setOrder((o) => ({ ...o, status, admin_notes: adminNotes, shipping_tracking: trackingNumber || null, payment_link: paymentLink || null }))
      showMsg(true, 'Cambios guardados')
    }
  }

  const handleAddItem = async () => {
    const prod = products.find((p) => p.id === newProductId)
    if (!prod) return
    const price = newProductPrice > 0 ? newProductPrice : prod.price_cents
    const total_cents = newProductQty * price

    const { error, id: newId } = await addOrderItem(order.id, {
      product_id: prod.id,
      product_name: prod.name,
      product_sku: prod.sku,
      quantity: newProductQty,
      unit_price_cents: price,
      notes: newProductNotes || undefined,
    })
    if (error) {
      showMsg(false, error)
      return
    }
    setItems((prev) => [
      ...prev,
      {
        id: newId ?? `temp_${Date.now()}`,
        product_id: prod.id,
        product_name: prod.name,
        product_sku: prod.sku,
        quantity: newProductQty,
        unit_price_cents: price,
        total_cents,
        notes: newProductNotes || null,
      },
    ])
    setAddingProduct(false)
    setNewProductId('')
    setNewProductQty(1)
    setNewProductPrice(0)
    setNewProductNotes('')
    await recalcOrderTotals(order.id)
    showMsg(true, 'Producto añadido')
  }

  const handleUpdateItem = async (itemId: string, qty: number, price: number, notes: string) => {
    const { error } = await updateOrderItem(itemId, { quantity: qty, unit_price_cents: price, notes: notes || undefined })
    if (error) {
      showMsg(false, error)
      return
    }
    setItems((prev) =>
      prev.map((i) =>
        i.id === itemId ? { ...i, quantity: qty, unit_price_cents: price, total_cents: qty * price, notes: notes || null } : i
      )
    )
    setEditingItem(null)
    await recalcOrderTotals(order.id)
    showMsg(true, 'Producto actualizado')
  }

  const handleDeleteOrder = async () => {
    if (!confirm(`¿Borrar el pedido ${order.order_number}? Esta acción no se puede deshacer.`)) return
    setDeletingOrder(true)
    const { error } = await deleteOrder(order.id)
    setDeletingOrder(false)
    if (error) showMsg(false, error)
    else router.push('/administrator/orders')
  }

  const handleDeleteItem = async (itemId: string) => {
    const { error } = await deleteOrderItem(itemId)
    if (error) {
      showMsg(false, error)
      return
    }
    setItems((prev) => prev.filter((i) => i.id !== itemId))
    await recalcOrderTotals(order.id)
    showMsg(true, 'Producto eliminado')
  }

  type DocType = 'presupuesto' | 'factura'

  const handleExportPdf = (docType: DocType) => {
    const win = window.open('', '_blank', 'width=800,height=900')
    if (!win) return
    const isFactura = docType === 'factura'
    const title = isFactura ? 'FACTURA' : 'PRESUPUESTO / FACTURA PROFORMA'
    const subtitle = isFactura ? '' : '(Nota de cargo — sin valor fiscal hasta el pago)'
    const invBlock = isFactura && invoiceNumber ? `<p><strong>Nº Factura:</strong> ${invoiceNumber}</p>` : ''
    win.document.write(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title} ${order.order_number}</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 40px; color: #333; max-width: 700px; margin: 0 auto; }
    h1 { font-size: 24px; margin-bottom: 8px; }
    .meta { color: #666; font-size: 14px; margin-bottom: 24px; }
    table { width: 100%; border-collapse: collapse; margin: 24px 0; }
    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
    th { background: #f5f5f5; font-weight: 600; }
    .totals { margin-top: 24px; text-align: right; }
    .total { font-size: 18px; font-weight: bold; margin-top: 8px; }
    .company { margin-bottom: 24px; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <h1>${title}</h1>
  ${subtitle ? `<p class="meta" style="font-style: italic; color: #888;">${subtitle}</p>` : ''}
  <p class="meta">${order.order_number} · ${new Date(order.created_at).toLocaleDateString('es-ES')}</p>
  ${invBlock}
  <div class="company">
    <strong>Tricholand</strong><br>
    Vivero de Trichocereus y cactáceas columnares
  </div>
  <p><strong>Cliente:</strong><br>
  ${order.customer_name}${order.customer_company ? `<br>${order.customer_company}` : ''}<br>
  ${order.customer_email}<br>
  ${order.customer_country}${order.customer_city ? `, ${order.customer_city}` : ''}
  ${order.customer_address ? `<br>${order.customer_address}` : ''}
  </p>
  <table>
    <thead>
      <tr><th>Producto</th><th>SKU</th><th>Cant.</th><th>P. unit.</th><th>Total</th></tr>
    </thead>
    <tbody>
      ${items
        .map(
          (i) =>
            `<tr><td>${i.product_name}</td><td>${i.product_sku}</td><td>${i.quantity}</td><td>${(i.unit_price_cents / 100).toFixed(2)} €</td><td>${(i.total_cents / 100).toFixed(2)} €</td></tr>`
        )
        .join('')}
    </tbody>
  </table>
  <div class="totals">
    <div>Subtotal: ${subtotal.toFixed(2)} €</div>
    ${discount > 0 ? `<div>Descuento: -${discount.toFixed(2)} €</div>` : ''}
    ${shipping > 0 ? `<div>Envío: ${shipping.toFixed(2)} €</div>` : ''}
    <div>IVA (${taxRate}%): ${taxAmount.toFixed(2)} €</div>
    <div class="total">TOTAL: ${total.toFixed(2)} €</div>
  </div>
  <p style="margin-top: 40px; font-size: 12px; color: #666;">
    Documento generado por Tricholand · www.tricholand.com
  </p>
  <script>
    window.onload = function() { window.print(); window.onafterprint = function() { window.close(); } }
  </script>
</body>
</html>`)
    win.document.close()
  }

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Pedido ${order.order_number} - Tricholand`)
    const body = encodeURIComponent(
      `Hola ${order.customer_name},\n\nEn relación a su pedido ${order.order_number}.\n\nSaludos,\nTricholand`
    )
    window.location.href = `mailto:${order.customer_email}?subject=${subject}&body=${body}`
  }

  const selectedProduct = products.find((p) => p.id === newProductId)
  useEffect(() => {
    if (selectedProduct) setNewProductPrice(selectedProduct.price_cents)
  }, [newProductId, selectedProduct])

  return (
    <>
      {saveMsg && (
        <div
          className={`mb-4 px-4 py-2 text-sm ${saveMsg.ok ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}
        >
          {saveMsg.text}
        </div>
      )}

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">{order.order_number}</h1>
          <p className="text-sm text-marron-claro mt-1">
            {new Date(order.created_at).toLocaleString('es-ES')} · ID: {order.id}
          </p>
        </div>
        <Link href="/administrator/orders" className="text-sm text-naranja font-semibold hover:underline">
          ← Volver a pedidos
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-6">
          {/* Items */}
          <section className="bg-blanco border border-linea p-6">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-linea">
              <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase">
                Productos ({items.length})
              </h2>
              <button
                type="button"
                onClick={() => setAddingProduct(!addingProduct)}
                className="text-xs font-bold uppercase text-naranja hover:underline"
              >
                + Añadir producto
              </button>
            </div>

            {addingProduct && (
              <div className="mb-4 p-4 bg-crudo border border-linea space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Producto</label>
                    <select value={newProductId} onChange={(e) => setNewProductId(e.target.value)} className={fieldClass}>
                      <option value="">Seleccionar...</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.sku}) — {(p.price_cents / 100).toFixed(2)} €
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Cantidad</label>
                    <input
                      type="number"
                      min="1"
                      value={newProductQty}
                      onChange={(e) => setNewProductQty(parseInt(e.target.value, 10) || 1)}
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Precio unit. (€)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={newProductPrice > 0 ? newProductPrice / 100 : (selectedProduct?.price_cents ?? 0) / 100}
                      onChange={(e) => setNewProductPrice(Math.round(parseFloat(e.target.value) * 100))}
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Notas</label>
                    <input
                      type="text"
                      value={newProductNotes}
                      onChange={(e) => setNewProductNotes(e.target.value)}
                      className={fieldClass}
                      placeholder="Opcional"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleAddItem}
                    disabled={!newProductId}
                    className="px-4 py-2 bg-verde text-blanco text-xs font-bold uppercase hover:opacity-90 disabled:opacity-50"
                  >
                    Añadir
                  </button>
                  <button type="button" onClick={() => setAddingProduct(false)} className="px-4 py-2 border border-linea text-xs font-bold uppercase hover:bg-crudo">
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-start py-2 border-b border-linea/50 group">
                  {editingItem === item.id ? (
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <input
                        type="number"
                        min="1"
                        defaultValue={item.quantity}
                        id={`qty-${item.id}`}
                        className={fieldClass}
                      />
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        defaultValue={(item.unit_price_cents / 100).toFixed(2)}
                        id={`price-${item.id}`}
                        className={fieldClass}
                      />
                      <input
                        type="text"
                        defaultValue={item.notes ?? ''}
                        id={`notes-${item.id}`}
                        className={`${fieldClass} sm:col-span-2`}
                        placeholder="Notas"
                      />
                    </div>
                  ) : (
                    <div>
                      <span className="font-bold text-sm">
                        {item.quantity}× {item.product_name}
                      </span>
                      <span className="block font-mono text-xs text-marron-claro">{item.product_sku}</span>
                      {item.notes && <span className="block text-xs text-terracota mt-1">📝 {item.notes}</span>}
                    </div>
                  )}
                  <div className="text-right shrink-0 ml-4 flex items-center gap-2">
                    {editingItem === item.id ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            const qty = parseInt((document.getElementById(`qty-${item.id}`) as HTMLInputElement)?.value || '1', 10)
                            const price = Math.round(parseFloat((document.getElementById(`price-${item.id}`) as HTMLInputElement)?.value || '0') * 100)
                            const notes = (document.getElementById(`notes-${item.id}`) as HTMLInputElement)?.value || ''
                            handleUpdateItem(item.id, qty, price, notes)
                          }}
                          className="text-xs font-bold text-verde hover:underline"
                        >
                          Guardar
                        </button>
                        <button type="button" onClick={() => setEditingItem(null)} className="text-xs text-marron-claro hover:underline">
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="font-bold text-sm">{(item.total_cents / 100).toFixed(2)} €</span>
                        <span className="block text-xs text-marron-claro">{(item.unit_price_cents / 100).toFixed(2)} €/ud</span>
                        <div className="flex gap-1 mt-1">
                          <button
                            type="button"
                            onClick={() => setEditingItem(item.id)}
                            className="text-xs text-naranja hover:underline"
                          >
                            Editar
                          </button>
                          <button type="button" onClick={() => handleDeleteItem(item.id)} className="text-xs text-red-600 hover:underline">
                            Borrar
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing */}
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
              <div className="flex justify-between">
                <span>Subtotal productos</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-verde">
                  <span>Descuento</span>
                  <span>-{discountAmount.toFixed(2)} €</span>
                </div>
              )}
              {shipping > 0 && (
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>{shippingAmount.toFixed(2)} €</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>IVA ({taxRate}%)</span>
                <span>{taxAmount.toFixed(2)} €</span>
              </div>
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
                <input
                  type="url"
                  value={paymentLink}
                  onChange={(e) => setPaymentLink(e.target.value)}
                  className={fieldClass}
                  placeholder="https://checkout.stripe.com/pay/..."
                />
              </div>
              <p className="text-xs text-marron-claro">
                Crear links desde el panel de Stripe o Redsys y pegarlos aquí. Guarda los cambios para asociar el link al pedido.
              </p>
              {paymentLink && (
                <a
                  href={paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-verde text-blanco text-xs font-bold uppercase hover:opacity-90"
                >
                  Abrir link de pago
                </a>
              )}
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
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={3}
                  className={`${fieldClass} resize-none`}
                  placeholder="Notas internas..."
                />
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
          <section className="bg-blanco border border-linea p-6">
            <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide mb-3">Estado del pedido</h3>
            <select value={status} onChange={(e) => setStatus(e.target.value as OrderStatus)} className={`${fieldClass} mb-3`}>
              {statusFlow.map((s) => (
                <option key={s} value={s}>
                  {statusLabels[s]}
                </option>
              ))}
              <option value="cancelled">Cancelado</option>
              <option value="refunded">Reembolsado</option>
            </select>
            <button
              onClick={handleSaveOrder}
              disabled={saving}
              className="w-full py-2.5 bg-naranja text-blanco font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide hover:bg-verde transition-colors disabled:opacity-50"
            >
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </section>

          <section className="bg-blanco border border-linea p-6">
            <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide text-naranja mb-3">Cliente</h3>
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
              <p className="text-marron-claro">
                {[order.customer_city, order.customer_country].filter(Boolean).join(', ')}
              </p>
              {order.customer_address && <p className="text-marron-claro text-xs">{order.customer_address}</p>}
            </div>
          </section>

          {order.customer_notes && (
            <section className="bg-yellow-50 border border-yellow-200 p-6">
              <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide text-yellow-700 mb-2">Notas del cliente</h3>
              <p className="text-sm text-yellow-800">{order.customer_notes}</p>
            </section>
          )}

          <section className="bg-blanco border border-linea p-6">
            <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide mb-3">Nº Factura (solo para factura definitiva)</h3>
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className={fieldClass}
              placeholder="Ej: FACT-2025-001"
            />
          </section>

          <section className="bg-blanco border border-linea p-6 space-y-2">
            <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide mb-3">Acciones rápidas</h3>
            <button
              type="button"
              onClick={handleSendEmail}
              className="w-full py-2 border border-linea text-xs font-bold uppercase hover:bg-crudo transition-colors"
            >
              📧 Enviar email al cliente
            </button>
            <button
              type="button"
              onClick={() => handleExportPdf('presupuesto')}
              className="w-full py-2 border border-linea text-xs font-bold uppercase hover:bg-crudo transition-colors"
            >
              📄 Generar presupuesto / Proforma
            </button>
            <button
              type="button"
              onClick={() => handleExportPdf('factura')}
              className="w-full py-2 border border-linea text-xs font-bold uppercase hover:bg-crudo transition-colors"
            >
              🧾 Generar factura
            </button>
            <button
              type="button"
              onClick={handleDeleteOrder}
              disabled={deletingOrder}
              className="w-full py-2 border border-linea text-xs font-bold uppercase hover:bg-crudo transition-colors disabled:opacity-50 text-marron-claro hover:text-red-600"
            >
              🗑️ Borrar pedido
            </button>
          </section>
        </div>
      </div>
    </>
  )
}
