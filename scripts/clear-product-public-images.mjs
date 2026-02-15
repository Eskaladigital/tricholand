/**
 * Limpia las imágenes de productos del catálogo que usan rutas de public/
 * (no de Supabase Storage). Solo las imágenes de Supabase (blog/plants) son válidas.
 * Elimina de la lista images las que apunten a public/ o URLs locales.
 *
 * Uso:
 *   node scripts/clear-product-public-images.mjs        (ejecutar)
 *   node scripts/clear-product-public-images.mjs --dry-run  (solo mostrar qué se limpiaría)
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

/** True si la imagen es de Supabase Storage */
function isSupabaseImage(url) {
  if (!url || typeof url !== 'string') return false
  return url.includes('supabase.co') && url.includes('/storage/v1/object/public/')
}

async function main() {
  console.log('📋 Obteniendo productos del catálogo...\n')

  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, slug, images')
    .not('images', 'is', null)

  if (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }

  const toUpdate = []
  for (const p of products ?? []) {
    const images = Array.isArray(p.images) ? p.images : []
    const validImages = images.filter((img) => isSupabaseImage(img?.url))
    if (validImages.length !== images.length) {
      toUpdate.push({
        id: p.id,
        name: p.name,
        slug: p.slug,
        oldImages: images,
        newImages: validImages,
      })
    }
  }

  if (toUpdate.length === 0) {
    console.log('✅ No hay productos con imágenes de public/. Todos usan Supabase o no tienen imagen.')
    return
  }

  console.log(`Encontrados ${toUpdate.length} producto(s) con imágenes de public/ (no Supabase):\n`)
  toUpdate.forEach((p) => {
    console.log(`  - ${p.slug} | "${p.name?.slice(0, 50)}..."`)
    p.oldImages.forEach((img, i) => {
      const keep = isSupabaseImage(img?.url)
      console.log(`    [${i}] ${keep ? '✓' : '✗'} ${img?.url?.slice(0, 70)}...`)
    })
    console.log(`    → Quedan ${p.newImages.length} imagen(es) válida(s)`)
  })

  if (dryRun) {
    console.log('\n🔍 Modo --dry-run: no se modificó nada. Quita --dry-run para ejecutar.')
    return
  }

  console.log('\n🔄 Limpiando imágenes...')

  for (const p of toUpdate) {
    const { error: updError } = await supabase
      .from('products')
      .update({ images: p.newImages })
      .eq('id', p.id)

    if (updError) {
      console.error(`  ❌ ${p.slug}: ${updError.message}`)
    } else {
      console.log(`  ✓ ${p.slug}`)
    }
  }

  console.log(`\n✅ Listo. ${toUpdate.length} producto(s) actualizado(s). Ahora puedes asignar imágenes desde el Gestor de medios.`)
}

main()
