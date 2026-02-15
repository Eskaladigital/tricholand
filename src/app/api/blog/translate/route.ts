import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const TARGET_LOCALES = ['en', 'nl', 'fr', 'de', 'it', 'pt'] as const
const LOCALE_NAMES: Record<string, string> = {
  en: 'English', nl: 'Dutch', fr: 'French',
  de: 'German', it: 'Italian', pt: 'Portuguese',
}
const TAGS_BY_LOCALE: Record<string, string[]> = {
  en: ['trichocereus', 'cultivation', 'guide'],
  nl: ['trichocereus', 'teelt', 'gids'],
  fr: ['trichocereus', 'culture', 'guide'],
  de: ['trichocereus', 'anbau', 'leitfaden'],
  it: ['trichocereus', 'coltivazione', 'guida'],
  pt: ['trichocereus', 'cultivo', 'guia'],
}

const SLUG_OVERRIDES: Record<string, Record<string, string>> = {
  'guia-de-enfermedades-fungicas-en-cactus-como-prevenir-y-tratarlas': {
    en: 'a-complete-guide-to-fungal-diseases-in-cacti-how-to-prevent-and-treat-them',
  },
}

function slugify(title: string): string {
  const accents: Record<string, string> = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ñ: 'n', ü: 'u', ä: 'a', ö: 'o', ß: 'ss', à: 'a', è: 'e', ì: 'i', ò: 'o', ù: 'u', â: 'a', ê: 'e', î: 'i', ô: 'o', û: 'u', ç: 'c' }
  let s = title.toLowerCase().trim()
  for (const [accent, plain] of Object.entries(accents)) {
    s = s.replace(new RegExp(accent, 'g'), plain)
  }
  s = s.replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
  return s || 'post'
}

const MAX_OUTPUT_TOKENS = 16384
const CHARS_PER_CHUNK = Math.floor(MAX_OUTPUT_TOKENS / 1.3)

function splitIntoChunks(text: string): string[] {
  if (text.length <= CHARS_PER_CHUNK) return [text]
  const chunks: string[] = []
  const paragraphs = text.split(/\n\n+/)
  let current = ''
  for (const p of paragraphs) {
    if (current.length + p.length + 2 > CHARS_PER_CHUNK && current) {
      chunks.push(current.trim())
      current = ''
    }
    current += (current ? '\n\n' : '') + p
  }
  if (current) chunks.push(current.trim())
  return chunks
}

async function translateChunk(
  text: string,
  locale: string,
  langName: string,
  systemPrompt: string
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('OPENAI_API_KEY no configurado')

  const maxTokens = Math.min(MAX_OUTPUT_TOKENS, Math.max(1000, Math.ceil(text.length * 1.2)))
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Translate to ${langName}:\n\n${text}` },
      ],
      temperature: 0.3,
      max_tokens: maxTokens,
    }),
  })
  if (!response.ok) {
    const err = await response.text()
    throw new Error(`OpenAI: ${response.status} — ${err}`)
  }
  const data = (await response.json()) as { choices?: { message?: { content?: string } }[] }
  return (data.choices?.[0]?.message?.content ?? '').trim()
}

async function translateText(text: string, locale: string): Promise<string> {
  const langName = LOCALE_NAMES[locale] ?? locale
  const systemPrompt = `You are a professional translator for Tricholand, a B2B wholesale Trichocereus cactus nursery in Spain.

RULES:
- Translate from Spanish to ${langName}
- Keep the same tone: professional, B2B, informative
- DO NOT translate Latin botanical names (Trichocereus, Echinopsis, etc.)
- DO NOT translate brand names (Tricholand)
- DO NOT translate measurements (cm, m², °C, etc.)
- For botanical/horticultural terms, use standard ${langName} terminology
- Content is HTML (h1, h2, p, strong, ul, li, etc.). Translate ONLY the text inside tags, keep all HTML tags exactly as-is
- Output ONLY the translated HTML, nothing else`

  const chunks = splitIntoChunks(text)
  if (chunks.length === 1) {
    return translateChunk(text, locale, langName, systemPrompt)
  }

  const results: string[] = []
  for (let i = 0; i < chunks.length; i++) {
    results.push(await translateChunk(chunks[i], locale, langName, systemPrompt))
    if (i < chunks.length - 1) await new Promise((r) => setTimeout(r, 400))
  }
  return results.join('\n\n')
}

async function getAdminClient() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  return { supabase, user }
}

/** POST /api/blog/translate — Genera traducciones del artículo en español a todos los idiomas */
export async function POST(request: NextRequest) {
  const ctx = await getAdminClient()
  if (!ctx) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  let body: { source_slug?: string } = {}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Body JSON inválido' }, { status: 400 })
  }

  const sourceSlug = body.source_slug
  if (!sourceSlug || typeof sourceSlug !== 'string') {
    return NextResponse.json({ error: 'Falta source_slug' }, { status: 400 })
  }

  const { supabase } = ctx

  const { data: postEs, error: errFetch } = await supabase
    .from('blog_posts')
    .select('slug, title, description, content, date, image, image_alt, tags, reading_time, status')
    .eq('source_slug', sourceSlug)
    .eq('locale', 'es')
    .single()

  if (errFetch || !postEs) {
    return NextResponse.json({ error: 'No se encontró el artículo en español' }, { status: 404 })
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'OPENAI_API_KEY no configurado' }, { status: 500 })
  }

  const created: string[] = []
  const errors: string[] = []

  for (const locale of TARGET_LOCALES) {
    try {
      const [titleTr, descriptionTr, contentTr] = await Promise.all([
        translateText(postEs.title, locale),
        translateText(postEs.description || postEs.title, locale),
        translateText(postEs.content, locale),
      ])

      const slugTr = SLUG_OVERRIDES[postEs.slug]?.[locale] ?? slugify(titleTr)
      const tags = TAGS_BY_LOCALE[locale] ?? TAGS_BY_LOCALE.en

      const { error } = await supabase.from('blog_posts').upsert(
        {
          source_slug: sourceSlug,
          slug: slugTr,
          title: titleTr,
          description: descriptionTr,
          date: postEs.date,
          image: postEs.image,
          image_alt: titleTr,
          tags,
          reading_time: postEs.reading_time,
          content: contentTr,
          locale,
          status: (postEs as { status?: string }).status ?? 'published',
        },
        { onConflict: 'source_slug,locale' }
      )

      if (error) throw error
      created.push(locale)
      await new Promise((r) => setTimeout(r, 600))
    } catch (err) {
      errors.push(`${locale}: ${(err as Error).message}`)
    }
  }

  return NextResponse.json({
    ok: true,
    created,
    errors: errors.length > 0 ? errors : undefined,
  })
}
