import { NextRequest, NextResponse } from 'next/server'
import { getSlugsByLocaleForVarietyOrLanding } from '@/lib/landings'

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug')
  const locale = request.nextUrl.searchParams.get('locale')

  if (!slug || !locale) {
    return NextResponse.json({ error: 'slug y locale requeridos' }, { status: 400 })
  }

  const slugs = await getSlugsByLocaleForVarietyOrLanding(slug, locale)
  if (!slugs) {
    return NextResponse.json({ error: 'Variedad o landing no encontrada' }, { status: 404 })
  }

  return NextResponse.json(slugs)
}
