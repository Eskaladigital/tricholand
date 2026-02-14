import type { Dictionary } from './types'
import { es } from './es'
import { en } from './en'
import { nl } from './nl'
import { fr } from './fr'
import { de } from './de'
import { it } from './it'
import { pt } from './pt'

export type Locale = 'es' | 'en' | 'nl' | 'fr' | 'de' | 'it' | 'pt'

export const locales: Locale[] = ['es', 'en', 'nl', 'fr', 'de', 'it', 'pt']

export const defaultLocale: Locale = 'es'

export const dictionaries: Record<Locale, Dictionary> = {
  es,
  en,
  nl,
  fr,
  de,
  it,
  pt,
}

export function getDictionary(locale: string): Dictionary {
  return dictionaries[locale as Locale] || dictionaries.es
}

export function getLocaleFromPath(path: string): Locale {
  const segment = path.split('/')[1]
  return locales.includes(segment as Locale) ? (segment as Locale) : defaultLocale
}
