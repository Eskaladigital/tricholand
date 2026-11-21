'use client'

import { useEffect, useMemo, useState } from 'react'
import type { ContactType, ProfessionalSubtype, InquiryType, ReferralSource, EstimatedVolume } from '@/types/contact'
import { contactMessageProblem, inquiryNeedsVolume, particularOrderOk } from '@/types/contact'
import type { Dictionary } from '@/lib/i18n/types'
import { getFullPath } from '@/lib/i18n/paths'

interface ContactFormWizardProps {
  locale: string
  dict: Dictionary
}

type Step = 1 | 2 | 3 | 4
type ParticularUnits = 'under' | '750_1500' | '1500_5000' | '5000_plus'
interface ParticularGate {
  intent: 'order' | 'other' | null
  units: ParticularUnits | null
  confirm: 'yes' | 'no' | null
}
const emptyGate: ParticularGate = { intent: null, units: null, confirm: null }

interface FormState {
  contact_type: ContactType | null
  professional_subtype: ProfessionalSubtype | null
  inquiry_type: InquiryType | null
  estimated_volume: EstimatedVolume | null
  name: string
  company: string
  vat_number: string
  email: string
  phone: string
  country: string
  city: string
  message: string
  referral_source: ReferralSource | null
  gdpr_consent: boolean
  website: string
}

const initialState: FormState = {
  contact_type: null,
  professional_subtype: null,
  inquiry_type: null,
  estimated_volume: null,
  name: '',
  company: '',
  vat_number: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  message: '',
  referral_source: null,
  gdpr_consent: false,
  website: '',
}

