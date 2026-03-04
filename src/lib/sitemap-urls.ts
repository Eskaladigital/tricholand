import { getAllVarietySlugs } from '@/content/varieties/es/data'
import { getPath, getAlternateUrls } from '@/lib/i18n/paths'

const VARIETY_LANDING_SLUGS: Record<string, string[]> = {
  en: ['trichocereus-pachanoi-for-sale-uk', 'trichocereus-pachanoi-for-sale-europe'],
  fr: ['trichocereus-pachanoi-a-vendre-france'],
  de: ['trichocereus-pachanoi-kaufen-deutschland'],
  nl: ['trichocereus-pachanoi-te-koop-nederland'],
  it: ['trichocereus-pachanoi-vendita-italia'],
  pt: ['trichocereus-pachanoi-venda-portugal'],
  es: ['trichocereus-pachanoi-venta-espana'],
}
import { getAllPostSlugs, getAllBlogAlternates } from '@/lib/blog'
import { getActiveProducts } from '@/lib/actions/products'

const BASE_URL = 'https://www.tricholand.com'
const LOCALES = ['es', 'en', 'nl', 'fr', 'de', 'it', 'pt'] as const

const STATIC_PATH_KEYS = [
  { key: '' as const, label: 'Inicio' },
  { key: 'varieties' as const, label: 'Variedades' },
  { key: 'services' as const, label: 'Servicios' },
  { key: 'about' as const, label: 'Sobre nosotros' },
  { key: 'contact' as const, label: 'Contacto' },
  { key: 'certifications' as const, label: 'Certificaciones' },
  { key: 'blog' as const, label: 'Blog' },
  { key: 'shop' as const, label: 'Tienda' },
  { key: 'shopOrder' as const, label: 'Solicitar pedido' },
  { key: 'privacy' as const, label: 'Política de privacidad' },
  { key: 'legal' as const, label: 'Aviso legal' },
] as const

export async function getSitemapUrls(): Promise<{ url: string; label?: string }[]> {
  const varietySlugs = getAllVarietySlugs()
  const blogSlugsByLocale = Object.fromEntries(
    await Promise.all(LOCALES.map(async (l) => [l, await getAllPostSlugs(l)]))
  )
  const products = await getActiveProducts()

  const urls: { url: string; label?: string }[] = []

  for (const locale of LOCALES) {
    const blogSlugs = blogSlugsByLocale[locale] || []
    for (const { key, label } of STATIC_PATH_KEYS) {
      const path = key === '' ? '' : key === 'blog' ? '/blog' : `/${getPath(locale, key)}`
      urls.push({
        url: `${BASE_URL}/${locale}${path}`,
        label: key === '' ? 'Inicio' : label,
      })
    }
    for (const slug of varietySlugs) {
      urls.push({ url: `${BASE_URL}/${locale}/${getPath(locale, 'varieties')}/${slug}` })
    }
    for (const slug of VARIETY_LANDING_SLUGS[locale] || []) {
      urls.push({ url: `${BASE_URL}/${locale}/${getPath(locale, 'varieties')}/${slug}` })
    }
    for (const slug of blogSlugs) {
      urls.push({ url: `${BASE_URL}/${locale}/blog/${slug}` })
    }
    for (const p of products) {
      urls.push({ url: `${BASE_URL}/${locale}/${getPath(locale, 'shop')}/${p.slug}` })
    }
  }

  return urls
}

export async function getSitemapEntries() {
  const now = new Date().toISOString()
  const varietySlugs = getAllVarietySlugs()
  const blogSlugsByLocale = Object.fromEntries(
    await Promise.all(LOCALES.map(async (l) => [l, await getAllPostSlugs(l)]))
  )
  const blogAlternates = await getAllBlogAlternates()
  const products = await getActiveProducts()

  const entries: { url: string; lastModified: string; changeFrequency: 'weekly' | 'monthly'; priority: number; alternates?: { languages: Record<string, string> } }[] = []

  // Índice reverso: { "en": { "some-slug": "source_slug" }, ... }
  const blogSlugToSource: Record<string, Record<string, string>> = {}
  for (const loc of LOCALES) blogSlugToSource[loc] = {}
  for (const [sourceSlug, altMap] of blogAlternates.entries()) {
    for (const [loc, s] of Object.entries(altMap)) {
      blogSlugToSource[loc][s] = sourceSlug
    }
  }

  const homeAlternates: Record<string, string> = { 'x-default': `${BASE_URL}/es` }
  for (const loc of LOCALES) {
    homeAlternates[loc] = `${BASE_URL}/${loc}`
  }
  const blogIndexAlternates: Record<string, string> = { 'x-default': `${BASE_URL}/es/blog` }
  for (const loc of LOCALES) {
    blogIndexAlternates[loc] = `${BASE_URL}/${loc}/blog`
  }

  for (const locale of LOCALES) {
    const blogSlugs = blogSlugsByLocale[locale] || []
    for (const { key } of STATIC_PATH_KEYS) {
      const path = key === '' ? '' : key === 'blog' ? '/blog' : `/${getPath(locale, key)}`
      if (key === '') {
        entries.push({
          url: `${BASE_URL}/${locale}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 1.0,
          alternates: { languages: homeAlternates },
        })
      } else if (key === 'blog') {
        entries.push({
          url: `${BASE_URL}/${locale}/blog`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.7,
          alternates: { languages: blogIndexAlternates },
        })
      } else {
        entries.push({
          url: `${BASE_URL}/${locale}${path}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.7,
          alternates: { languages: getAlternateUrls(key) },
        })
      }
    }
    for (const slug of varietySlugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/${getPath(locale, 'varieties')}/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: { languages: getAlternateUrls('varieties', slug) },
      })
    }
    for (const slug of VARIETY_LANDING_SLUGS[locale] || []) {
      entries.push({
        url: `${BASE_URL}/${locale}/${getPath(locale, 'varieties')}/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
    for (const slug of blogSlugs) {
      const sourceSlug = blogSlugToSource[locale]?.[slug]
      let languages: Record<string, string> | undefined
      if (sourceSlug) {
        const altMap = blogAlternates.get(sourceSlug)!
        languages = { 'x-default': `${BASE_URL}/es/blog/${altMap['es'] || slug}` }
        for (const loc of LOCALES) {
          if (altMap[loc]) languages[loc] = `${BASE_URL}/${loc}/blog/${altMap[loc]}`
        }
      }
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.5,
        ...(languages && { alternates: { languages } }),
      })
    }
    for (const p of products) {
      entries.push({
        url: `${BASE_URL}/${locale}/${getPath(locale, 'shop')}/${p.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.6,
        alternates: { languages: getAlternateUrls('shop', p.slug) },
      })
    }
  }

  return entries
}
