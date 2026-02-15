import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartProvider } from '@/lib/shop/cart-context'
import { en } from '@/lib/i18n/en'

export const metadata: Metadata = {
  title: {
    default: 'Tricholand · Trichocereus Nursery Producer',
    template: '%s | Tricholand',
  },
  description: 'Trichocereus and columnar cacti producer nursery. Exclusive B2B wholesale for professionals. Shipping across Europe from Murcia, Spain.',
  alternates: {
    canonical: 'https://www.tricholand.com/en',
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
    url: 'https://www.tricholand.com/en',
    title: 'Tricholand · Trichocereus Nursery Producer',
    description: 'Trichocereus and columnar cacti producer nursery. Exclusive B2B wholesale for professionals. Shipping across Europe from Murcia, Spain.',
    locale: 'en_US',
  },
}

export default function LayoutEN({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div lang="en">
      <CartProvider>
        <Header locale="en" dict={en} />
        <main>{children}</main>
        <Footer locale="en" dict={en} />
      </CartProvider>
    </div>
  )
}
