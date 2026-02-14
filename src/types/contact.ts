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
  email: string
  phone?: string
  country: string
  city?: string
  message: string
  referral_source?: ReferralSource
  locale: string
  gdpr_consent: boolean
}
