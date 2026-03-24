import type { Metadata, Viewport } from 'next'
import { RootHtml } from '@/components/layout/RootHtml'
import { defaultMetadata, defaultViewport } from '@/lib/metadata'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartProvider } from '@/lib/shop/cart-context'
import { de } from '@/lib/i18n/de'

export const viewport: Viewport = defaultViewport

export const metadata: Metadata = {
  ...defaultMetadata,
  title: {
    default: 'Tricholand · Trichocereus Gärtnerei',
    template: '%s | Tricholand',
  },
  description: 'Trichocereus- und Säulenkakteen-Gärtnerei. Exklusiver B2B-Großhandel für Fachleute. Versand in ganz Europa aus Murcia, Spanien.',
  
  openGraph: {
    ...defaultMetadata.openGraph,
    locale: 'de_DE',
    alternateLocale: ['en_US', 'es_ES', 'fr_FR', 'it_IT', 'nl_NL', 'pt_PT'],
  },
}

export default function LayoutDE({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RootHtml lang="de">
      <CartProvider>
        <Header locale="de" dict={de} />
        <main>{children}</main>
        <Footer locale="de" dict={de} />
      </CartProvider>
    </RootHtml>
  )
}
