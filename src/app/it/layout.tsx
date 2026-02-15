import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartProvider } from '@/lib/shop/cart-context'
import { it } from '@/lib/i18n/it'

export const metadata: Metadata = {
  title: {
    default: 'Tricholand · Vivaio Trichocereus',
    template: '%s | Tricholand',
  },
  description: 'Vivaio produttore di Trichocereus e cactus colonnari. Vendita B2B esclusiva per professionisti. Spedizioni in tutta Europa da Murcia, Spagna.',
  alternates: {
    canonical: 'https://www.tricholand.com/it',
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
    url: 'https://www.tricholand.com/it',
    title: 'Tricholand · Vivaio Trichocereus',
    description: 'Vivaio produttore di Trichocereus e cactus colonnari. Vendita B2B esclusiva per professionisti. Spedizioni in tutta Europa da Murcia, Spagna.',
    locale: 'it_IT',
    images: ['https://www.tricholand.com/images/og-image.webp'],
  },
}

export default function LayoutIT({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div lang="it">
      <CartProvider>
        <Header locale="it" dict={it} />
        <main>{children}</main>
        <Footer locale="it" dict={it} />
      </CartProvider>
    </div>
  )
}
