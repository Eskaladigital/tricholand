'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/shop/cart-context'
import { formatPrice } from '@/types/shop'
import { getFullPath } from '@/lib/i18n/paths'
import { getDictionary } from '@/lib/i18n'

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
  const { items, itemCount, totalCents, totalFormatted, totalUnits, removeItem, updateQuantity, updateNotes, clearCart } = useCart()
  const dict = getDictionary(locale)
  const t = dict.orderForm
  const shopT = dict.shop

  // Estimación IVA 21% para transparencia B2B
  const IVA_RATE = 21
  const estimatedTaxCents = Math.round(totalCents * (IVA_RATE / 100))
  const estimatedTotalWithTax = totalCents + estimatedTaxCents
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
            unit_price_cents: Math.round(item.product.price_cents / item.product.units_per_lot),
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

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.error || t.errorSubmit)
      }

      setSubmitted(true)
      clearCart()
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errorUnknown)
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
          {t.requestSent}
        </h2>
        <p className="opacity-85 max-w-md mx-auto mb-6">
          {t.requestSentMessage} <strong>{customer.email}</strong>.
        </p>
        <Link
          href={getFullPath(locale, 'shop')}
          className="inline-flex bg-blanco text-verde px-6 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-crudo transition-colors"
        >
          {t.backToShop}
        </Link>
      </div>
    )
  }

  // === EMPTY CART ===
  if (items.length === 0 && !submitted) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-marron-claro mb-4">{t.emptyOrder}</p>
        <Link
          href={getFullPath(locale, 'shop')}
          className="inline-flex bg-naranja text-blanco px-6 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-marron transition-colors"
        >
          {t.goToShop}
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
              {t.yourOrder} ({itemCount} {itemCount === 1 ? t.product : t.products})
            </h2>
            <div className="bg-verde-claro text-verde px-4 py-2 mb-2 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold">
              Total: {totalUnits} {shopT.totalPlants}
            </div>
            <p className="text-xs text-marron-claro mb-4">⏱️ {shopT.preparationTime}</p>

            <div className="space-y-4 mb-6">
              {items.map((item) => {
                // Calcular desglose de lotes
                const fullLots = Math.floor(item.quantity / item.product.min_order_qty)
                const additionalUnits = item.quantity % item.product.min_order_qty
                
                return (
                  <div key={item.product.id} className="bg-blanco border border-linea p-4 flex gap-4">
                    <Image
                      src={item.product.images[0]?.url || ''}
                      alt={item.product.name}
                      width={100}
                      height={80}
                      className="w-[100px] h-[80px] object-cover shrink-0"
                      unoptimized
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-[family-name:var(--font-archivo-narrow)] font-bold text-sm truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-marron-claro">{item.product.sku}</p>
                      <p className="text-xs text-azul mt-1">
                        Precio por unidad: {formatPrice(item.product.price_cents / item.product.units_per_lot)}
                      </p>

                      {/* Desglose de lotes */}
                      <div className="mt-2 space-y-1">
                        {fullLots > 0 && (
                          <p className="text-xs text-verde-oscuro font-medium">
                            ├─ {fullLots}× Lote completo ({item.product.min_order_qty} uds) = {fullLots * item.product.min_order_qty} plantas
                          </p>
                        )}
                        {additionalUnits > 0 && (
                          <p className="text-xs text-verde-oscuro font-medium">
                            └─ {additionalUnits} uds adicionales
                          </p>
                        )}
                        <p className="text-xs text-verde font-bold">
                          TOTAL: {item.quantity} plantas
                        </p>
                      </div>

                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, Math.max(item.product.min_order_qty, item.quantity - item.product.qty_step))}
                            className="w-7 h-7 border border-linea text-sm hover:bg-crudo"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || item.product.min_order_qty
                              if (val >= item.product.min_order_qty) {
                                updateQuantity(item.product.id, val)
                              }
                            }}
                            min={item.product.min_order_qty}
                            step={item.product.qty_step}
                            className="w-16 text-center font-bold text-sm border border-linea px-1 py-1 focus:outline-none focus:border-naranja"
                          />
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + item.product.qty_step)}
                            className="w-7 h-7 border border-linea text-sm hover:bg-crudo"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-xs text-marron-claro">uds</span>
                        <span className="ml-auto font-[family-name:var(--font-archivo-narrow)] font-bold text-naranja" title={t.pricesExclVat}>
                          {formatPrice((item.product.price_cents / item.product.units_per_lot) * item.quantity)}
                        </span>
                      </div>

                      <input
                        type="text"
                        placeholder={t.notesPlaceholder}
                        value={item.notes}
                        onChange={(e) => updateNotes(item.product.id, e.target.value)}
                        className="mt-2 w-full px-2 py-1 border border-linea/50 text-xs bg-crudo focus:outline-none focus:border-naranja"
                      />
                    </div>

                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-marron-claro hover:text-red-600 text-sm self-start"
                      title={t.remove}
                    >
                      ✕
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Resumen rápido con IVA (visible en móvil donde no hay sidebar) */}
            <div className="lg:hidden bg-crudo border border-linea p-4 mb-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>{t.taxBase}</span>
                <span className="font-semibold">{totalFormatted}</span>
              </div>
              <div className="flex justify-between text-marron-claro">
                <span>{t.estimatedVat} ({IVA_RATE}%)</span>
                <span>{formatPrice(estimatedTaxCents)}</span>
              </div>
              <div className="flex justify-between items-center font-bold border-t border-linea pt-3 mt-2">
                <span className="text-base">{t.estimatedTotalWithVat}</span>
                <span className="text-naranja text-2xl font-[family-name:var(--font-archivo-narrow)]">{formatPrice(estimatedTotalWithTax)}</span>
              </div>
              <p className="text-xs text-marron-claro pt-1">{t.mobileSummaryNote}</p>
              <p className="text-xs text-verde-oscuro italic pt-0.5">{t.vatExemptionNote}</p>
            </div>

            <button
              onClick={() => setStep('details')}
              className="w-full py-3 bg-negro text-crudo font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-marron transition-colors"
            >
              {t.continueToDetails}
            </button>
          </div>
        )}

        {/* STEP: Customer details */}
        {step === 'details' && (
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold uppercase mb-4">
              {t.billingDetails}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">{t.labelName}</label>
                <input type="text" value={customer.name} onChange={(e) => updateCustomer({ name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja" placeholder={t.placeholderName} />
              </div>
              <div>
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">{t.labelCompany}</label>
                <input type="text" value={customer.company} onChange={(e) => updateCustomer({ company: e.target.value })}
                  className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja" placeholder={t.placeholderCompany} />
              </div>
              <div>
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">{t.labelEmail}</label>
                <input type="email" value={customer.email} onChange={(e) => updateCustomer({ email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja" placeholder={t.placeholderEmail} />
              </div>
              <div>
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">{t.labelPhone}</label>
                <input type="tel" value={customer.phone} onChange={(e) => updateCustomer({ phone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja" placeholder={t.placeholderPhone} />
              </div>
              <div>
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">{t.labelVatId}</label>
                <input type="text" value={customer.vat_id} onChange={(e) => updateCustomer({ vat_id: e.target.value })}
                  className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja" placeholder={t.placeholderVatId} />
              </div>
              <div>
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">{t.labelCountry}</label>
                <select value={customer.country} onChange={(e) => updateCustomer({ country: e.target.value })}
                  className={`w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja ${!customer.country ? 'text-marron-claro' : ''}`}>
                  <option value="">{t.selectCountry}</option>
                  {t.countries.map((c) => (
                    <option key={c.code} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">{t.labelCity}</label>
                <input type="text" value={customer.city} onChange={(e) => updateCustomer({ city: e.target.value })}
                  className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja" placeholder={t.placeholderCity} />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">{t.labelAddress}</label>
                <input type="text" value={customer.address} onChange={(e) => updateCustomer({ address: e.target.value })}
                  className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja" placeholder={t.placeholderAddress} />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">{t.labelNotes}</label>
                <textarea value={customer.notes} onChange={(e) => updateCustomer({ notes: e.target.value })} rows={3}
                  className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja resize-none" placeholder={t.placeholderNotes} />
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep('cart')}
                className="px-6 py-3 border border-linea font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-crudo transition-colors">
                {t.back}
              </button>
              <button onClick={() => canSubmit && setStep('confirm')} disabled={!canSubmit}
                className={`flex-1 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide transition-colors ${
                  canSubmit ? 'bg-negro text-crudo hover:bg-marron' : 'bg-linea text-marron-claro cursor-not-allowed'
                }`}>
                {t.reviewOrder}
              </button>
            </div>
          </div>
        )}

        {/* STEP: Confirm */}
        {step === 'confirm' && (
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold uppercase mb-4">
              {t.confirmRequest}
            </h2>

            <div className="bg-crudo p-5 mb-6 space-y-3 text-sm">
              <h3 className="font-bold text-xs uppercase text-marron-claro">{t.productsLabel}</h3>
              {items.map((item) => {
                const fullLots = Math.floor(item.quantity / item.product.min_order_qty)
                const additionalUnits = item.quantity % item.product.min_order_qty
                
                return (
                  <div key={item.product.id} className="py-2 border-b border-linea/50">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{item.product.name}</span>
                      <span className="font-bold">{formatPrice((item.product.price_cents / item.product.units_per_lot) * item.quantity)}</span>
                    </div>
                    <p className="text-xs text-azul-claro ml-2">
                      {formatPrice(item.product.price_cents / item.product.units_per_lot)}/ud
                    </p>
                    <div className="text-xs text-verde-oscuro space-y-0.5 ml-2">
                      {fullLots > 0 && (
                        <p>├─ {fullLots}× Lote completo ({item.product.min_order_qty} uds) = {fullLots * item.product.min_order_qty} plantas</p>
                      )}
                      {additionalUnits > 0 && (
                        <p>└─ {additionalUnits} uds adicionales</p>
                      )}
                      <p className="font-bold text-verde pt-0.5">TOTAL: {item.quantity} plantas</p>
                    </div>
                  </div>
                )
              })}
              <div className="pt-2 bg-verde-claro text-verde px-3 py-2 font-bold text-center">
                TOTAL: {totalUnits} {shopT.totalPlants}
              </div>
              <div className="pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{t.taxBase}</span>
                  <span className="font-semibold">{totalFormatted}</span>
                </div>
                <div className="flex justify-between text-sm text-marron-claro">
                  <span>{t.estimatedVat} ({IVA_RATE}%)</span>
                  <span>{formatPrice(estimatedTaxCents)}</span>
                </div>
                <div className="flex justify-between items-center pt-3 font-bold border-t border-linea/50 mt-2">
                  <span className="text-base">{t.estimatedTotalWithVat}</span>
                  <span className="text-naranja text-2xl font-[family-name:var(--font-archivo-narrow)]">{formatPrice(estimatedTotalWithTax)}</span>
                </div>
              </div>
              <p className="text-xs text-marron-claro mt-2">
                {t.allPricesExclVat}
              </p>
              <p className="text-xs text-verde-oscuro italic">
                {t.vatExemptionNote}
              </p>

              <h3 className="font-bold text-xs uppercase text-marron-claro pt-4">{t.dataLabel}</h3>
              <div className="space-y-1">
                <p><span className="text-marron-claro">{t.nameLabel}</span> {customer.name}</p>
                {customer.company && <p><span className="text-marron-claro">{t.companyLabel}</span> {customer.company}</p>}
                <p><span className="text-marron-claro">{t.emailLabel}</span> {customer.email}</p>
                <p><span className="text-marron-claro">{t.countryLabel}</span> {customer.country}</p>
                {customer.vat_id && <p><span className="text-marron-claro">{t.vatIdLabel}</span> {customer.vat_id}</p>}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-4 text-sm">{error}</div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setStep('details')}
                className="px-6 py-3 border border-linea font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-crudo transition-colors">
                {t.edit}
              </button>
              <button onClick={handleSubmit} disabled={isSubmitting}
                className="flex-1 py-3 bg-naranja text-blanco font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors disabled:opacity-50">
                {isSubmitting ? t.submitting : t.submitOrder}
              </button>
            </div>

            <p className="text-xs text-marron-claro text-center mt-3">
              {t.noChargeNow}
            </p>
          </div>
        )}
      </div>

      {/* Sidebar: order summary (sticky) */}
      <aside className="hidden lg:block">
        <div className="bg-blanco border border-linea p-6 sticky top-8">
          <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide text-naranja mb-4">
            {t.yourOrder}
          </h3>
          <div className="space-y-2 text-sm mb-4">
            {items.map((item) => {
              const fullLots = Math.floor(item.quantity / item.product.min_order_qty)
              const additionalUnits = item.quantity % item.product.min_order_qty
              
              return (
                <div key={item.product.id} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-marron-claro truncate mr-2 font-medium">{item.product.name}</span>
                    <span className="font-semibold shrink-0">{formatPrice((item.product.price_cents / item.product.units_per_lot) * item.quantity)}</span>
                  </div>
                  <p className="text-xs text-azul-claro ml-2">
                    {formatPrice(item.product.price_cents / item.product.units_per_lot)}/ud
                  </p>
                  <div className="text-xs text-verde-oscuro ml-2 space-y-0.5">
                    {fullLots > 0 && <p>├─ {fullLots}× {item.product.min_order_qty} uds</p>}
                    {additionalUnits > 0 && <p>└─ +{additionalUnits} uds</p>}
                    <p className="font-bold text-verde">= {item.quantity} plantas</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="bg-verde-claro text-verde px-3 py-2 text-sm font-bold text-center mb-4">
            {totalUnits} {shopT.totalPlants}
          </div>
          <div className="pt-3 border-t border-linea space-y-2">
            <div className="flex justify-between text-sm">
              <span>{t.taxBase}</span>
              <span className="font-semibold">{totalFormatted}</span>
            </div>
            <div className="flex justify-between text-sm text-marron-claro">
              <span>{t.estimatedVat} ({IVA_RATE}%)</span>
              <span>{formatPrice(estimatedTaxCents)}</span>
            </div>
            <div className="flex justify-between items-center font-bold border-t border-linea pt-3 mt-2">
              <span className="text-sm">{t.estimatedTotalWithVat}</span>
              <span className="text-naranja text-2xl font-[family-name:var(--font-archivo-narrow)]">{formatPrice(estimatedTotalWithTax)}</span>
            </div>
          </div>
          <p className="text-xs text-marron-claro mt-3">{t.pricesExclVat} · {t.shippingConfirmedInQuote}</p>
          <p className="text-xs text-verde-oscuro italic mt-1">{t.vatExemptionNote}</p>
          <p className="text-xs text-marron-claro mt-2">⏱️ {shopT.preparationTime}</p>
        </div>
      </aside>
    </div>
  )
}
