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
 * Añade dimensiones a las imágenes para evitar CLS (Cumulative Layout Shift).
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
  
  let html = ''
  if (!hasMarkdown && trimmed.startsWith('<')) {
    html = content // HTML puro
  } else {
    let toConvert = content
    if (trimmed.startsWith('<') && hasMarkdown) {
      toConvert = extractMarkdownFromHtml(content)
    }
    html = marked.parse(toConvert, { async: false }) as string
  }
  
  // Añadir dimensiones a imágenes sin width/height para evitar CLS
  html = html.replace(/<img\s+([^>]*?)>/gi, (match, attrs) => {
    // Si ya tiene width y height, no modificar
    if (/width\s*=/i.test(attrs) && /height\s*=/i.test(attrs)) {
      return match
    }
    // Añadir dimensiones por defecto (16:9 aspect ratio, tamaño común blog)
    const hasWidth = /width\s*=/i.test(attrs)
    const hasHeight = /height\s*=/i.test(attrs)
    let newAttrs = attrs
    if (!hasWidth) {
      newAttrs += ' width="800"'
    }
    if (!hasHeight) {
      newAttrs += ' height="450"'
    }
    return `<img ${newAttrs}>`
  })
  
  return html
}
