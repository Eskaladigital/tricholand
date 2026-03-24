import type { Metadata, Viewport } from 'next'

export const defaultViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL('https://www.tricholand.com'),
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
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
}
