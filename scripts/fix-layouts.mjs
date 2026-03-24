import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const locales = ['en', 'es', 'de', 'fr', 'it', 'nl', 'pt']

for (const loc of locales) {
  const filePath = join('src/app', loc, 'layout.tsx')
  let content = readFileSync(filePath, 'utf-8')

  if (content.includes('RootHtml')) continue

  content = content.replace(
    `import type { Metadata } from 'next'`,
    `import type { Metadata, Viewport } from 'next'\nimport { RootHtml } from '@/components/layout/RootHtml'\nimport { defaultMetadata, defaultViewport } from '@/lib/metadata'`
  )

  // Add viewport if not present
  if (!content.includes('export const viewport')) {
    content = content.replace(
      `export const metadata: Metadata = {`,
      `export const viewport: Viewport = defaultViewport\n\nexport const metadata: Metadata = {\n  ...defaultMetadata,`
    )
  }

  // Replace <div lang="X"> with <RootHtml lang="X">
  content = content.replace(
    `<div lang="${loc}">`,
    `<RootHtml lang="${loc}">`
  )

  // Replace </div> at the end with </RootHtml>
  // We'll just replace the last </div> before the closing brace
  content = content.replace(/<\/div>\s*\)\s*}\s*$/, '</RootHtml>\n  )\n}\n')

  writeFileSync(filePath, content, 'utf-8')
  console.log(`Updated ${loc}/layout.tsx`)
}
