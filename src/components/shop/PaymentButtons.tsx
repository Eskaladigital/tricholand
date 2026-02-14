'use client'

import { useState } from 'react'

interface PaymentButtonsProps {
  orderId: string
  orderNumber: string
  totalCents: number
}

function formatCents(cents: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(cents / 100)
}

export function PaymentButtons({ orderId, orderNumber, totalCents }: PaymentButtonsProps) {
  const [loading, setLoading] = useState<'stripe' | 'redsys' | null>(null)
  const [error, setError] = useState<string | null>(null)

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
        setError(data.error || 'Error iniciando el pago con Stripe')
        setLoading(null)
        return
      }
      // Redirigir a Stripe Checkout
      window.location.href = data.url
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.')
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
        setError(data.error || 'Error iniciando el pago con Redsys')
        setLoading(null)
        return
      }

      // Crear y enviar formulario POST a Redsys
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
      setError('Error de conexión. Inténtalo de nuevo.')
      setLoading(null)
    }
  }

  return (
    <div className="bg-blanco border border-linea p-6 mb-6">
      <h2 className="text-sm font-bold font-[family-name:var(--font-archivo-narrow)] uppercase tracking-wide mb-4">
        Realizar pago &mdash; {formatCents(totalCents)}
      </h2>
      <p className="text-sm text-marron-claro mb-4">
        Tu pedido <strong>{orderNumber}</strong> ha sido validado y está listo para el pago.
        Selecciona un método de pago:
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <div className="space-y-3">
        <button
          onClick={handleRedsys}
          disabled={loading !== null}
          className="w-full py-4 bg-naranja text-white text-sm font-bold uppercase tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === 'redsys' ? 'Redirigiendo al TPV...' : 'Pagar con tarjeta (TPV virtual)'}
        </button>

        <button
          onClick={handleStripe}
          disabled={loading !== null}
          className="w-full py-4 bg-negro text-crudo text-sm font-bold uppercase tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === 'stripe' ? 'Redirigiendo a Stripe...' : 'Pagar con Stripe'}
        </button>

        <p className="text-xs text-marron-claro text-center mt-2">
          Pago seguro. Serás redirigido a la pasarela de pago seleccionada.
        </p>
      </div>
    </div>
  )
}
