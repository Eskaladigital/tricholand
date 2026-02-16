import type { Metadata } from 'next'
import Script from 'next/script'
import { Archivo, Archivo_Narrow } from 'next/font/google'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-archivo',
  display: 'swap',
})

const archivoNarrow = Archivo_Narrow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-archivo-narrow',
  display: 'swap',
})

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export const metadata: Metadata = {
  title: {
    default: 'Tricholand · Vivero Productor de Trichocereus',
    template: '%s | Tricholand',
  },
  description: 'Vivero productor de Trichocereus y cactáceas columnares. Venta mayorista B2B para profesionales. Envíos a toda Europa desde Murcia, España.',
  metadataBase: new URL('https://www.tricholand.com'),
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Tricholand',
    images: [
      {
        url: 'https://www.tricholand.com/images/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Tricholand vivero de Trichocereus',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={`${archivo.variable} ${archivoNarrow.variable}`}>
      <body className={`${archivo.className} antialiased`}>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  )
}
