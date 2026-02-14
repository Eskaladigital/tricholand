'use server'

import { createClient } from '@/lib/supabase/server'

export interface ContactRow {
  id: string
  created_at: string
  name: string
  company: string | null
  email: string
  phone: string | null
  country: string
  city: string | null
  message: string | null
  contact_type: 'particular' | 'professional'
  professional_subtype: string | null
  inquiry_type: string | null
  referral_source: string | null
  status: 'new' | 'read' | 'replied' | 'archived' | 'spam'
  priority: string | null
  locale: string | null
}

export async function getContactById(id: string): Promise<ContactRow | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null
  return data as ContactRow
}

export async function getContacts(): Promise<ContactRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return []
  return (data ?? []) as ContactRow[]
}

export type ContactStatusValue = 'new' | 'read' | 'replied' | 'archived' | 'spam'

export async function updateContactStatus(
  id: string,
  status: ContactStatusValue
): Promise<{ error?: string }> {
  const validStatuses: ContactStatusValue[] = ['new', 'read', 'replied', 'archived', 'spam']
  if (!validStatuses.includes(status)) return { error: 'Estado no válido' }

  const supabase = await createClient()
  const { error } = await supabase.from('contacts').update({ status }).eq('id', id)
  if (error) return { error: error.message }
  return {}
}

export async function deleteContact(id: string): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase.from('contacts').delete().eq('id', id)
  if (error) return { error: error.message }
  return {}
}
