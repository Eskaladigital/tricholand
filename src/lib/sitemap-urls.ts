import { getAllVarietySlugs } from '@/content/varieties/es/data'
import { getPath, getAlternateUrls } from '@/lib/i18n/paths'

const EN_VARIETY_LANDING_SLUGS = ['trichocereus-pachanoi-for-sale-uk', 'trichocereus-pachanoi-for-sale-europe']
import { getAllPostSlugs } from '@/lib/blog'
import { getActiveProducts } from '@/content/shop/products-demo'

const BASE_URL = 'https://www.tricholand.com'
const LOCALES = ['es', 'en', 'nl', 'fr', 'de', 'it', 'pt'] as const

const STATIC_PATH_KEYS = [
  { key: '' as const, label: 'Inicio' },
  { key: 'varieties' as const, label: 'Variedades' },
  { key: 'catalog' as const, label: 'Catálogo' },
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
  const products = getActiveProducts()

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
    if (locale === 'en') {
      for (const slug of EN_VARIETY_LANDING_SLUGS) {
        urls.push({ url: `${BASE_URL}/en/varieties/${slug}` })
      }
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
  const products = getActiveProducts()

  const entries: { url: string; lastModified: string; changeFrequency: 'weekly' | 'monthly'; priority: number; alternates?: { languages: Record<string, string> } }[] = []

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
    if (locale === 'en') {
      for (const slug of EN_VARIETY_LANDING_SLUGS) {
        entries.push({
          url: `${BASE_URL}/en/varieties/${slug}`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: { languages: getAlternateUrls('varieties', slug) },
        })
      }
    }
    for (const slug of blogSlugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.5,
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
