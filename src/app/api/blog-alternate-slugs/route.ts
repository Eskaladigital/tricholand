import { NextRequest, NextResponse } from 'next/server'
import { getSlugsByLocaleForArticle } from '@/lib/blog'

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug')
  const locale = request.nextUrl.searchParams.get('locale')

  if (!slug || !locale) {
    return NextResponse.json({ error: 'slug y locale requeridos' }, { status: 400 })
  }

  const slugs = await getSlugsByLocaleForArticle(slug, locale)
  if (!slugs) {
    return NextResponse.json({ error: 'Artículo no encontrado' }, { status: 404 })
  }

  return NextResponse.json(slugs)
}
