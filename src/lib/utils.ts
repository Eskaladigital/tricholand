/**
 * Combina clases CSS condicionalmente (mini clsx)
 */
export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Formatea una fecha ISO a formato local
 */
export function formatDate(dateStr: string, locale: string = 'es'): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale === 'es' ? 'es-ES' : locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Calcula tiempo de lectura estimado
 */
export function readingTime(text: string): number {
  const wordsPerMinute = 200
  const words = text.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}
