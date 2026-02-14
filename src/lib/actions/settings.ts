'use server'

import { createClient } from '@/lib/supabase/server'

export interface SettingsMap {
  company_name?: string
  company_email?: string
  company_phone?: string
  min_order_units?: number
  default_tax_rate?: number
  notify_email?: string
  auto_reply?: boolean
}

const SETTINGS_KEYS = [
  'company_name',
  'company_email',
  'company_phone',
  'min_order_units',
  'default_tax_rate',
  'notify_email',
  'auto_reply',
] as const

export async function getSettings(): Promise<SettingsMap> {
  const supabase = await createClient()
  const { data } = await supabase.from('settings').select('key, value').in('key', SETTINGS_KEYS)

  const map: SettingsMap = {}
  for (const row of data ?? []) {
    const key = row.key as (typeof SETTINGS_KEYS)[number]
    let val: unknown = row.value
    if (typeof val === 'string') {
      if (val === 'true') val = true
      else if (val === 'false') val = false
      else if (val.startsWith('"')) val = val.slice(1, -1)
      else if (/^\d+$/.test(val)) val = parseInt(val, 10)
    }
    if (key === 'min_order_units' || key === 'default_tax_rate') val = Number(val) || 0
    if (key === 'auto_reply') val = val === true || val === 'true'
    ;(map as Record<string, unknown>)[key] = val
  }
  return map
}

export async function updateSettings(updates: Partial<SettingsMap>): Promise<{ error?: string }> {
  const supabase = await createClient()
  for (const [key, value] of Object.entries(updates)) {
    if (value === undefined) continue
    const jsonValue: unknown = typeof value === 'boolean' ? value : typeof value === 'number' ? value : String(value)
    const { error } = await supabase.from('settings').upsert({ key, value: jsonValue }, { onConflict: 'key' })
    if (error) return { error: error.message }
  }
  return {}
}
