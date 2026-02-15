import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartProvider } from '@/lib/shop/cart-context'
import { fr } from '@/lib/i18n/fr'

export const metadata: Metadata = {
  title: {
    default: 'Tricholand · Pépinière Trichocereus',
    template: '%s | Tricholand',
  },
  description: 'Pépinière productrice de Trichocereus et cactus colonnaires. Vente B2B exclusive pour professionnels. Expédition dans toute l\'Europe depuis Murcia, Espagne.',
  alternates: {
    canonical: 'https://www.tricholand.com/fr',
    languages: {
      'x-default': 'https://www.tricholand.com/es',
      'es': 'https://www.tricholand.com/es',
      'en': 'https://www.tricholand.com/en',
      'nl': 'https://www.tricholand.com/nl',
      'fr': 'https://www.tricholand.com/fr',
      'de': 'https://www.tricholand.com/de',
      'it': 'https://www.tricholand.com/it',
      'pt': 'https://www.tricholand.com/pt',
    },
  },
  openGraph: {
    url: 'https://www.tricholand.com/fr',
    title: 'Tricholand · Pépinière Trichocereus',
    description: 'Pépinière productrice de Trichocereus et cactus colonnaires. Vente B2B exclusive pour professionnels. Expédition dans toute l\'Europe depuis Murcia, Espagne.',
    locale: 'fr_FR',
    images: ['https://www.tricholand.com/images/og-image.webp'],
  },
}

export default function LayoutFR({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div lang="fr">
      <CartProvider>
        <Header locale="fr" dict={fr} />
        <main>{children}</main>
        <Footer locale="fr" dict={fr} />
      </CartProvider>
    </div>
  )
}
