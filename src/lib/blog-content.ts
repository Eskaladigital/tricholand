import { marked } from 'marked'

/**
 * Renderiza el contenido del blog para la página pública.
 * Formato estándar: HTML. Si el contenido es Markdown (legacy), se convierte con marked.
 */
export function renderBlogContent(content: string): string {
  if (!content) return ''
  const trimmed = content.trim()
  if (trimmed.startsWith('<')) return content // HTML — formato estándar
  return marked.parse(content, { async: false }) as string // Markdown legacy — fallback
}
