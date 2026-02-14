'use server'

import { createClient } from '@/lib/supabase/server'

export interface CustomerRow {
  id: string
  created_at: string
  updated_at: string
  email: string
  name: string
  company: string | null
  phone: string | null
  country: string
  city: string | null
  address: string | null
  vat_id: string | null
  contact_count: number
  order_count: number
  total_spent_cents: number
  first_contact_at: string
  last_contact_at: string
  mailing_consent: boolean
  admin_notes: string | null
}

export async function getCustomers(): Promise<CustomerRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('last_contact_at', { ascending: false })

  if (error) return []
  return (data ?? []) as CustomerRow[]
}

export async function exportCustomersCsv(): Promise<string> {
  const customers = await getCustomers()
  const headers = [
    'Email',
    'Nombre',
    'Empresa',
    'Teléfono',
    'País',
    'Ciudad',
    'Contactos',
    'Pedidos',
    'Total gastado (€)',
    'Último contacto',
    'Mailing OK',
  ]
  const rows = customers.map((c) => [
    c.email,
    c.name,
    c.company ?? '',
    c.phone ?? '',
    c.country,
    c.city ?? '',
    String(c.contact_count),
    String(c.order_count),
    (c.total_spent_cents / 100).toFixed(2),
    new Date(c.last_contact_at).toLocaleDateString('es-ES'),
    c.mailing_consent ? 'Sí' : 'No',
  ])
  const csv = [headers.join(';'), ...rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(';'))].join('\n')
  return csv
}
