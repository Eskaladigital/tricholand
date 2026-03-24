import type { Metadata, Viewport } from 'next'
import { RootHtml } from '@/components/layout/RootHtml'
import { defaultMetadata, defaultViewport } from '@/lib/metadata'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartProvider } from '@/lib/shop/cart-context'
import { en } from '@/lib/i18n/en'

export const viewport: Viewport = defaultViewport

export const metadata: Metadata = {
  ...defaultMetadata,
  title: {
    default: 'Tricholand · Trichocereus Nursery Producer',
    template: '%s | Tricholand',
  },
  description: 'Trichocereus and columnar cacti producer nursery. Exclusive B2B wholesale for professionals. Shipping across Europe from Murcia, Spain.',
  
  openGraph: {
    ...defaultMetadata.openGraph,
    locale: 'en_US',
    alternateLocale: ['es_ES', 'de_DE', 'fr_FR', 'it_IT', 'nl_NL', 'pt_PT'],
  },
}

export default function LayoutEN({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RootHtml lang="en">
      <CartProvider>
        <Header locale="en" dict={en} />
        <main>{children}</main>
        <Footer locale="en" dict={en} />
      </CartProvider>
    </RootHtml>
  )
}
