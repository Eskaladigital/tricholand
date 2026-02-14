/**
 * Genera favicon con fondo blanco desde logo_tricho.webp
 * Ejecutar: node scripts/generate-favicon.mjs
 */
import sharp from 'sharp'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const LOGO = join(ROOT, 'public/images/icons/logo_tricho.webp')
const OUT_FAVICON = join(ROOT, 'public/favicon.png')
const OUT_APPLE = join(ROOT, 'public/apple-touch-icon.png')

async function main() {
  // resize con fit: contain + background blanco = logo sobre fondo blanco
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
}

main().catch((err) => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
