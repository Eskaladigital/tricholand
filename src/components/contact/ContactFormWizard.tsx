'use client'

import { useState } from 'react'
import type { ContactType, ProfessionalSubtype, InquiryType, ReferralSource } from '@/types/contact'

interface ContactFormWizardProps {
  locale: string
}

type Step = 1 | 2 | 3 | 4

interface FormState {
  contact_type: ContactType | null
  professional_subtype: ProfessionalSubtype | null
  inquiry_type: InquiryType | null
  name: string
  company: string
  email: string
  phone: string
  country: string
  city: string
  message: string
  referral_source: ReferralSource | null
  gdpr_consent: boolean
}

const initialState: FormState = {
  contact_type: null,
  professional_subtype: null,
  inquiry_type: null,
  name: '',
  company: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  message: '',
  referral_source: null,
  gdpr_consent: false,
}

export function ContactFormWizard({ locale }: ContactFormWizardProps) {
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState<FormState>(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = (partial: Partial<FormState>) => {
    setForm((prev) => ({ ...prev, ...partial }))
  }

  const canAdvanceStep2 = form.contact_type !== null && (
    form.contact_type === 'particular' || form.professional_subtype !== null
  )

  const canAdvanceStep3 = form.inquiry_type !== null

  const canSubmit =
    form.name.trim() !== '' &&
    form.email.trim() !== '' &&
    form.country.trim() !== '' &&
    form.message.trim() !== '' &&
    form.gdpr_consent

  async function handleSubmit() {
    if (!canSubmit) return
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact_type: form.contact_type,
          professional_subtype: form.professional_subtype,
          inquiry_type: form.inquiry_type,
          name: form.name,
          company: form.company || undefined,
          email: form.email,
          phone: form.phone || undefined,
          country: form.country,
          city: form.city || undefined,
          message: form.message,
          referral_source: form.referral_source || undefined,
          locale,
          gdpr_consent: form.gdpr_consent,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Error al enviar el formulario')
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setIsSubmitting(false)
    }
  }

  // === SUCCESS STATE ===
  if (submitted) {
    return (
      <div className="bg-verde text-blanco p-8 lg:p-12 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase mb-3">
          Mensaje enviado
        </h2>
        <p className="opacity-85 max-w-md mx-auto">
          Hemos recibido tu consulta. Te responderemos en menos de 24 horas laborables a{' '}
          <strong>{form.email}</strong>.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-blanco border border-linea">
      {/* Progress bar */}
      <div className="flex border-b border-linea">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`flex-1 py-3 text-center font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide transition-colors ${
              s === step
                ? 'bg-naranja text-blanco'
                : s < step
                  ? 'bg-verde text-blanco'
                  : 'bg-crudo text-marron-claro'
            }`}
          >
            {s === 1 && '1. Perfil'}
            {s === 2 && '2. Consulta'}
            {s === 3 && '3. Datos'}
            {s === 4 && '4. Confirmar'}
          </div>
        ))}
      </div>

      <div className="p-6 lg:p-8">
        {/* === STEP 1: Contact type === */}
        {step === 1 && (
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold uppercase mb-6">
              ¿Quién eres?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => update({ contact_type: 'particular', professional_subtype: null })}
                className={`p-5 border-2 text-left transition-all ${
                  form.contact_type === 'particular'
                    ? 'border-naranja bg-naranja/5'
                    : 'border-linea hover:border-marron-claro'
                }`}
              >
                <span className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold block">
                  🌵 Particular / Hobbyist
                </span>
                <span className="text-sm text-marron-claro mt-1 block">
                  Coleccionista, aficionado o compra personal
                </span>
              </button>

              <button
                onClick={() => update({ contact_type: 'professional' })}
                className={`p-5 border-2 text-left transition-all ${
                  form.contact_type === 'professional'
                    ? 'border-naranja bg-naranja/5'
                    : 'border-linea hover:border-marron-claro'
                }`}
              >
                <span className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold block">
                  🏢 Profesional / Empresa
                </span>
                <span className="text-sm text-marron-claro mt-1 block">
                  Vivero, distribuidor, paisajista u otro profesional
                </span>
              </button>
            </div>

            {/* Professional subtypes */}
            {form.contact_type === 'professional' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {([
                  { value: 'nursery', label: 'Vivero / Garden Center' },
                  { value: 'distributor', label: 'Distribuidor / Mayorista' },
                  { value: 'landscaper', label: 'Paisajista / Arquitecto' },
                  { value: 'other_pro', label: 'Otro profesional' },
                ] as { value: ProfessionalSubtype; label: string }[]).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => update({ professional_subtype: opt.value })}
                    className={`p-3 border text-sm text-center transition-all ${
                      form.professional_subtype === opt.value
                        ? 'border-naranja bg-naranja/5 font-semibold'
                        : 'border-linea hover:border-marron-claro'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => canAdvanceStep2 && setStep(2)}
              disabled={!canAdvanceStep2}
              className={`w-full py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide transition-colors ${
                canAdvanceStep2
                  ? 'bg-negro text-crudo hover:bg-marron'
                  : 'bg-linea text-marron-claro cursor-not-allowed'
              }`}
            >
              Siguiente →
            </button>
          </div>
        )}

        {/* === STEP 2: Inquiry type === */}
        {step === 2 && (
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold uppercase mb-6">
              ¿Qué necesitas?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {(form.contact_type === 'particular'
                ? [
                    { value: 'purchase' as InquiryType, label: 'Comprar cactus', desc: 'Información de compra o pedido' },
                    { value: 'care_consultation' as InquiryType, label: 'Consulta de cuidados', desc: 'Dudas sobre cultivo o mantenimiento' },
                    { value: 'other_particular' as InquiryType, label: 'Otra consulta', desc: 'Pregunta general' },
                  ]
                : [
                    { value: 'quote_catalog' as InquiryType, label: 'Presupuesto / Catálogo', desc: 'Solicitar precios y disponibilidad' },
                    { value: 'recurring_order' as InquiryType, label: 'Pedido recurrente', desc: 'Acuerdo de suministro periódico' },
                    { value: 'shipping_info' as InquiryType, label: 'Información de envío', desc: 'Logística, plazos o documentación' },
                    { value: 'certifications' as InquiryType, label: 'Certificaciones', desc: 'Pasaporte fito, docs exportación' },
                    { value: 'other_professional' as InquiryType, label: 'Otra consulta', desc: 'Pregunta general profesional' },
                  ]
              ).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => update({ inquiry_type: opt.value })}
                  className={`p-4 border text-left transition-all ${
                    form.inquiry_type === opt.value
                      ? 'border-naranja bg-naranja/5'
                      : 'border-linea hover:border-marron-claro'
                  }`}
                >
                  <span className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold block">
                    {opt.label}
                  </span>
                  <span className="text-xs text-marron-claro">{opt.desc}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 border border-linea font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-crudo transition-colors"
              >
                ← Volver
              </button>
              <button
                onClick={() => canAdvanceStep3 && setStep(3)}
                disabled={!canAdvanceStep3}
                className={`flex-1 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide transition-colors ${
                  canAdvanceStep3
                    ? 'bg-negro text-crudo hover:bg-marron'
                    : 'bg-linea text-marron-claro cursor-not-allowed'
                }`}
              >
                Siguiente →
              </button>
            </div>
          </div>
        )}

        {/* === STEP 3: Contact details === */}
        {step === 3 && (
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold uppercase mb-6">
              Tus datos
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">
                  Nombre *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update({ name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja transition-colors"
                  placeholder="Tu nombre completo"
                />
              </div>

              {form.contact_type === 'professional' && (
                <div>
                  <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">
                    Empresa
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => update({ company: e.target.value })}
                    className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja transition-colors"
                    placeholder="Nombre de tu empresa"
                  />
                </div>
              )}

              <div>
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update({ email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja transition-colors"
                  placeholder="+34 600 000 000"
                />
              </div>

              <div>
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">
                  País *
                </label>
                <input
                  type="text"
                  value={form.country}
                  onChange={(e) => update({ country: e.target.value })}
                  className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja transition-colors"
                  placeholder="España"
                />
              </div>

              <div>
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">
                  Ciudad
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => update({ city: e.target.value })}
                  className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja transition-colors"
                  placeholder="Tu ciudad"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">
                Mensaje *
              </label>
              <textarea
                value={form.message}
                onChange={(e) => update({ message: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja transition-colors resize-none"
                placeholder={
                  form.contact_type === 'professional'
                    ? 'Indícanos variedades, tamaños y cantidades que necesitas...'
                    : 'Escribe tu consulta...'
                }
              />
            </div>

            <div className="mb-4">
              <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">
                ¿Cómo nos has conocido?
              </label>
              <div className="flex flex-wrap gap-2">
                {([
                  { value: 'google', label: 'Google' },
                  { value: 'social', label: 'Redes sociales' },
                  { value: 'referral', label: 'Recomendación' },
                  { value: 'fair', label: 'Feria / Evento' },
                  { value: 'other', label: 'Otro' },
                ] as { value: ReferralSource; label: string }[]).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => update({ referral_source: opt.value })}
                    className={`px-3 py-1.5 text-xs border transition-all ${
                      form.referral_source === opt.value
                        ? 'border-naranja bg-naranja/5 font-semibold'
                        : 'border-linea hover:border-marron-claro'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 border border-linea font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-crudo transition-colors"
              >
                ← Volver
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={!form.name || !form.email || !form.country || !form.message}
                className={`flex-1 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide transition-colors ${
                  form.name && form.email && form.country && form.message
                    ? 'bg-negro text-crudo hover:bg-marron'
                    : 'bg-linea text-marron-claro cursor-not-allowed'
                }`}
              >
                Revisar y enviar →
              </button>
            </div>
          </div>
        )}

        {/* === STEP 4: Confirm === */}
        {step === 4 && (
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold uppercase mb-6">
              Confirmar envío
            </h2>

            {/* Summary */}
            <div className="bg-crudo p-5 mb-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-marron-claro">Tipo:</span>
                <span className="font-semibold">
                  {form.contact_type === 'particular' ? 'Particular' : 'Profesional'}
                  {form.professional_subtype && ` — ${form.professional_subtype}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-marron-claro">Consulta:</span>
                <span className="font-semibold">{form.inquiry_type?.replace(/_/g, ' ')}</span>
              </div>
              <div className="border-t border-linea pt-3 flex justify-between">
                <span className="text-marron-claro">Nombre:</span>
                <span className="font-semibold">{form.name}</span>
              </div>
              {form.company && (
                <div className="flex justify-between">
                  <span className="text-marron-claro">Empresa:</span>
                  <span className="font-semibold">{form.company}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-marron-claro">Email:</span>
                <span className="font-semibold">{form.email}</span>
              </div>
              {form.phone && (
                <div className="flex justify-between">
                  <span className="text-marron-claro">Teléfono:</span>
                  <span className="font-semibold">{form.phone}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-marron-claro">Ubicación:</span>
                <span className="font-semibold">{form.city ? `${form.city}, ` : ''}{form.country}</span>
              </div>
              <div className="border-t border-linea pt-3">
                <span className="text-marron-claro block mb-1">Mensaje:</span>
                <p className="text-negro">{form.message}</p>
              </div>
            </div>

            {/* GDPR */}
            <label className="flex items-start gap-3 mb-6 cursor-pointer">
              <input
                type="checkbox"
                checked={form.gdpr_consent}
                onChange={(e) => update({ gdpr_consent: e.target.checked })}
                className="mt-1 w-4 h-4 accent-naranja"
              />
              <span className="text-xs text-marron-claro leading-relaxed">
                He leído y acepto la{' '}
                <a href="/es/politica-privacidad" className="text-naranja underline">
                  Política de privacidad
                </a>
                . Autorizo el tratamiento de mis datos para gestionar mi consulta. *
              </span>
            </label>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-4 text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 border border-linea font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-crudo transition-colors"
              >
                ← Editar
              </button>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit || isSubmitting}
                className={`flex-1 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide transition-colors ${
                  canSubmit && !isSubmitting
                    ? 'bg-naranja text-blanco hover:bg-verde'
                    : 'bg-linea text-marron-claro cursor-not-allowed'
                }`}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar mensaje →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
