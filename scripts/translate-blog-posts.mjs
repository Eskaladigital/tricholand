/**
 * Traduce artículos del blog (locale=es) a los 6 idiomas: en, nl, fr, de, it, pt.
 * Lee desde Supabase blog_posts, traduce los que no tienen versión en cada idioma, e inserta.
 *
 * Uso:
 *   node scripts/translate-blog-posts.mjs              (todos los idiomas)
 *   node scripts/translate-blog-posts.mjs --locale en  (solo inglés)
 *   node scripts/translate-blog-posts.mjs --dry-run
 *   node scripts/translate-blog-posts.mjs --update-slugs (actualizar slugs de traducciones existentes)
 *   node scripts/translate-blog-posts.mjs --fix-slug   (corregir slug EN del post enfermedades fúngicas)
 *   node scripts/translate-blog-posts.mjs --retranslate-all            (re-traduce título+descripción+slug de TODOS los posts existentes)
 *   node scripts/translate-blog-posts.mjs --retranslate-all --dry-run  (muestra qué cambiaría sin escribir)
 *   node scripts/translate-blog-posts.mjs --retranslate-all --locale de (solo alemán)
 *   node scripts/translate-blog-posts.mjs --retranslate-all --full     (re-traduce TODO: título, descripción, contenido y slug)
 *
 * Requiere: OPENAI_API_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// Cargar .env.local
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

const { OPENAI_API_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env
const fixSlugOnly = process.argv.includes('--fix-slug')

if (!fixSlugOnly && !OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY no configurado en .env.local')
  process.exit(1)
}
if (!NEXT_PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Faltan credenciales de Supabase en .env.local')
  process.exit(1)
}

const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

const TARGET_LOCALES = ['en', 'nl', 'fr', 'de', 'it', 'pt']
const LOCALE_NAMES = {
  en: 'English', nl: 'Dutch', fr: 'French',
  de: 'German', it: 'Italian', pt: 'Portuguese',
}
const TAGS_BY_LOCALE = {
  en: ['trichocereus', 'cultivation', 'guide'],
  nl: ['trichocereus', 'teelt', 'gids'],
  fr: ['trichocereus', 'culture', 'guide'],
  de: ['trichocereus', 'anbau', 'leitfaden'],
  it: ['trichocereus', 'coltivazione', 'guida'],
  pt: ['trichocereus', 'cultivo', 'guia'],
}

/** Slugs fijos por source_slug y locale (para URLs canónicas/SEO) */
const SLUG_OVERRIDES = {
  'guia-de-enfermedades-fungicas-en-cactus-como-prevenir-y-tratarlas': {
    en: 'a-complete-guide-to-fungal-diseases-in-cacti-how-to-prevent-and-treat-them',
  },
}

/** Genera slug URL-friendly desde el título traducido */
function slugify(title) {
  const accents = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ñ: 'n', ü: 'u', ä: 'a', ö: 'o', ß: 'ss', à: 'a', è: 'e', ì: 'i', ò: 'o', ù: 'u', â: 'a', ê: 'e', î: 'i', ô: 'o', û: 'u', ç: 'c' }
  let s = title.toLowerCase().trim()
  for (const [accent, plain] of Object.entries(accents)) s = s.replace(new RegExp(accent, 'g'), plain)
  s = s.replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
  return s || 'post'
}

const MAX_OUTPUT_TOKENS = 16384
const CHARS_PER_CHUNK = Math.floor(MAX_OUTPUT_TOKENS / 1.3)

function splitIntoChunks(text) {
  if (text.length <= CHARS_PER_CHUNK) return [text]
  const chunks = []
  const paragraphs = text.split(/\n\n+/)
  let current = ''
  for (const p of paragraphs) {
    if (current.length + p.length + 2 > CHARS_PER_CHUNK && current) {
      chunks.push(current.trim())
      current = ''
    }
    current += (current ? '\n\n' : '') + p
  }
  if (current) chunks.push(current.trim())
  return chunks
}

