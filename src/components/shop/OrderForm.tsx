'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/shop/cart-context'
import { formatPrice } from '@/types/shop'

interface OrderFormProps {
  locale: string
}

interface CustomerData {
  name: string
  company: string
  email: string
  phone: string
  country: string
  city: string
  vat_id: string
  address: string
  notes: string
}

export function OrderForm({ locale }: OrderFormProps) {
  const { items, itemCount, totalCents, totalFormatted, removeItem, updateQuantity, updateNotes, clearCart } = useCart()
  const [step, setStep] = useState<'cart' | 'details' | 'confirm'>('cart')
  const [customer, setCustomer] = useState<CustomerData>({
    name: '', company: '', email: '', phone: '',
    country: '', city: '', vat_id: '', address: '', notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateCustomer = (partial: Partial<CustomerData>) => {
    setCustomer((prev) => ({ ...prev, ...partial }))
  }

  const canSubmit = customer.name && customer.email && customer.country

  async function handleSubmit() {
    if (!canSubmit) return
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            product_id: item.product.id,
            product_name: item.product.name,
            product_sku: item.product.sku,
            quantity: item.quantity,
            unit_price_cents: item.product.price_cents,
            notes: item.notes || null,
          })),
          customer_name: customer.name,
          customer_company: customer.company || null,
          customer_email: customer.email,
          customer_phone: customer.phone || null,
          customer_country: customer.country,
          customer_city: customer.city || null,
          customer_vat_id: customer.vat_id || null,
          customer_address: customer.address || null,
          customer_notes: customer.notes || null,
          locale,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Error al enviar el pedido')
      }

      setSubmitted(true)
      clearCart()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setIsSubmitting(false)
    }
  }

  // === SUCCESS ===
  if (submitted) {
    return (
      <div className="bg-verde text-blanco p-8 lg:p-12 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase mb-3">
          Solicitud enviada
        </h2>
        <p className="opacity-85 max-w-md mx-auto mb-6">
          Hemos recibido tu solicitud de pedido. Revisaremos los productos y te enviaremos el
          presupuesto final con link de pago a <strong>{customer.email}</strong> en menos de 24h laborables.
        </p>
        <Link
          href={`/${locale}/tienda`}
          className="inline-flex bg-blanco text-verde px-6 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-crudo transition-colors"
        >
          Volver a la tienda
        </Link>
      </div>
    )
  }

  // === EMPTY CART ===
  if (items.length === 0 && !submitted) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-marron-claro mb-4">Tu pedido está vacío</p>
        <Link
          href={`/${locale}/tienda`}
          className="inline-flex bg-naranja text-blanco px-6 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-marron transition-colors"
        >
          Ir a la tienda →
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
      {/* Main column */}
      <div>
        {/* STEP: Cart review */}
        {step === 'cart' && (
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold uppercase mb-4">
              Tu pedido ({itemCount} {itemCount === 1 ? 'producto' : 'productos'})
            </h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="bg-blanco border border-linea p-4 flex gap-4">
                  <Image
                    src={item.product.images[0]?.url || ''}
                    alt={item.product.name}
                    width={100}
                    height={80}
                    className="w-[100px] h-[80px] object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-[family-name:var(--font-archivo-narrow)] font-bold text-sm truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-marron-claro">{item.product.sku}</p>

                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 border border-linea text-sm hover:bg-crudo"
                        >
                          −
                        </button>
                        <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 border border-linea text-sm hover:bg-crudo"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs text-marron-claro">{item.product.unit_label}</span>
                      <span className="ml-auto font-[family-name:var(--font-archivo-narrow)] font-bold text-naranja">
                        {formatPrice(item.product.price_cents * item.quantity)}
                      </span>
                    </div>

                    <input
                      type="text"
                      placeholder="Notas para este producto (opcional)"
                      value={item.notes}
                      onChange={(e) => updateNotes(item.product.id, e.target.value)}
                      className="mt-2 w-full px-2 py-1 border border-linea/50 text-xs bg-crudo focus:outline-none focus:border-naranja"
                    />
                  </div>

                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-marron-claro hover:text-red-600 text-sm self-start"
                    title="Eliminar"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep('details')}
              className="w-full py-3 bg-negro text-crudo font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-marron transition-colors"
            >
              Continuar → Datos de empresa
            </button>
          </div>
        )}

        {/* STEP: Customer details */}
        {step === 'details' && (
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold uppercase mb-4">
              Datos de facturación
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">Nombre *</label>
                <input type="text" value={customer.name} onChange={(e) => updateCustomer({ name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja" placeholder="Nombre completo" />
              </div>
              <div>
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">Empresa</label>
                <input type="text" value={customer.company} onChange={(e) => updateCustomer({ company: e.target.value })}
                  className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja" placeholder="Nombre de empresa" />
              </div>
              <div>
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">Email *</label>
                <input type="email" value={customer.email} onChange={(e) => updateCustomer({ email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja" placeholder="email@empresa.com" />
              </div>
              <div>
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">Teléfono</label>
                <input type="tel" value={customer.phone} onChange={(e) => updateCustomer({ phone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja" placeholder="+34 600 000 000" />
              </div>
              <div>
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">NIF / VAT</label>
                <input type="text" value={customer.vat_id} onChange={(e) => updateCustomer({ vat_id: e.target.value })}
                  className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja" placeholder="B12345678 / NL123456789B01" />
              </div>
              <div>
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">País *</label>
                <input type="text" value={customer.country} onChange={(e) => updateCustomer({ country: e.target.value })}
                  className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja" placeholder="España" />
              </div>
              <div>
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">Ciudad</label>
                <input type="text" value={customer.city} onChange={(e) => updateCustomer({ city: e.target.value })}
                  className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja" placeholder="Ciudad" />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">Dirección de envío</label>
                <input type="text" value={customer.address} onChange={(e) => updateCustomer({ address: e.target.value })}
                  className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja" placeholder="Dirección completa" />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">Notas adicionales</label>
                <textarea value={customer.notes} onChange={(e) => updateCustomer({ notes: e.target.value })} rows={3}
                  className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja resize-none" placeholder="Instrucciones especiales, horarios de entrega..." />
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep('cart')}
                className="px-6 py-3 border border-linea font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-crudo transition-colors">
                ← Volver
              </button>
              <button onClick={() => canSubmit && setStep('confirm')} disabled={!canSubmit}
                className={`flex-1 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide transition-colors ${
                  canSubmit ? 'bg-negro text-crudo hover:bg-marron' : 'bg-linea text-marron-claro cursor-not-allowed'
                }`}>
                Revisar pedido →
              </button>
            </div>
          </div>
        )}

        {/* STEP: Confirm */}
        {step === 'confirm' && (
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold uppercase mb-4">
              Confirmar solicitud
            </h2>

            <div className="bg-crudo p-5 mb-6 space-y-3 text-sm">
              <h3 className="font-bold text-xs uppercase text-marron-claro">Productos</h3>
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between py-1 border-b border-linea/50">
                  <span>{item.quantity}× {item.product.name}</span>
                  <span className="font-bold">{formatPrice(item.product.price_cents * item.quantity)}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 font-bold text-base">
                <span>Subtotal estimado</span>
                <span className="text-naranja">{totalFormatted}</span>
              </div>
              <p className="text-xs text-marron-claro">
                * Precio final puede variar. El envío y descuentos se confirmarán en el presupuesto.
              </p>

              <h3 className="font-bold text-xs uppercase text-marron-claro pt-4">Datos</h3>
              <div className="space-y-1">
                <p><span className="text-marron-claro">Nombre:</span> {customer.name}</p>
                {customer.company && <p><span className="text-marron-claro">Empresa:</span> {customer.company}</p>}
                <p><span className="text-marron-claro">Email:</span> {customer.email}</p>
                <p><span className="text-marron-claro">País:</span> {customer.country}</p>
                {customer.vat_id && <p><span className="text-marron-claro">NIF/VAT:</span> {customer.vat_id}</p>}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-4 text-sm">{error}</div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setStep('details')}
                className="px-6 py-3 border border-linea font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-crudo transition-colors">
                ← Editar
              </button>
              <button onClick={handleSubmit} disabled={isSubmitting}
                className="flex-1 py-3 bg-naranja text-blanco font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors disabled:opacity-50">
                {isSubmitting ? 'Enviando...' : 'Enviar solicitud de pedido →'}
              </button>
            </div>

            <p className="text-xs text-marron-claro text-center mt-3">
              No se cobra nada ahora. Recibirás presupuesto final con link de pago por email.
            </p>
          </div>
        )}
      </div>

      {/* Sidebar: order summary (sticky) */}
      <aside className="hidden lg:block">
        <div className="bg-blanco border border-linea p-6 sticky top-8">
          <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide text-naranja mb-4">
            Resumen
          </h3>
          <div className="space-y-2 text-sm mb-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between">
                <span className="text-marron-claro truncate mr-2">{item.quantity}× {item.product.name}</span>
                <span className="font-semibold shrink-0">{formatPrice(item.product.price_cents * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="pt-3 border-t border-linea flex justify-between font-bold">
            <span>Subtotal</span>
            <span className="text-naranja text-lg">{totalFormatted}</span>
          </div>
          <p className="text-xs text-marron-claro mt-2">+ envío (se confirma en presupuesto)</p>
          <p className="text-xs text-marron-claro">+ IVA aplicable</p>
        </div>
      </aside>
    </div>
  )
}
