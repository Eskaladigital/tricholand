'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { Dictionary } from '@/lib/i18n/types'
import { getFullPath } from '@/lib/i18n/paths'

function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 left-6 z-40 bg-verde w-11 h-11 flex items-center justify-center rounded-full shadow-lg ring-2 ring-white ring-inset hover:bg-verde/90 transition-colors"
      aria-label="Volver arriba"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}

interface FooterProps {
  locale: string
  dict: Dictionary
}

const varieties = [
  { name: 'T. Pachanoi', slug: 'trichocereus-pachanoi' },
  { name: 'T. Peruvianus', slug: 'trichocereus-peruvianus' },
  { name: 'T. Bridgesii', slug: 'trichocereus-bridgesii' },
  { name: 'T. Terscheckii', slug: 'trichocereus-pasacana-terscheckii' },
  { name: 'Otros cactus', slug: 'otros-cactus' },
]

export function Footer({ locale, dict }: FooterProps) {
  return (
    <>
    <footer className="bg-negro text-crudo pt-12 pb-6 px-5 lg:px-8">
      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        {/* Brand */}
        <div>
          <Link href={`/${locale}`} className="flex items-center gap-3 mb-4">
            <Image
              src="/images/icons/logo_tricho_yellow_200_200.webp"
              alt="Tricholand"
              width={64}
              height={64}
              sizes="64px"
              quality={65}
              className="w-16 h-16 object-contain shrink-0"
            />
            <div className="flex flex-col">
              <span className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold tracking-wide uppercase">
                Tricholand
              </span>
              <span className="font-[family-name:var(--font-archivo-narrow)] text-[0.65rem] tracking-[0.15em] uppercase opacity-60">
                Productores de Trichocereus
              </span>
            </div>
          </Link>
          <p className="text-sm opacity-55 leading-relaxed">
            {dict.footer.description}
          </p>
          {/* Social */}
          <div className="flex gap-4 mt-4">
            <a
              href="https://www.facebook.com/tricholand/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm opacity-65 hover:opacity-100 transition-opacity"
              aria-label="Facebook"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/tricholand/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm opacity-65 hover:opacity-100 transition-opacity"
              aria-label="Instagram"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Variedades */}
        <div>
          <h4 className="font-[family-name:var(--font-archivo-narrow)] text-[0.68rem] uppercase tracking-[0.15em] text-naranja mb-5">
            {dict.footer.varieties_title}
          </h4>
          <ul className="space-y-2">
            {varieties.map((v) => (
              <li key={v.slug}>
                <Link
                  href={getFullPath(locale, 'varieties', v.slug)}
                  className="text-sm opacity-65 hover:opacity-100 transition-opacity"
                >
                  {v.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Empresa */}
        <div>
          <h4 className="font-[family-name:var(--font-archivo-narrow)] text-[0.68rem] uppercase tracking-[0.15em] text-naranja mb-5">
            {dict.footer.company_title}
          </h4>
          <ul className="space-y-2">
            {dict.footer.company_links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm opacity-65 hover:opacity-100 transition-opacity"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="font-[family-name:var(--font-archivo-narrow)] text-[0.68rem] uppercase tracking-[0.15em] text-naranja mb-5">
            {dict.footer.contact_title}
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="mailto:info@tricholand.com"
                className="text-sm opacity-65 hover:opacity-100 transition-opacity"
              >
                info@tricholand.com
              </a>
            </li>
            <li className="text-sm opacity-65">Murcia, España</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row justify-between items-center gap-2 font-[family-name:var(--font-archivo-narrow)] text-[0.75rem] opacity-45">
        <span>{dict.footer.copyright}</span>
        <div className="flex gap-4">
          <Link href="/sitemap" className="hover:opacity-100 transition-opacity">
            Mapa del sitio
          </Link>
          <Link href={getFullPath(locale, 'privacy')} className="hover:opacity-100 transition-opacity">
            Política de privacidad
          </Link>
          <Link href={getFullPath(locale, 'legal')} className="hover:opacity-100 transition-opacity">
            Aviso legal
          </Link>
        </div>
        <span>{dict.footer.b2b_note}</span>
      </div>
    </footer>
    <BackToTop />
    </>
  )
}
