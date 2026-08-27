import type { Metadata } from 'next'
import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Archivo, Archivo_Narrow } from 'next/font/google'
import { HtmlLangSetter } from '@/components/layout/HtmlLangSetter'
import { CookieConsentBar } from '@/components/layout/CookieConsentBar'
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
  skipAnalytics = false,
}: {
  children: React.ReactNode
  lang?: string
  skipAnalytics?: boolean
}) {
  const loadAnalytics = Boolean(GA_ID) && !skipAnalytics

  return (
    <html lang={lang} className={`${archivo.variable} ${archivoNarrow.variable}`}>
      <head>
        {loadAnalytics ? (
          <Script
            id="gtag-consent-default"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                window.gtag = gtag;
                var granted = false;
                try { granted = localStorage.getItem('tricholand_cookie_consent') === 'granted'; } catch (e) {}
                var v = granted ? 'granted' : 'denied';
                gtag('consent', 'default', {
                  analytics_storage: v,
                  ad_storage: v,
                  ad_user_data: v,
                  ad_personalization: v,
                  wait_for_update: 500
                });
              `,
            }}
          />
        ) : null}
      </head>
      <body className={`${archivo.className} antialiased`}>
        {/* <HtmlLangSetter /> */}
        {loadAnalytics && GA_ID ? (
          <GoogleAnalytics gaId={GA_ID} />
        ) : null}
        <CookieConsentBar />
        {children}
      </body>
    </html>
  )
}
