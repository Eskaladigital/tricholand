import type { Product } from '@/types/shop'
import { getBulkTranslations } from '@/lib/translations'
import { getPlantImageUrl } from '@/lib/storage'

/**
 * Datos demo de productos/lotes.
 * En producción esto vendrá de Supabase via el panel admin.
 */
export const productsDemo: Product[] = [
  {
    id: 'prod_001',
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z',
    name: 'Lote T. Pachanoi 15-20 cm',
    slug: 'lote-pachanoi-15-20',
    variety_slug: 'trichocereus-pachanoi',
    sku: 'TRI-PAC-015-100',
    description: 'Lote de 100 unidades de Trichocereus pachanoi (San Pedro) en tamaño 15-20 cm, cultivados en maceta de Ø 8.5 cm. Plantas de 1-2 años con raíz bien establecida, listas para trasplante o venta directa. Incluye pasaporte fitosanitario UE.',
    short_description: 'San Pedro 15-20 cm · Maceta Ø 8.5 · Raíz establecida',
    price_cents: 35000,
    currency: 'EUR',
    min_order_qty: 1,
    qty_step: 1,
    unit_label: 'lotes de 100 uds',
    units_per_lot: 100,
    size_range: '15-20 cm',
    specs: [
      { label: 'Especie', value: 'Echinopsis pachanoi' },
      { label: 'Tamaño planta', value: '15-20 cm' },
      { label: 'Maceta', value: 'Ø 8.5 cm' },
      { label: 'Edad', value: '1-2 años' },
      { label: 'Unidades por lote', value: '100' },
      { label: 'Pasaporte fito', value: 'Incluido' },
    ],
    images: [
      { id: 'img_001', url: getPlantImageUrl('Pachanoi/producto_trichocereus_pachanoi_1.webp'), alt: 'Lote T. Pachanoi 15-20cm', order: 0 },
    ],
    status: 'active',
    stock_qty: 25,
    meta_title: null,
    meta_description: null,
    category: 'trichocereus',
    tags: ['pachanoi', 'san-pedro', 'lote'],
    featured: true,
    sort_order: 1,
  },
  {
    id: 'prod_002',
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z',
    name: 'Lote T. Pachanoi 25-35 cm',
    slug: 'lote-pachanoi-25-35',
    variety_slug: 'trichocereus-pachanoi',
    sku: 'TRI-PAC-025-50',
    description: 'Lote de 50 unidades de Trichocereus pachanoi (San Pedro) en tamaño 25-35 cm, cultivados en maceta de Ø 12 cm. Plantas de 2-3 años con buen grosor de tallo y raíz muy establecida. Ideales para venta directa en garden center.',
    short_description: 'San Pedro 25-35 cm · Maceta Ø 12 · 2-3 años',
    price_cents: 45000,
    currency: 'EUR',
    min_order_qty: 1,
    qty_step: 1,
    unit_label: 'lotes de 50 uds',
    units_per_lot: 50,
    size_range: '25-35 cm',
    specs: [
      { label: 'Especie', value: 'Echinopsis pachanoi' },
      { label: 'Tamaño planta', value: '25-35 cm' },
      { label: 'Maceta', value: 'Ø 12 cm' },
      { label: 'Edad', value: '2-3 años' },
      { label: 'Unidades por lote', value: '50' },
      { label: 'Pasaporte fito', value: 'Incluido' },
    ],
    images: [
      { id: 'img_002', url: getPlantImageUrl('Pachanoi/producto_trichocereus_pachanoi_2.webp'), alt: 'Lote T. Pachanoi 25-35cm', order: 0 },
    ],
    status: 'active',
    stock_qty: 15,
    meta_title: null,
    meta_description: null,
    category: 'trichocereus',
    tags: ['pachanoi', 'san-pedro', 'lote'],
    featured: true,
    sort_order: 2,
  },
  {
    id: 'prod_003',
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z',
    name: 'Lote T. Peruvianus 10-15 cm',
    slug: 'lote-peruvianus-10-15',
    variety_slug: 'trichocereus-peruvianus',
    sku: 'TRI-PER-010-100',
    description: 'Lote de 100 unidades de Trichocereus peruvianus (Antorcha Peruana) en tamaño 10-15 cm. Plantas jóvenes con buena espinación característica de la especie. Maceta Ø 8.5 cm.',
    short_description: 'Antorcha Peruana 10-15 cm · Maceta Ø 8.5 · Buena espinación',
    price_cents: 38000,
    currency: 'EUR',
    min_order_qty: 1,
    qty_step: 1,
    unit_label: 'lotes de 100 uds',
    units_per_lot: 100,
    size_range: '10-15 cm',
    specs: [
      { label: 'Especie', value: 'Echinopsis peruviana' },
      { label: 'Tamaño planta', value: '10-15 cm' },
      { label: 'Maceta', value: 'Ø 8.5 cm' },
      { label: 'Edad', value: '1-2 años' },
      { label: 'Unidades por lote', value: '100' },
      { label: 'Pasaporte fito', value: 'Incluido' },
    ],
    images: [
      { id: 'img_003', url: getPlantImageUrl('Peruvianus/producto_trichocereus_peruvianus_1.webp'), alt: 'Lote T. Peruvianus 10-15cm', order: 0 },
    ],
    status: 'active',
    stock_qty: 18,
    meta_title: null,
    meta_description: null,
    category: 'trichocereus',
    tags: ['peruvianus', 'antorcha-peruana', 'lote'],
    featured: true,
    sort_order: 3,
  },
  {
    id: 'prod_004',
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z',
    name: 'Lote T. Bridgesii 10-15 cm',
    slug: 'lote-bridgesii-10-15',
    variety_slug: 'trichocereus-bridgesii',
    sku: 'TRI-BRI-010-50',
    description: 'Lote de 50 unidades de Trichocereus bridgesii (Achuma) en tamaño 10-15 cm. Especie muy buscada por coleccionistas con producción limitada. Maceta Ø 8.5 cm.',
    short_description: 'Achuma 10-15 cm · Stock limitado · Maceta Ø 8.5',
    price_cents: 42500,
    currency: 'EUR',
    min_order_qty: 1,
    qty_step: 1,
    unit_label: 'lotes de 50 uds',
    units_per_lot: 50,
    size_range: '10-15 cm',
    specs: [
      { label: 'Especie', value: 'Echinopsis lageniformis' },
      { label: 'Tamaño planta', value: '10-15 cm' },
      { label: 'Maceta', value: 'Ø 8.5 cm' },
      { label: 'Edad', value: '1-2 años' },
      { label: 'Unidades por lote', value: '50' },
      { label: 'Pasaporte fito', value: 'Incluido' },
    ],
    images: [
      { id: 'img_004', url: getPlantImageUrl('Bridgesii/producto_trichocereus_bridgessi_1.webp'), alt: 'Lote T. Bridgesii 10-15cm', order: 0 },
    ],
    status: 'active',
    stock_qty: 6,
    meta_title: null,
    meta_description: null,
    category: 'trichocereus',
    tags: ['bridgesii', 'achuma', 'lote', 'limitado'],
    featured: false,
    sort_order: 4,
  },
  {
    id: 'prod_005',
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z',
    name: 'Lote T. Terscheckii 20-30 cm',
    slug: 'lote-terscheckii-20-30',
    variety_slug: 'trichocereus-pasacana-terscheckii',
    sku: 'TRI-TER-020-25',
    description: 'Lote de 25 unidades de Trichocereus terscheckii (Cardón Grande) en tamaño 20-30 cm. El gigante del género, con espinas robustas y porte impresionante. Maceta Ø 14 cm. Crecimiento lento, ejemplares de 3-4 años.',
    short_description: 'Cardón Grande 20-30 cm · Maceta Ø 14 · 3-4 años',
    price_cents: 37500,
    currency: 'EUR',
    min_order_qty: 1,
    qty_step: 1,
    unit_label: 'lotes de 25 uds',
    units_per_lot: 25,
    size_range: '20-30 cm',
    specs: [
      { label: 'Especie', value: 'Echinopsis terscheckii' },
      { label: 'Tamaño planta', value: '20-30 cm' },
      { label: 'Maceta', value: 'Ø 14 cm' },
      { label: 'Edad', value: '3-4 años' },
      { label: 'Unidades por lote', value: '25' },
      { label: 'Pasaporte fito', value: 'Incluido' },
    ],
    images: [
      { id: 'img_005', url: getPlantImageUrl('Terscheckii/Trichocereus_terscheckii_1.webp'), alt: 'Lote T. Terscheckii 20-30cm', order: 0 },
    ],
    status: 'active',
    stock_qty: 10,
    meta_title: null,
    meta_description: null,
    category: 'trichocereus',
    tags: ['terscheckii', 'cardon', 'lote'],
    featured: false,
    sort_order: 5,
  },
  {
    id: 'prod_006',
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z',
    name: 'Lote T. Spachianus (portainjerto) 15-20 cm',
    slug: 'lote-spachianus-portainjerto-15-20',
    variety_slug: 'trichocereus-spachianus',
    sku: 'TRI-SPA-015-100',
    description: 'Lote de 100 unidades de Trichocereus spachianus (Antorcha Dorada) en tamaño 15-20 cm, ideales como portainjerto profesional. Gran vigor y alta compatibilidad. Maceta Ø 8.5 cm.',
    short_description: 'Portainjerto profesional 15-20 cm · 100 uds · Ø 8.5',
    price_cents: 28000,
    currency: 'EUR',
    min_order_qty: 1,
    qty_step: 1,
    unit_label: 'lotes de 100 uds',
    units_per_lot: 100,
    size_range: '15-20 cm',
    specs: [
      { label: 'Especie', value: 'Echinopsis spachiana' },
      { label: 'Uso', value: 'Portainjerto / Ornamental' },
      { label: 'Tamaño planta', value: '15-20 cm' },
      { label: 'Maceta', value: 'Ø 8.5 cm' },
      { label: 'Unidades por lote', value: '100' },
      { label: 'Pasaporte fito', value: 'Incluido' },
    ],
    images: [
      { id: 'img_006', url: getPlantImageUrl('Spachianus/vivero-020.webp'), alt: 'Lote T. Spachianus portainjerto', order: 0 },
    ],
    status: 'active',
    stock_qty: 8,
    meta_title: null,
    meta_description: null,
    category: 'trichocereus',
    tags: ['spachianus', 'portainjerto', 'lote'],
    featured: false,
    sort_order: 6,
  },
  {
    id: 'prod_007',
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z',
    name: 'Pack mixto 5 variedades (muestra)',
    slug: 'pack-mixto-5-variedades',
    variety_slug: null,
    sku: 'TRI-MIX-005-50',
    description: 'Pack de muestra con 50 unidades: 10 de cada variedad principal (Pachanoi, Peruvianus, Bridgesii, Macrogonus, Spachianus). Ideal para viveros que quieren probar nuestro producto antes de hacer un pedido grande. Tamaño 10-15 cm, maceta Ø 8.5 cm.',
    short_description: 'Pack muestra · 5 variedades × 10 uds · Ideal primer pedido',
    price_cents: 22500,
    currency: 'EUR',
    min_order_qty: 1,
    qty_step: 1,
    unit_label: 'packs de 50 uds',
    units_per_lot: 50,
    size_range: '10-15 cm',
    specs: [
      { label: 'Contenido', value: '5 variedades × 10 uds' },
      { label: 'Variedades', value: 'PAC, PER, BRI, MAC, SPA' },
      { label: 'Tamaño', value: '10-15 cm' },
      { label: 'Maceta', value: 'Ø 8.5 cm' },
      { label: 'Total unidades', value: '50' },
      { label: 'Pasaporte fito', value: 'Incluido' },
    ],
    images: [
      { id: 'img_007', url: getPlantImageUrl('Vivero/vivero_mayorista_cactus.webp'), alt: 'Pack mixto 5 variedades', order: 0 },
    ],
    status: 'active',
    stock_qty: 20,
    meta_title: null,
    meta_description: null,
    category: 'packs',
    tags: ['pack', 'mixto', 'muestra', 'primer-pedido'],
    featured: true,
    sort_order: 0,
  },
]

