/**
 * Limpia el campo image de artículos del blog que usan imágenes de public/
 * (no de Supabase Storage). Solo las imágenes de Supabase blog bucket son válidas.
 *
 * Uso:
 *   node scripts/clear-blog-public-images.mjs        (ejecutar)
 *   node scripts/clear-blog-public-images.mjs --dry-run  (solo mostrar qué se limpiaría)
 *
 * Requiere: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY en .env.local
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

const { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env
const dryRun = process.argv.includes('--dry-run')

if (!NEXT_PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local')
  process.exit(1)
}

const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

/** True si la imagen es de Supabase Storage (bucket blog) */
function isSupabaseImage(url) {
  if (!url || typeof url !== 'string') return false
  return url.includes('supabase.co') && url.includes('/storage/v1/object/public/')
}

async function main() {
  console.log('📋 Obteniendo artículos del blog...\n')

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, slug, locale, title, image')
    .not('image', 'is', null)

  if (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }

  const toClear = posts.filter((p) => !isSupabaseImage(p.image))

  if (toClear.length === 0) {
    console.log('✅ No hay artículos con imágenes de public/. Todos usan Supabase o no tienen imagen.')
    return
  }

  console.log(`Encontrados ${toClear.length} artículo(s) con imagen de public/ (no Supabase):\n`)
  toClear.forEach((p) => {
    console.log(`  - ${p.locale}/${p.slug} | "${p.title?.slice(0, 50)}..."`)
    console.log(`    image: ${p.image?.slice(0, 80)}...`)
  })

  if (dryRun) {
    console.log('\n🔍 Modo --dry-run: no se modificó nada. Quita --dry-run para ejecutar.')
    return
  }

  console.log('\n🔄 Limpiando campo image...')

  for (const post of toClear) {
    const { error: updError } = await supabase
      .from('blog_posts')
      .update({ image: null, image_alt: null })
      .eq('id', post.id)

    if (updError) {
      console.error(`  ❌ ${post.slug} (${post.locale}): ${updError.message}`)
    } else {
      console.log(`  ✓ ${post.locale}/${post.slug}`)
    }
  }

  console.log(`\n✅ Listo. ${toClear.length} artículo(s) actualizado(s). Ahora puedes añadir imágenes desde Supabase Media.`)
}

main()
