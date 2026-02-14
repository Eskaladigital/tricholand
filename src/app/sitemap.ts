import type { MetadataRoute } from 'next'
import { getAllVarietySlugs } from '@/content/varieties/es/data'
import { getAllPostSlugs } from '@/content/blog/es/data'
import { getActiveProducts } from '@/content/shop/products-demo'

const BASE_URL = 'https://www.tricholand.com'
const LOCALES = ['es', 'en', 'nl', 'fr', 'de', 'it', 'pt'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  const staticPaths = [
    '',
    '/variedades',
    '/catalogo',
    '/servicios',
    '/sobre-nosotros',
    '/contacto',
    '/certificaciones',
    '/blog',
    '/tienda',
  ]

  const varietySlugs = getAllVarietySlugs()
  const blogSlugs = getAllPostSlugs()
  const products = getActiveProducts()

  const entries: MetadataRoute.Sitemap = []

  for (const locale of LOCALES) {
    // Static pages
    for (const path of staticPaths) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: path === '' ? 1.0 : 0.7,
      })
    }
    // Variety pages
    for (const slug of varietySlugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/variedades/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })
    }
    // Blog posts
    for (const slug of blogSlugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      })
    }
    // Shop product pages
    for (const p of products) {
      entries.push({
        url: `${BASE_URL}/${locale}/tienda/${p.slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })
    }
  }

  return entries
}
