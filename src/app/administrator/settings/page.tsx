'use client'

import { useState, useEffect } from 'react'
import { getSettings, updateSettings } from '@/lib/actions/settings'

export default function SettingsPage() {
  const [companyName, setCompanyName] = useState('')
  const [companyEmail, setCompanyEmail] = useState('')
  const [companyPhone, setCompanyPhone] = useState('')
  const [minOrderUnits, setMinOrderUnits] = useState(100)
  const [defaultTaxRate, setDefaultTaxRate] = useState(21)
  const [notifyEmail, setNotifyEmail] = useState('')
  const [autoReply, setAutoReply] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSettings().then((s) => {
      setCompanyName(s.company_name ?? 'Tricholand')
      setCompanyEmail(s.company_email ?? 'info@tricholand.com')
      setCompanyPhone(s.company_phone ?? '+34 968 000 000')
      setMinOrderUnits(s.min_order_units ?? 750)
      setDefaultTaxRate(s.default_tax_rate ?? 21)
      setNotifyEmail(s.notify_email ?? 'info@tricholand.com')
      setAutoReply(s.auto_reply ?? true)
      setLoading(false)
    })
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSaved(false)
    const { error: saveError } = await updateSettings({
      company_name: companyName,
      company_email: companyEmail,
      company_phone: companyPhone,
      min_order_units: minOrderUnits,
      default_tax_rate: defaultTaxRate,
      notify_email: notifyEmail,
      auto_reply: autoReply,
    })
    setSaving(false)
    if (saveError) {
      setError(saveError)
      return
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const fieldClass = 'w-full px-4 py-2.5 border border-linea text-sm focus:outline-none focus:border-naranja transition-colors bg-blanco'
  const labelClass = 'block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1'

  if (loading) {
    return <div className="py-8 text-marron-claro">Cargando...</div>
  }

  return (
    <>
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Ajustes
          </h1>
          <p className="text-sm text-marron-claro mt-1">
            Datos de la empresa y avisos. Las claves de pago no se escriben aquí.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
          <section className="bg-blanco border border-linea p-6">
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-1">
              Datos de empresa
            </h2>
            <p className="text-xs text-marron-claro mb-4">Nombre, correo y teléfono que identifican a Tricholand.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Nombre empresa</label>
                <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className={fieldClass} />
              </div>
              <div>
                <label className={labelClass}>Email principal</label>
                <input type="email" value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} className={fieldClass} />
              </div>
              <div>
                <label className={labelClass}>Teléfono</label>
                <input type="tel" value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)} className={fieldClass} />
              </div>
            </div>
          </section>

          <section className="bg-blanco border border-linea p-6">
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-1">
              Tienda
            </h2>
            <p className="text-xs text-marron-claro mb-4">
              El pedido mínimo de cada producto se fija en su ficha. El IVA de un pedido ya creado se calcula en esa ficha, no se cambia desde aquí al guardarlo.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Pedido mínimo (unidades)</label>
                <input type="number" min="1" value={minOrderUnits} onChange={(e) => setMinOrderUnits(parseInt(e.target.value) || 1)} className={fieldClass} />
              </div>
              <div>
                <label className={labelClass}>IVA por defecto (%)</label>
                <input type="number" min="0" max="100" value={defaultTaxRate} onChange={(e) => setDefaultTaxRate(parseFloat(e.target.value) || 0)} className={fieldClass} />
              </div>
            </div>
          </section>

          <section className="bg-blanco border border-linea p-6">
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-1">
              Avisos
            </h2>
            <p className="text-xs text-marron-claro mb-4">
              Correo que recibe los pedidos nuevos. La respuesta automática es el acuse que sale hacia quien escribe.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Email notificaciones pedidos</label>
                <input type="email" value={notifyEmail} onChange={(e) => setNotifyEmail(e.target.value)} className={fieldClass} />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer py-2.5">
                  <input type="checkbox" checked={autoReply} onChange={(e) => setAutoReply(e.target.checked)} className="w-4 h-4 accent-naranja" />
                  <span className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase">
                    Respuesta automática al cliente
                  </span>
                </label>
              </div>
            </div>
          </section>

          <section className="bg-blanco border border-linea p-6">
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-1">
              Pagos
            </h2>
            <p className="text-sm text-marron-claro">
              Stripe y Redsys se configuran en el servidor, no en este formulario. Desde aquí no se pegan claves.
            </p>
          </section>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-naranja text-blanco font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors disabled:opacity-50"
            >
              {saving ? 'Guardando...' : 'Guardar configuración'}
            </button>
            {saved && (
              <span className="text-verde font-bold text-sm">Guardado</span>
            )}
            {error && (
              <span className="text-sm text-red-700" role="alert">{error}</span>
            )}
          </div>
        </form>
    </>
  )
}
