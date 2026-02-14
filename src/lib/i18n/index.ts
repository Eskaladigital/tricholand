import type { Dictionary } from './types'
import { es } from './es'
import { en } from './en'
import { nl } from './nl'
import { fr } from './fr'
import { de } from './de'
import { it } from './it'
import { pt } from './pt'

const dictionaries: Record<string, Dictionary> = {
  es,
  en,
  nl,
  fr,
  de,
  it,
  pt,
}

export function getDictionary(locale: string): Dictionary {
  return dictionaries[locale] || dictionaries.es
}

export type { Dictionary }
