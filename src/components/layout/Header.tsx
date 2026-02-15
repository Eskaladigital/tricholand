'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import type { Dictionary } from '@/lib/i18n/types'
import { getFullPath, getPathForLocaleSwitch } from '@/lib/i18n/paths'

const LOCALES = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'nl', label: 'NL' },
  { code: 'fr', label: 'FR' },
  { code: 'de', label: 'DE' },
  { code: 'it', label: 'IT' },
  { code: 'pt', label: 'PT' },
] as const

interface HeaderProps {
  locale: string
  dict: Dictionary
}

export function Header({ locale, dict }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const [blogSlugsByLocale, setBlogSlugsByLocale] = useState<Record<string, string> | null>(null)
  const pathname = usePathname()

  // Obtener ruta sin locale para construir enlaces de idioma
  const pathSegments = pathname.split('/').filter(Boolean)
  const pathWithoutLocale = pathSegments.length > 0 && LOCALES.some((l) => l.code === pathSegments[0])
    ? '/' + pathSegments.slice(1).join('/')
    : ''

  // En páginas de blog, obtener el slug correcto para cada idioma (cada idioma tiene su propio slug)
  const isBlogPost = pathSegments[1] === 'blog' && pathSegments[2]
  const currentSlug = pathSegments[2]

  useEffect(() => {
    if (isBlogPost && currentSlug && locale) {
      fetch(`/api/blog-alternate-slugs?slug=${encodeURIComponent(currentSlug)}&locale=${locale}`)
        .then((r) => (r.ok ? r.json() : null))
        .then(setBlogSlugsByLocale)
        .catch(() => setBlogSlugsByLocale(null))
    } else {
      setBlogSlugsByLocale(null)
    }
  }, [isBlogPost, currentSlug, locale])

  const getHrefForLocale = (locCode: string) => {
    if (isBlogPost && blogSlugsByLocale?.[locCode]) {
      return `/${locCode}/blog/${blogSlugsByLocale[locCode]}`
    }
    if (isBlogPost && !blogSlugsByLocale?.[locCode]) {
      return `/${locCode}/blog`
    }
    if (pathWithoutLocale) {
      return getPathForLocaleSwitch(pathWithoutLocale, locale, locCode)
    }
    return `/${locCode}`
  }

  const navLinks = [
    { label: dict.nav.varieties, href: getFullPath(locale, 'varieties') },
    { label: dict.nav.shop, href: getFullPath(locale, 'shop'), highlight: true },
    { label: dict.nav.services, href: getFullPath(locale, 'services') },
    { label: dict.nav.blog, href: `/${locale}/blog` },
    { label: dict.nav.contact, href: getFullPath(locale, 'contact') },
  ]

  return (
    <header className="bg-negro text-crudo">
      {/* Main header */}
      <div className="flex justify-between items-center px-5 lg:px-8 py-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-3 group">
          <Image
            src="/images/icons/logo_tricho_yellow_200_200.webp"
            alt="Tricholand"
            width={44}
            height={44}
            sizes="44px"
            quality={65}
            className="h-11 w-auto"
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

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-[family-name:var(--font-archivo-narrow)] text-[0.85rem] font-semibold uppercase tracking-wide transition-opacity ${
                'highlight' in link && link.highlight
                  ? 'text-naranja opacity-100 hover:text-verde'
                  : 'opacity-75 hover:opacity-100'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {/* Language switcher dropdown */}
          <div className="relative ml-2 pl-4 border-l border-white/20">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              onBlur={() => setTimeout(() => setLangDropdownOpen(false), 150)}
              className="font-[family-name:var(--font-archivo-narrow)] text-[0.85rem] font-semibold uppercase tracking-wide flex items-center gap-1 opacity-75 hover:opacity-100 transition-opacity"
              aria-expanded={langDropdownOpen}
              aria-haspopup="true"
            >
              <span className="bg-verde text-negro px-2 py-0.5 rounded">{LOCALES.find((l) => l.code === locale)?.label ?? locale.toUpperCase()}</span>
              <span className={`text-[0.6rem] transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {langDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 py-1 bg-negro border border-white/20 rounded shadow-xl min-w-[3rem] z-50">
                {LOCALES.map((loc) => (
                  <Link
                    key={loc.code}
                    href={getHrefForLocale(loc.code)}
                    className={`block font-[family-name:var(--font-archivo-narrow)] text-[0.75rem] font-bold uppercase px-3 py-2 transition-colors ${
                      locale === loc.code
                        ? 'bg-verde text-negro'
                        : 'opacity-75 hover:opacity-100 hover:bg-white/10'
                    }`}
                    onClick={() => setLangDropdownOpen(false)}
                  >
                    {loc.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menú"
        >
          <span className={`block w-6 h-0.5 bg-crudo transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-crudo transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-crudo transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="lg:hidden px-5 pb-4 flex flex-col gap-3 border-t border-white/10 pt-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-[family-name:var(--font-archivo-narrow)] text-sm font-semibold uppercase tracking-wide opacity-75 hover:opacity-100 transition-opacity py-1"
            >
              {link.label}
            </Link>
          ))}
          {/* Language switcher mobile - dropdown */}
          <div className="pt-2 border-t border-white/10 mt-2">
            <p className="text-[0.65rem] uppercase tracking-wider opacity-50 mb-2">Idioma</p>
            <div className="flex flex-wrap gap-2">
              {LOCALES.map((loc) => (
                <Link
                  key={loc.code}
                  href={getHrefForLocale(loc.code)}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase px-2 py-1 rounded transition-colors ${
                    locale === loc.code
                      ? 'bg-verde text-negro'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  {loc.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Info band */}
      <div className="bg-verde px-5 lg:px-8 py-2 font-[family-name:var(--font-archivo-narrow)] text-[0.75rem] flex flex-col sm:flex-row justify-between tracking-wide">
        <span>{dict.header.band_left}</span>
        <span>{dict.header.band_right}</span>
      </div>
    </header>
  )
}
