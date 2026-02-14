/**
 * Script para traducir contenido largo (variedades, productos, blog, páginas)
 * usando OpenAI API y almacenando en Supabase.
 * 
 * Flujo:
 * 1. Lee contenido fuente en español (de archivos TS o Supabase)
 * 2. Calcula hash MD5 para detectar cambios
 * 3. Sincroniza a tabla "content" en Supabase
 * 4. Para cada locale destino, traduce solo lo nuevo/outdated
 * 5. Guarda traducciones en tabla "translations"
 * 
 * Uso:
 *   node scripts/translate-content.mjs                    (todo)
 *   node scripts/translate-content.mjs --type variety     (solo variedades)
 *   node scripts/translate-content.mjs --locale en        (solo inglés)
 *   node scripts/translate-content.mjs --type blog --locale fr
 *   node scripts/translate-content.mjs --dry-run          (sin escribir)
 * 
 * Requiere en .env.local:
 *   OPENAI_API_KEY
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createHash } from 'crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// ─── Config ───────────────────────────────────────────
const TARGET_LOCALES = ['en', 'nl', 'fr', 'de', 'it', 'pt']
const CONTENT_TYPES = ['variety', 'product', 'blog', 'page']

const LOCALE_NAMES = {
  en: 'English', nl: 'Dutch', fr: 'French',
  de: 'German', it: 'Italian', pt: 'Portuguese',
}

// ─── Load env ─────────────────────────────────────────
function loadEnv() {
  const envPath = join(ROOT, '.env.local')
  if (!existsSync(envPath)) { console.error('❌ .env.local not found'); process.exit(1) }
  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const eq = t.indexOf('=')
    if (eq > 0) process.env[t.slice(0, eq)] = t.slice(eq + 1)
  }
}

loadEnv()

const { OPENAI_API_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env

if (!OPENAI_API_KEY) { console.error('❌ OPENAI_API_KEY not set'); process.exit(1) }
if (!NEXT_PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Supabase credentials not set in .env.local')
  process.exit(1)
}

// ─── Parse args ──────────────────────────────────────
const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const typeFilter = args.includes('--type') ? args[args.indexOf('--type') + 1] : null
const localeFilter = args.includes('--locale') ? args[args.indexOf('--locale') + 1] : null

const targetLocales = localeFilter ? [localeFilter] : TARGET_LOCALES

// ─── Helpers ─────────────────────────────────────────
function md5(text) {
  return createHash('md5').update(text).digest('hex')
}

async function supabaseQuery(path, options = {}) {
  const url = `${NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${path}`
  const res = await fetch(url, {
    headers: {
      'apikey': SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': options.prefer || 'return=representation',
      ...options.headers,
    },
    method: options.method || 'GET',
    body: options.body ? JSON.stringify(options.body) : undefined,
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Supabase ${options.method || 'GET'} ${path}: ${res.status} — ${err}`)
  }
  const text = await res.text()
  return text ? JSON.parse(text) : null
}

async function translateText(text, field, contentType, contentId, locale) {
  const langName = LOCALE_NAMES[locale]
  
  const systemPrompt = `You are a professional translator for Tricholand, a B2B wholesale Trichocereus cactus nursery in Spain.

RULES:
- Translate from Spanish to ${langName}
- Keep the same tone: professional, B2B, informative
- DO NOT translate Latin botanical names (Trichocereus, Echinopsis, etc.)
- DO NOT translate brand names (Tricholand)
- DO NOT translate measurements (cm, m², °C, etc.)
- For botanical/horticultural terms, use standard ${langName} terminology
- If the text contains HTML or markdown, preserve the formatting
- Output ONLY the translated text, nothing else`

  const contextHint = `Content type: ${contentType}, item: ${contentId}, field: ${field}`

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `[${contextHint}]\n\nTranslate to ${langName}:\n\n${text}` },
      ],
      temperature: 0.3,
      max_tokens: Math.max(2000, text.length * 2),
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`OpenAI error: ${response.status} — ${err}`)
  }

  const data = await response.json()
  return data.choices[0].message.content.trim()
}

// ─── Extract content from source files ───────────────

function extractVarietyContent() {
  // Dynamic import won't work for TS, so we read and parse manually
  const filePath = join(ROOT, 'src/content/varieties/es/data.ts')
  const content = readFileSync(filePath, 'utf-8')
  
  // Extract variety objects — we need the translatable fields
  // We'll use a regex-based approach to get each variety's data
  const items = []
  
  // Find all variety entries (between { and })
  const varietyRegex = /slug:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'[\s\S]*?commonName:\s*'([^']+)'[\s\S]*?description:\s*'([\s\S]*?)'(?:\s*,\s*\n)/g
  
  // Simpler approach: extract known translatable patterns
  // For now we'll extract key fields with specific regex patterns
  const slugs = [...content.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1])
  const names = [...content.matchAll(/name:\s*'([^']+)'/g)].map(m => m[1])
  const commonNames = [...content.matchAll(/commonName:\s*'([^']+)'/g)].map(m => m[1])
  const descriptions = [...content.matchAll(/description:\s*`([\s\S]*?)`/g)].map(m => m[1].trim())
  
  // For descriptions that use single quotes
  if (descriptions.length === 0) {
    const descSingle = [...content.matchAll(/description:\s*'([\s\S]*?)(?<!\\)'/g)].map(m => m[1].trim())
    descriptions.push(...descSingle)
  }

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i]
    if (names[i]) items.push({ type: 'variety', id: slug, field: 'name', text: names[i] })
    if (commonNames[i]) items.push({ type: 'variety', id: slug, field: 'commonName', text: commonNames[i] })
    if (descriptions[i]) items.push({ type: 'variety', id: slug, field: 'description', text: descriptions[i] })
  }

  // Extract highlights (arrays)
  const highlightBlocks = [...content.matchAll(/highlights:\s*\[([\s\S]*?)\]/g)]
  for (let i = 0; i < highlightBlocks.length && i < slugs.length; i++) {
    const highlights = [...highlightBlocks[i][1].matchAll(/'([^']+)'/g)].map(m => m[1])
    if (highlights.length > 0) {
      items.push({ type: 'variety', id: slugs[i], field: 'highlights', text: JSON.stringify(highlights) })
    }
  }

  return items
}

function extractProductContent() {
  const filePath = join(ROOT, 'src/content/shop/products-demo.ts')
  const content = readFileSync(filePath, 'utf-8')
  const items = []

  const nameMatches = [...content.matchAll(/name:\s*'([^']+)'/g)]
  const slugMatches = [...content.matchAll(/slug:\s*'([^']+)'/g)]
  const descMatches = [...content.matchAll(/description:\s*'([\s\S]*?)(?<!\\)'/g)]
  const shortDescMatches = [...content.matchAll(/short_description:\s*'([^']+)'/g)]
  const unitMatches = [...content.matchAll(/unit_label:\s*'([^']+)'/g)]

  for (let i = 0; i < slugMatches.length; i++) {
    const slug = slugMatches[i][1]
    if (nameMatches[i]) items.push({ type: 'product', id: slug, field: 'name', text: nameMatches[i][1] })
    if (descMatches[i]) items.push({ type: 'product', id: slug, field: 'description', text: descMatches[i][1] })
    if (shortDescMatches[i]) items.push({ type: 'product', id: slug, field: 'short_description', text: shortDescMatches[i][1] })
    if (unitMatches[i]) items.push({ type: 'product', id: slug, field: 'unit_label', text: unitMatches[i][1] })
  }

  return items
}

function extractBlogContent() {
  const filePath = join(ROOT, 'src/content/blog/es/data.ts')
  const content = readFileSync(filePath, 'utf-8')
  const items = []

  const slugMatches = [...content.matchAll(/slug:\s*'([^']+)'/g)]
  const titleMatches = [...content.matchAll(/title:\s*'([^']+)'/g)]
  const excerptMatches = [...content.matchAll(/excerpt:\s*'([\s\S]*?)(?<!\\)'/g)]
  const contentMatches = [...content.matchAll(/content:\s*`([\s\S]*?)`/g)]

  for (let i = 0; i < slugMatches.length; i++) {
    const slug = slugMatches[i][1]
    if (titleMatches[i]) items.push({ type: 'blog', id: slug, field: 'title', text: titleMatches[i][1] })
    if (excerptMatches[i]) items.push({ type: 'blog', id: slug, field: 'excerpt', text: excerptMatches[i][1] })
    if (contentMatches[i]) items.push({ type: 'blog', id: slug, field: 'content', text: contentMatches[i][1] })
  }

  return items
}

function extractPageContent() {
  // Static page content — servicios, sobre nosotros, certificaciones
  // These are in the dictionary (es.ts) for short items,
  // but the long page content is in the page.tsx files themselves
  // For now, we only extract what's translatable from the dictionary
  // The actual page content will come from Supabase once migrated
  return []
}

// ─── Main workflow ───────────────────────────────────

async function main() {
  console.log('\n🌍 TRICHOLAND — Sistema de traducción de contenido\n')
  console.log(`  Modo: ${dryRun ? 'DRY RUN (sin escribir)' : 'PRODUCCIÓN'}`)
  console.log(`  Tipos: ${typeFilter || 'todos'}`)
  console.log(`  Idiomas: ${targetLocales.join(', ')}`)
  console.log()

  // 1. Extract all translatable content from source files
  let allItems = []

  if (!typeFilter || typeFilter === 'variety') {
    const varieties = extractVarietyContent()
    allItems.push(...varieties)
    console.log(`📦 Variedades: ${varieties.length} campos extraídos`)
  }
  if (!typeFilter || typeFilter === 'product') {
    const products = extractProductContent()
    allItems.push(...products)
    console.log(`📦 Productos: ${products.length} campos extraídos`)
  }
  if (!typeFilter || typeFilter === 'blog') {
    const blog = extractBlogContent()
    allItems.push(...blog)
    console.log(`📦 Blog: ${blog.length} campos extraídos`)
  }
  if (!typeFilter || typeFilter === 'page') {
    const pages = extractPageContent()
    allItems.push(...pages)
    console.log(`📦 Páginas: ${pages.length} campos extraídos`)
  }

  console.log(`\n📋 Total: ${allItems.length} campos de contenido\n`)

  if (allItems.length === 0) {
    console.log('⚠️  No hay contenido para traducir')
    return
  }

  if (dryRun) {
    console.log('🔍 DRY RUN — Contenido que se traduciría:\n')
    for (const item of allItems) {
      const preview = item.text.slice(0, 80).replace(/\n/g, ' ')
      console.log(`  [${item.type}] ${item.id}.${item.field}: "${preview}..."`)
    }
    console.log(`\n  → Se generarían ${allItems.length * targetLocales.length} traducciones`)
    return
  }

  // 2. Sync content to Supabase "content" table
  console.log('📤 Sincronizando contenido fuente a Supabase...\n')

  for (const item of allItems) {
    const hash = md5(item.text)
    
    try {
      // Upsert: insert or update if changed
      await supabaseQuery('content', {
        method: 'POST',
        headers: { 'Prefer': 'resolution=merge-duplicates' },
        body: {
          content_type: item.type,
          content_id: item.id,
          field: item.field,
          source_text: item.text,
          source_hash: hash,
        },
      })
    } catch (err) {
      console.error(`  ❌ Error syncing ${item.type}/${item.id}/${item.field}: ${err.message}`)
    }
  }
  console.log('  ✅ Contenido fuente sincronizado\n')

  // 3. Get all content records with their IDs
  const contentRecords = await supabaseQuery(
    'content?select=id,content_type,content_id,field,source_text,source_hash'
  )

  // 4. Get existing translations
  const existingTranslations = await supabaseQuery(
    'translations?select=content_id,locale,source_hash_at_translation,status'
  )

  const translationMap = new Map()
  for (const t of existingTranslations) {
    translationMap.set(`${t.content_id}:${t.locale}`, t)
  }

  // 5. Translate what's needed
  let translated = 0
  let skipped = 0
  let errors = 0

  for (const locale of targetLocales) {
    console.log(`\n🔄 Traduciendo a ${LOCALE_NAMES[locale]} (${locale})...\n`)

    for (const record of contentRecords) {
      const key = `${record.id}:${locale}`
      const existing = translationMap.get(key)

      // Skip if already translated and not outdated
      if (existing && existing.source_hash_at_translation === record.source_hash && existing.status !== 'outdated') {
        skipped++
        continue
      }

      const isUpdate = !!existing
      const preview = record.source_text.slice(0, 50).replace(/\n/g, ' ')
      console.log(`  ${isUpdate ? '🔄' : '🆕'} [${record.content_type}] ${record.content_id}.${record.field} (${preview}...)`)

      try {
        const translatedText = await translateText(
          record.source_text,
          record.field,
          record.content_type,
          record.content_id,
          locale
        )

        // Upsert translation
        await supabaseQuery('translations', {
          method: 'POST',
          headers: { 'Prefer': 'resolution=merge-duplicates' },
          body: {
            content_id: record.id,
            locale,
            translated_text: translatedText,
            source_hash_at_translation: record.source_hash,
            status: 'translated',
            translated_by: 'openai',
            model_used: 'gpt-4o',
          },
        })

        translated++
        
        // Rate limit
        await new Promise(r => setTimeout(r, 500))
      } catch (err) {
        console.error(`    ❌ Error: ${err.message}`)
        errors++
      }
    }
  }

  console.log(`\n${'═'.repeat(50)}`)
  console.log(`✅ Traducción completada`)
  console.log(`   Traducidos: ${translated}`)
  console.log(`   Omitidos (ya actualizados): ${skipped}`)
  console.log(`   Errores: ${errors}`)
  console.log(`${'═'.repeat(50)}\n`)
}

main().catch(console.error)