// Helpers
export function getProductBySlug(slug: string): Product | undefined {
  return productsDemo.find((p) => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return productsDemo.find((p) => p.id === id)
}

/** Devuelve el producto con campos traducidos según locale. Lee de Supabase. Fallback a español. */
export async function getProductForLocale(slug: string, locale: string): Promise<Product | undefined> {
  const base = getProductBySlug(slug)
  if (!base) return undefined
  if (locale === 'es') return base

  const bulk = await getBulkTranslations('product', locale)
  const trans = bulk[slug]
  if (!trans) return base

  return {
    ...base,
    ...(trans.name && { name: trans.name }),
    ...(trans.short_description && { short_description: trans.short_description }),
    ...(trans.description && { description: trans.description }),
    ...(trans.unit_label && { unit_label: trans.unit_label }),
  }
}

export function getActiveProducts(): Product[] {
  return productsDemo
    .filter((p) => p.status === 'active')
    .sort((a, b) => a.sort_order - b.sort_order)
}

/** Productos activos con traducciones según locale. Lee de Supabase. */
export async function getActiveProductsForLocale(locale: string): Promise<Product[]> {
  if (locale === 'es') return getActiveProducts()

  const bulk = await getBulkTranslations('product', locale)
  return getActiveProducts().map((p) => {
    const trans = bulk[p.slug]
    if (!trans) return p
    return {
      ...p,
      ...(trans.name && { name: trans.name }),
      ...(trans.short_description && { short_description: trans.short_description }),
      ...(trans.description && { description: trans.description }),
      ...(trans.unit_label && { unit_label: trans.unit_label }),
    }
  })
}

export function getFeaturedProducts(): Product[] {
  return getActiveProducts().filter((p) => p.featured)
}
