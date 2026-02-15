/**
 * Helper para construir URLs públicas de Supabase Storage.
 *
 * Bucket «plants»: imágenes de variedades, productos y vivero.
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

/**
 * Para productos de tienda: si la URL apunta a Supabase plants pero el archivo
 * puede no existir allí, usa la imagen local cuando la tengamos en public/images.
 * Evita imágenes rotas cuando el seed creó productos con URLs que nunca se subieron.
 */
const PLANTS_TO_LOCAL: Record<string, string> = {
  'Vivero/vivero_mayorista_cactus.webp': '/images/vivero/vivero_mayorista_cactus.webp',
  'Vivero/vivero-020.webp': '/images/vivero/vivero-020.webp',
  'Vivero/vivero-010.webp': '/images/vivero/vivero-010.webp',
  'Pachanoi/producto_trichocereus_pachanoi_1.webp': '/images/products/producto_trichocereus_pachanoi_1.webp',
  'Pachanoi/producto_trichocereus_pachanoi_2.webp': '/images/products/producto_trichocereus_pachanoi_2.webp',
  'Peruvianus/producto_trichocereus_peruvianus_1.webp': '/images/products/producto_trichocereus_peruvianus_1.webp',
  'Bridgesii/producto_trichocereus_bridgessi_1.webp': '/images/products/producto_trichocereus_bridgessi_1.webp',
  'Terscheckii/Trichocereus_terscheckii_1.webp': '/images/varieties/Trichocereus_terscheckii_1.webp',
}

function extractPlantsPath(url: string): string | null {
  if (!url || !url.includes('supabase.co')) return null
  const match = url.match(/\/storage\/v1\/object\/public\/plants\/(.+)$/)
  return match ? match[1] : null
}

/** Devuelve URL local si existe mapeo, sino la original. */
export function resolveProductImageUrl(url: string): string {
  if (!url) return ''
  const path = extractPlantsPath(url)
  if (path && PLANTS_TO_LOCAL[path]) return PLANTS_TO_LOCAL[path]
  return url
}
