import { createClient } from '@supabase/supabase-js'

// Cliente público (solo lectura)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Obtiene un campo traducido. Si no existe traducción, devuelve el texto original en español.
 */
export async function getTranslation(
  contentType: string,
  contentId: string,
  field: string,
  locale: string
): Promise<string | null> {
  // Si es español, ir directo al contenido fuente
  if (locale === 'es') {
    const { data } = await supabase
      .from('content')
      .select('source_text')
      .eq('content_type', contentType)
      .eq('content_id', contentId)
      .eq('field', field)
      .single()
    return data?.source_text || null
  }

  // Para otros idiomas, buscar traducción
  const { data } = await supabase
    .from('content_with_translations')
    .select('translated_text, source_text')
    .eq('content_type', contentType)
    .eq('content_id', contentId)
    .eq('field', field)
    .eq('locale', locale)
    .single()

  // Fallback a español si no hay traducción
  return data?.translated_text || data?.source_text || null
}

/**
 * Obtiene todos los campos traducidos de un item.
 * Devuelve un objeto { field: text } 
 */
export async function getTranslations(
  contentType: string,
  contentId: string,
  locale: string
): Promise<Record<string, string>> {
  if (locale === 'es') {
    const { data } = await supabase
      .from('content')
      .select('field, source_text')
      .eq('content_type', contentType)
      .eq('content_id', contentId)
    
    const result: Record<string, string> = {}
    for (const row of data || []) {
      result[row.field] = row.source_text
    }
    return result
  }

  // Para otros idiomas, join con traducciones
  const { data } = await supabase
    .from('content_with_translations')
    .select('field, translated_text, source_text')
    .eq('content_type', contentType)
    .eq('content_id', contentId)
    .eq('locale', locale)

  const result: Record<string, string> = {}
  for (const row of data || []) {
    result[row.field] = row.translated_text || row.source_text
  }
  return result
}

/**
 * Obtiene traducciones de múltiples items del mismo tipo.
 * Útil para listados (ej: todas las variedades traducidas).
 */
export async function getBulkTranslations(
  contentType: string,
  locale: string
): Promise<Record<string, Record<string, string>>> {
  if (locale === 'es') {
    const { data } = await supabase
      .from('content')
      .select('content_id, field, source_text')
      .eq('content_type', contentType)

    const result: Record<string, Record<string, string>> = {}
    for (const row of data || []) {
      if (!result[row.content_id]) result[row.content_id] = {}
      result[row.content_id][row.field] = row.source_text
    }
    return result
  }

  const { data } = await supabase
    .from('content_with_translations')
    .select('content_id, field, translated_text, source_text')
    .eq('content_type', contentType)
    .eq('locale', locale)

  const result: Record<string, Record<string, string>> = {}
  for (const row of data || []) {
    if (!result[row.content_id]) result[row.content_id] = {}
    result[row.content_id][row.field] = row.translated_text || row.source_text
  }
  return result
}

/**
 * Obtiene el estado de las traducciones (para el admin).
 */
export async function getTranslationStats() {
  const { data: content } = await supabase
    .from('content')
    .select('id, content_type')

  const { data: translations } = await supabase
    .from('translations')
    .select('content_id, locale, status')

  const totalFields = content?.length || 0
  const locales = ['en', 'nl', 'fr', 'de', 'it', 'pt']
  const totalExpected = totalFields * locales.length

  const stats = {
    total_fields: totalFields,
    total_expected: totalExpected,
    by_locale: {} as Record<string, { translated: number; outdated: number; pending: number }>,
    by_type: {} as Record<string, number>,
  }

  // Count by type
  for (const c of content || []) {
    stats.by_type[c.content_type] = (stats.by_type[c.content_type] || 0) + 1
  }

  // Count by locale
  for (const locale of locales) {
    const localeTranslations = translations?.filter((t) => t.locale === locale) || []
    stats.by_locale[locale] = {
      translated: localeTranslations.filter((t) => t.status === 'translated' || t.status === 'reviewed').length,
      outdated: localeTranslations.filter((t) => t.status === 'outdated').length,
      pending: totalFields - localeTranslations.length,
    }
  }

  return stats
}
