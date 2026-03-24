import type { Metadata, Viewport } from 'next'
import { RootHtml } from '@/components/layout/RootHtml'
import { defaultMetadata, defaultViewport } from '@/lib/metadata'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartProvider } from '@/lib/shop/cart-context'
import { fr } from '@/lib/i18n/fr'

export const viewport: Viewport = defaultViewport

export const metadata: Metadata = {
  ...defaultMetadata,
  title: {
    default: 'Tricholand · Pépinière Trichocereus',
    template: '%s | Tricholand',
  },
  description: 'Pépinière productrice de Trichocereus et cactus colonnaires. Vente B2B exclusive pour professionnels. Expédition dans toute l\'Europe depuis Murcia, Espagne.',
  
  openGraph: {
    ...defaultMetadata.openGraph,
    locale: 'fr_FR',
    alternateLocale: ['en_US', 'es_ES', 'de_DE', 'it_IT', 'nl_NL', 'pt_PT'],
  },
}

export default function LayoutFR({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RootHtml lang="fr">
      <CartProvider>
        <Header locale="fr" dict={fr} />
        <main>{children}</main>
        <Footer locale="fr" dict={fr} />
      </CartProvider>
    </RootHtml>
  )
}
