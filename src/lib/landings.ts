import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const LOCALES = ['es', 'en', 'nl', 'fr', 'de', 'it', 'pt'] as const

function getEffectiveLocale(locale: string): (typeof LOCALES)[number] {
  if (LOCALES.includes(locale as (typeof LOCALES)[number])) {
    return locale as (typeof LOCALES)[number]
  }
  return 'en'
}

export interface LandingPage {
  slug: string
  sourceSlug: string
  locale: string
  metaTitle: string
  metaDescription: string
  metaKeywords: string[]
  ogLocale: string
  content: LandingContent
  config: LandingConfig
}

export interface LandingContent {
  heroBadge: string
  heroTitle: string
  heroTitleHighlight: string
  heroDescription: string
  ctaPrimary: string
  ctaSecondary: string
  trustItems: string[]
  aboutTitle: string
  aboutP1: string
  aboutP2: string
  aboutHighlights: string[]
  sizesTitle: string
  sizesSubtitle: string
  sizes: { range: string; label: string; desc: string }[]
  sizesFooter: string
  sizesFooterLink: string
  benefitsTitle: string
  benefitsSubtitle: string
  benefits: { icon: string; title: string; desc: string }[]
  nurseryTitle: string
  nurseryP1: string
  nurseryP2: string
  nurseryLink: string
  faqTitle: string
  faq: { q: string; a: string }[]
  otherTitle: string
  otherSubtitle: string
  otherVarietiesLabels: { name: string; common: string }[]
  ctaTitle: string
  ctaDescription: string
  ctaButton: string
  ctaEmailText: string
  jsonLdDescription: string
  jsonLdLanguages: string[]
  countriesSection?: {
    title: string
    subtitle: string
    countries: { name: string; flag: string }[]
    footer: string
    footerLink: string
  }
}

export interface LandingConfig {
  heroImage: string
  aboutImage: string
  galleryImages: string[]
  nurseryImage: string
  otherVarietySlugs: { slug: string; img: string }[]
  areaServed: { name: string }[]
}

function rowToLanding(row: {
  slug: string
  source_slug: string
  locale: string
  meta_title: string
  meta_description: string
  meta_keywords: string[] | null
  og_locale: string | null
  content: LandingContent
  config: LandingConfig
}): LandingPage {
  return {
    slug: row.slug,
    sourceSlug: row.source_slug,
    locale: row.locale,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    metaKeywords: row.meta_keywords || [],
    ogLocale: row.og_locale || row.locale,
    content: row.content,
    config: row.config,
  }
}

export async function getLandingBySlug(slug: string, locale: string): Promise<LandingPage | null> {
  const effectiveLocale = getEffectiveLocale(locale)

  const { data } = await supabase
    .from('landing_pages')
    .select('*')
    .eq('slug', slug)
    .eq('locale', effectiveLocale)
    .eq('status', 'published')
    .single()

  if (data) return rowToLanding(data)

  // Fallback: slug from another locale — look up by source_slug
  if (effectiveLocale !== 'en') {
    const { data: bySource } = await supabase
      .from('landing_pages')
      .select('*')
      .eq('source_slug', slug)
      .eq('locale', effectiveLocale)
      .eq('status', 'published')
      .single()
    if (bySource) return rowToLanding(bySource)
  }

  // Last fallback: try finding any landing with this slug regardless of locale match
  const { data: anyLocale } = await supabase
    .from('landing_pages')
    .select('source_slug')
    .eq('slug', slug)
    .eq('status', 'published')
    .limit(1)
    .single()

  if (anyLocale?.source_slug) {
    const { data: correctLocale } = await supabase
      .from('landing_pages')
      .select('*')
      .eq('source_slug', anyLocale.source_slug)
      .eq('locale', effectiveLocale)
      .eq('status', 'published')
      .single()
    if (correctLocale) return rowToLanding(correctLocale)
  }

  return null
}

export async function getAllLandingSlugs(locale: string): Promise<string[]> {
  const effectiveLocale = getEffectiveLocale(locale)

  const { data } = await supabase
    .from('landing_pages')
    .select('slug')
    .eq('locale', effectiveLocale)
    .eq('status', 'published')

  return (data || []).map((r) => r.slug)
}

export async function getAllLandingAlternates(): Promise<Map<string, Record<string, string>>> {
  const { data } = await supabase
    .from('landing_pages')
    .select('source_slug, locale, slug')
    .eq('status', 'published')

  const map = new Map<string, Record<string, string>>()
  for (const row of data || []) {
    if (!map.has(row.source_slug)) map.set(row.source_slug, {})
    map.get(row.source_slug)![row.locale] = row.slug
  }
  return map
}
