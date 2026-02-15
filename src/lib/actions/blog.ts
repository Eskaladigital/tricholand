'use server'

import { revalidatePath, unstable_noStore } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export interface AdminBlogPost {
  id: string
  slug: string
  source_slug: string
  title: string
  description: string
  date: string
  image: string
  image_alt: string
  tags: string[]
  reading_time: number
  content: string
  locale: string
  status: string
  meta_title: string | null
  meta_description: string | null
  created_at: string
  updated_at: string
}

const COLUMNS = 'id, slug, source_slug, title, description, date, image, image_alt, tags, reading_time, content, locale, status, meta_title, meta_description, created_at, updated_at'

export async function getBlogPosts(): Promise<AdminBlogPost[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select(COLUMNS)
    .order('date', { ascending: false })
    .order('locale')

  if (error) {
    console.error('getBlogPosts error:', error)
    return []
  }
  return (data ?? []) as AdminBlogPost[]
}

/** Solo artículos en español (para el listado del admin) */
export async function getBlogPostsEs(): Promise<AdminBlogPost[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select(COLUMNS)
    .eq('locale', 'es')
    .order('date', { ascending: false })

  if (error) {
    console.error('getBlogPostsEs error:', error)
    return []
  }
  return (data ?? []) as AdminBlogPost[]
}

/** Todas las versiones de un artículo por source_slug */
export async function getBlogPostsBySourceSlug(sourceSlug: string): Promise<AdminBlogPost[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select(COLUMNS)
    .eq('source_slug', sourceSlug)
    .order('locale')

  if (error) return []
  return (data ?? []) as AdminBlogPost[]
}

export async function getBlogPostById(id: string): Promise<AdminBlogPost | null> {
  unstable_noStore() // Evitar caché: siempre datos frescos para el editor
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select(COLUMNS)
    .eq('id', id)
    .single()

  if (error || !data) return null
  return data as AdminBlogPost
}

export async function createBlogPost(input: Record<string, unknown>): Promise<{ error?: string; id?: string }> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('blog_posts').insert({
    slug: input.slug,
    source_slug: input.source_slug || input.slug,
    title: input.title,
    description: input.description ?? '',
    date: input.date,
    image: input.image ?? '',
    image_alt: input.image_alt ?? '',
    tags: input.tags ?? [],
    reading_time: input.reading_time ?? 5,
    content: input.content ?? '',
    locale: input.locale ?? 'es',
    status: input.status ?? 'draft',
    meta_title: input.meta_title ?? null,
    meta_description: input.meta_description ?? null,
  }).select('id').single()

  if (error) return { error: error.message }
  return { id: data?.id }
}

export async function updateBlogPost(id: string, input: Record<string, unknown>): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase.from('blog_posts').update({
    slug: input.slug,
    source_slug: input.source_slug || input.slug,
    title: input.title,
    description: input.description ?? '',
    date: input.date,
    image: input.image ?? '',
    image_alt: input.image_alt ?? '',
    tags: input.tags ?? [],
    reading_time: input.reading_time ?? 5,
    content: input.content ?? '',
    locale: input.locale ?? 'es',
    status: input.status ?? 'draft',
    meta_title: input.meta_title ?? null,
    meta_description: input.meta_description ?? null,
  }).eq('id', id)

  if (error) return { error: error.message }
  return {}
}

export async function deleteBlogPost(id: string): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  if (error) return { error: error.message }
  return {}
}

export async function updateBlogPostStatus(
  id: string,
  status: 'published' | 'draft' | 'archived'
): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase.from('blog_posts').update({ status }).eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/administrator/blog')
  return {}
}

export async function setBlogPostStatusFromForm(formData: FormData): Promise<void> {
  const id = formData.get('id') as string
  const status = formData.get('status') as 'published' | 'draft' | 'archived'
  if (!id || !['published', 'draft', 'archived'].includes(status)) return
  await updateBlogPostStatus(id, status)
}
