// Script para limpiar carpetas vacías del proyecto
// Ejecutar con: node cleanup-empty-dirs.mjs

import { rmdir } from 'fs/promises'
import { join } from 'path'

const root = '.'

const emptyDirs = [
  // Tienda - rutas abandonadas
  'src/app/es/tienda/carrito',
  'src/app/es/tienda/checkout',
  'src/app/es/tienda/cuenta/pedidos',
  'src/app/es/tienda/cuenta',
  'src/app/es/tienda/login',
  'src/app/es/tienda/registro',
  'src/app/es/tienda/[id]',
  // API admin vacías
  'src/app/api/admin/contacts',
  'src/app/api/admin/export',
  // Admin contacts [id] vacío
  'src/app/administrator/contacts/[id]',
  // Componentes vacíos
  'src/components/blog',
  'src/components/ui',
  // Lib vacías
  'src/lib/blog',
  'src/lib/email',
  'src/lib/supabase',
]

for (const dir of emptyDirs) {
  const fullPath = join(root, dir)
  try {
    await rmdir(fullPath)
    console.log(`✓ Eliminado: ${dir}`)
  } catch (err) {
    console.log(`⚠ No se pudo eliminar ${dir}: ${err.message}`)
  }
}

console.log('\n✅ Limpieza completada')