async function translateChunk(text, field, locale, langName, systemPrompt) {
  const maxTokens = Math.min(MAX_OUTPUT_TOKENS, Math.max(1000, Math.ceil(text.length * 1.2)))
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Translate to ${langName} (field: ${field}):\n\n${text}` },
      ],
      temperature: 0.3,
      max_tokens: maxTokens,
    }),
  })
  if (!response.ok) {
    const err = await response.text()
    throw new Error(`OpenAI: ${response.status} — ${err}`)
  }
  const data = await response.json()
  return data.choices[0].message.content.trim()
}

async function translateText(text, field, locale) {
  const langName = LOCALE_NAMES[locale]
  const systemPrompt = `You are a professional translator for Tricholand, a B2B wholesale Trichocereus cactus nursery in Spain.

RULES:
- Translate from Spanish to ${langName}
- Keep the same tone: professional, B2B, informative
- DO NOT translate Latin botanical names (Trichocereus, Echinopsis, etc.)
- DO NOT translate brand names (Tricholand)
- DO NOT translate measurements (cm, m², °C, etc.)
- For botanical/horticultural terms, use standard ${langName} terminology
- Content may be HTML (h1, h2, p, strong, ul, li). Translate ONLY text inside tags, keep HTML tags exactly as-is
- Output ONLY the translated text, nothing else`

  const chunks = splitIntoChunks(text)
  if (chunks.length === 1) {
    return translateChunk(text, field, locale, langName, systemPrompt)
  }

  const results = []
  for (let i = 0; i < chunks.length; i++) {
    results.push(await translateChunk(chunks[i], field, locale, langName, systemPrompt))
    if (i < chunks.length - 1) await new Promise((r) => setTimeout(r, 400))
  }
  return results.join('\n\n')
}

async function retranslateAll() {
  const dryRun = process.argv.includes('--dry-run')
  const fullMode = process.argv.includes('--full')
  const localeArg = process.argv.includes('--locale') ? process.argv[process.argv.indexOf('--locale') + 1] : null
  const targetLocales = localeArg && TARGET_LOCALES.includes(localeArg) ? [localeArg] : TARGET_LOCALES

  console.log('\n🔄 RE-TRADUCCIÓN de artículos existentes (ES → ' + targetLocales.map((l) => l.toUpperCase()).join(', ') + ')')
  console.log(`   Modo: ${fullMode ? 'COMPLETO (título + descripción + contenido + slug)' : 'TÍTULOS (título + descripción + slug)'}`)
  if (dryRun) console.log('   ⚠️  DRY RUN — no se escribirá nada\n')
  else console.log('')

  const { data: postsEs, error: errEs } = await supabase
    .from('blog_posts')
    .select('slug, title, description, content, date, image, image_alt, tags, reading_time')
    .eq('locale', 'es')
    .eq('status', 'published')

  if (errEs) {
    console.error('❌ Error leyendo posts ES:', errEs.message)
    process.exit(1)
  }

  if (!postsEs || postsEs.length === 0) {
    console.log('   No hay artículos en español.')
    return
  }

  console.log(`   📚 ${postsEs.length} artículos en español encontrados\n`)

  let totalDone = 0
  let totalSkipped = 0
  let totalErrors = 0

  for (const locale of targetLocales) {
    const langName = LOCALE_NAMES[locale]
    const tags = TAGS_BY_LOCALE[locale] ?? TAGS_BY_LOCALE.en

    const { data: existingRows } = await supabase
      .from('blog_posts')
      .select('source_slug, slug, title, description')
      .eq('locale', locale)

    const existingBySource = new Map((existingRows || []).map((r) => [r.source_slug, r]))

    const toRetranslate = postsEs.filter((p) => existingBySource.has(p.slug))

    console.log(`\n${'─'.repeat(50)}`)
    console.log(`📌 ${langName} (${locale}): ${toRetranslate.length} artículos a re-traducir`)

    if (toRetranslate.length === 0) {
      console.log('   ✅ No hay traducciones existentes para este idioma.')
      continue
    }

    for (const postEs of toRetranslate) {
      const existing = existingBySource.get(postEs.slug)
      try {
        console.log(`\n   🔄 [${locale}] ${postEs.slug}`)
        console.log(`      Título ES: "${postEs.title.substring(0, 60)}..."`)
        console.log(`      Título ${locale} actual: "${existing.title.substring(0, 60)}..."`)
        console.log(`      Slug ${locale} actual: ${existing.slug}`)

        if (dryRun) {
          totalDone++
          continue
        }

        const titleTr = await translateText(postEs.title, 'title', locale)
        await new Promise((r) => setTimeout(r, 300))

        const descriptionTr = await translateText(postEs.description || postEs.title, 'description', locale)
        await new Promise((r) => setTimeout(r, 300))

        const newSlug = SLUG_OVERRIDES[postEs.slug]?.[locale] ?? slugify(titleTr)

        console.log(`      Título ${locale} nuevo: "${titleTr.substring(0, 60)}..."`)
        console.log(`      Slug ${locale} nuevo: ${newSlug}`)

        if (fullMode) {
          const contentTr = await translateText(postEs.content, 'content', locale)
          await new Promise((r) => setTimeout(r, 300))

          const { error } = await supabase.from('blog_posts').upsert(
            {
              source_slug: postEs.slug,
              slug: newSlug,
              title: titleTr,
              description: descriptionTr,
              date: postEs.date,
              image: postEs.image,
              image_alt: titleTr,
              tags,
              reading_time: postEs.reading_time,
              content: contentTr,
              locale,
              status: 'published',
            },
            { onConflict: 'source_slug,locale' }
          )
          if (error) throw error
        } else {
          const { error } = await supabase
            .from('blog_posts')
            .update({
              title: titleTr,
              description: descriptionTr,
              slug: newSlug,
              image_alt: titleTr,
            })
            .eq('source_slug', postEs.slug)
            .eq('locale', locale)
          if (error) throw error
        }

        totalDone++
        console.log(`      ✅ Actualizado`)

        await new Promise((r) => setTimeout(r, 600))
      } catch (err) {
        totalErrors++
        console.error(`      ❌ Error: ${err.message}`)
      }
    }
  }

  console.log(`\n${'═'.repeat(50)}`)
  console.log(`✅ Re-traducidos: ${totalDone}`)
  if (totalSkipped) console.log(`⏭️  Omitidos: ${totalSkipped}`)
  if (totalErrors) console.log(`❌ Errores: ${totalErrors}`)
  console.log(`${'═'.repeat(50)}\n`)
}

async function main() {
  if (process.argv.includes('--retranslate-all')) {
    return retranslateAll()
  }

  const fixSlug = process.argv.includes('--fix-slug')
  if (fixSlug) {
    const sourceSlug = 'guia-de-enfermedades-fungicas-en-cactus-como-prevenir-y-tratarlas'
    const newSlug = 'a-complete-guide-to-fungal-diseases-in-cacti-how-to-prevent-and-treat-them'
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ slug: newSlug })
      .eq('source_slug', sourceSlug)
      .eq('locale', 'en')
      .select()
    if (error) {
      console.error('❌ Error:', error.message)
      process.exit(1)
    }
    console.log('✅ Slug EN actualizado:', data?.[0] ? `${data[0].slug}` : '(sin filas)')
    return
  }

  const dryRun = process.argv.includes('--dry-run')
  const updateSlugs = process.argv.includes('--update-slugs')
  const localeArg = process.argv.includes('--locale') ? process.argv[process.argv.indexOf('--locale') + 1] : null
  const targetLocales = localeArg && TARGET_LOCALES.includes(localeArg) ? [localeArg] : TARGET_LOCALES

  console.log('\n🌍 Traducción de artículos del blog (ES → ' + targetLocales.map((l) => l.toUpperCase()).join(', ') + ')\n')
  if (dryRun) console.log('   Modo: DRY RUN (sin escribir)\n')
  if (updateSlugs) console.log('   Modo: Actualizar slugs de traducciones existentes\n')

  const { data: postsEs, error: errEs } = await supabase
    .from('blog_posts')
    .select('slug, title, description, content, date, image, image_alt, tags, reading_time')
    .eq('locale', 'es')
    .eq('status', 'published')

  if (errEs) {
    console.error('❌ Error leyendo posts:', errEs.message)
    process.exit(1)
  }

  let totalDone = 0
  let totalErrors = 0

  for (const locale of targetLocales) {
    const { data: existingRows } = await supabase
      .from('blog_posts')
      .select('source_slug, slug, title')
      .eq('locale', locale)

    const existingSourceSlugs = new Set((existingRows || []).map((p) => p.source_slug))
    const toTranslate = updateSlugs
      ? (postsEs || []).filter((p) => existingSourceSlugs.has(p.slug))
      : (postsEs || []).filter((p) => !existingSourceSlugs.has(p.slug))

    console.log(`\n📌 ${LOCALE_NAMES[locale]} (${locale}): ${existingSourceSlugs.size} ya traducidos, ${toTranslate.length} ${updateSlugs ? 'a actualizar slug' : 'por traducir'}`)

    if (toTranslate.length === 0) {
      console.log(`   ✅ ${updateSlugs ? 'Nada que actualizar.' : 'Todos los artículos tienen versión.'}`)
      continue
    }

    if (dryRun) {
      toTranslate.forEach((p, i) => console.log(`   ${i + 1}. ${p.slug}`))
      continue
    }

    const tags = TAGS_BY_LOCALE[locale]

    for (const post of toTranslate) {
      try {
        if (updateSlugs) {
          const existing = (existingRows || []).find((r) => r.source_slug === post.slug)
          if (!existing) continue
          const slugTr = SLUG_OVERRIDES[post.slug]?.[locale] ?? slugify(existing.title)
          if (existing.slug === slugTr) {
            console.log(`   ⏭️ ${post.slug} — slug ya correcto`)
            continue
          }
          console.log(`   🔄 ${post.slug} → ${slugTr}`)
          const { error } = await supabase
            .from('blog_posts')
            .update({ slug: slugTr })
            .eq('source_slug', post.slug)
            .eq('locale', locale)
          if (error) throw error
          totalDone++
        } else {
          console.log(`\n   🔄 ${post.slug} — "${post.title.substring(0, 45)}..."`)

          const [titleTr, descriptionTr, contentTr] = await Promise.all([
            translateText(post.title, 'title', locale),
            translateText(post.description || post.title, 'description', locale),
            translateText(post.content, 'content', locale),
          ])

          const slugTr = SLUG_OVERRIDES[post.slug]?.[locale] ?? slugify(titleTr)

          const row = {
            source_slug: post.slug,
            slug: slugTr,
            title: titleTr,
            description: descriptionTr,
            date: post.date,
            image: post.image,
            image_alt: titleTr,
            tags,
            reading_time: post.reading_time,
            content: contentTr,
            locale,
            status: 'published',
          }

          const { error } = await supabase.from('blog_posts').upsert(row, {
            onConflict: 'source_slug,locale',
          })

          if (error) throw error

          totalDone++
          console.log(`      ✓ ${titleTr.substring(0, 45)}...`)

          await new Promise((r) => setTimeout(r, 600))
        }
      } catch (err) {
        totalErrors++
        console.error(`      ❌ ${err.message}`)
      }
    }
  }

  console.log(`\n${'═'.repeat(50)}`)
  console.log(`✅ Total traducidos: ${totalDone}`)
  if (totalErrors) console.log(`❌ Errores: ${totalErrors}`)
  console.log(`${'═'.repeat(50)}\n`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
