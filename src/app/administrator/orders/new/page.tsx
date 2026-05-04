'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createAdminOrder } from '@/lib/actions/orders'

const COUNTRIES = [
  'España',
  'Portugal',
  'Francia',
  'Alemania',
  'Italia',
  'Reino Unido',
  'Países Bajos',
  'Bélgica',
  'Suiza',
  'Austria',
  'Estados Unidos',
  'México',
  'Argentina',
  'Chile',
  'Colombia',
  'Perú',
  'Otro',
]

const LOCALES = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
  { value: 'it', label: 'Italiano' },
  { value: 'nl', label: 'Nederlands' },
  { value: 'pt', label: 'Português' },
]

export default function NewOrderPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('España')
  const [city, setCity] = useState('')
  const [vatId, setVatId] = useState('')
  const [address, setAddress] = useState('')
  const [customerNotes, setCustomerNotes] = useState('')
  const [adminNotes, setAdminNotes] = useState('')
  const [locale, setLocale] = useState('es')

  const fieldClass = 'w-full px-3 py-2 border border-linea text-sm focus:outline-none focus:border-naranja bg-blanco'
  const labelClass = 'block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSaving(true)

    const { error: err, id } = await createAdminOrder({
      customer_name: name,
      customer_company: company || null,
      customer_email: email,
      customer_phone: phone || null,
      customer_country: country,
      customer_city: city || null,
      customer_vat_id: vatId || null,
      customer_address: address || null,
      customer_notes: customerNotes || null,
      admin_notes: adminNotes || null,
      locale,
    })

    setSaving(false)
    if (err || !id) {
      setError(err ?? 'Error al crear el pedido')
      return
    }
    router.push(`/administrator/orders/${id}`)
  }

  return (
    <>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Nuevo pedido
          </h1>
          <p className="text-sm text-marron-claro mt-1">
            Crea un pedido manualmente para un cliente. Después podrás añadirle productos y enviarle el link de pago.
          </p>
        </div>
        <Link
          href="/administrator/orders"
          className="text-sm text-naranja font-semibold hover:underline"
        >
          ← Volver a pedidos
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-6">
          <section className="bg-blanco border border-linea p-6">
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-4 pb-2 border-b border-linea">
              Datos del cliente
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Nombre completo *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={fieldClass}
                  placeholder="Juan Pérez"
                />
              </div>
              <div>
                <label className={labelClass}>Empresa</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={fieldClass}
                  placeholder="Opcional"
                />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={fieldClass}
                  placeholder="cliente@ejemplo.com"
                />
              </div>
              <div>
                <label className={labelClass}>Teléfono</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={fieldClass}
                  placeholder="+34 600 000 000"
                />
              </div>
              <div>
                <label className={labelClass}>País *</label>
                <select
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={fieldClass}
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Ciudad</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={fieldClass}
                />
              </div>
              <div>
                <label className={labelClass}>NIF / VAT</label>
                <input
                  type="text"
                  value={vatId}
                  onChange={(e) => setVatId(e.target.value)}
                  className={fieldClass}
                  placeholder="ESB12345678"
                />
              </div>
              <div>
                <label className={labelClass}>Idioma del cliente</label>
                <select
                  value={locale}
                  onChange={(e) => setLocale(e.target.value)}
                  className={fieldClass}
                >
                  {LOCALES.map((l) => (
                    <option key={l.value} value={l.value}>{l.label}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Dirección</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={fieldClass}
                  placeholder="Calle, número, CP…"
                />
              </div>
            </div>
          </section>

          <section className="bg-blanco border border-linea p-6">
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-4 pb-2 border-b border-linea">
              Notas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Notas del cliente (visible)</label>
                <textarea
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  rows={3}
                  className={`${fieldClass} resize-none`}
                  placeholder="Mensaje del cliente, peticiones especiales…"
                />
              </div>
              <div>
                <label className={labelClass}>Notas internas (no visibles)</label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={3}
                  className={`${fieldClass} resize-none`}
                  placeholder="Contexto del contacto, origen del pedido…"
                />
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-blanco border border-linea p-6">
            <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide mb-3">
              Crear pedido
            </h3>
            <p className="text-xs text-marron-claro mb-4">
              Se creará un pedido vacío en estado <strong>Revisando</strong>. En la siguiente pantalla podrás añadir productos (cualquier cantidad, sin mínimos), ajustar descuento, envío e IVA, y enviarle el link de pago al cliente.
            </p>
            <button
              type="submit"
              disabled={saving}
              className="w-full py-2.5 bg-naranja text-blanco font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide hover:bg-verde transition-colors disabled:opacity-50"
            >
              {saving ? 'Creando…' : 'Crear y añadir productos'}
            </button>
            {error && (
              <div className="mt-3 px-3 py-2 text-xs bg-red-50 border border-red-200 text-red-800">
                {error}
              </div>
            )}
          </section>

          <section className="bg-crudo border border-linea p-4 text-xs text-marron-claro space-y-2">
            <p><strong className="text-negro">Siguiente paso:</strong> añadir productos.</p>
            <p>Podrás elegir cualquier producto del catálogo (incluidos borradores o sin stock) y cualquier cantidad, sin respetar mínimos ni incrementos de lote.</p>
            <p>Luego, al pulsar <strong>Validar pedido</strong>, se genera una proforma PDF y se envía al cliente por email con el link para pagar online.</p>
          </section>
        </div>
      </form>
    </>
  )
}
