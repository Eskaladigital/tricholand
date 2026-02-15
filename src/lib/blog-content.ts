import { marked } from 'marked'

const HTML_ENTITIES: Record<string, string> = {
  aacute: 'á', eacute: 'é', iacute: 'í', oacute: 'ó', uacute: 'ú', ntilde: 'ñ',
  ldquo: '"', rdquo: '"', quot: '"', amp: '&', lt: '<', gt: '>',
}

/** Extrae Markdown de contenido híbrido (HTML con Markdown dentro, ej: <p># ... **</p>) */
function extractMarkdownFromHtml(html: string): string {
  let text = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>\s*<p/gi, '\n\n')
    .replace(/<\/?(?:div|p|span|h[1-6])[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
  text = text.replace(/&([a-z]+);/gi, (_, name) => HTML_ENTITIES[name] ?? `&${name};`)
  text = text.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
  return text.replace(/\n{3,}/g, '\n\n').trim()
}

/**
 * Renderiza el contenido del blog para la página pública.
 * Soporta: HTML puro, Markdown puro, o híbrido (HTML con Markdown dentro).
 * El frontend usa el mismo resultado que TinyMCE: HTML listo para renderizar.
 */
export function renderBlogContent(content: string): string {
  if (!content) return ''
  const trimmed = content.replace(/^\ufeff/, '').trim()
  const hasMarkdown =
    trimmed.includes('**') ||
    trimmed.includes('__') ||
    trimmed.includes('##') ||
    trimmed.includes('# ') ||
    trimmed.includes('###') ||
    trimmed.includes('\n* ') ||
    trimmed.includes('\n- ') ||
    trimmed.includes('\n1. ') ||
    /^#+\s/m.test(trimmed) ||
    /^[\*\-]\s/m.test(trimmed) ||
    />#+\s/m.test(trimmed) || // híbrido: <p># Título
    />\*\*/m.test(trimmed) // híbrido: <p>**texto**
  if (!hasMarkdown && trimmed.startsWith('<')) return content // HTML puro
  let toConvert = content
  if (trimmed.startsWith('<') && hasMarkdown) {
    toConvert = extractMarkdownFromHtml(content)
  }
  return marked.parse(toConvert, { async: false }) as string
}
