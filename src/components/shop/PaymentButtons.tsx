'use client'

import { useState } from 'react'
import { getDictionary } from '@/lib/i18n'

interface PaymentButtonsProps {
  orderId: string
  orderNumber: string
  totalCents: number
  locale: string
}

export function PaymentButtons({ orderId, orderNumber, totalCents, locale }: PaymentButtonsProps) {
  const t = getDictionary(locale).paymentButtons
  const [loading, setLoading] = useState<'stripe' | 'redsys' | 'transfer' | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [transferSent, setTransferSent] = useState(false)

  const intlLocale = { es: 'es-ES', en: 'en-GB', fr: 'fr-FR', de: 'de-DE', it: 'it-IT', nl: 'nl-NL', pt: 'pt-PT' }[locale] || 'es-ES'
  const formatCents = (cents: number) =>
    new Intl.NumberFormat(intlLocale, { style: 'currency', currency: 'EUR' }).format(cents / 100)

  const handleStripe = async () => {
    setLoading('stripe')
    setError(null)
    try {
      const res = await fetch('/api/payments/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId }),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        setError(data.error || t.errorStripe)
        setLoading(null)
        return
      }
      window.location.href = data.url
    } catch {
      setError(t.errorConnection)
      setLoading(null)
    }
  }

  const handleRedsys = async () => {
    setLoading('redsys')
    setError(null)
    try {
      const res = await fetch('/api/payments/redsys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId }),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        setError(data.error || t.errorRedsys)
        setLoading(null)
        return
      }

      const form = document.createElement('form')
      form.method = 'POST'
      form.action = data.url
      form.style.display = 'none'

      const addField = (name: string, value: string) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = name
        input.value = value
        form.appendChild(input)
      }

      addField('Ds_SignatureVersion', data.Ds_SignatureVersion)
      addField('Ds_MerchantParameters', data.Ds_MerchantParameters)
      addField('Ds_Signature', data.Ds_Signature)

      document.body.appendChild(form)
      form.submit()
    } catch {
      setError(t.errorConnection)
      setLoading(null)
    }
  }

  const handleTransfer = async () => {
    setLoading('transfer')
    setError(null)
    try {
      const res = await fetch('/api/payments/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId }),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        setError(data.error || t.errorTransfer)
        setLoading(null)
        return
      }
      setTransferSent(true)
      setLoading(null)
    } catch {
      setError(t.errorConnection)
      setLoading(null)
    }
  }

  return (
    <div className="bg-blanco border border-linea p-6 mb-6">
      <h2 className="text-sm font-bold font-[family-name:var(--font-archivo-narrow)] uppercase tracking-wide mb-4">
        {t.title} &mdash; {formatCents(totalCents)}
      </h2>
      <p
        className="text-sm text-marron-claro mb-4"
        dangerouslySetInnerHTML={{ __html: t.orderValidated.replace('{orderNumber}', orderNumber) }}
      />

      {transferSent && (
        <div className="bg-green-50 border border-green-200 text-green-800 text-sm px-4 py-3 mb-4">
          {t.transferSent}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <div className="space-y-3">
        <button
          onClick={handleTransfer}
          disabled={loading !== null || transferSent}
          className="w-full py-4 bg-verde text-white text-sm font-bold uppercase tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === 'transfer' ? t.transferSending : transferSent ? t.transferDone : t.transferBtn}
        </button>

        <button
          onClick={handleRedsys}
          disabled={loading !== null}
          className="w-full py-4 bg-naranja text-white text-sm font-bold uppercase tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === 'redsys' ? t.redsysRedirecting : t.redsysBtn}
        </button>

        <button
          onClick={handleStripe}
          disabled={loading !== null}
          className="w-full py-4 bg-negro text-crudo text-sm font-bold uppercase tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === 'stripe' ? t.stripeRedirecting : t.stripeBtn}
        </button>

        <p className="text-xs text-marron-claro text-center mt-2">
          {t.methodsNote}
        </p>
      </div>
    </div>
  )
}
