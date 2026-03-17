#!/usr/bin/env node
/**
 * Verifica que el esquema de la base de datos Supabase esté correcto.
 * Comprueba que existan las tablas y columnas esperadas.
 *
 * Uso: node scripts/check-db-schema.mjs
 * Requiere: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY en .env.local
 *
 * Exit 0 = todo OK. Exit 1 = errores encontrados.
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
  console.error('❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local')
  process.exit(1)
}

const supabase = createClient(url, key)

/** Esquema esperado: tabla -> array de columnas obligatorias */
const EXPECTED_SCHEMA = {
  products: [
    'id', 'created_at', 'updated_at', 'name', 'slug', 'sku', 'price_cents',
    'min_order_qty', 'qty_step', 'units_per_lot', 'status',
  ],
  orders: [
    'id', 'created_at', 'order_number', 'status', 'customer_name', 'customer_email',
    'customer_country', 'customer_vat_id', 'subtotal_cents', 'total_cents', 'locale',
  ],
  order_items: [
    'id', 'order_id', 'product_id', 'product_name', 'product_sku', 'quantity',
    'unit_price_cents', 'total_cents',
  ],
  contacts: [
    'id', 'created_at', 'name', 'company', 'vat_number', 'email', 'phone', 'country',
    'city', 'message', 'contact_type', 'professional_subtype', 'inquiry_type',
    'referral_source', 'status', 'gdpr_consent', 'locale',
  ],
  blog_posts: [
    'id', 'created_at', 'slug', 'title', 'date', 'content', 'locale', 'status',
  ],
  settings: [
    'key', 'value', 'updated_at',
  ],
}

async function checkTable(tableName, columns) {
  const selectCols = columns.join(', ')
  const { data, error } = await supabase
    .from(tableName)
    .select(selectCols)
    .limit(0)

  if (error) {
    return { ok: false, error: error.message }
  }
  return { ok: true }
}

async function main() {
  console.log('🔍 Verificando esquema de la base de datos Supabase...\n')

  let hasErrors = false

  for (const [table, columns] of Object.entries(EXPECTED_SCHEMA)) {
    process.stdout.write(`  ${table}... `)
    const result = await checkTable(table, columns)
    if (result.ok) {
      console.log('✓')
    } else {
      console.log('❌')
      console.log(`     Error: ${result.error}`)
      hasErrors = true
    }
  }

  // Tabla customers (opcional - puede no existir)
  process.stdout.write('  customers (opcional)... ')
  const { error: custError } = await supabase.from('customers').select('id, email, vat_id').limit(0)
  if (custError && custError.code === '42P01') {
    console.log('— (no existe, OK si no usas customers)')
  } else if (custError) {
    console.log('❌')
    console.log(`     Error: ${custError.message}`)
    hasErrors = true
  } else {
    console.log('✓')
  }

  console.log('')
  if (hasErrors) {
    console.log('❌ Hay errores en el esquema. Ejecuta las migraciones en Supabase SQL Editor:')
    console.log('   - supabase/products-units-per-lot-migration.sql (si falta units_per_lot en products)')
    console.log('   - supabase/contacts-add-vat-number-migration.sql (si falta vat_number en contacts)')
    console.log('   - supabase/schema.sql (para instalación nueva)')
    process.exit(1)
  }

  console.log('✅ Todas las tablas tienen el esquema correcto.')
  process.exit(0)
}

main().catch((err) => {
  console.error('Error:', err.message)
  process.exit(1)
})
