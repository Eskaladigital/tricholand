/**
 * Actualiza referencias de .png/.jpg a .webp en el código
 * Ejecutar después de: node scripts/convert-images-to-webp.mjs
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json']
const DIRS = ['src', 'scripts']

function getAllFiles(dir, files = []) {
  try {
    const entries = readdirSync(dir, { withFileTypes: true })
    for (const e of entries) {
      const full = join(dir, e.name)
      if (e.isDirectory() && !e.name.startsWith('.') && e.name !== 'node_modules') {
        getAllFiles(full, files)
      } else if (EXTENSIONS.some((ext) => e.name.endsWith(ext))) {
        files.push(full)
      }
    }
  } catch {
    // skip
  }
  return files
}

function main() {
  const files = []
  for (const d of DIRS) {
    const dirPath = join(ROOT, d)
    getAllFiles(dirPath, files)
  }

  let updated = 0
  for (const filePath of files) {
    let content = readFileSync(filePath, 'utf8')
    const original = content

    // /images/.../xxx.png -> .webp
    content = content.replace(/\/images\/([^'"`\s]+)\.png/g, '/images/$1.webp')
    // /images/.../xxx.jpg -> .webp
    content = content.replace(/\/images\/([^'"`\s]+)\.jpg/g, '/images/$1.webp')
    content = content.replace(/\/images\/([^'"`\s]+)\.jpeg/g, '/images/$1.webp')

    if (content !== original) {
      writeFileSync(filePath, content)
      updated++
      console.log(`  ✓ ${filePath.replace(ROOT, '')}`)
    }
  }

  console.log(`\n✅ ${updated} archivos actualizados`)
}

main()
