import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartProvider } from '@/lib/shop/cart-context'
import { es } from '@/lib/i18n/es'

export const metadata: Metadata = {
  title: {
    default: 'Tricholand · Vivero Productor de Trichocereus',
    template: '%s | Tricholand',
  },
  alternates: {
    canonical: 'https://www.tricholand.com/es',
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
}

export default function LayoutES({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div lang="es">
      <CartProvider>
        <Header locale="es" dict={es} />
        <main>{children}</main>
        <Footer locale="es" dict={es} />
      </CartProvider>
    </div>
  )
}
