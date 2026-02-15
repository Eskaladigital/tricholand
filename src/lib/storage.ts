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

/** Devuelve la URL tal cual. Las imágenes de producto están en Supabase Storage. */
export function resolveProductImageUrl(url: string): string {
  if (!url) return ''
  return url
}