export function ContactFormWizard({ locale, dict }: ContactFormWizardProps) {
  const cf = dict.contact_form
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState<FormState>(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formStartedAt, setFormStartedAt] = useState(0)
  const [gate, setGate] = useState<ParticularGate>(emptyGate)

  useEffect(() => {
    setFormStartedAt(Date.now())
  }, [])

  const update = (partial: Partial<FormState>) => {
    setForm((prev) => ({ ...prev, ...partial }))
  }

  const canAdvanceStep2 = form.contact_type !== null && (
    form.contact_type === 'particular' || form.professional_subtype !== null
  )

  const particularBlocked =
    form.contact_type === 'particular' &&
    (gate.intent === 'other' || gate.units === 'under' || gate.confirm === 'no')

  const canAdvanceStep3 =
    form.contact_type === 'particular'
      ? particularOrderOk({
          contact_type: 'particular',
          inquiry_type: form.inquiry_type,
          estimated_volume: form.estimated_volume,
        }) && gate.confirm === 'yes'
      : form.inquiry_type !== null &&
        (!inquiryNeedsVolume(form.inquiry_type) || form.estimated_volume !== null)

  const messageThin = form.message.trim() !== '' && contactMessageProblem(form.message) === 'thin'

  const canAdvanceStep4 =
    form.name.trim() !== '' &&
    form.email.trim() !== '' &&
    form.country.trim() !== '' &&
    !contactMessageProblem(form.message) &&
    (form.contact_type !== 'professional' || form.company.trim() !== '')

  const canSubmit = canAdvanceStep4 && form.gdpr_consent

  const countryOptions = useMemo(() => {
    const shop = dict.orderForm.countries
    const seen = new Set(shop.map((c) => c.code))
    const display = new Intl.DisplayNames([locale], { type: 'region' })
    const extras = ['CH', 'NO', 'US', 'CA']
      .filter((code) => !seen.has(code))
      .map((code) => ({ code, name: display.of(code) || code }))
    return [...shop, ...extras, { code: 'OTHER', name: cf.country_other }].sort((a, b) =>
      a.name.localeCompare(b.name, locale)
    )
  }, [cf.country_other, dict.orderForm.countries, locale])

  const inquiryLabel = (value: InquiryType | null) => {
    if (!value) return ''
    const map: Partial<Record<InquiryType, string>> = {
      find_retailer: cf.inquiry_retailer,
      wholesale: cf.inquiry_wholesale,
      care_consultation: cf.inquiry_care,
      other_particular: cf.inquiry_other_part,
      quote_catalog: cf.inquiry_quote,
      recurring_order: cf.inquiry_recurring,
      shipping_info: cf.inquiry_shipping,
      certifications: cf.inquiry_certs,
      other_professional: cf.inquiry_other_pro,
      purchase: cf.inquiry_purchase,
    }
    return map[value] ?? value
  }

  const volumeLabel = (value: EstimatedVolume | null) => {
    if (!value) return ''
    const map: Record<EstimatedVolume, string> = {
      under_50: '–50',
      '50_749': '50–749',
      '750_1500': cf.volume_750_1500,
      '1500_5000': cf.volume_1500_5000,
      '5000_plus': cf.volume_5000_plus,
      unknown: cf.volume_unknown,
    }
    return map[value]
  }

  const countryName = countryOptions.find((c) => c.code === form.country)?.name ?? form.country

  async function handleSubmit() {
    if (!canSubmit) return
    if (
      form.contact_type === 'particular' &&
      !particularOrderOk({
        contact_type: 'particular',
        inquiry_type: form.inquiry_type,
        estimated_volume: form.estimated_volume,
      })
    ) {
      setError(cf.min_order_stop)
      return
    }
    setIsSubmitting(true)
    setError(null)

    console.log('[Tricholand] Enviando contacto...', { name: form.name, type: form.contact_type })

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact_type: form.contact_type,
          professional_subtype: form.professional_subtype,
          inquiry_type: form.inquiry_type,
          estimated_volume: form.estimated_volume || undefined,
          name: form.name,
          company: form.company || undefined,
          vat_number: form.vat_number || undefined,
          email: form.email,
          phone: form.phone || undefined,
          country: form.country,
          city: form.city || undefined,
          message: form.message,
          referral_source: form.referral_source || undefined,
          locale,
          gdpr_consent: form.gdpr_consent,
          website: form.website,
          form_started_at: formStartedAt,
        }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        console.error('[Tricholand] Error en contacto:', data.error || res.status)
        throw new Error(data.error || cf.error_send)
      }

      console.log('[Tricholand] Contacto guardado correctamente')
      console.log('[Tricholand] Email admin:', data.email_admin ? 'OK' : 'FALLO')
      console.log('[Tricholand] Email cliente:', data.email_client ? 'OK' : 'FALLO')
      if (data.log) console.log('[Tricholand] Log servidor:', data.log)

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : cf.error_unknown)
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
          {cf.success_title}
        </h2>
        <p className="opacity-85 max-w-md mx-auto">
          {cf.success_text} <strong>{form.email}</strong>.
        </p>
      </div>
    )
  }

  return (
    <div className="relative bg-blanco border border-linea">
      <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={form.website}
          onChange={(e) => update({ website: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
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
            {s === 1 && cf.step1_label}
            {s === 2 && cf.step2_label}
            {s === 3 && cf.step3_label}
            {s === 4 && cf.step4_label}
          </div>
        ))}
      </div>

      <div className="p-6 lg:p-8">
        {/* === STEP 1: Contact type === */}
        {step === 1 && (
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold uppercase mb-6">
              {cf.step1_title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => {
                  if (form.contact_type === 'particular') return
                  setGate(emptyGate)
                  update({
                    contact_type: 'particular',
                    professional_subtype: null,
                    inquiry_type: null,
                    estimated_volume: null,
                  })
                }}
                className={`p-5 border-2 text-left transition-all ${
                  form.contact_type === 'particular'
                    ? 'border-naranja bg-naranja/5'
                    : 'border-linea hover:border-marron-claro'
                }`}
              >
                <span className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold block">
                  🌵 {cf.particular}
                </span>
                <span className="text-sm text-marron-claro mt-1 block">
                  {cf.particular_desc}
                </span>
              </button>

              <button
                onClick={() => {
                  if (form.contact_type === 'professional') return
                  setGate(emptyGate)
                  update({ contact_type: 'professional', inquiry_type: null, estimated_volume: null })
                }}
                className={`p-5 border-2 text-left transition-all ${
                  form.contact_type === 'professional'
                    ? 'border-naranja bg-naranja/5'
                    : 'border-linea hover:border-marron-claro'
                }`}
              >
                <span className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold block">
                  🏢 {cf.professional}
                </span>
                <span className="text-sm text-marron-claro mt-1 block">
                  {cf.professional_desc}
                </span>
              </button>
            </div>

            {/* Professional subtypes */}
            {form.contact_type === 'professional' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {([
                  { value: 'nursery', label: cf.pro_nursery },
                  { value: 'distributor', label: cf.pro_distributor },
                  { value: 'landscaper', label: cf.pro_landscaper },
                  { value: 'other_pro', label: cf.pro_other },
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
              {cf.next}
            </button>
          </div>
        )}

        {/* === STEP 2: Inquiry type === */}
        {step === 2 && (
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold uppercase mb-6">
              {cf.step2_title}
            </h2>

            {form.contact_type === 'particular' ? (
              <div className="mb-6 space-y-6">
                <div>
                  <p className="font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-2">
                    {cf.q_intent}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setGate({ intent: 'order', units: null, confirm: null })
                        update({ inquiry_type: null, estimated_volume: null })
                      }}
                      className={`p-4 border text-left transition-all ${
                        gate.intent === 'order' ? 'border-naranja bg-naranja/5' : 'border-linea hover:border-marron-claro'
                      }`}
                    >
                      <span className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold block">
                        {cf.q_intent_order}
                      </span>
                      <span className="text-xs text-marron-claro">{cf.q_intent_order_desc}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setGate({ intent: 'other', units: null, confirm: null })
                        update({ inquiry_type: null, estimated_volume: null })
                      }}
                      className={`p-4 border text-left transition-all ${
                        gate.intent === 'other' ? 'border-naranja bg-naranja/5' : 'border-linea hover:border-marron-claro'
                      }`}
                    >
                      <span className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold block">
                        {cf.q_intent_other}
                      </span>
                      <span className="text-xs text-marron-claro">{cf.q_intent_other_desc}</span>
                    </button>
                  </div>
                </div>

                {gate.intent === 'order' && (
                  <div>
                    <p className="font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-2">
                      {cf.q_units}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {([
                        { value: 'under' as ParticularUnits, label: cf.q_units_under },
                        { value: '750_1500' as ParticularUnits, label: cf.volume_750_1500 },
                        { value: '1500_5000' as ParticularUnits, label: cf.volume_1500_5000 },
                        { value: '5000_plus' as ParticularUnits, label: cf.volume_5000_plus },
                      ]).map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setGate((prev) => ({ ...prev, units: opt.value, confirm: null }))
                            update({
                              inquiry_type: null,
                              estimated_volume: opt.value === 'under' ? null : opt.value,
                            })
                          }}
                          className={`p-4 border text-left transition-all ${
                            gate.units === opt.value
                              ? 'border-naranja bg-naranja/5'
                              : 'border-linea hover:border-marron-claro'
                          }`}
                        >
                          <span className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold block">
                            {opt.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {gate.intent === 'order' && gate.units && gate.units !== 'under' && (
                  <div>
                    <p className="font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-2">
                      {cf.q_confirm}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          const units = gate.units
                          setGate((prev) => ({ ...prev, confirm: 'yes' }))
                          update({
                            inquiry_type: 'wholesale',
                            estimated_volume: units && units !== 'under' ? units : null,
                          })
                        }}
                        className={`p-4 border text-left transition-all ${
                          gate.confirm === 'yes' ? 'border-naranja bg-naranja/5' : 'border-linea hover:border-marron-claro'
                        }`}
                      >
                        <span className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold block">
                          {cf.q_confirm_yes}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setGate((prev) => ({ ...prev, confirm: 'no' }))
                          update({ inquiry_type: null })
                        }}
                        className={`p-4 border text-left transition-all ${
                          gate.confirm === 'no' ? 'border-naranja bg-naranja/5' : 'border-linea hover:border-marron-claro'
                        }`}
                      >
                        <span className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold block">
                          {cf.q_confirm_no}
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {particularBlocked && (
                  <div className="border border-naranja bg-naranja/5 p-4">
                    <p className="text-sm leading-relaxed">{cf.min_order_stop}</p>
                  </div>
                )}
              </div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {([
                    { value: 'quote_catalog' as InquiryType, label: cf.inquiry_quote, desc: cf.inquiry_quote_desc },
                    { value: 'recurring_order' as InquiryType, label: cf.inquiry_recurring, desc: cf.inquiry_recurring_desc },
                    { value: 'shipping_info' as InquiryType, label: cf.inquiry_shipping, desc: cf.inquiry_shipping_desc },
                    { value: 'certifications' as InquiryType, label: cf.inquiry_certs, desc: cf.inquiry_certs_desc },
                    { value: 'other_professional' as InquiryType, label: cf.inquiry_other_pro, desc: cf.inquiry_other_pro_desc },
                  ]
              ).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => update({ inquiry_type: opt.value, estimated_volume: null })}
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
            )}

            {form.contact_type === 'professional' && inquiryNeedsVolume(form.inquiry_type) && (
              <div className="mb-6">
                <p className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-2">
                  {cf.label_volume}
                </p>
                <div className="flex flex-wrap gap-2">
                  {([
                    { value: '750_1500' as EstimatedVolume, label: cf.volume_750_1500 },
                    { value: '1500_5000' as EstimatedVolume, label: cf.volume_1500_5000 },
                    { value: '5000_plus' as EstimatedVolume, label: cf.volume_5000_plus },
                    ...(form.contact_type === 'professional'
                      ? [{ value: 'unknown' as EstimatedVolume, label: cf.volume_unknown }]
                      : []),
                  ]).map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => update({ estimated_volume: opt.value })}
                      className={`px-3 py-1.5 text-xs border transition-all ${
                        form.estimated_volume === opt.value
                          ? 'border-naranja bg-naranja/5 font-semibold'
                          : 'border-linea hover:border-marron-claro'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 border border-linea font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-crudo transition-colors"
              >
                {cf.back}
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
                {cf.next}
              </button>
            </div>
          </div>
        )}

        {/* === STEP 3: Contact details === */}
        {step === 3 && (
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold uppercase mb-6">
              {cf.step3_title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">
                  {cf.label_name}
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update({ name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja transition-colors"
                  placeholder={cf.placeholder_name}
                />
              </div>

              {form.contact_type === 'professional' && (
                <>
                  <div>
                    <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">
                      {cf.label_company}
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => update({ company: e.target.value })}
                      className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja transition-colors"
                      placeholder={cf.placeholder_company}
                    />
                  </div>
                  <div>
                    <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">
                      {cf.label_vat}
                    </label>
                    <input
                      type="text"
                      value={form.vat_number}
                      onChange={(e) => update({ vat_number: e.target.value })}
                      className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja transition-colors"
                      placeholder={cf.placeholder_vat}
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">
                  {cf.label_email}
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
                  {cf.label_phone}
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja transition-colors"
                  placeholder={cf.placeholder_phone}
                />
              </div>

              <div>
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">
                  {cf.label_country}
                </label>
                <select
                  value={form.country}
                  onChange={(e) => update({ country: e.target.value })}
                  className={`w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja transition-colors ${!form.country ? 'text-marron-claro' : ''}`}
                >
                  <option value="">{dict.orderForm.selectCountry}</option>
                  {countryOptions.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">
                  {cf.label_city}
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => update({ city: e.target.value })}
                  className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja transition-colors"
                  placeholder={cf.placeholder_city}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">
                {cf.label_message}
              </label>
              <textarea
                value={form.message}
                onChange={(e) => update({ message: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja transition-colors resize-none"
                placeholder={
                  form.contact_type === 'professional'
                    ? cf.placeholder_message_pro
                    : cf.placeholder_message
                }
              />
              {messageThin && (
                <p className="text-sm text-terracota mt-2" role="alert">{cf.error_message_thin}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro mb-1">
                {cf.label_referral}
              </label>
              <div className="flex flex-wrap gap-2">
                {([
                  { value: 'google', label: cf.referral_google },
                  { value: 'social', label: cf.referral_social },
                  { value: 'referral', label: cf.referral_referral },
                  { value: 'fair', label: cf.referral_fair },
                  { value: 'other', label: cf.referral_other },
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
                {cf.back}
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={!canAdvanceStep4}
                className={`flex-1 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide transition-colors ${
                  canAdvanceStep4
                    ? 'bg-negro text-crudo hover:bg-marron'
                    : 'bg-linea text-marron-claro cursor-not-allowed'
                }`}
              >
                {cf.review_send}
              </button>
            </div>
          </div>
        )}

        {/* === STEP 4: Confirm === */}
        {step === 4 && (
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold uppercase mb-6">
              {cf.step4_title}
            </h2>

            {/* Summary */}
            <div className="bg-crudo p-5 mb-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-marron-claro">{cf.summary_type}</span>
                <span className="font-semibold">
                  {form.contact_type === 'particular' ? 'Particular' : 'Profesional'}
                  {form.professional_subtype && ` — ${form.professional_subtype}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-marron-claro">{cf.summary_inquiry}</span>
                <span className="font-semibold">{inquiryLabel(form.inquiry_type)}</span>
              </div>
              {form.estimated_volume && (
                <div className="flex justify-between">
                  <span className="text-marron-claro">{cf.summary_volume}</span>
                  <span className="font-semibold">{volumeLabel(form.estimated_volume)}</span>
                </div>
              )}
              <div className="border-t border-linea pt-3 flex justify-between">
                <span className="text-marron-claro">{cf.summary_name}</span>
                <span className="font-semibold">{form.name}</span>
              </div>
              {form.company && (
                <div className="flex justify-between">
                  <span className="text-marron-claro">{cf.summary_company}</span>
                  <span className="font-semibold">{form.company}</span>
                </div>
              )}
              {form.vat_number && (
                <div className="flex justify-between">
                  <span className="text-marron-claro">{cf.summary_vat}</span>
                  <span className="font-semibold">{form.vat_number}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-marron-claro">{cf.summary_email}</span>
                <span className="font-semibold">{form.email}</span>
              </div>
              {form.phone && (
                <div className="flex justify-between">
                  <span className="text-marron-claro">{cf.summary_phone}</span>
                  <span className="font-semibold">{form.phone}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-marron-claro">{cf.summary_location}</span>
                <span className="font-semibold">{form.city ? `${form.city}, ` : ''}{countryName}</span>
              </div>
              <div className="border-t border-linea pt-3">
                <span className="text-marron-claro block mb-1">{cf.summary_message}</span>
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
                {cf.gdpr_text}{' '}
                <a href={getFullPath(locale, 'privacy')} className="text-naranja underline">
                  {cf.gdpr_link}
                </a>
                {cf.gdpr_suffix}
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
                {cf.edit_btn}
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
                {isSubmitting ? cf.sending : cf.send_btn}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
