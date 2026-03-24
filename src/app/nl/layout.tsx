import type { Metadata, Viewport } from 'next'
import { RootHtml } from '@/components/layout/RootHtml'
import { defaultMetadata, defaultViewport } from '@/lib/metadata'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartProvider } from '@/lib/shop/cart-context'
import { nl } from '@/lib/i18n/nl'

export const viewport: Viewport = defaultViewport

export const metadata: Metadata = {
  ...defaultMetadata,
  title: {
    default: 'Tricholand · Trichocereus Kwekerij',
    template: '%s | Tricholand',
  },
  description: 'Trichocereus- en zuilcactuskwekerij. Exclusieve B2B-groothandel voor professionals. Verzending door heel Europa vanuit Murcia, Spanje.',
  
  openGraph: {
    ...defaultMetadata.openGraph,
    locale: 'nl_NL',
    alternateLocale: ['en_US', 'es_ES', 'de_DE', 'fr_FR', 'it_IT', 'pt_PT'],
  },
}

export default function LayoutNL({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RootHtml lang="nl">
      <CartProvider>
        <Header locale="nl" dict={nl} />
        <main>{children}</main>
        <Footer locale="nl" dict={nl} />
      </CartProvider>
    </RootHtml>
  )
}
