'use server'

import { createClient } from '@/lib/supabase/server'
import type { Product } from '@/types/shop'

export interface ProductOption {
  id: string
  name: string
  sku: string
  price_cents: number
}

function mapDbProductToProduct(row: Record<string, unknown>): Product {
  const images = (row.images as unknown[]) ?? []
  const specs = (row.specs as { label: string; value: string }[]) ?? []
  const tags = (row.tags as string[]) ?? []
  return {
    id: row.id as string,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
    name: row.name as string,
    slug: row.slug as string,
    variety_slug: (row.variety_slug as string) ?? null,
    sku: row.sku as string,
    description: (row.description as string) ?? '',
    short_description: (row.short_description as string) ?? '',
    price_cents: (row.price_cents as number) ?? 0,
    currency: 'EUR',
    min_order_qty: (row.min_order_qty as number) ?? 1,
    qty_step: (row.qty_step as number) ?? 1,
    unit_label: (row.unit_label as string) ?? 'lotes',
    size_range: (row.size_range as string) ?? '',
    specs: Array.isArray(specs) ? specs : [],
    images: Array.isArray(images) ? images.map((img: unknown, i: number) => ({
      id: (img as Record<string, unknown>)?.id as string ?? `img_${i}`,
      url: (img as Record<string, unknown>)?.url as string ?? '',
      alt: (img as Record<string, unknown>)?.alt as string ?? '',
      order: (img as Record<string, unknown>)?.order as number ?? i,
    })) : [],
    status: (row.status as Product['status']) ?? 'draft',
    stock_qty: (row.stock_qty as number) ?? null,
    meta_title: (row.meta_title as string) ?? null,
    meta_description: (row.meta_description as string) ?? null,
    category: (row.category as string) ?? null,
    tags: Array.isArray(tags) ? tags : [],
    featured: (row.featured as boolean) ?? false,
    sort_order: (row.sort_order as number) ?? 0,
  }
}

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*')
    .order('sort_order')
    .order('name')

  return (data ?? []).map(mapDbProductToProduct)
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null
  return mapDbProductToProduct(data as Record<string, unknown>)
}

export async function getProductsForSelect(): Promise<ProductOption[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('id, name, sku, price_cents')
    .eq('status', 'active')
    .order('name')

  return (data ?? []).map((p) => ({
    id: p.id,
    name: p.name,
    sku: p.sku,
    price_cents: p.price_cents ?? 0,
  }))
}

export async function createProduct(data: Record<string, unknown>): Promise<{ error?: string; id?: string }> {
  const supabase = await createClient()
  const { data: inserted, error } = await supabase.from('products').insert({
    name: data.name,
    slug: data.slug,
    variety_slug: data.variety_slug ?? null,
    sku: data.sku,
    description: data.description ?? '',
    short_description: data.short_description ?? '',
    price_cents: data.price_cents ?? 0,
    min_order_qty: data.min_order_qty ?? 1,
    qty_step: data.qty_step ?? 1,
    unit_label: data.unit_label ?? 'lotes',
    size_range: data.size_range ?? '',
    specs: data.specs ?? [],
    images: data.images ?? [],
    status: data.status ?? 'draft',
    stock_qty: data.stock_qty ?? null,
    meta_title: data.meta_title ?? null,
    meta_description: data.meta_description ?? null,
    category: data.category ?? null,
    tags: data.tags ?? [],
    featured: data.featured ?? false,
    sort_order: data.sort_order ?? 0,
  }).select('id').single()
  if (error) return { error: error.message }
  return { id: inserted?.id }
}

export async function updateProduct(id: string, data: Record<string, unknown>): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase.from('products').update({
    name: data.name,
    slug: data.slug,
    variety_slug: data.variety_slug ?? null,
    sku: data.sku,
    description: data.description ?? '',
    short_description: data.short_description ?? '',
    price_cents: data.price_cents ?? 0,
    min_order_qty: data.min_order_qty ?? 1,
    qty_step: data.qty_step ?? 1,
    unit_label: data.unit_label ?? 'lotes',
    size_range: data.size_range ?? '',
    specs: data.specs ?? [],
    images: data.images ?? [],
    status: data.status ?? 'draft',
    stock_qty: data.stock_qty ?? null,
    meta_title: data.meta_title ?? null,
    meta_description: data.meta_description ?? null,
    category: data.category ?? null,
    tags: data.tags ?? [],
    featured: data.featured ?? false,
    sort_order: data.sort_order ?? 0,
  }).eq('id', id)
  if (error) return { error: error.message }
  return {}
}
