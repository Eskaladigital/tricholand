#!/usr/bin/env node
/**
 * Migración: poblar tabla customers desde orders y contacts existentes.
 * Ejecutar después de aplicar supabase/customers-schema.sql
 *
 * Uso: node scripts/migrate-customers.mjs
 * Requiere: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY en .env.local
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const envPath = join(ROOT, '.env.local')
if (existsSync(envPath)) {
  const content = readFileSync(envPath, 'utf8')
  for (const line of content.split('\n')) {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      let value = match[2].trim()
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      process.env[key] = value
    }
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local')
  process.exit(1)
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('⚠️ Usando ANON_KEY; la migración puede fallar si RLS bloquea inserts en customers.')
}

const supabase = createClient(url, key)

async function main() {
  console.log('🔄 Migrando datos a tabla customers...\n')

  // 1. Desde orders
  const { data: orders, error: eOrders } = await supabase
    .from('orders')
    .select('customer_email, customer_name, customer_company, customer_phone, customer_country, customer_city, customer_address, customer_vat_id, total_cents, created_at')
    .order('created_at', { ascending: true })

  if (eOrders) {
    console.error('Error leyendo orders:', eOrders.message)
  } else if (orders?.length) {
    const byEmail = new Map()
    for (const o of orders) {
      const email = (o.customer_email || '').toLowerCase().trim()
      if (!email) continue
      const existing = byEmail.get(email)
      const total = (o.total_cents ?? 0) + (existing?.total_spent_cents ?? 0)
      const first = existing?.first_contact_at ?? o.created_at
      byEmail.set(email, {
        email,
        name: o.customer_name || existing?.name || 'Sin nombre',
        company: o.customer_company || existing?.company,
        phone: o.customer_phone || existing?.phone,
        country: o.customer_country || existing?.country || 'Desconocido',
        city: o.customer_city || existing?.city,
        address: o.customer_address || existing?.address,
        vat_id: o.customer_vat_id || existing?.vat_id,
        order_count: (existing?.order_count ?? 0) + 1,
        total_spent_cents: total,
        first_contact_at: first,
        last_contact_at: o.created_at,
      })
    }
    for (const c of byEmail.values()) {
      const { error } = await supabase.from('customers').upsert(
        {
          email: c.email,
          name: c.name,
          company: c.company,
          phone: c.phone,
          country: c.country,
          city: c.city,
          address: c.address,
          vat_id: c.vat_id,
          order_count: c.order_count,
          total_spent_cents: c.total_spent_cents,
          first_contact_at: c.first_contact_at,
          last_contact_at: c.last_contact_at,
        },
        { onConflict: 'email' }
      )
      if (error) console.error(`  ❌ ${c.email}:`, error.message)
    }
    console.log(`✓ Orders: ${orders.length} → ${byEmail.size} clientes`)
  } else {
    console.log('  No hay orders')
  }

  // 2. Desde contacts (upsert, puede actualizar contact_count)
  const { data: contacts, error: eContacts } = await supabase
    .from('contacts')
    .select('email, name, company, phone, country, city, gdpr_consent, gdpr_consent_date, created_at')
    .order('created_at', { ascending: true })

  if (eContacts) {
    console.error('Error leyendo contacts:', eContacts.message)
  } else if (contacts?.length) {
    let updated = 0
    for (const c of contacts) {
      const email = (c.email || '').toLowerCase().trim()
      if (!email) continue
      const { data: existing } = await supabase.from('customers').select('contact_count').eq('email', email).single()
      const newContactCount = (existing?.contact_count ?? 0) + 1
      const { error } = await supabase.from('customers').upsert(
        {
          email,
          name: c.name || 'Sin nombre',
          company: c.company,
          phone: c.phone,
          country: c.country || 'Desconocido',
          city: c.city,
          contact_count: newContactCount,
          last_contact_at: c.created_at,
          mailing_consent: c.gdpr_consent ?? false,
          mailing_consent_date: c.gdpr_consent_date,
        },
        { onConflict: 'email' }
      )
      if (!error) updated++
    }
    console.log(`✓ Contacts: ${contacts.length} → ${updated} actualizados/añadidos`)
  } else {
    console.log('  No hay contacts')
  }

  const { count } = await supabase.from('customers').select('*', { count: 'exact', head: true })
  console.log(`\n✅ Migración completada. Total clientes: ${count ?? 0}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
