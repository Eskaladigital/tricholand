import type { Metadata, Viewport } from 'next'
import { RootHtml } from '@/components/layout/RootHtml'
import { defaultMetadata, defaultViewport } from '@/lib/metadata'

export const viewport: Viewport = defaultViewport
export const metadata: Metadata = {
  ...defaultMetadata,
  title: {
    default: 'Tricholand · Vivero Productor de Trichocereus',
    template: '%s | Tricholand',
  },
  description: 'Vivero productor de Trichocereus y cactáceas columnares. Venta mayorista B2B para profesionales. Envíos a toda Europa desde Murcia, España.',
}

export default function RootPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootHtml lang="es">
      {children}
    </RootHtml>
  )
}
