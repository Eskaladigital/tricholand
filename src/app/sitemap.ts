import type { MetadataRoute } from 'next'
import { getSitemapEntries } from '@/lib/sitemap-urls'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getSitemapEntries()
  return entries.map(({ url, lastModified, changeFrequency, priority, alternates }) => ({
    url,
    lastModified,
    changeFrequency,
    priority,
    ...(alternates && { alternates }),
  }))
}
