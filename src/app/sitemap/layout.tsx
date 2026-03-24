import type { Metadata, Viewport } from 'next'
import { RootHtml } from '@/components/layout/RootHtml'
import { defaultMetadata, defaultViewport } from '@/lib/metadata'

export const viewport: Viewport = defaultViewport
export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Sitemap | Tricholand',
}

export default function SitemapLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootHtml lang="es">
      {children}
    </RootHtml>
  )
}
