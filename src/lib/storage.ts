/**
 * Helper para construir URLs públicas de Supabase Storage.
 *
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║  REGLA DE ORO — ORIGEN DE IMÁGENES (¡NO TOCAR SIN LEER ESTO!)    ║
 * ╠══════════════════════════════════════════════════════════════════════╣
 * ║                                                                    ║
 * ║  LOCAL (public/images/):                                           ║
 * ║    • Home (HeroSection, CatalogPreview)                            ║
 * ║    • Variedades (/variedades) — src/content/varieties/es/data.ts   ║
 * ║    • Sobre nosotros (7 idiomas)                                    ║
 * ║    • Logo (Header, Footer) — /images/icons/                        ║
 * ║    • OG image (layouts) — /images/og-image.webp                    ║
 * ║    → Usan paths tipo "/images/varieties/...", "/images/vivero/..." ║
 * ║    → Next.js <Image> con unoptimized (estáticas)                   ║
 * ║                                                                    ║
 * ║  SUPABASE STORAGE:                                                 ║
 * ║    • Tienda — productos (bucket "plants", vía BD → products.images)║
 * ║    • Blog — artículos (bucket "blog", vía getBlogImageUrl)         ║
 * ║    → URLs https://xxx.supabase.co/storage/v1/object/public/...     ║
 * ║    → Next.js <Image> SIEMPRE con unoptimized                       ║
 * ║                                                                    ║
 * ║  NUNCA mover imágenes de Home/Variedades a Supabase.               ║
 * ║  NUNCA mover imágenes de Tienda/Blog a public/.                    ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 *
 * Bucket «plants»: imágenes de productos de tienda.
 *   Estructura de carpetas dentro del bucket:
 *     Pachanoi/  Peruvianus/  Bridgesii/  Terscheckii/  Macrogonus/  Spachianus/  Otros/  Vivero/
 *
 * Bucket «blog»: imágenes de artículos del blog.
 *   Estructura de carpetas: 2026.02/  2026.03/  etc.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''

/** URL pública de un archivo en el bucket `plants`. */
export function getPlantImageUrl(path: string): string {
  if (!path) return ''
  if (path.startsWith('http')) return path
  const clean = path.startsWith('/') ? path.slice(1) : path
  return `${SUPABASE_URL}/storage/v1/object/public/plants/${clean}`
}

/** URL pública de un archivo en el bucket `blog`. */
export function getBlogImageUrl(path: string): string {
  if (!path) return ''
  if (path.startsWith('http')) return path
  const clean = path.startsWith('/') ? path.slice(1) : path
  return `${SUPABASE_URL}/storage/v1/object/public/blog/${clean}`
}

/** Devuelve la URL tal cual. Las imágenes de producto están en Supabase Storage. */
export function resolveProductImageUrl(url: string): string {
  if (!url) return ''
  return url
}
