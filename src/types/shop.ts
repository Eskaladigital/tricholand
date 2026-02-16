// ============================================
// PRODUCTOS / LOTES
// ============================================

export type ProductStatus = 'active' | 'draft' | 'out_of_stock' | 'archived'

export interface ProductImage {
  id: string
  url: string
  alt: string
  order: number
}

export interface Product {
  id: string
  created_at: string
  updated_at: string

  // Básicos
  name: string                    // "Lote T. Pachanoi 15-20cm"
  slug: string                    // "lote-pachanoi-15-20"
  variety_slug: string | null     // Link a la ficha de variedad (opcional)
  sku: string                     // "TRI-PAC-015-100"
  description: string             // Descripción del lote
  short_description: string       // Para cards del catálogo

  // Precio y cantidades
  price_cents: number             // Precio en céntimos (ej: 35000 = 350,00€)
  currency: 'EUR'
  min_order_qty: number           // Mínimo por pedido (ej: 100)
  qty_step: number                // Incrementos (ej: de 50 en 50)
  unit_label: string              // "unidades", "bandejas", "pallets" (se genera automáticamente)
  units_per_lot: number           // Unidades incluidas en el lote (ej: 750, 150, 100)

  // Características
  size_range: string              // "15-20 cm"
  specs: ProductSpec[]            // Características clave
  
  // Imágenes
  images: ProductImage[]
  
  // Estado y stock
  status: ProductStatus
  stock_qty: number | null        // null = sin control de stock
  
  // SEO
  meta_title: string | null
  meta_description: string | null

  // Categorización
  category: string | null         // "trichocereus", "otros-cactus", "accesorios"
  tags: string[]
  featured: boolean               // Destacado en home
  sort_order: number              // Orden en catálogo

  // Lote principal vs adicional
  lot_type: 'main' | 'additional' // main = estándar (ej. 750 uds). additional = suplemento (ej. 50 uds)
  additional_to_product_id: string | null  // Para additional: ID del producto principal
}

export interface ProductSpec {
  label: string                   // "Tamaño", "Maceta", "Edad"
  value: string                   // "15-20 cm", "Ø 8.5 cm", "2 años"
}

/** Formato legacy de lote (products.ts) - distinto de Product */
export interface ProductLot {
  id: string
  created_at: string
  updated_at: string
  variety_slug: string
  name: string
  sku: string
  description: string
  variety_name: string
  size_range: string
  units_per_lot: number
  price: number
  currency: 'EUR'
  lots_available: number
  status: ProductStatus
  image_url: string
  gallery: string[]
  highlights: string[]
  weight_kg?: number
  shipping_notes?: string
  meta_title?: string
  meta_description?: string
  sort_order: number
}

// Para crear/editar desde el admin
export interface ProductFormData {
  name: string
  slug: string
  variety_slug: string | null
  sku: string
  description: string
  short_description: string
  price_cents: number
  min_order_qty: number
  qty_step: number
  unit_label: string
  units_per_lot: number
  size_range: string
  specs: ProductSpec[]
  status: ProductStatus
  stock_qty: number | null
  category: string | null
  tags: string[]
  featured: boolean
  sort_order: number
  meta_title: string | null
  meta_description: string | null
  lot_type: 'main' | 'additional'
  additional_to_product_id: string | null
}

// Card del catálogo público
export interface ProductCard {
  id: string
  name: string
  slug: string
  sku: string
  short_description: string
  price_cents: number
  currency: 'EUR'
  min_order_qty: number
  unit_label: string
  lot_type: 'main' | 'additional'
  additional_to_product_id: string | null
  size_range: string
  status: ProductStatus
  stock_qty: number | null
  images: ProductImage[]
  category: string | null
  featured: boolean
  units_per_lot: number
}


// ============================================
// PEDIDOS / SOLICITUDES
// ============================================

export type OrderStatus =
  | 'pending'           // Solicitud recibida
  | 'reviewing'         // Admin revisando
  | 'quoted'            // Admin ha enviado presupuesto/link de pago
  | 'payment_pending'   // Esperando pago
  | 'paid'              // Pago confirmado
  | 'preparing'         // Preparando pedido
  | 'shipped'           // Enviado
  | 'delivered'         // Entregado
  | 'cancelled'         // Cancelado
  | 'refunded'          // Reembolsado

export type PaymentMethod = 'stripe' | 'redsys' | 'transfer' | 'other'

export interface OrderItem {
  id: string
  product_id: string
  product_name: string
  product_sku: string
  quantity: number
  unit_price_cents: number        // Precio unitario del lote
  total_cents: number             // quantity * unit_price_cents
  notes: string | null            // Notas del cliente para este item
}

export interface Order {
  id: string
  order_number: string            // "TRI-2025-0001"
  created_at: string
  updated_at: string

  // Estado
  status: OrderStatus
  
  // Cliente
  customer_name: string
  customer_company: string | null
  customer_email: string
  customer_phone: string | null
  customer_country: string
  customer_city: string | null
  customer_vat_id: string | null  // NIF/VAT para facturación B2B
  customer_address: string | null

  // Líneas del pedido
  items: OrderItem[]

  // Totales (calculados por admin, puede ajustar)
  subtotal_cents: number
  discount_cents: number          // Descuento aplicado por admin
  shipping_cents: number          // Coste envío (admin lo establece)
  tax_cents: number               // IVA
  total_cents: number
  currency: 'EUR'

  // Notas
  customer_notes: string | null   // Notas del cliente al hacer el pedido
  admin_notes: string | null      // Notas internas del admin

  // Pago
  payment_method: PaymentMethod | null
  payment_id: string | null       // ID de Stripe/Redsys
  payment_link: string | null     // Link de pago generado por admin
  paid_at: string | null

  // Envío
  shipping_tracking: string | null
  shipped_at: string | null
  delivered_at: string | null

  // Documentación
  invoice_number: string | null
  invoice_url: string | null

  // Locale del pedido
  locale: string
}

// Para el formulario de solicitud del cliente
export interface OrderRequestItem {
  product_id: string
  quantity: number
  notes?: string
}

export interface OrderRequestFormData {
  items: OrderRequestItem[]
  customer_name: string
  customer_company?: string
  customer_email: string
  customer_phone?: string
  customer_country: string
  customer_city?: string
  customer_vat_id?: string
  customer_address?: string
  customer_notes?: string
  locale: string
}


// ============================================
// HELPERS
// ============================================

/**
 * Formatea precio en céntimos a string con €
 */
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(cents / 100)
}

/**
 * Genera order number incremental
 */
export function generateOrderNumber(sequence: number): string {
  const year = new Date().getFullYear()
  return `TRI-${year}-${String(sequence).padStart(4, '0')}`
}
