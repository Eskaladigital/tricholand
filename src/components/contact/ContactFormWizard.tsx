'use client'

import { useState } from 'react'
import type { ContactType, ProfessionalSubtype, InquiryType, ReferralSource } from '@/types/contact'
import type { Dictionary } from '@/lib/i18n/types'
import { getFullPath } from '@/lib/i18n/paths'

interface ContactFormWizardProps {
  locale: string
  dict: Dictionary
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

export function ContactFormWizard({ locale, dict }: ContactFormWizardProps) {
  const cf = dict.contact_form
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
        throw new Error(data.error || cf.error_send)
      }

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
                onClick={() => update({ contact_type: 'particular', professional_subtype: null })}
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
                onClick={() => update({ contact_type: 'professional' })}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {(form.contact_type === 'particular'
                ? [
                    { value: 'purchase' as InquiryType, label: cf.inquiry_purchase, desc: cf.inquiry_purchase_desc },
                    { value: 'care_consultation' as InquiryType, label: cf.inquiry_care, desc: cf.inquiry_care_desc },
                    { value: 'other_particular' as InquiryType, label: cf.inquiry_other_part, desc: cf.inquiry_other_part_desc },
                  ]
                : [
                    { value: 'quote_catalog' as InquiryType, label: cf.inquiry_quote, desc: cf.inquiry_quote_desc },
                    { value: 'recurring_order' as InquiryType, label: cf.inquiry_recurring, desc: cf.inquiry_recurring_desc },
                    { value: 'shipping_info' as InquiryType, label: cf.inquiry_shipping, desc: cf.inquiry_shipping_desc },
                    { value: 'certifications' as InquiryType, label: cf.inquiry_certs, desc: cf.inquiry_certs_desc },
                    { value: 'other_professional' as InquiryType, label: cf.inquiry_other_pro, desc: cf.inquiry_other_pro_desc },
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
                <input
                  type="text"
                  value={form.country}
                  onChange={(e) => update({ country: e.target.value })}
                  className="w-full px-4 py-2.5 border border-linea bg-crudo text-sm focus:outline-none focus:border-naranja transition-colors"
                  placeholder={cf.placeholder_country}
                />
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
                disabled={!form.name || !form.email || !form.country || !form.message}
                className={`flex-1 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide transition-colors ${
                  form.name && form.email && form.country && form.message
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
                <span className="font-semibold">{form.inquiry_type?.replace(/_/g, ' ')}</span>
              </div>
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
                <span className="font-semibold">{form.city ? `${form.city}, ` : ''}{form.country}</span>
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
