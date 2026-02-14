'use server'

import { createClient } from '@/lib/supabase/server'

export interface DashboardStats {
  products_active: number
  orders_pending: number
  orders_this_month: number
  contacts_new: number
  revenue_this_month_cents: number
}

export interface RecentOrder {
  id: string
  order_number: string
  customer_company: string | null
  customer_name: string
  status: string
  total_cents: number
}

export interface RecentContact {
  id: string
  name: string
  contact_type: string
  inquiry_type: string | null
  country: string
}

export async function getDashboardStats(): Promise<{
  stats: DashboardStats
  recentOrders: RecentOrder[]
  recentContacts: RecentContact[]
}> {
  const supabase = await createClient()

  const [productsRes, ordersRes, ordersMonthRes, contactsRes, revenueRes] = await Promise.all([
    supabase.from('products').select('id', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('orders').select('id', { count: 'exact', head: true }).in('status', ['pending', 'reviewing']),
    supabase.from('orders').select('id', { count: 'exact', head: true }).gte('created_at', startOfMonth()),
    supabase.from('contacts').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('orders').select('total_cents').in('status', ['paid', 'preparing', 'shipped', 'delivered']).gte('created_at', startOfMonth()),
  ])

  const stats: DashboardStats = {
    products_active: productsRes.count ?? 0,
    orders_pending: ordersRes.count ?? 0,
    orders_this_month: ordersMonthRes.count ?? 0,
    contacts_new: contactsRes.count ?? 0,
    revenue_this_month_cents: (revenueRes.data ?? []).reduce((s, o) => s + (o.total_cents ?? 0), 0),
  }

  const { data: recentOrdersData } = await supabase
    .from('orders')
    .select('id, order_number, customer_name, customer_company, status, total_cents')
    .order('created_at', { ascending: false })
    .limit(5)

  const { data: recentContactsData } = await supabase
    .from('contacts')
    .select('id, name, contact_type, inquiry_type, country')
    .order('created_at', { ascending: false })
    .limit(5)

  return {
    stats,
    recentOrders: (recentOrdersData ?? []) as RecentOrder[],
    recentContacts: (recentContactsData ?? []) as RecentContact[],
  }
}

function startOfMonth(): string {
  const d = new Date()
  d.setDate(1)
  d.setHours(0, 0, 0, 0)
  return d.toISOString()
}
