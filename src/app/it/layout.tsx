import type { Metadata, Viewport } from 'next'
import { RootHtml } from '@/components/layout/RootHtml'
import { defaultMetadata, defaultViewport } from '@/lib/metadata'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartProvider } from '@/lib/shop/cart-context'
import { it } from '@/lib/i18n/it'

export const viewport: Viewport = defaultViewport

export const metadata: Metadata = {
  ...defaultMetadata,
  title: {
    default: 'Tricholand · Vivaio Trichocereus',
    template: '%s | Tricholand',
  },
  description: 'Vivaio produttore di Trichocereus e cactus colonnari. Vendita B2B esclusiva per professionisti. Spedizioni in tutta Europa da Murcia, Spagna.',
  
  openGraph: {
    ...defaultMetadata.openGraph,
    locale: 'it_IT',
    alternateLocale: ['en_US', 'es_ES', 'de_DE', 'fr_FR', 'nl_NL', 'pt_PT'],
  },
}

export default function LayoutIT({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RootHtml lang="it">
      <CartProvider>
        <Header locale="it" dict={it} />
        <main>{children}</main>
        <Footer locale="it" dict={it} />
      </CartProvider>
    </RootHtml>
  )
}
