'use server'

import { createClient } from '@/lib/supabase/server'
import type { OrderStatus, PaymentMethod } from '@/types/shop'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export interface OrderListItem {
  id: string
  order_number: string
  created_at: string
  status: OrderStatus
  customer_name: string
  customer_company: string | null
  customer_email: string
  customer_country: string
  items_count: number
  subtotal_cents: number
}

export async function getOrdersList(): Promise<OrderListItem[]> {
  const supabase = await createClient()
  const { data: orders } = await supabase
    .from('orders')
    .select('id, order_number, created_at, status, customer_name, customer_company, customer_email, customer_country, subtotal_cents')
    .order('created_at', { ascending: false })

  if (!orders || orders.length === 0) return []

  const orderIds = orders.map((o) => o.id)
  const { data: itemsCount } = await supabase
    .from('order_items')
    .select('order_id')
    .in('order_id', orderIds)

  const countMap = new Map<string, number>()
  for (const i of itemsCount ?? []) {
    countMap.set(i.order_id, (countMap.get(i.order_id) ?? 0) + 1)
  }

  return orders.map((o) => ({
    id: o.id,
    order_number: o.order_number,
    created_at: o.created_at,
    status: o.status as OrderStatus,
    customer_name: o.customer_name,
    customer_company: o.customer_company,
    customer_email: o.customer_email,
    customer_country: o.customer_country,
    items_count: countMap.get(o.id) ?? 0,
    subtotal_cents: o.subtotal_cents ?? 0,
  }))
}

export interface OrderItemRow {
  id: string
  product_id: string | null
  product_name: string
  product_sku: string
  quantity: number
  unit_price_cents: number
  total_cents: number
  notes: string | null
}

export interface OrderRow {
  id: string
  order_number: string
  created_at: string
  updated_at: string
  status: OrderStatus
  customer_name: string
  customer_company: string | null
  customer_email: string
  customer_phone: string | null
  customer_country: string
  customer_city: string | null
  customer_vat_id: string | null
  customer_address: string | null
  customer_notes: string | null
  admin_notes: string | null
  subtotal_cents: number
  discount_cents: number
  shipping_cents: number
  tax_cents: number
  total_cents: number
  currency: string
  payment_method: PaymentMethod | null
  payment_link: string | null
  shipping_tracking: string | null
  invoice_number: string | null
  invoice_url: string | null
  locale: string
}

export async function getOrderById(id: string): Promise<{ order: OrderRow; items: OrderItemRow[] } | null> {
  if (!UUID_REGEX.test(id)) return null
  const supabase = await createClient()

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single()

  if (orderError || !order) return null

  const { data: items, error: itemsError } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', id)

  if (itemsError) return { order: order as OrderRow, items: [] }

  return {
    order: order as OrderRow,
    items: (items || []).map((i) => ({
      id: i.id,
      product_id: i.product_id,
      product_name: i.product_name,
      product_sku: i.product_sku,
      quantity: i.quantity,
      unit_price_cents: i.unit_price_cents,
      total_cents: i.total_cents,
      notes: i.notes,
    })),
  }
}

export async function updateOrder(
  id: string,
  data: Partial<{
    status: OrderStatus
    discount_cents: number
    shipping_cents: number
    tax_cents: number
    total_cents: number
    admin_notes: string
    payment_method: PaymentMethod
    payment_link: string
    shipping_tracking: string
    invoice_number: string
    invoice_url: string
  }>
): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase.from('orders').update(data).eq('id', id)
  if (error) return { error: error.message }
  return {}
}

export async function addOrderItem(
  orderId: string,
  item: { product_id?: string; product_name: string; product_sku: string; quantity: number; unit_price_cents: number; notes?: string }
): Promise<{ error?: string; id?: string }> {
  const supabase = await createClient()
  const total_cents = item.quantity * item.unit_price_cents
  const productId = item.product_id && UUID_REGEX.test(item.product_id) ? item.product_id : null
  const { data, error } = await supabase
    .from('order_items')
    .insert({
      order_id: orderId,
      product_id: productId,
      product_name: item.product_name,
      product_sku: item.product_sku,
      quantity: item.quantity,
      unit_price_cents: item.unit_price_cents,
      total_cents,
      notes: item.notes || null,
    })
    .select('id')
    .single()
  if (error) return { error: error.message }
  return { id: data?.id }
}

export async function updateOrderItem(
  itemId: string,
  data: Partial<{ quantity: number; unit_price_cents: number; notes: string }>
): Promise<{ error?: string }> {
  const supabase = await createClient()
  if (data.quantity !== undefined && data.unit_price_cents !== undefined) {
    ;(data as Record<string, unknown>).total_cents = data.quantity * data.unit_price_cents
  }
  const { error } = await supabase.from('order_items').update(data).eq('id', itemId)
  if (error) return { error: error.message }
  return {}
}

export async function deleteOrderItem(itemId: string): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase.from('order_items').delete().eq('id', itemId)
  if (error) return { error: error.message }
  return {}
}

export async function deleteOrder(id: string): Promise<{ error?: string }> {
  if (!UUID_REGEX.test(id)) return { error: 'ID inválido' }
  const supabase = await createClient()
  const { error } = await supabase.from('orders').delete().eq('id', id)
  if (error) return { error: error.message }
  return {}
}

const DEFAULT_TAX_RATE = 21

export async function recalcOrderTotals(orderId: string): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { data: items } = await supabase.from('order_items').select('total_cents').eq('order_id', orderId)
  const subtotal_cents = (items || []).reduce((s, i) => s + (i.total_cents || 0), 0)

  const { data: order } = await supabase
    .from('orders')
    .select('discount_cents, shipping_cents')
    .eq('id', orderId)
    .single()
  if (!order) return { error: 'Pedido no encontrado' }

  const discount = order.discount_cents ?? 0
  const shipping = order.shipping_cents ?? 0
  const taxable = subtotal_cents - discount + shipping
  const tax_cents = Math.round(taxable * (DEFAULT_TAX_RATE / 100))
  const total_cents = taxable + tax_cents

  const { error } = await supabase
    .from('orders')
    .update({ subtotal_cents, tax_cents, total_cents })
    .eq('id', orderId)
  if (error) return { error: error.message }
  return {}
}
