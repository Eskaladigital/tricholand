/**
 * Path segments by locale. Each locale uses its own language slugs.
 * Use getPath() / getFullPath() for locale-aware URLs.
 */
const DEFAULT_PATHS = {
  varieties: 'variedades',
  shop: 'tienda',
  shopOrder: 'tienda/pedido',
  services: 'servicios',
  about: 'sobre-nosotros',
  contact: 'contacto',
  certifications: 'certificaciones',
  privacy: 'politica-privacidad',
  legal: 'aviso-legal',
} as const

const EN_PATHS = {
  varieties: 'varieties',
  shop: 'shop',
  shopOrder: 'shop/order',
  services: 'services',
  about: 'about-us',
  contact: 'contact',
  certifications: 'certifications',
  privacy: 'privacy-policy',
  legal: 'legal-notice',
} as const

const DE_PATHS = {
  varieties: 'sorten',
  shop: 'shop',
  shopOrder: 'shop/bestellung',
  services: 'dienstleistungen',
  about: 'uber-uns',
  contact: 'kontakt',
  certifications: 'zertifizierungen',
  privacy: 'datenschutz',
  legal: 'impressum',
} as const

const FR_PATHS = {
  varieties: 'varietes',
  shop: 'boutique',
  shopOrder: 'boutique/commande',
  services: 'services',
  about: 'a-propos',
  contact: 'contact',
  certifications: 'certifications',
  privacy: 'politique-confidentialite',
  legal: 'mentions-legales',
} as const

const IT_PATHS = {
  varieties: 'varieta',
  shop: 'shop',
  shopOrder: 'shop/ordine',
  services: 'servizi',
  about: 'chi-siamo',
  contact: 'contatto',
  certifications: 'certificazioni',
  privacy: 'privacy',
  legal: 'note-legali',
} as const

const NL_PATHS = {
  varieties: 'varieteiten',
  shop: 'winkel',
  shopOrder: 'winkel/bestelling',
  services: 'diensten',
  about: 'over-ons',
  contact: 'contact',
  certifications: 'certificeringen',
  privacy: 'privacybeleid',
  legal: 'juridische-informatie',
} as const

const PT_PATHS = {
  varieties: 'variedades',
  shop: 'loja',
  shopOrder: 'loja/pedido',
  services: 'servicos',
  about: 'sobre-nos',
  contact: 'contacto',
  certifications: 'certificacoes',
  privacy: 'politica-privacidade',
  legal: 'aviso-legal',
} as const

type PathKey = keyof typeof DEFAULT_PATHS

const LOCALE_PATHS: Record<string, { [K in PathKey]: string }> = {
  es: DEFAULT_PATHS,
  en: EN_PATHS,
  de: DE_PATHS,
  fr: FR_PATHS,
  it: IT_PATHS,
  nl: NL_PATHS,
  pt: PT_PATHS,
}

export type { PathKey }

export function getPath(locale: string, key: PathKey): string {
  return (LOCALE_PATHS[locale] ?? DEFAULT_PATHS)[key]
}

export function getFullPath(locale: string, key: PathKey, slug?: string): string {
  const base = `/${locale}/${getPath(locale, key)}`
  return slug ? `${base}/${slug}` : base
}

/** URLs alternates para hreflang de una página (ej: varieties, shop). Incluye x-default (es). */
export function getAlternateUrls(key: PathKey, slug?: string): Record<string, string> {
  const BASE = 'https://www.tricholand.com'
  const locales = ['es', 'en', 'de', 'fr', 'it', 'nl', 'pt'] as const
  const out: Record<string, string> = { 'x-default': `${BASE}${getFullPath('es', key, slug)}` }
  for (const loc of locales) {
    out[loc] = `${BASE}${getFullPath(loc, key, slug)}`
  }
  return out
}

const BASE_URL = 'https://www.tricholand.com'

/** Alternates para metadata de Next.js (canonical + languages). Usar en cada página. */
export function getAlternatesMetadata(locale: string, key: PathKey, slug?: string) {
  return {
    canonical: `${BASE_URL}${getFullPath(locale, key, slug)}`,
    languages: getAlternateUrls(key, slug),
  }
}

/**
 * Traduce la ruta actual al path equivalente en otro locale.
 * Ej: /en/shop → /es/tienda, /en/shop/order → /es/tienda/pedido
 */
export function getPathForLocaleSwitch(
  pathWithoutLocale: string,
  currentLocale: string,
  targetLocale: string
): string {
  const segments = pathWithoutLocale.replace(/^\//, '').split('/').filter(Boolean)
  if (segments.length === 0) return `/${targetLocale}`

  const pathKeys: PathKey[] = [
    'shopOrder',
    'shop',
    'varieties',
    'services',
    'about',
    'contact',
    'certifications',
    'privacy',
    'legal',
  ]

  for (const key of pathKeys) {
    const currentPath = getPath(currentLocale, key)
    const currentSegs = currentPath.split('/')

    if (key === 'shopOrder') {
      if (segments[0] === currentSegs[0] && segments[1] === currentSegs[1]) {
        return getFullPath(targetLocale, key)
      }
    } else if (key === 'shop' || key === 'varieties') {
      if (segments[0] === currentSegs[0]) {
        if (segments.length === 1) {
          return getFullPath(targetLocale, key)
        }
        const slug = segments.slice(1).join('/')
        return getFullPath(targetLocale, key, slug)
      }
    } else {
      if (currentPath === segments.join('/')) {
        return getFullPath(targetLocale, key)
      }
    }
  }

  return `/${targetLocale}${pathWithoutLocale.startsWith('/') ? pathWithoutLocale : '/' + pathWithoutLocale}`
}

/** Alternates para índice de blog (/blog igual en todos los locales) */
export function getBlogIndexAlternates(locale: string) {
  const locales = ['es', 'en', 'de', 'fr', 'it', 'nl', 'pt'] as const
  const languages: Record<string, string> = { 'x-default': `${BASE_URL}/es/blog` }
  for (const loc of locales) {
    languages[loc] = `${BASE_URL}/${loc}/blog`
  }
  return {
    canonical: `${BASE_URL}/${locale}/blog`,
    languages,
  }
}
