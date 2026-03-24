import type { Metadata } from 'next'
import Script from 'next/script'
import { Archivo, Archivo_Narrow } from 'next/font/google'
import { HtmlLangSetter } from '@/components/layout/HtmlLangSetter'
import '@/app/globals.css'

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

export function RootHtml({
  children,
  lang = 'es',
}: {
  children: React.ReactNode
  lang?: string
}) {
  return (
    <html lang={lang} className={`${archivo.variable} ${archivoNarrow.variable}`}>
      <body className={`${archivo.className} antialiased`}>
        {/* <HtmlLangSetter /> */}
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
