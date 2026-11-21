export type ContactType = 'particular' | 'professional'

export type ProfessionalSubtype =
  | 'nursery'
  | 'distributor'
  | 'landscaper'
  | 'other_pro'

export type InquiryType =
  // Particular
  | 'purchase'
  | 'care_consultation'
  | 'other_particular'
  // Professional
  | 'quote_catalog'
  | 'recurring_order'
  | 'shipping_info'
  | 'certifications'
  | 'other_professional'

export type ContactStatus = 'new' | 'read' | 'replied' | 'archived' | 'spam'
export type ContactPriority = 'low' | 'normal' | 'high' | 'urgent'

export type ReferralSource =
  | 'google'
  | 'social'
  | 'referral'
  | 'fair'
  | 'other'

export interface Contact {
  id: string
  created_at: string
  contact_type: ContactType
  professional_subtype: ProfessionalSubtype | null
  inquiry_type: InquiryType
  name: string
  company: string | null
  vat_number: string | null
  email: string
  phone: string | null
  country: string
  city: string | null
  message: string
  referral_source: ReferralSource | null
  locale: string
  status: ContactStatus
  admin_notes: string | null
  priority: ContactPriority
  assigned_to: string | null
  gdpr_consent: boolean
  gdpr_consent_date: string | null
}

export interface ContactFormData {
  contact_type: ContactType
  professional_subtype?: ProfessionalSubtype
  inquiry_type: InquiryType
  name: string
  company?: string
  vat_number?: string
  email: string
  phone?: string
  country: string
  city?: string
  message: string
  referral_source?: ReferralSource
  locale: string
  gdpr_consent: boolean
}

export const CONTACT_STATUS_LABELS: Record<ContactStatus, string> = {
  new: 'Nuevo',
  read: 'Leído',
  replied: 'Respondido',
  archived: 'Archivado',
  spam: 'Spam',
}

export const PROFESSIONAL_SUBTYPE_LABELS: Record<ProfessionalSubtype, string> = {
  nursery: 'Vivero / Garden Center',
  distributor: 'Distribuidor / Mayorista',
  landscaper: 'Paisajista / Arquitecto',
  other_pro: 'Otro profesional',
}

export const INQUIRY_LABELS: Record<InquiryType, string> = {
  purchase: 'Comprar cactus',
  care_consultation: 'Consulta de cuidados',
  other_particular: 'Otra consulta',
  quote_catalog: 'Presupuesto / Catálogo',
  recurring_order: 'Pedido recurrente',
  shipping_info: 'Información de envío',
  certifications: 'Certificaciones',
  other_professional: 'Otra consulta profesional',
}

export const REFERRAL_LABELS: Record<ReferralSource, string> = {
  google: 'Google',
  social: 'Redes sociales',
  referral: 'Recomendación',
  fair: 'Feria / Evento',
  other: 'Otro',
}

export const LOCALE_LABELS: Record<string, string> = {
  es: 'Español',
  en: 'Inglés',
  fr: 'Francés',
  de: 'Alemán',
  it: 'Italiano',
  pt: 'Portugués',
  nl: 'Neerlandés',
}

export function contactLabel(map: Record<string, string>, value: string | null | undefined, empty = '—'): string {
  if (!value) return empty
  return map[value] ?? value.replaceAll('_', ' ')
}

export function inquiryLabel(value: string | null | undefined): string {
  return contactLabel(INQUIRY_LABELS, value, 'Sin tipo de consulta')
}

/** Asunto y saludo listos para contestar desde el panel. */
export function contactMailto(email: string, name: string, inquiry: string | null | undefined): string {
  const first = name.trim().split(/\s+/)[0] || name
  const subject = `Re: ${inquiryLabel(inquiry)} — Tricholand`
  const body = `Hola ${first},\n\n`
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function formatContactWhen(iso: string, now = new Date()): { relative: string; absolute: string } {
  const date = new Date(iso)
  const absolute = date.toLocaleString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  const minutes = Math.round((now.getTime() - date.getTime()) / 60000)
  if (Number.isNaN(minutes)) return { relative: '—', absolute: '—' }
  if (minutes < 1) return { relative: 'Ahora', absolute }
  if (minutes < 60) return { relative: `Hace ${minutes} min`, absolute }
  const hours = Math.round(minutes / 60)
  if (hours < 24) return { relative: hours === 1 ? 'Hace 1 hora' : `Hace ${hours} horas`, absolute }
  const days = Math.round(hours / 24)
  if (days === 1) return { relative: 'Ayer', absolute }
  if (days < 7) return { relative: `Hace ${days} días`, absolute }
  return {
    relative: date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
    absolute,
  }
}
