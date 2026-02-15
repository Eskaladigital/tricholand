import { createClient } from '@supabase/supabase-js'
import type { BlogPost, BlogPostMeta } from '@/types/blog'

// Cliente público (sin cookies) para que funcione en generateStaticParams y en request
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const BLOG_LOCALES = ['es', 'en', 'nl', 'fr', 'de', 'it', 'pt'] as const

function getEffectiveLocale(locale: string): (typeof BLOG_LOCALES)[number] {
  if (BLOG_LOCALES.includes(locale as (typeof BLOG_LOCALES)[number])) {
    return locale as (typeof BLOG_LOCALES)[number]
  }
  return 'en'
}

/** Solo usa image si es de Supabase Storage; si no, null */
function isSupabaseImage(url: string | null): boolean {
  if (!url || typeof url !== 'string') return false
  return url.includes('supabase.co') && url.includes('/storage/v1/object/public/')
}

function rowToMeta(row: {
  slug: string
  title: string
  description: string | null
  date: string
  image: string | null
  image_alt: string | null
  tags: string[] | null
  reading_time: number
}): BlogPostMeta {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description || '',
    date: row.date,
    image: isSupabaseImage(row.image) ? row.image! : null,
    imageAlt: row.image_alt || row.title,
    tags: row.tags || [],
    readingTime: row.reading_time,
  }
}

function rowToPost(row: {
  slug: string
  title: string
  description: string | null
  date: string
  image: string | null
  image_alt: string | null
  tags: string[] | null
  reading_time: number
  content: string
}): BlogPost {
  return {
    ...rowToMeta(row),
    content: row.content,
  }
}

export async function getPostsMeta(locale: string): Promise<BlogPostMeta[]> {
  const effectiveLocale = getEffectiveLocale(locale)

  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug, title, description, date, image, image_alt, tags, reading_time, source_slug')
    .eq('locale', effectiveLocale)
    .eq('status', 'published')
    .order('date', { ascending: false })

  if (error) {
    console.error('getPostsMeta error:', error)
    return []
  }

  const rows = (data || []) as Array<{ slug: string; title: string; description: string | null; date: string; image: string | null; image_alt: string | null; tags: string[] | null; reading_time: number; source_slug?: string }>

  // Fallback: traducciones sin imagen → usar imagen del artículo ES (misma lógica que getPostBySlug)
  if (effectiveLocale !== 'es') {
    const missingSourceSlugs = [...new Set(
      rows
        .filter((r) => !r.image || !isSupabaseImage(r.image))
        .map((r) => r.source_slug)
        .filter((s): s is string => !!s)
    )]
    if (missingSourceSlugs.length > 0) {
      const { data: esPosts } = await supabase
        .from('blog_posts')
        .select('source_slug, image, image_alt')
        .eq('locale', 'es')
        .eq('status', 'published')
        .in('source_slug', missingSourceSlugs)
      const imageBySource: Record<string, { image: string; image_alt?: string }> = {}
      for (const p of esPosts || []) {
        if (p.image && isSupabaseImage(p.image)) {
          imageBySource[p.source_slug] = { image: p.image, image_alt: p.image_alt ?? undefined }
        }
      }
      for (const row of rows) {
        if ((!row.image || !isSupabaseImage(row.image)) && row.source_slug && imageBySource[row.source_slug]) {
          const fallback = imageBySource[row.source_slug]
          row.image = fallback.image
          row.image_alt = row.image_alt || fallback.image_alt || null
        }
      }
    }
  }

  return rows.map(rowToMeta)
}

export async function getPostBySlug(slug: string, locale: string): Promise<BlogPost | null> {
  const effectiveLocale = getEffectiveLocale(locale)

  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug, title, description, date, image, image_alt, tags, reading_time, content, source_slug')
    .eq('slug', slug)
    .eq('locale', effectiveLocale)
    .eq('status', 'published')
    .single()

  if (!error && data) {
    const post = rowToPost(data)
    // Fallback: si la traducción no tiene imagen, usar la del artículo ES (source)
    if (!post.image && effectiveLocale !== 'es' && (data as { source_slug?: string }).source_slug) {
      const { data: esPost } = await supabase
        .from('blog_posts')
        .select('image, image_alt')
        .eq('source_slug', (data as { source_slug: string }).source_slug)
        .eq('locale', 'es')
        .eq('status', 'published')
        .single()
      if (esPost?.image && isSupabaseImage(esPost.image)) {
        post.image = esPost.image
        post.imageAlt = esPost.image_alt || post.imageAlt
      }
    }
    return post
  }

  // URL antigua: slug en español en idioma no-ES. Buscar por source_slug y redirigir al slug correcto.
  if (effectiveLocale !== 'es') {
    const { data: bySource } = await supabase
      .from('blog_posts')
      .select('slug, title, description, date, image, image_alt, tags, reading_time, content, source_slug')
      .eq('source_slug', slug)
      .eq('locale', effectiveLocale)
      .eq('status', 'published')
      .single()
    if (bySource) {
      const post = rowToPost(bySource)
      if (!post.image && (bySource as { source_slug?: string }).source_slug) {
        const { data: esPost } = await supabase
          .from('blog_posts')
          .select('image, image_alt')
          .eq('source_slug', (bySource as { source_slug: string }).source_slug)
          .eq('locale', 'es')
          .eq('status', 'published')
          .single()
        if (esPost?.image && isSupabaseImage(esPost.image)) {
          post.image = esPost.image
          post.imageAlt = esPost.image_alt || post.imageAlt
        }
      }
      return post
    }
  }

  return null
}


/** Devuelve el slug de este artículo en cada idioma (para el selector de idiomas) */
export async function getSlugsByLocaleForArticle(slug: string, locale: string): Promise<Record<string, string> | null> {
  const effectiveLocale = getEffectiveLocale(locale)

  let sourceSlug: string | null = null
  const { data: bySlug } = await supabase
    .from('blog_posts')
    .select('source_slug')
    .eq('slug', slug)
    .eq('locale', effectiveLocale)
    .eq('status', 'published')
    .single()
  sourceSlug = bySlug?.source_slug ?? null

  if (!sourceSlug && effectiveLocale !== 'es') {
    const { data: bySource } = await supabase
      .from('blog_posts')
      .select('source_slug')
      .eq('source_slug', slug)
      .eq('locale', effectiveLocale)
      .eq('status', 'published')
      .single()
    sourceSlug = bySource?.source_slug ?? null
  }

  if (!sourceSlug) return null

  const { data: all } = await supabase
    .from('blog_posts')
    .select('locale, slug')
    .eq('source_slug', sourceSlug)
    .eq('status', 'published')

  if (!all?.length) return null
  return Object.fromEntries(all.map((r) => [r.locale, r.slug]))
}

export async function getAllPostSlugs(locale: string): Promise<string[]> {
  const effectiveLocale = getEffectiveLocale(locale)

  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('locale', effectiveLocale)
    .eq('status', 'published')

  if (error) return []
  return (data || []).map((r) => r.slug)
}
