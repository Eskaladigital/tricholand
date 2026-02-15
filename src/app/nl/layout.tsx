import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartProvider } from '@/lib/shop/cart-context'
import { nl } from '@/lib/i18n/nl'

export const metadata: Metadata = {
  title: {
    default: 'Tricholand · Trichocereus Kwekerij',
    template: '%s | Tricholand',
  },
  description: 'Trichocereus- en zuilcactuskwekerij. Exclusieve B2B-groothandel voor professionals. Verzending door heel Europa vanuit Murcia, Spanje.',
  alternates: {
    canonical: 'https://www.tricholand.com/nl',
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
    url: 'https://www.tricholand.com/nl',
    title: 'Tricholand · Trichocereus Kwekerij',
    description: 'Trichocereus- en zuilcactuskwekerij. Exclusieve B2B-groothandel voor professionals. Verzending door heel Europa vanuit Murcia, Spanje.',
    locale: 'nl_NL',
  },
}

export default function LayoutNL({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div lang="nl">
      <CartProvider>
        <Header locale="nl" dict={nl} />
        <main>{children}</main>
        <Footer locale="nl" dict={nl} />
      </CartProvider>
    </div>
  )
}
