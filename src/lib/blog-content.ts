import { marked } from 'marked'

/** Convierte markdown a HTML. Si el contenido ya es HTML (empieza con <), lo devuelve tal cual. */
export function renderBlogContent(content: string): string {
  if (!content) return ''
  const trimmed = content.trim()
  if (trimmed.startsWith('<')) return content
  return marked.parse(content, { async: false }) as string
}
