import { getAllVarietySlugs } from '@/content/varieties/es/data'
import { getAllPostSlugs } from '@/content/blog/es/data'
import { getActiveProducts } from '@/content/shop/products-demo'

const BASE_URL = 'https://www.tricholand.com'
const LOCALES = ['es', 'en', 'nl', 'fr', 'de', 'it', 'pt'] as const

const STATIC_PATHS = [
  { path: '', label: 'Inicio' },
  { path: '/variedades', label: 'Variedades' },
  { path: '/catalogo', label: 'Catálogo' },
  { path: '/servicios', label: 'Servicios' },
  { path: '/sobre-nosotros', label: 'Sobre nosotros' },
  { path: '/contacto', label: 'Contacto' },
  { path: '/certificaciones', label: 'Certificaciones' },
  { path: '/blog', label: 'Blog' },
  { path: '/tienda', label: 'Tienda' },
  { path: '/tienda/pedido', label: 'Solicitar pedido' },
  { path: '/politica-privacidad', label: 'Política de privacidad' },
  { path: '/aviso-legal', label: 'Aviso legal' },
]

export function getSitemapUrls(): { url: string; label?: string }[] {
  const varietySlugs = getAllVarietySlugs()
  const blogSlugs = getAllPostSlugs()
  const products = getActiveProducts()

  const urls: { url: string; label?: string }[] = []

  for (const locale of LOCALES) {
    for (const { path, label } of STATIC_PATHS) {
      urls.push({
        url: `${BASE_URL}/${locale}${path}`,
        label: path === '' ? 'Inicio' : label,
      })
    }
    for (const slug of varietySlugs) {
      urls.push({ url: `${BASE_URL}/${locale}/variedades/${slug}` })
    }
    for (const slug of blogSlugs) {
      urls.push({ url: `${BASE_URL}/${locale}/blog/${slug}` })
    }
    for (const p of products) {
      urls.push({ url: `${BASE_URL}/${locale}/tienda/${p.slug}` })
    }
  }

  return urls
}

export function getSitemapEntries() {
  const now = new Date().toISOString()
  const varietySlugs = getAllVarietySlugs()
  const blogSlugs = getAllPostSlugs()
  const products = getActiveProducts()

  const entries: { url: string; lastModified: string; changeFrequency: 'weekly' | 'monthly'; priority: number }[] = []

  for (const locale of LOCALES) {
    for (const { path } of STATIC_PATHS) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: path === '' ? 1.0 : 0.7,
      })
    }
    for (const slug of varietySlugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/variedades/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
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
        url: `${BASE_URL}/${locale}/tienda/${p.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    }
  }

  return entries
}
