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
    image: row.image || '/images/blog/Tricholand_blog_1.png',
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
    .select('slug, title, description, date, image, image_alt, tags, reading_time')
    .eq('locale', effectiveLocale)
    .eq('status', 'published')
    .order('date', { ascending: false })

  if (error) {
    console.error('getPostsMeta error:', error)
    return []
  }

  return (data || []).map(rowToMeta)
}

export async function getPostBySlug(slug: string, locale: string): Promise<BlogPost | null> {
  const effectiveLocale = getEffectiveLocale(locale)

  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug, title, description, date, image, image_alt, tags, reading_time, content')
    .eq('slug', slug)
    .eq('locale', effectiveLocale)
    .eq('status', 'published')
    .single()

  if (error || !data) return null
  return rowToPost(data)
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
