/**
 * Importa artículos del CSV al blog en Supabase.
 * Fechas: desde hoy hacia atrás, alternando 7, 9, 11 días.
 *
 * Uso:
 *   node scripts/import-blog-from-csv.mjs
 *
 * Requiere: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY en .env.local
 * Ejecutar primero: supabase/blog-posts-schema.sql
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { parse } from 'csv-parse/sync'

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

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceKey) {
  console.error('❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local')
  process.exit(1)
}

const supabase = createClient(url, serviceKey)

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function htmlToMarkdown(html) {
  if (!html || typeof html !== 'string') return ''
  let md = html
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n\n# $1\n\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n\n## $1\n\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n\n### $1\n\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n\n#### $1\n\n')
    .replace(/<p[^>]*>/gi, '\n\n')
    .replace(/<\/p>/gi, '')
    .replace(/<ul[^>]*>/gi, '\n\n')
    .replace(/<\/ul>/gi, '\n\n')
    .replace(/<ol[^>]*>/gi, '\n\n')
    .replace(/<\/ol>/gi, '\n\n')
    .replace(/<li[^>]*>/gi, '\n- ')
    .replace(/<\/li>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
    .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim()
  return md
}

function extractDescription(text, maxLen = 200) {
  const plain = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  if (plain.length <= maxLen) return plain
  return plain.substring(0, maxLen).replace(/\s+\S*$/, '') + '...'
}

function estimateReadingTime(text) {
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

async function main() {
  const csvPath = join(ROOT, 'Table 1-Grid view (7).csv')
  if (!existsSync(csvPath)) {
    console.error('❌ No se encuentra Table 1-Grid view (7).csv')
    process.exit(1)
  }

  const content = readFileSync(csvPath, 'utf8')
  const records = parse(content, {
    columns: true,
    bom: true,
    relax_quotes: true,
    relax_column_count: true,
    skip_empty_lines: true,
  })

  const DAYS_OFFSET = [7, 9, 11]
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let totalDaysBack = 0

  console.log(`📝 Importando ${records.length} artículos al blog...\n`)

  for (let i = 0; i < records.length; i++) {
    const record = records[i]
    const title = record.Titulo?.trim()
    const articulo = record.Articulo?.trim()

    if (!title || !articulo) {
      console.log(`⏭️ Saltando ${i + 1}: sin título o contenido`)
      continue
    }

    const slug = slugify(title)
    if (!slug) {
      console.log(`⏭️ Saltando ${i + 1}: slug vacío`)
      continue
    }

    const contentMd = htmlToMarkdown(articulo)
    const description = extractDescription(articulo)
    const readingTime = estimateReadingTime(contentMd)

    const date = new Date(today)
    date.setDate(date.getDate() - totalDaysBack)
    const dateStr = date.toISOString().split('T')[0]

    totalDaysBack += DAYS_OFFSET[i % 3]

    const row = {
      slug,
      source_slug: slug,
      title,
      description,
      date: dateStr,
      image: '/images/blog/Tricholand_blog_1.png',
      image_alt: title,
      tags: ['trichocereus', 'cultivo', 'guía'],
      reading_time: readingTime,
      content: contentMd,
      locale: 'es',
      status: 'published',
    }

    const { error } = await supabase.from('blog_posts').upsert(row, {
      onConflict: 'source_slug,locale',
    })

    if (error) {
      console.error(`❌ ${slug}: ${error.message}`)
    } else {
      console.log(`✓ ${i + 1}/${records.length} — ${title.substring(0, 50)}... (${dateStr}) [es]`)
    }

    // Si hay versión en inglés en el CSV, insertar también
    const ingles = record.Ingles?.trim()
    if (ingles) {
      const h1Match = ingles.match(/<h1[^>]*>(.*?)<\/h1>/i)
      const titleEn = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : ingles.split('\n')[0]?.replace(/<[^>]+>/g, '').trim() || title
      const contentEn = htmlToMarkdown(ingles)
      const descriptionEn = extractDescription(ingles)
      const readingTimeEn = estimateReadingTime(contentEn)

      const slugEn = titleEn.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || slug
      const rowEn = {
        source_slug: slug,
        slug: slugEn,
        title: titleEn,
        description: descriptionEn,
        date: dateStr,
        image: '/images/blog/Tricholand_blog_1.png',
        image_alt: titleEn,
        tags: ['trichocereus', 'cultivation', 'guide'],
        reading_time: readingTimeEn,
        content: contentEn,
        locale: 'en',
        status: 'published',
      }

      const { error: errEn } = await supabase.from('blog_posts').upsert(rowEn, {
        onConflict: 'source_slug,locale',
      })

      if (errEn) {
        console.error(`❌ ${slug} [en]: ${errEn.message}`)
      } else {
        console.log(`   └─ EN: ${titleEn.substring(0, 45)}...`)
      }
    }
  }

  console.log(`\n✅ Importación completada. Artículos ES + EN (cuando hay columna Ingles) publicados.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
