import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartProvider } from '@/lib/shop/cart-context'
import { de } from '@/lib/i18n/de'

export const metadata: Metadata = {
  title: {
    default: 'Tricholand · Trichocereus Gärtnerei',
    template: '%s | Tricholand',
  },
  description: 'Trichocereus- und Säulenkakteen-Gärtnerei. Exklusiver B2B-Großhandel für Fachleute. Versand in ganz Europa aus Murcia, Spanien.',
  alternates: {
    canonical: 'https://www.tricholand.com/de',
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
    url: 'https://www.tricholand.com/de',
    title: 'Tricholand · Trichocereus Gärtnerei',
    description: 'Trichocereus- und Säulenkakteen-Gärtnerei. Exklusiver B2B-Großhandel für Fachleute. Versand in ganz Europa aus Murcia, Spanien.',
    locale: 'de_DE',
    images: ['https://www.tricholand.com/images/og-image.webp'],
  },
}

export default function LayoutDE({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div lang="de">
      <CartProvider>
        <Header locale="de" dict={de} />
        <main>{children}</main>
        <Footer locale="de" dict={de} />
      </CartProvider>
    </div>
  )
}
