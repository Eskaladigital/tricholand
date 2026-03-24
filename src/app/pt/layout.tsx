import type { Metadata, Viewport } from 'next'
import { RootHtml } from '@/components/layout/RootHtml'
import { defaultMetadata, defaultViewport } from '@/lib/metadata'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartProvider } from '@/lib/shop/cart-context'
import { pt } from '@/lib/i18n/pt'

export const viewport: Viewport = defaultViewport

export const metadata: Metadata = {
  ...defaultMetadata,
  title: {
    default: 'Tricholand · Viveiro Trichocereus',
    template: '%s | Tricholand',
  },
  description: 'Viveiro produtor de Trichocereus e cactos colunares. Venda B2B exclusiva para profissionais. Envios para toda a Europa a partir de Múrcia, Espanha.',
  
  openGraph: {
    ...defaultMetadata.openGraph,
    locale: 'pt_PT',
    alternateLocale: ['en_US', 'es_ES', 'de_DE', 'fr_FR', 'it_IT', 'nl_NL'],
  },
}

export default function LayoutPT({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RootHtml lang="pt">
      <CartProvider>
        <Header locale="pt" dict={pt} />
        <main>{children}</main>
        <Footer locale="pt" dict={pt} />
      </CartProvider>
    </RootHtml>
  )
}
