/**
 * Script para insertar productos de ejemplo en Supabase.
 * Solo productos, sin contactos ni pedidos.
 *
 * Uso:
 *   node scripts/seed-products.mjs
 *
 * Requiere en .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// Cargar .env.local
const envPath = join(ROOT, '.env.local')
if (existsSync(envPath)) {
  const content = readFileSync(envPath, 'utf8')
  for (const line of content.split('\n')) {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      let value = match[2].trim()
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      process.env[key] = value
    }
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceKey) {
  console.error('❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local')
  process.exit(1)
}

const supabase = createClient(url, serviceKey)

const PRODUCTS = [
  {
    name: 'Lote T. Pachanoi 15-20 cm',
    slug: 'lote-pachanoi-15-20',
    variety_slug: 'trichocereus-pachanoi',
    sku: 'TRI-PAC-015-100',
    description: 'Lote de 100 unidades de Trichocereus pachanoi (San Pedro) en tamaño 15-20 cm, cultivados en maceta de Ø 8.5 cm. Plantas de 1-2 años con raíz bien establecida, listas para trasplante o venta directa. Incluye pasaporte fitosanitario UE.',
    short_description: 'San Pedro 15-20 cm · Maceta Ø 8.5 · Raíz establecida',
    price_cents: 35000,
    min_order_qty: 1,
    qty_step: 1,
    unit_label: 'lotes de 100 uds',
    size_range: '15-20 cm',
    specs: [
      { label: 'Especie', value: 'Echinopsis pachanoi' },
      { label: 'Tamaño planta', value: '15-20 cm' },
      { label: 'Maceta', value: 'Ø 8.5 cm' },
      { label: 'Edad', value: '1-2 años' },
      { label: 'Unidades por lote', value: '100' },
      { label: 'Pasaporte fito', value: 'Incluido' },
    ],
    images: [{ id: 'img_001', url: '/images/products/producto_trichocereus_pachanoi_1.png', alt: 'Lote T. Pachanoi 15-20cm', order: 0 }],
    status: 'active',
    stock_qty: 25,
    category: 'trichocereus',
    tags: ['pachanoi', 'san-pedro', 'lote'],
    featured: true,
    sort_order: 1,
  },
  {
    name: 'Lote T. Pachanoi 25-35 cm',
    slug: 'lote-pachanoi-25-35',
    variety_slug: 'trichocereus-pachanoi',
    sku: 'TRI-PAC-025-50',
    description: 'Lote de 50 unidades de Trichocereus pachanoi (San Pedro) en tamaño 25-35 cm, cultivados en maceta de Ø 12 cm. Plantas de 2-3 años con buen grosor de tallo y raíz muy establecida. Ideales para venta directa en garden center.',
    short_description: 'San Pedro 25-35 cm · Maceta Ø 12 · 2-3 años',
    price_cents: 45000,
    min_order_qty: 1,
    qty_step: 1,
    unit_label: 'lotes de 50 uds',
    size_range: '25-35 cm',
    specs: [
      { label: 'Especie', value: 'Echinopsis pachanoi' },
      { label: 'Tamaño planta', value: '25-35 cm' },
      { label: 'Maceta', value: 'Ø 12 cm' },
      { label: 'Edad', value: '2-3 años' },
      { label: 'Unidades por lote', value: '50' },
      { label: 'Pasaporte fito', value: 'Incluido' },
    ],
    images: [{ id: 'img_002', url: '/images/products/producto_trichocereus_pachanoi_2.png', alt: 'Lote T. Pachanoi 25-35cm', order: 0 }],
    status: 'active',
    stock_qty: 15,
    category: 'trichocereus',
    tags: ['pachanoi', 'san-pedro', 'lote'],
    featured: true,
    sort_order: 2,
  },
  {
    name: 'Lote T. Peruvianus 10-15 cm',
    slug: 'lote-peruvianus-10-15',
    variety_slug: 'trichocereus-peruvianus',
    sku: 'TRI-PER-010-100',
    description: 'Lote de 100 unidades de Trichocereus peruvianus (Antorcha Peruana) en tamaño 10-15 cm. Plantas jóvenes con buena espinación característica de la especie. Maceta Ø 8.5 cm.',
    short_description: 'Antorcha Peruana 10-15 cm · Maceta Ø 8.5 · Buena espinación',
    price_cents: 38000,
    min_order_qty: 1,
    qty_step: 1,
    unit_label: 'lotes de 100 uds',
    size_range: '10-15 cm',
    specs: [
      { label: 'Especie', value: 'Echinopsis peruviana' },
      { label: 'Tamaño planta', value: '10-15 cm' },
      { label: 'Maceta', value: 'Ø 8.5 cm' },
      { label: 'Edad', value: '1-2 años' },
      { label: 'Unidades por lote', value: '100' },
      { label: 'Pasaporte fito', value: 'Incluido' },
    ],
    images: [{ id: 'img_003', url: '/images/products/producto_trichocereus_peruvianus_1.png', alt: 'Lote T. Peruvianus 10-15cm', order: 0 }],
    status: 'active',
    stock_qty: 18,
    category: 'trichocereus',
    tags: ['peruvianus', 'antorcha-peruana', 'lote'],
    featured: true,
    sort_order: 3,
  },
  {
    name: 'Lote T. Bridgesii 10-15 cm',
    slug: 'lote-bridgesii-10-15',
    variety_slug: 'trichocereus-bridgesii',
    sku: 'TRI-BRI-010-50',
    description: 'Lote de 50 unidades de Trichocereus bridgesii (Achuma) en tamaño 10-15 cm. Especie muy buscada por coleccionistas con producción limitada. Maceta Ø 8.5 cm.',
    short_description: 'Achuma 10-15 cm · Stock limitado · Maceta Ø 8.5',
    price_cents: 42500,
    min_order_qty: 1,
    qty_step: 1,
    unit_label: 'lotes de 50 uds',
    size_range: '10-15 cm',
    specs: [
      { label: 'Especie', value: 'Echinopsis lageniformis' },
      { label: 'Tamaño planta', value: '10-15 cm' },
      { label: 'Maceta', value: 'Ø 8.5 cm' },
      { label: 'Edad', value: '1-2 años' },
      { label: 'Unidades por lote', value: '50' },
      { label: 'Pasaporte fito', value: 'Incluido' },
    ],
    images: [{ id: 'img_004', url: '/images/products/producto_trichocereus_bridgessi_1.png', alt: 'Lote T. Bridgesii 10-15cm', order: 0 }],
    status: 'active',
    stock_qty: 6,
    category: 'trichocereus',
    tags: ['bridgesii', 'achuma', 'lote', 'limitado'],
    featured: false,
    sort_order: 4,
  },
  {
    name: 'Lote T. Terscheckii 20-30 cm',
    slug: 'lote-terscheckii-20-30',
    variety_slug: 'trichocereus-pasacana-terscheckii',
    sku: 'TRI-TER-020-25',
    description: 'Lote de 25 unidades de Trichocereus terscheckii (Cardón Grande) en tamaño 20-30 cm. El gigante del género, con espinas robustas y porte impresionante. Maceta Ø 14 cm. Crecimiento lento, ejemplares de 3-4 años.',
    short_description: 'Cardón Grande 20-30 cm · Maceta Ø 14 · 3-4 años',
    price_cents: 37500,
    min_order_qty: 1,
    qty_step: 1,
    unit_label: 'lotes de 25 uds',
    size_range: '20-30 cm',
    specs: [
      { label: 'Especie', value: 'Echinopsis terscheckii' },
      { label: 'Tamaño planta', value: '20-30 cm' },
      { label: 'Maceta', value: 'Ø 14 cm' },
      { label: 'Edad', value: '3-4 años' },
      { label: 'Unidades por lote', value: '25' },
      { label: 'Pasaporte fito', value: 'Incluido' },
    ],
    images: [{ id: 'img_005', url: '/images/varieties/Trichocereus_terscheckii_1.png', alt: 'Lote T. Terscheckii 20-30cm', order: 0 }],
    status: 'active',
    stock_qty: 10,
    category: 'trichocereus',
    tags: ['terscheckii', 'cardon', 'lote'],
    featured: false,
    sort_order: 5,
  },
  {
    name: 'Lote T. Spachianus (portainjerto) 15-20 cm',
    slug: 'lote-spachianus-portainjerto-15-20',
    variety_slug: 'trichocereus-spachianus',
    sku: 'TRI-SPA-015-100',
    description: 'Lote de 100 unidades de Trichocereus spachianus (Antorcha Dorada) en tamaño 15-20 cm, ideales como portainjerto profesional. Gran vigor y alta compatibilidad. Maceta Ø 8.5 cm.',
    short_description: 'Portainjerto profesional 15-20 cm · 100 uds · Ø 8.5',
    price_cents: 28000,
    min_order_qty: 1,
    qty_step: 1,
    unit_label: 'lotes de 100 uds',
    size_range: '15-20 cm',
    specs: [
      { label: 'Especie', value: 'Echinopsis spachiana' },
      { label: 'Uso', value: 'Portainjerto / Ornamental' },
      { label: 'Tamaño planta', value: '15-20 cm' },
      { label: 'Maceta', value: 'Ø 8.5 cm' },
      { label: 'Unidades por lote', value: '100' },
      { label: 'Pasaporte fito', value: 'Incluido' },
    ],
    images: [{ id: 'img_006', url: '/images/vivero/vivero-020.jpg', alt: 'Lote T. Spachianus portainjerto', order: 0 }],
    status: 'active',
    stock_qty: 8,
    category: 'trichocereus',
    tags: ['spachianus', 'portainjerto', 'lote'],
    featured: false,
    sort_order: 6,
  },
  {
    name: 'Pack mixto 5 variedades (muestra)',
    slug: 'pack-mixto-5-variedades',
    variety_slug: null,
    sku: 'TRI-MIX-005-50',
    description: 'Pack de muestra con 50 unidades: 10 de cada variedad principal (Pachanoi, Peruvianus, Bridgesii, Macrogonus, Spachianus). Ideal para viveros que quieren probar nuestro producto antes de hacer un pedido grande. Tamaño 10-15 cm, maceta Ø 8.5 cm.',
    short_description: 'Pack muestra · 5 variedades × 10 uds · Ideal primer pedido',
    price_cents: 22500,
    min_order_qty: 1,
    qty_step: 1,
    unit_label: 'packs de 50 uds',
    size_range: '10-15 cm',
    specs: [
      { label: 'Contenido', value: '5 variedades × 10 uds' },
      { label: 'Variedades', value: 'PAC, PER, BRI, MAC, SPA' },
      { label: 'Tamaño', value: '10-15 cm' },
      { label: 'Maceta', value: 'Ø 8.5 cm' },
      { label: 'Total unidades', value: '50' },
      { label: 'Pasaporte fito', value: 'Incluido' },
    ],
    images: [{ id: 'img_007', url: '/images/vivero/vivero_mayorista_cactus.png', alt: 'Pack mixto 5 variedades', order: 0 }],
    status: 'active',
    stock_qty: 20,
    category: 'packs',
    tags: ['pack', 'mixto', 'muestra', 'primer-pedido'],
    featured: true,
    sort_order: 0,
  },
]

async function main() {
  console.log('🌵 Insertando productos de ejemplo en Supabase...\n')

  for (const p of PRODUCTS) {
    const row = {
      name: p.name,
      slug: p.slug,
      variety_slug: p.variety_slug,
      sku: p.sku,
      description: p.description,
      short_description: p.short_description,
      price_cents: p.price_cents,
      min_order_qty: p.min_order_qty,
      qty_step: p.qty_step,
      unit_label: p.unit_label,
      size_range: p.size_range,
      specs: p.specs,
      images: p.images,
      status: p.status,
      stock_qty: p.stock_qty,
      category: p.category,
      tags: p.tags,
      featured: p.featured,
      sort_order: p.sort_order,
    }

    const { error } = await supabase.from('products').upsert(row, { onConflict: 'slug' })

    if (error) {
      console.error(`❌ ${p.sku}: ${error.message}`)
    } else {
      console.log(`✓ ${p.sku} — ${p.name}`)
    }
  }

  console.log('\n✅ Seed completado.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
