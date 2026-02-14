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
  inquiry_type: string | null
  status: 'new' | 'read' | 'replied' | 'archived' | 'spam'
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
