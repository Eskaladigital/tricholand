import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const localesMap = {
  en: 'en_US',
  es: 'es_ES',
  de: 'de_DE',
  fr: 'fr_FR',
  it: 'it_IT',
  nl: 'nl_NL',
  pt: 'pt_PT'
}
const allLocales = Object.keys(localesMap)

for (const loc of allLocales) {
  const layoutPath = join('src/app', loc, 'layout.tsx')
  let content = readFileSync(layoutPath, 'utf-8')

  // We want to replace the whole openGraph block
  const ogRegex = /openGraph:\s*\{[\s\S]*?images:\s*\[[^\]]+\](?:,\s*)?\},?/
  
  const currentLocale = localesMap[loc]
  const alternates = allLocales.filter(l => l !== loc).map(l => `'${localesMap[l]}'`).join(', ')

  const newOg = `openGraph: {
    ...defaultMetadata.openGraph,
    locale: '${currentLocale}',
    alternateLocales: [${alternates}],
  },`

  if (content.match(ogRegex)) {
    content = content.replace(ogRegex, newOg)
    writeFileSync(layoutPath, content, 'utf-8')
    console.log(`Fixed OpenGraph in ${loc}/layout.tsx`)
  } else {
    console.log(`Could not find OpenGraph block in ${loc}/layout.tsx`)
  }
}
