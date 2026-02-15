#!/usr/bin/env node
/**
 * Migración: convierte contenido Markdown de blog_posts a HTML.
 * Los artículos deben estar en HTML para que TinyMCE y la página pública los rendericen correctamente.
 *
 * Uso: node scripts/migrate-blog-markdown-to-html.mjs
 *      node scripts/migrate-blog-markdown-to-html.mjs --dry-run
 *
 * Requiere: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY en .env.local
 */

import { createClient } from '@supabase/supabase-js'
import { marked } from 'marked'
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
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceKey) {
  console.error('❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local')
  process.exit(1)
}

const supabase = createClient(url, serviceKey)
const dryRun = process.argv.includes('--dry-run')

/** Detecta Markdown puro o HTML con Markdown dentro (ej: <p># Título **negrita**</p>) */
function needsMarkdownConversion(text) {
  if (!text || typeof text !== 'string') return false
  const trimmed = text.trim()
  const hasMarkdownSyntax = trimmed.includes('##') || trimmed.includes('**') || trimmed.includes('\n* ') || trimmed.includes('\n- ') || trimmed.startsWith('#')
  if (!hasMarkdownSyntax) return false
  if (!trimmed.startsWith('<')) return true // Markdown puro
  // HTML con Markdown dentro: <p># ... **...** </p>
  return trimmed.includes('**') || trimmed.includes('##') || trimmed.includes('# ')
}

const HTML_ENTITIES = { aacute: 'á', eacute: 'é', iacute: 'í', oacute: 'ó', uacute: 'ú', ntilde: 'ñ', ldquo: '"', rdquo: '"', quot: '"', amp: '&', lt: '<', gt: '>' }

/** Extrae Markdown de contenido híbrido (HTML con Markdown dentro) */
function extractMarkdownFromHtml(html) {
  let text = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>\s*<p/gi, '\n\n')
    .replace(/<\/?(?:div|p|span|h[1-6])[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
  text = text.replace(/&([a-z]+);/gi, (_, name) => HTML_ENTITIES[name] ?? `&${name};`)
  text = text.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
  return text.replace(/\n{3,}/g, '\n\n').trim()
}

async function main() {
  console.log('🔄 Migración: Markdown → HTML en blog_posts\n')
  if (dryRun) console.log('(Modo dry-run: no se guardarán cambios)\n')

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, slug, locale, content')

  if (error) {
    console.error('❌ Error leyendo blog_posts:', error.message)
    process.exit(1)
  }

  const toMigrate = (posts ?? []).filter((p) => needsMarkdownConversion(p.content))
  console.log(`Total posts: ${posts?.length ?? 0}`)
  console.log(`A migrar (Markdown → HTML): ${toMigrate.length}\n`)

  if (toMigrate.length === 0) {
    console.log('✅ No hay artículos en Markdown. Nada que migrar.')
    return
  }

  for (const post of toMigrate) {
    try {
      let toConvert = post.content
      if (post.content.trim().startsWith('<') && (post.content.includes('**') || post.content.includes('##'))) {
        toConvert = extractMarkdownFromHtml(post.content)
      }
      const html = marked.parse(toConvert, { async: false })
      const htmlStr = typeof html === 'string' ? html : String(html)

      console.log(`  ${post.slug} [${post.locale}] — ${post.content.length} chars → ${htmlStr.length} chars`)

      if (!dryRun) {
        const { error: updErr } = await supabase
          .from('blog_posts')
          .update({ content: htmlStr })
          .eq('id', post.id)

        if (updErr) {
          console.error(`    ❌ Error: ${updErr.message}`)
        } else {
          console.log(`    ✓ Actualizado`)
        }
      }
    } catch (err) {
      console.error(`  ❌ ${post.slug} [${post.locale}]: ${err.message}`)
    }
  }

  console.log(`\n✅ Migración completada. Formato estándar: HTML.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
