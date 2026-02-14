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
