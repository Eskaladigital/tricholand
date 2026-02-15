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

function looksLikeMarkdown(text) {
  if (!text || typeof text !== 'string') return false
  const trimmed = text.trim()
  if (trimmed.startsWith('<')) return false // Ya es HTML
  return trimmed.includes('##') || trimmed.includes('**') || trimmed.includes('\n* ') || trimmed.startsWith('#')
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

  const toMigrate = (posts ?? []).filter((p) => looksLikeMarkdown(p.content))
  console.log(`Total posts: ${posts?.length ?? 0}`)
  console.log(`A migrar (Markdown → HTML): ${toMigrate.length}\n`)

  if (toMigrate.length === 0) {
    console.log('✅ No hay artículos en Markdown. Nada que migrar.')
    return
  }

  for (const post of toMigrate) {
    try {
      const html = marked.parse(post.content, { async: false })
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
