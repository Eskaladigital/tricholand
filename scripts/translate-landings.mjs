/**
 * Translate landing pages from a source locale (default: en) to target locales.
 * Reads from Supabase landing_pages, translates content fields via OpenAI, and inserts.
 *
 * Usage:
 *   node scripts/translate-landings.mjs                          (translate all EN landings to all locales)
 *   node scripts/translate-landings.mjs --locale fr              (only French)
 *   node scripts/translate-landings.mjs --source-locale es       (translate from Spanish instead of EN)
 *   node scripts/translate-landings.mjs --dry-run                (preview without writing)
 *   node scripts/translate-landings.mjs --slug trichocereus-pachanoi-for-sale-uk  (only this landing)
 *
 * Requires: OPENAI_API_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY in .env.local
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

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}
if (!OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const ALL_LOCALES = ['es', 'en', 'nl', 'fr', 'de', 'it', 'pt']
const DRY_RUN = process.argv.includes('--dry-run')
const targetLocaleArg = process.argv.find((_, i, a) => a[i - 1] === '--locale')
const sourceLocaleArg = process.argv.find((_, i, a) => a[i - 1] === '--source-locale') || 'en'
const slugArg = process.argv.find((_, i, a) => a[i - 1] === '--slug')

const TARGET_LOCALES = targetLocaleArg ? [targetLocaleArg] : ALL_LOCALES.filter(l => l !== sourceLocaleArg)

const LOCALE_NAMES = {
  es: 'Spanish', en: 'English', nl: 'Dutch', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese',
}

const OG_LOCALES = {
  es: 'es_ES', en: 'en', fr: 'fr_FR', de: 'de_DE', nl: 'nl_NL', it: 'it_IT', pt: 'pt_PT',
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function translateWithOpenAI(text, targetLang, context = '') {
  const systemPrompt = `You are a professional translator for a B2B cactus nursery website. Translate the following content to ${targetLang}. ${context}
Rules:
- Keep the same tone: professional, warm, B2B-focused
- Do NOT translate brand names (Tricholand, Trichocereus, Pachanoi, etc.)
- Keep HTML tags intact if present
- Keep emojis intact
- Preserve JSON structure if the input is JSON
- Return ONLY the translation, no explanations`

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${OPENAI_API_KEY}` },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text },
      ],
      temperature: 0.3,
    }),
  })

  const data = await res.json()
  return data.choices?.[0]?.message?.content?.trim() || ''
}

async function translateLanding(source, targetLocale) {
  const lang = LOCALE_NAMES[targetLocale]

  // Translate meta fields
  const metaTitle = await translateWithOpenAI(source.meta_title, lang, 'This is a page title for SEO. Keep it under 60 chars.')
  const metaDescription = await translateWithOpenAI(source.meta_description, lang, 'This is a meta description for SEO. Keep it under 160 chars.')
  const metaKeywords = JSON.parse(await translateWithOpenAI(JSON.stringify(source.meta_keywords), lang, 'This is a JSON array of SEO keywords. Return a JSON array.'))

  // Translate content (as a single JSON block for efficiency)
  const contentStr = JSON.stringify(source.content, null, 2)
  const translatedContentStr = await translateWithOpenAI(contentStr, lang, 'This is a JSON object with landing page content. Translate all string values. Keep keys in English. Return valid JSON only.')
  let translatedContent
  try {
    translatedContent = JSON.parse(translatedContentStr)
  } catch {
    const jsonMatch = translatedContentStr.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      translatedContent = JSON.parse(jsonMatch[0])
    } else {
      throw new Error(`Failed to parse translated content for ${targetLocale}`)
    }
  }

  // Generate locale-specific slug from meta_title
  const titleForSlug = metaTitle.replace(/\s*[—|]\s*.*$/, '').trim()
  const slug = slugify(titleForSlug)

  return {
    slug,
    source_slug: source.source_slug,
    locale: targetLocale,
    status: 'published',
    meta_title: metaTitle,
    meta_description: metaDescription,
    meta_keywords: metaKeywords,
    og_locale: OG_LOCALES[targetLocale] || targetLocale,
    content: translatedContent,
    config: source.config,
  }
}

async function main() {
  console.log(`\n🌵 Translate Landings — ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`)
  console.log(`Source locale: ${sourceLocaleArg}`)
  console.log(`Target locales: ${TARGET_LOCALES.join(', ')}`)
  if (slugArg) console.log(`Filter slug: ${slugArg}`)
  console.log()

  // Fetch source landings
  let query = supabase.from('landing_pages').select('*').eq('locale', sourceLocaleArg).eq('status', 'published')
  if (slugArg) query = query.eq('slug', slugArg)
  const { data: sources, error } = await query

  if (error) {
    console.error('Error fetching source landings:', error.message)
    process.exit(1)
  }

  console.log(`Found ${sources.length} source landing(s)\n`)

  let translated = 0, skipped = 0, errors = 0

  for (const source of sources) {
    for (const targetLocale of TARGET_LOCALES) {
      const label = `[${sourceLocaleArg}→${targetLocale}] ${source.slug}`

      // Check if translation already exists
      const { data: existing } = await supabase
        .from('landing_pages')
        .select('id')
        .eq('source_slug', source.source_slug)
        .eq('locale', targetLocale)
        .single()

      if (existing) {
        console.log(`  SKIP ${label} (translation exists)`)
        skipped++
        continue
      }

      if (DRY_RUN) {
        console.log(`  WOULD TRANSLATE ${label}`)
        translated++
        continue
      }

      try {
        console.log(`  Translating ${label}...`)
        const row = await translateLanding(source, targetLocale)

        const { error: insertError } = await supabase.from('landing_pages').insert(row)
        if (insertError) {
          console.error(`  ERROR inserting ${label}: ${insertError.message}`)
          errors++
        } else {
          console.log(`  OK ${label} → slug: ${row.slug}`)
          translated++
        }
      } catch (e) {
        console.error(`  ERROR translating ${label}: ${e.message}`)
        errors++
      }
    }
  }

  console.log(`\nDone! Translated: ${translated}, Skipped: ${skipped}, Errors: ${errors}\n`)
}

main().catch(console.error)
