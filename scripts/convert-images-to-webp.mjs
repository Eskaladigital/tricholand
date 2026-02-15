/**
 * Convierte imágenes PNG/JPG a WebP en images/ (raíz del proyecto).
 * Las convierte in situ, sin moverlas a public.
 * Ejecutar: node scripts/convert-images-to-webp.mjs
 */
import sharp from 'sharp'
import { join, dirname, extname } from 'path'
import { fileURLToPath } from 'url'
import { readdirSync, unlinkSync, existsSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const IMAGES_DIR = join(ROOT, 'images')

const EXCLUDE = []

function getAllImageFiles(dir, files = []) {
  if (!existsSync(dir)) return files
  const entries = readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) {
      getAllImageFiles(full, files)
    } else if (/\.(png|jpe?g)$/i.test(e.name) && !EXCLUDE.includes(e.name)) {
      files.push(full)
    }
  }
  return files
}

async function main() {
  const files = getAllImageFiles(IMAGES_DIR)
  if (files.length === 0) {
    console.log('No se encontraron imágenes PNG/JPG en images/')
    return
  }

  console.log(`Convirtiendo ${files.length} imágenes a WebP...`)

  let converted = 0
  let errors = 0

  for (const filePath of files) {
    const ext = extname(filePath).toLowerCase()
    const webpPath = filePath.replace(/\.(png|jpe?g)$/i, '.webp')

    try {
      const pipeline = sharp(filePath)
      const meta = await pipeline.metadata()
      const isTransparent = meta.hasAlpha

      await sharp(filePath)
        .webp({
          quality: 82,
          effort: 4,
          alphaQuality: isTransparent ? 100 : undefined,
        })
        .toFile(webpPath)

      unlinkSync(filePath)
      converted++
      const rel = filePath.replace(ROOT, '').replace(/\\/g, '/')
      console.log(`  ✓ ${rel} → .webp`)
    } catch (err) {
      errors++
      console.error(`  ✗ ${filePath}: ${err.message}`)
    }
  }

  console.log(`\n✅ ${converted} imágenes convertidas a WebP en images/`)
  if (errors > 0) console.log(`⚠️ ${errors} errores`)
}

main().catch(console.error)
