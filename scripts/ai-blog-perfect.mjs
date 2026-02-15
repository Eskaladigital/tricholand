#!/usr/bin/env node
/**
 * Agente IA: limpia, optimiza para SEO y traduce el contenido del blog.
 * Recibe texto en markdown/HTML desordenado y devuelve HTML perfecto.
 *
 * Uso:
 *   node scripts/ai-blog-perfect.mjs                    # Todos los artículos ES
 *   node scripts/ai-blog-perfect.mjs --limit 3         # Solo los 3 primeros
 *   node scripts/ai-blog-perfect.mjs --slug mi-articulo
 *   node scripts/ai-blog-perfect.mjs --id cacb59cb-045a-46f0-a22e-b2cb46b2abf5
 *   node scripts/ai-blog-perfect.mjs --translate       # También traduce a en,nl,fr,de,it,pt
 *   node scripts/ai-blog-perfect.mjs --dry-run
 *
 * Requiere: OPENAI_API_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY en .env.local
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const envPath = join(ROOT, '.env.local')

if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/)
    if (m) {
      let v = m[2].trim()
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1)
      process.env[m[1].trim()] = v
    }
  }
}

const { OPENAI_API_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env

if (!OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY no configurado en .env.local')
  process.exit(1)
}
if (!NEXT_PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

const TARGET_LOCALES = ['en', 'nl', 'fr', 'de', 'it', 'pt']
const LOCALE_NAMES = { en: 'English', nl: 'Dutch', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese' }
const TAGS_BY_LOCALE = {
  en: ['trichocereus', 'cultivation', 'guide'],
  nl: ['trichocereus', 'teelt', 'gids'],
  fr: ['trichocereus', 'culture', 'guide'],
  de: ['trichocereus', 'anbau', 'leitfaden'],
  it: ['trichocereus', 'coltivazione', 'guida'],
  pt: ['trichocereus', 'cultivo', 'guia'],
}

const MAX_CHARS = 12000
const MODEL = 'gpt-4.1-mini'

function log(msg, indent = 0) {
  const pad = '   '.repeat(indent)
  const ts = new Date().toLocaleTimeString('es-ES', { hour12: false })
  console.log(`[${ts}] ${pad}${msg}`)
}

// ═══════════════════════════════════════════════════════════════════════════
// PROMPT PERFECTO: Mejora contenido desordenado → HTML SEO
// ═══════════════════════════════════════════════════════════════════════════
const IMPROVE_SYSTEM_PROMPT = `Eres un experto en contenido web y SEO para Tricholand, vivero B2B especializado en Trichocereus (cactus columnares) en Murcia, España.

TU MISIÓN: Vas a recibir una MIERDA de texto — markdown desordenado, HTML mal formado, sintaxis mezclada, **asteriscos sin convertir**, ## encabezados crudos, listas con guiones, espacios raros, o estructura caótica. Tu trabajo es TRANSFORMARLO en HTML perfecto, limpio, semántico y optimizado para SEO. El resultado debe ser impecable.

REGLAS ESTRICTAS:
1. **Estructura semántica**: Un solo <h1> (título principal). <h2> para secciones principales. <h3> para subsecciones. Jerarquía: h1 → h2 → h3. Nunca saltar niveles.
2. **Párrafos**: Todo el texto en <p>. Sin bloques sueltos. Sin <p></p> vacíos.
3. **Énfasis**: <strong> para negrita (términos clave, alertas). <em> para cursiva (nombres científicos: Trichocereus, Echinopsis, Brevipalpus, etc.).
4. **Listas**: <ul><li> para viñetas. <ol><li> para pasos numerados. Cada ítem en su <li>.
5. **SEO**: Encabezados descriptivos con palabras clave. Párrafos con términos naturales (Trichocereus, cultivo, plagas, vivero, etc.).
6. **Limpieza total**: Elimina ** ## * - sin convertir, caracteres raros, espacios dobles, saltos absurdos, HTML roto.
7. **Solo tags válidos**: p, h1, h2, h3, ul, ol, li, strong, em. Nada más. Sin div, span innecesarios.
8. **UTF-8**: á, é, í, ó, ú, ñ directamente. &quot; solo si hace falta en atributos.

OUTPUT: Devuelve ÚNICAMENTE el HTML. Cero explicaciones. Cero markdown. Cero \`\`\`. Solo HTML listo para producción.`

const IMPROVE_USER_PREFIX = `Aquí tienes el texto desordenado. Transfórmalo en HTML perfecto para SEO. Solo devuelve el HTML, nada más:\n\n`

// ═══════════════════════════════════════════════════════════════════════════
// PROMPT TRADUCCIÓN
// ═══════════════════════════════════════════════════════════════════════════
function getTranslatePrompt(locale) {
  const lang = LOCALE_NAMES[locale] ?? locale
  return `Eres traductor profesional para Tricholand, vivero B2B de Trichocereus en España.
Traduce del español al ${lang}. Mantén el tono profesional e informativo.
NO traduzcas: Trichocereus, Echinopsis, Tricholand, nombres científicos en cursiva.
El contenido es HTML. Traduce SOLO el texto dentro de los tags. Mantén los tags exactamente igual.
Devuelve ÚNICAMENTE el HTML traducido, nada más.`
}

// ═══════════════════════════════════════════════════════════════════════════
// LLAMADAS OPENAI
// ═══════════════════════════════════════════════════════════════════════════
async function callOpenAI(systemPrompt, userContent, field = 'content', logLabel = '') {
  const inputChars = userContent.length
  if (logLabel) log(`📤 API OpenAI (${field}) — enviando ${inputChars} caracteres...`, 2)
  const t0 = Date.now()
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userContent },
      ],
      temperature: 0.2,
      max_tokens: 16384,
    }),
  })
  if (!response.ok) {
    const err = await response.text()
    throw new Error(`OpenAI: ${response.status} — ${err}`)
  }
  const data = await response.json()
  let html = (data.choices?.[0]?.message?.content ?? '').trim()
  const outputChars = html.length
  const usage = data.usage
  const elapsed = ((Date.now() - t0) / 1000).toFixed(1)
  if (logLabel) log(`📥 Respuesta en ${elapsed}s — ${outputChars} chars${usage ? ` | tokens: ${usage.prompt_tokens} in / ${usage.completion_tokens} out` : ''}`, 2)
  // Limpiar si la IA devolvió ```html ... ```
  const codeMatch = html.match(/^```(?:html)?\s*([\s\S]*?)```\s*$/m)
  if (codeMatch) {
    html = codeMatch[1].trim()
    if (logLabel) log(`   (limpiado bloque de código)`, 2)
  }
  return html
}

async function improveContentChunk(chunk, isFirst = false, chunkIndex = 0, totalChunks = 1) {
  const prefix = isFirst ? IMPROVE_USER_PREFIX : 'Continúa transformando. Solo devuelve el HTML de esta parte:\n\n'
  const label = totalChunks > 1 ? `mejora chunk ${chunkIndex + 1}/${totalChunks}` : 'mejora'
  return callOpenAI(IMPROVE_SYSTEM_PROMPT, prefix + chunk, 'content', label)
}

async function improveContentFull(raw) {
  if (!raw || typeof raw !== 'string') return ''
  const text = raw.trim()
  log(`   Contenido original: ${text.length} caracteres`, 1)
  if (text.length <= MAX_CHARS) {
    log(`   Procesando en 1 llamada (≤${MAX_CHARS} chars)`, 1)
    return improveContentChunk(text, true, 0, 1)
  }
  log(`   Contenido largo → dividiendo en chunks de ~${MAX_CHARS} chars`, 1)
  const parts = text.split(/\n\n+/)
  const chunks = []
  let current = ''
  for (const p of parts) {
    if (current.length + p.length + 2 > MAX_CHARS && current) {
      chunks.push(current.trim())
      current = ''
    }
    current += (current ? '\n\n' : '') + p
  }
  if (current) chunks.push(current.trim())
  log(`   Dividido en ${chunks.length} chunks`, 1)

  const results = []
  for (let i = 0; i < chunks.length; i++) {
    log(`   Procesando chunk ${i + 1}/${chunks.length} (${chunks[i].length} chars)...`, 1)
    const html = await improveContentChunk(chunks[i], i === 0, i, chunks.length)
    results.push(html)
    log(`   Chunk ${i + 1} listo (${html.length} chars de HTML)`, 1)
    if (i < chunks.length - 1) {
      log(`   Esperando 500ms antes del siguiente chunk...`, 1)
      await new Promise((r) => setTimeout(r, 500))
    }
  }
  const total = results.join('\n\n')
  log(`   HTML total generado: ${total.length} caracteres`, 1)
  return total
}

async function translateContent(html, locale) {
  const prompt = getTranslatePrompt(locale)
  return callOpenAI(prompt, `Traduce este HTML al ${LOCALE_NAMES[locale]}:\n\n${html}`, 'content', `traducir contenido → ${locale}`)
}

function slugify(title) {
  const accents = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ñ: 'n', ü: 'u', ä: 'a', ö: 'o', ß: 'ss', à: 'a', è: 'e', ì: 'i', ò: 'o', ù: 'u', â: 'a', ê: 'e', î: 'i', ô: 'o', û: 'u', ç: 'c' }
  let s = title.toLowerCase().trim()
  for (const [accent, plain] of Object.entries(accents)) s = s.replace(new RegExp(accent, 'g'), plain)
  s = s.replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
  return s || 'post'
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════
async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const doTranslate = process.argv.includes('--translate')
  const slugArg = process.argv.includes('--slug') ? process.argv[process.argv.indexOf('--slug') + 1] : null
  const idArg = process.argv.includes('--id') ? process.argv[process.argv.indexOf('--id') + 1] : null
  const limitIdx = process.argv.indexOf('--limit')
  const limit = limitIdx >= 0 ? parseInt(process.argv[limitIdx + 1], 10) : null

  console.log('\n🤖 AI Blog Perfect — Limpieza + SEO + Traducción\n')
  log('Modo: ' + (dryRun ? 'DRY RUN (no se guardará)' : 'PRODUCCIÓN (guardará en Supabase)'), 0)
  log('Traducción: ' + (doTranslate ? 'SÍ (EN, NL, FR, DE, IT, PT)' : 'NO'), 0)
  log('', 0)

  let posts = []
  log('Cargando artículos desde Supabase...', 0)

  if (idArg) {
    const { data, error } = await supabase.from('blog_posts').select('*').eq('id', idArg).eq('locale', 'es').single()
    if (error || !data) {
      console.error('❌ No se encontró artículo con id:', idArg)
      process.exit(1)
    }
    posts = [data]
    log(`   Filtro por ID: ${idArg} → 1 artículo`, 0)
  } else if (slugArg) {
    const { data, error } = await supabase.from('blog_posts').select('*').eq('slug', slugArg).eq('locale', 'es').single()
    if (error || !data) {
      console.error('❌ No se encontró artículo con slug:', slugArg)
      process.exit(1)
    }
    posts = [data]
    log(`   Filtro por slug: ${slugArg} → 1 artículo`, 0)
  } else {
    const { data, error } = await supabase.from('blog_posts').select('*').eq('locale', 'es').eq('status', 'published').order('date', { ascending: false })
    if (error) {
      console.error('❌ Error leyendo posts:', error.message)
      process.exit(1)
    }
    posts = data ?? []
    log(`   Todos los publicados (locale=es) → ${posts.length} artículos`, 0)
  }

  if (limit && limit > 0) {
    posts = posts.slice(0, limit)
    log(`   Limitado a ${limit} artículos`, 0)
  }

  log(`Total a procesar: ${posts.length} artículos`, 0)
  console.log('')
  log('Conectado a Supabase: ' + NEXT_PUBLIC_SUPABASE_URL.replace(/https?:\/\//, '').split('.')[0] + '...', 0)
  log('Modelo OpenAI: ' + MODEL, 0)
  log('', 0)

  const startTotal = Date.now()
  let processed = 0
  let errors = 0

  for (let idx = 0; idx < posts.length; idx++) {
    const post = posts[idx]
    const n = idx + 1
    const total = posts.length

    console.log(`\n${'═'.repeat(70)}`)
    log(`ARTÍCULO ${n}/${total}`, 0)
    console.log(`${'═'.repeat(70)}`)
    log(`Título: ${post.title}`, 1)
    log(`Slug: ${post.slug}`, 1)
    log(`ID: ${post.id}`, 1)
    log(`Contenido: ${(post.content || '').length} caracteres`, 1)
    console.log(`${'─'.repeat(70)}`)

    try {
      log('FASE 1: Mejora y optimización SEO con OpenAI', 1)
      const t0 = Date.now()
      const improvedHtml = await improveContentFull(post.content)
      const elapsed = ((Date.now() - t0) / 1000).toFixed(1)
      log(`Fase 1 completada en ${elapsed}s`, 1)

      if (!improvedHtml) {
        log('⚠️  Respuesta vacía de la IA, se mantiene contenido original', 1)
        errors++
        continue
      }

      const preview = improvedHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 100) + '...'
      log(`Vista previa HTML: ${preview}`, 1)
      log(`Tamaño resultado: ${improvedHtml.length} caracteres`, 1)

      if (!dryRun) {
        log('Guardando en Supabase (tabla blog_posts)...', 1)
        const { error } = await supabase.from('blog_posts').update({ content: improvedHtml }).eq('id', post.id)
        if (error) throw error
        log('✓ Contenido ES guardado correctamente', 1)
      } else {
        log('(dry-run: no se guarda)', 1)
      }

      if (doTranslate && !dryRun) {
        log('', 1)
        log('FASE 2: Traducción a 6 idiomas (EN, NL, FR, DE, IT, PT)', 1)
        for (let li = 0; li < TARGET_LOCALES.length; li++) {
          const locale = TARGET_LOCALES[li]
          const langName = LOCALE_NAMES[locale]
          log(``, 1)
          log(`→ Traduciendo a ${locale.toUpperCase()} (${langName}) [${li + 1}/6]...`, 1)
          try {
            const tTr = Date.now()
            log(`   Llamando API: título (${post.title.length} chars)`, 2)
            const titleTr = await callOpenAI(getTranslatePrompt(locale), `Traduce solo este título:\n\n${post.title}`, 'title', `título → ${locale}`)
            log(`   Llamando API: descripción`, 2)
            const descTr = await callOpenAI(getTranslatePrompt(locale), `Traduce solo esta descripción:\n\n${post.description || post.title}`, 'desc', `descripción → ${locale}`)
            log(`   Llamando API: contenido (${improvedHtml.length} chars)`, 2)
            const contentTr = await translateContent(improvedHtml, locale)
            const slugTr = slugify(titleTr)
            const row = {
              source_slug: post.slug,
              slug: slugTr,
              title: titleTr,
              description: descTr,
              date: post.date,
              image: post.image,
              image_alt: titleTr,
              tags: TAGS_BY_LOCALE[locale] ?? TAGS_BY_LOCALE.en,
              reading_time: post.reading_time,
              content: contentTr,
              locale,
              status: 'published',
            }
            const { error } = await supabase.from('blog_posts').upsert(row, { onConflict: 'source_slug,locale' })
            if (error) throw error
            const elapsedTr = ((Date.now() - tTr) / 1000).toFixed(1)
            log(`   ✓ ${locale.toUpperCase()} guardado en ${elapsedTr}s — "${titleTr.substring(0, 45)}..."`, 2)
          } catch (err) {
            errors++
            log(`   ❌ Error ${locale}: ${err.message}`, 2)
          }
          await new Promise((r) => setTimeout(r, 400))
        }
        log(`Fase 2 completada para este artículo`, 1)
      }

      processed++
      log(`Esperando 800ms antes del siguiente artículo...`, 1)
      await new Promise((r) => setTimeout(r, 800))
    } catch (err) {
      errors++
      log(`❌ Error procesando artículo: ${err.message}`, 1)
    }
  }

  const totalElapsed = ((Date.now() - startTotal) / 1000).toFixed(1)
  console.log(`\n${'═'.repeat(70)}`)
  log('RESUMEN FINAL', 0)
  console.log(`${'═'.repeat(70)}`)
  log(`Artículos procesados: ${processed}/${posts.length}`, 1)
  if (errors) log(`Errores: ${errors}`, 1)
  log(`Tiempo total: ${totalElapsed}s`, 1)
  log(`Proceso completado`, 1)
  console.log(`${'═'.repeat(70)}\n`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
