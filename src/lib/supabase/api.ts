import { createClient } from '@supabase/supabase-js'

/**
 * Cliente Supabase para API routes (sin cookies).
 * Usa anon key; RLS permite INSERT público en contacts y orders.
 */
export function createApiClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

/**
 * Cliente con service role para API routes que necesitan bypassear RLS.
 * Usar SOLO en el servidor (API routes). Nunca exponer al cliente.
 * Necesario para orders porque el trigger upsert_customer_from_order
 * inserta en customers (RLS restringido).
 */
export function createServiceClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!key) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY no configurada (necesaria para guardar pedidos)')
  }
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key)
}
