/**
 * Genera favicon, apple-touch-icon y og-image desde assets
 * Ejecutar: node scripts/generate-favicon.mjs
 */
import sharp from 'sharp'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const LOGO = join(ROOT, 'public/images/icons/logo_tricho.webp')
const HERO_IMAGE = join(ROOT, 'public/images/vivero/productores_cactus_1.webp')
const OUT_FAVICON = join(ROOT, 'public/favicon.png')
const OUT_APPLE = join(ROOT, 'public/apple-touch-icon.png')
const OUT_OG = join(ROOT, 'public/images/og-image.webp')

async function main() {
  // Favicon y apple-touch-icon: logo con fondo blanco
  const withWhiteBg = (size) =>
    sharp(LOGO)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .png()

  await withWhiteBg(32).toFile(OUT_FAVICON)
  console.log('✅ favicon.png creado (32x32, fondo blanco)')

  await withWhiteBg(180).toFile(OUT_APPLE)
  console.log('✅ apple-touch-icon.png creado (180x180)')

  // Open Graph: 1200x630 desde imagen hero (cover)
  await sharp(HERO_IMAGE)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .webp({ quality: 85 })
    .toFile(OUT_OG)
  console.log('✅ og-image.webp creado (1200x630, Open Graph)')
}

main().catch((err) => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
