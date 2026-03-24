import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const locales = ['en', 'es', 'de', 'fr', 'it', 'nl', 'pt']

for (const loc of locales) {
  // 1. Remove alternates from layout.tsx
  const layoutPath = join('src/app', loc, 'layout.tsx')
  let layoutContent = readFileSync(layoutPath, 'utf-8')

  // Find and remove the alternates object inside metadata
  const alternatesRegex = /alternates:\s*\{\s*canonical:\s*'[^']+',\s*languages:\s*\{\s*[^}]+\s*\},\s*\},/g
  layoutContent = layoutContent.replace(alternatesRegex, '')
  writeFileSync(layoutPath, layoutContent, 'utf-8')
  console.log(`Removed alternates from ${loc}/layout.tsx`)

  // 2. Add alternates to page.tsx
  const pagePath = join('src/app', loc, 'page.tsx')
  let pageContent = readFileSync(pagePath, 'utf-8')

  if (!pageContent.includes('export const metadata')) {
    // We need to import getHomeAlternates and export metadata
    // First, find the first import line
    const importMatch = pageContent.match(/import [^\n]+/)
    if (importMatch) {
      pageContent = pageContent.replace(
        importMatch[0],
        `import type { Metadata } from 'next'\nimport { getHomeAlternates } from '@/lib/i18n/paths'\n${importMatch[0]}`
      )

      // Add metadata export before export default function
      const metadataExport = `\nexport const metadata: Metadata = {\n  alternates: getHomeAlternates('${loc}'),\n}\n\n`
      pageContent = pageContent.replace('export default function', `${metadataExport}export default function`)
    }

    writeFileSync(pagePath, pageContent, 'utf-8')
    console.log(`Added alternates to ${loc}/page.tsx`)
  }
}
