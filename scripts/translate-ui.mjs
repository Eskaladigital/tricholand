/**
 * Script para traducir los diccionarios de UI (strings estáticas)
 * usando la API de OpenAI.
 * 
 * Uso:
 *   node scripts/translate-ui.mjs
 *   node scripts/translate-ui.mjs --locale en     (solo un idioma)
 * 
 * Requiere: OPENAI_API_KEY en .env.local
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// ─── Config ───────────────────────────────────────────
const LOCALES = ['en', 'nl', 'fr', 'de', 'it', 'pt']

const LOCALE_NAMES = {
  en: 'English',
  nl: 'Dutch (Nederlands)',
  fr: 'French (Français)',
  de: 'German (Deutsch)',
  it: 'Italian (Italiano)',
  pt: 'Portuguese (Português)',
}

// URL prefixes per locale (for href values in footer links etc.)
const LOCALE_URL_PREFIXES = {
  en: '/en',
  nl: '/nl',
  fr: '/fr',
  de: '/de',
  it: '/it',
  pt: '/pt',
}

// ─── Load env ─────────────────────────────────────────
function loadEnv() {
  const envPath = join(ROOT, '.env.local')
  if (!existsSync(envPath)) {
    console.error('❌ No se encontró .env.local')
    process.exit(1)
  }
  const envContent = readFileSync(envPath, 'utf-8')
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIndex = trimmed.indexOf('=')
    if (eqIndex === -1) continue
    const key = trimmed.slice(0, eqIndex)
    const value = trimmed.slice(eqIndex + 1)
    process.env[key] = value
  }
}

loadEnv()

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
if (!OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY no definida en .env.local')
  process.exit(1)
}

// ─── Read source dictionary ───────────────────────────
function readSourceDict() {
  const esPath = join(ROOT, 'src/lib/i18n/es.ts')
  const content = readFileSync(esPath, 'utf-8')
  
  // Extract the object between the first { and the last }
  // We need to evaluate it, so we'll extract the JSON-like structure
  const match = content.match(/export const es:\s*Dictionary\s*=\s*(\{[\s\S]*\})/)
  if (!match) {
    console.error('❌ No se pudo parsear es.ts')
    process.exit(1)
  }
  
  // We'll pass the raw TS content to OpenAI and let it translate
  return content
}

// ─── OpenAI translation ──────────────────────────────
async function translateWithOpenAI(sourceContent, targetLocale) {
  const targetLang = LOCALE_NAMES[targetLocale]
  const urlPrefix = LOCALE_URL_PREFIXES[targetLocale]

  const systemPrompt = `You are a professional translator for a B2B wholesale cactus nursery website called Tricholand.

CRITICAL RULES:
1. Translate ALL text values from Spanish to ${targetLang}
2. Keep the TypeScript structure EXACTLY the same — same keys, same types, same format
3. DO NOT translate:
   - Property keys (left side of colon)
   - URLs, email addresses, technical values
   - Brand names: "Tricholand", "Trichocereus" and all Latin species names
   - Numbers, units (m², cm, etc.)
   - The variable name and type annotation
4. Replace '/es/' in href values with '${urlPrefix}/'
5. Change the locale value in meta.locale to '${targetLocale}'
6. Change the export variable name from 'es' to '${targetLocale}'
7. Change the type import to match
8. Keep the tone professional, B2B, concise
9. For plant/botanical terms, use the standard terminology in ${targetLang}
10. Output ONLY the TypeScript file content, no explanations or markdown`

  const userPrompt = `Translate this TypeScript dictionary file from Spanish to ${targetLang}:

${sourceContent}`

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3,
      max_tokens: 4000,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`OpenAI API error: ${response.status} — ${err}`)
  }

  const data = await response.json()
  let content = data.choices[0].message.content

  // Strip markdown code fences if present
  content = content.replace(/^```(?:typescript|ts)?\n?/gm, '').replace(/\n?```$/gm, '').trim()

  return content
}

// ─── Write translated file ───────────────────────────
function writeTranslatedDict(locale, content) {
  const outPath = join(ROOT, `src/lib/i18n/${locale}.ts`)
  writeFileSync(outPath, content + '\n', 'utf-8')
  console.log(`  ✅ Guardado: src/lib/i18n/${locale}.ts`)
}

// ─── Update index.ts ─────────────────────────────────
function updateIndex(locales) {
  const allLocales = ['es', ...locales]
  
  const imports = allLocales.map(l => `import { ${l} } from './${l}'`).join('\n')
  const dictEntries = allLocales.map(l => `  ${l},`).join('\n')
  const typeEntries = allLocales.map(l => `'${l}'`).join(' | ')
  
  const content = `import type { Dictionary } from './types'
${imports}

export type Locale = ${typeEntries}

export const locales: Locale[] = [${allLocales.map(l => `'${l}'`).join(', ')}]

export const defaultLocale: Locale = 'es'

export const dictionaries: Record<Locale, Dictionary> = {
${dictEntries}
}

export function getDictionary(locale: string): Dictionary {
  return dictionaries[locale as Locale] || dictionaries.es
}

export function getLocaleFromPath(path: string): Locale {
  const segment = path.split('/')[1]
  return locales.includes(segment as Locale) ? (segment as Locale) : defaultLocale
}
`

  const outPath = join(ROOT, 'src/lib/i18n/index.ts')
  writeFileSync(outPath, content, 'utf-8')
  console.log(`  ✅ Actualizado: src/lib/i18n/index.ts`)
}

// ─── Main ────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2)
  const localeArg = args.find(a => a.startsWith('--locale'))
  let targetLocales = LOCALES

  if (localeArg) {
    const idx = args.indexOf('--locale')
    const loc = args[idx + 1]
    if (!LOCALES.includes(loc)) {
      console.error(`❌ Locale '${loc}' no válido. Opciones: ${LOCALES.join(', ')}`)
      process.exit(1)
    }
    targetLocales = [loc]
  }

  const sourceContent = readSourceDict()
  
  console.log(`\n🌍 Traduciendo UI strings a ${targetLocales.length} idioma(s)...\n`)

  for (const locale of targetLocales) {
    console.log(`\n🔄 Traduciendo a ${LOCALE_NAMES[locale]} (${locale})...`)
    try {
      const translated = await translateWithOpenAI(sourceContent, locale)
      writeTranslatedDict(locale, translated)
    } catch (err) {
      console.error(`  ❌ Error traduciendo ${locale}: ${err.message}`)
    }
    // Rate limit
    if (targetLocales.length > 1) {
      await new Promise(r => setTimeout(r, 1000))
    }
  }

  // Update index.ts with all available locales
  const allAvailableLocales = LOCALES.filter(l => {
    return existsSync(join(ROOT, `src/lib/i18n/${l}.ts`))
  })
  updateIndex(allAvailableLocales)

  console.log(`\n✅ Traducción UI completada\n`)
}

main().catch(console.error)
