export type ContactType = 'particular' | 'professional'

export type ProfessionalSubtype =
  | 'nursery'
  | 'distributor'
  | 'landscaper'
  | 'other_pro'

export type InquiryType =
  // Particular
  | 'purchase' // legado: «Comprar cactus» (retail). El form ya no lo ofrece.
  | 'find_retailer'
  | 'wholesale'
  | 'care_consultation'
  | 'other_particular'
  // Professional
  | 'quote_catalog'
  | 'recurring_order'
  | 'shipping_info'
  | 'certifications'
  | 'other_professional'

export type EstimatedVolume =
  | 'under_50'
  | '50_749'
  | '750_1500'
  | '1500_5000'
  | '5000_plus'
  | 'unknown'

const VOLUME_VALUES: EstimatedVolume[] = [
  'under_50',
  '50_749',
  '750_1500',
  '1500_5000',
  '5000_plus',
  'unknown',
]

export function isEstimatedVolume(value: string | null | undefined): value is EstimatedVolume {
  return !!value && VOLUME_VALUES.includes(value as EstimatedVolume)
}

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
  estimated_volume?: EstimatedVolume
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
  find_retailer: 'Busco un distribuidor',
  wholesale: 'Pedido mayorista (750+)',
  care_consultation: 'Consulta de cuidados',
  other_particular: 'Otra consulta',
  quote_catalog: 'Presupuesto / Catálogo',
  recurring_order: 'Pedido recurrente',
  shipping_info: 'Información de envío',
  certifications: 'Certificaciones',
  other_professional: 'Otra consulta profesional',
}

export const VOLUME_LABELS: Record<EstimatedVolume, string> = {
  under_50: 'Menos de 50 uds',
  '50_749': '50–749 uds',
  '750_1500': '750–1.500 uds',
  '1500_5000': '1.500–5.000 uds',
  '5000_plus': 'Más de 5.000 uds',
  unknown: 'Aún no lo sé',
}

export const RETAIL_VOLUMES: EstimatedVolume[] = ['under_50', '50_749']

export const WHOLESALE_VOLUMES: EstimatedVolume[] = ['750_1500', '1500_5000', '5000_plus']

/** Un particular solo puede escribir si pide 750 o más. */
export function particularOrderOk(input: {
  contact_type?: string | null
  inquiry_type?: string | null
  estimated_volume?: string | null
}): boolean {
  if (input.contact_type !== 'particular') return true
  return (
    input.inquiry_type === 'wholesale' &&
    isEstimatedVolume(input.estimated_volume) &&
    WHOLESALE_VOLUMES.includes(input.estimated_volume)
  )
}

export function inquiryNeedsVolume(inquiry: InquiryType | null | undefined): boolean {
  return inquiry === 'wholesale' || inquiry === 'quote_catalog' || inquiry === 'recurring_order'
}

const THIN_MESSAGE_WORDS = new Set([
  'hola', 'hello', 'hi', 'hey', 'buenas', 'buenos', 'dias', 'días', 'tardes', 'noches',
  'test', 'prueba', 'asdf', 'qwerty', 'xxx', 'mensaje', 'info', 'ok', 'si', 'sí', 'no',
  'quiero', 'cactus', 'nada', 'gracias', 'thanks', 'please', 'porfa', 'porfavor',
])

/** Un saludo, un «test» o una frase que no dice qué necesita. */
export function contactMessageProblem(message: string): 'thin' | null {
  const text = message.trim().replace(/\s+/g, ' ')
  const letters = (text.match(/\p{L}/gu) || []).length
  const words = text
    .toLocaleLowerCase('es')
    .replace(/[^\p{L}\s]/gu, ' ')
    .split(/\s+/)
    .filter((word) => word.length >= 4 && !THIN_MESSAGE_WORDS.has(word))
  if (letters < 20 || words.length < 3) return 'thin'
  return null
}

export function isRetailLead(input: {
  contact_type?: string | null
  inquiry_type?: string | null
  estimated_volume?: string | null
}): boolean {
  if (input.inquiry_type === 'find_retailer' || input.inquiry_type === 'purchase') return true
  if (isEstimatedVolume(input.estimated_volume) && RETAIL_VOLUMES.includes(input.estimated_volume)) return true
  return false
}

/** El volumen no tiene columna propia: viaja en la primera línea del mensaje. */
const VOLUME_TAG = /^\[TLVOL:([a-z0-9_]+)\]\n?/

export function wrapContactMessage(message: string, volume: EstimatedVolume | null | undefined): string {
  const body = message.trim()
  if (!volume) return body
  return `[TLVOL:${volume}]\n${body}`
}

export function unwrapContactMessage(stored: string | null | undefined): {
  volume: EstimatedVolume | null
  message: string
} {
  const raw = stored ?? ''
  const match = raw.match(VOLUME_TAG)
  if (!match || !isEstimatedVolume(match[1])) return { volume: null, message: raw }
  return { volume: match[1], message: raw.slice(match[0].length) }
}

export const COUNTRY_LABELS: Record<string, string> = {
  AT: 'Austria',
  BE: 'Bélgica',
  BG: 'Bulgaria',
  HR: 'Croacia',
  CY: 'Chipre',
  CZ: 'Chequia',
  DK: 'Dinamarca',
  SK: 'Eslovaquia',
  SI: 'Eslovenia',
  ES: 'España',
  EE: 'Estonia',
  FI: 'Finlandia',
  FR: 'Francia',
  DE: 'Alemania',
  GR: 'Grecia',
  HU: 'Hungría',
  IE: 'Irlanda',
  IT: 'Italia',
  LV: 'Letonia',
  LT: 'Lituania',
  LU: 'Luxemburgo',
  MT: 'Malta',
  NL: 'Países Bajos',
  PL: 'Polonia',
  PT: 'Portugal',
  GB: 'Reino Unido',
  RO: 'Rumanía',
  SE: 'Suecia',
  CH: 'Suiza',
  NO: 'Noruega',
  US: 'Estados Unidos',
  CA: 'Canadá',
  OTHER: 'Otro',
}

export function formatContactCountry(value: string | null | undefined): string {
  if (!value) return '—'
  const code = value.trim().toUpperCase()
  return COUNTRY_LABELS[code] ?? value.trim()
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
