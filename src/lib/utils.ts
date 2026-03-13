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
 * Trunca un texto para meta description (máx 155 chars) cortando en frontera de palabra.
 */
export function truncateDescription(text: string, max = 155): string {
  if (!text || text.length <= max) return text
  const truncated = text.slice(0, max)
  const lastSpace = truncated.lastIndexOf(' ')
  return (lastSpace > 80 ? truncated.slice(0, lastSpace) : truncated) + '…'
}

/**
 * Calcula tiempo de lectura estimado
 */
export function readingTime(text: string): number {
  const wordsPerMinute = 200
  const words = text.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}
