import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getContactById } from '@/lib/actions/contacts'
import { getCustomerByEmail } from '@/lib/actions/customers'
import { ContactDetailActions } from '@/components/admin/ContactDetailActions'
import {
  CONTACT_STATUS_LABELS,
  LOCALE_LABELS,
  PROFESSIONAL_SUBTYPE_LABELS,
  REFERRAL_LABELS,
  VOLUME_LABELS,
  contactLabel,
  contactMailto,
  formatContactCountry,
  formatContactWhen,
  inquiryLabel,
  isRetailLead,
  unwrapContactMessage,
  type ContactStatus,
} from '@/types/contact'

const statusClass: Record<ContactStatus, string> = {
  new: 'bg-amber-100 text-amber-900',
  read: 'bg-verde-claro text-verde-oscuro',
  replied: 'bg-green-100 text-green-800',
  archived: 'bg-gray-100 text-gray-500',
  spam: 'bg-red-50 text-red-700',
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <span className="block text-[11px] font-bold uppercase tracking-wide text-marron-claro mb-0.5">
        {label}
      </span>
      <div className="text-sm">{children}</div>
    </div>
  )
}

export default async function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const contact = await getContactById(id)
  if (!contact) notFound()

  const customer = await getCustomerByEmail(contact.email)
  const when = formatContactWhen(contact.created_at)
  const { volume, message: rawMessage } = unwrapContactMessage(contact.message)
  const place = [contact.city, formatContactCountry(contact.country)].filter(Boolean).join(', ')
  const isPro = contact.contact_type === 'professional'
  const retail = isRetailLead({ ...contact, estimated_volume: volume })
  const status = (CONTACT_STATUS_LABELS[contact.status as ContactStatus] ? contact.status : 'new') as ContactStatus
  const mail = contactMailto(contact.email, contact.name, contact.inquiry_type)
  const message = rawMessage.trim()

  return (
    <>
      <div className="mb-8">
        <Link
          href="/administrator/contacts"
          className="inline-block mb-4 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro hover:text-naranja"
        >
          ← Contactos
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`px-2 py-0.5 text-[10px] font-bold uppercase ${statusClass[status]}`}>
                {CONTACT_STATUS_LABELS[status]}
              </span>
              <span
                className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                  isPro ? 'bg-naranja/10 text-naranja' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {isPro ? 'Profesional' : 'Particular'}
              </span>
              <span
                className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                  retail ? 'bg-gray-100 text-gray-600' : 'bg-verde-claro text-verde-oscuro'
                }`}
              >
                {retail ? 'Retail' : 'Mayorista'}
              </span>
              {contact.professional_subtype && (
                <span className="text-xs text-marron-claro">
                  {contactLabel(PROFESSIONAL_SUBTYPE_LABELS, contact.professional_subtype)}
                </span>
              )}
            </div>
            <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase break-words">
              {contact.name}
            </h1>
            {contact.company && <p className="text-marron mt-1">{contact.company}</p>}
            <p className="text-sm text-marron-claro mt-1">
              <time dateTime={contact.created_at} title={when.absolute}>
                {when.relative}
              </time>
              <span className="mx-1.5">·</span>
              {when.absolute}
              {place && (
                <>
                  <span className="mx-1.5">·</span>
                  {place}
                </>
              )}
            </p>
          </div>
          <a
            href={mail}
            className="shrink-0 px-4 py-2.5 bg-negro text-crudo font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide hover:bg-marron transition-colors"
          >
            Responder
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] gap-6 items-start">
        <section className="bg-blanco border border-linea p-6 lg:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4 pb-3 border-b border-linea">
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase">
              Mensaje
            </h2>
            <p className="text-xs font-bold uppercase tracking-wide text-naranja">
              {inquiryLabel(contact.inquiry_type)}
              {volume ? ` · ${VOLUME_LABELS[volume]}` : ''}
            </p>
          </div>
          {message ? (
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message}</p>
          ) : (
            <p className="text-sm text-marron-claro">Este contacto no dejó mensaje.</p>
          )}
        </section>

        <div className="space-y-6">
          <section className="bg-blanco border border-linea p-6">
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-4 pb-2 border-b border-linea">
              Datos
            </h2>
            <div className="space-y-3.5">
              <Field label="Email">
                <a href={`mailto:${contact.email}`} className="text-naranja hover:underline break-all">
                  {contact.email}
                </a>
              </Field>
              <Field label="Teléfono">
                {contact.phone ? (
                  <a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`} className="hover:underline">
                    {contact.phone}
                  </a>
                ) : (
                  <span className="text-marron-claro">Sin teléfono</span>
                )}
              </Field>
              <Field label="Ubicación">
                {place || <span className="text-marron-claro">Sin ubicación</span>}
              </Field>
              {volume && (
                <Field label="Cantidad aproximada">{VOLUME_LABELS[volume]}</Field>
              )}
              {isPro && (
                <>
                  <Field label="Empresa">
                    {contact.company || <span className="text-marron-claro">Sin empresa</span>}
                  </Field>
                  <Field label="NIF / IVA">
                    {contact.vat_number ? (
                      <span className="font-mono text-xs">{contact.vat_number}</span>
                    ) : (
                      <span className="text-marron-claro">Sin NIF</span>
                    )}
                  </Field>
                </>
              )}
              <Field label="Cómo nos conoció">
                {contactLabel(REFERRAL_LABELS, contact.referral_source, 'No indicado')}
              </Field>
              <Field label="Idioma del formulario">
                {contactLabel(LOCALE_LABELS, contact.locale, 'No indicado')}
              </Field>
              <Field label="Privacidad">
                {contact.gdpr_consent
                  ? `Aceptada${
                      contact.gdpr_consent_date
                        ? ` el ${new Date(contact.gdpr_consent_date).toLocaleString('es-ES')}`
                        : ''
                    }`
                  : 'Sin registro de aceptación'}
              </Field>
              {customer && (
                <Field label="Cliente">
                  <Link href={`/administrator/customers/${customer.id}`} className="text-naranja hover:underline">
                    Ver ficha de {customer.name}
                  </Link>
                </Field>
              )}
            </div>
          </section>

          <ContactDetailActions
            contactId={contact.id}
            contactName={contact.name}
            contactEmail={contact.email}
            inquiryType={contact.inquiry_type}
            phone={contact.phone}
            currentStatus={status}
            adminNotes={contact.admin_notes}
          />
        </div>
      </div>
    </>
  )
}
