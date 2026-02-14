-- ================================================
-- TRICHOLAND B2B — Supabase Schema
-- Ejecutar en Supabase SQL Editor cuando se conecte
-- ================================================

-- =====================
-- PRODUCTS
-- =====================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  variety_slug TEXT,
  sku TEXT NOT NULL UNIQUE,
  description TEXT DEFAULT '',
  short_description TEXT DEFAULT '',

  price_cents INTEGER NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'EUR',
  min_order_qty INTEGER DEFAULT 1,
  qty_step INTEGER DEFAULT 1,
  unit_label TEXT DEFAULT 'lotes',

  size_range TEXT DEFAULT '',
  specs JSONB DEFAULT '[]',
  images JSONB DEFAULT '[]',

  status TEXT DEFAULT 'draft' CHECK (status IN ('active', 'draft', 'out_of_stock', 'archived')),
  stock_qty INTEGER,

  meta_title TEXT,
  meta_description TEXT,

  category TEXT,
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_featured ON products(featured) WHERE featured = true;

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- =====================
-- ORDERS
-- =====================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  order_number TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending', 'reviewing', 'quoted', 'payment_pending',
    'paid', 'preparing', 'shipped', 'delivered',
    'cancelled', 'refunded'
  )),

  -- Customer
  customer_name TEXT NOT NULL,
  customer_company TEXT,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  customer_country TEXT NOT NULL,
  customer_city TEXT,
  customer_vat_id TEXT,
  customer_address TEXT,

  -- Totals
  subtotal_cents INTEGER DEFAULT 0,
  discount_cents INTEGER DEFAULT 0,
  shipping_cents INTEGER DEFAULT 0,
  tax_cents INTEGER DEFAULT 0,
  total_cents INTEGER DEFAULT 0,
  currency TEXT DEFAULT 'EUR',

  -- Notes
  customer_notes TEXT,
  admin_notes TEXT,

  -- Payment
  payment_method TEXT CHECK (payment_method IN ('stripe', 'redsys', 'transfer', 'other')),
  payment_id TEXT,
  payment_link TEXT,
  paid_at TIMESTAMPTZ,

  -- Shipping
  shipping_tracking TEXT,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,

  -- Invoice
  invoice_number TEXT,
  invoice_url TEXT,

  locale TEXT DEFAULT 'es'
);

CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_email ON orders(customer_email);
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Order number sequence
CREATE SEQUENCE order_number_seq START 1;


-- =====================
-- ORDER ITEMS
-- =====================
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,

  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_sku TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price_cents INTEGER NOT NULL DEFAULT 0,
  total_cents INTEGER NOT NULL DEFAULT 0,
  notes TEXT
);

CREATE INDEX idx_order_items_order ON order_items(order_id);


-- =====================
-- CONTACTS (from contact form)
-- =====================
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),

  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT NOT NULL,
  city TEXT,
  message TEXT,

  contact_type TEXT DEFAULT 'particular' CHECK (contact_type IN ('particular', 'professional')),
  professional_subtype TEXT,
  inquiry_type TEXT,
  referral_source TEXT,

  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived', 'spam')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  admin_notes TEXT,

  gdpr_consent BOOLEAN NOT NULL DEFAULT false,
  gdpr_consent_date TIMESTAMPTZ,

  locale TEXT DEFAULT 'es'
);

CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_created ON contacts(created_at DESC);


-- =====================
-- BLOG POSTS
-- =====================
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  image TEXT,
  image_alt TEXT,
  tags TEXT[] DEFAULT '{}',
  reading_time INTEGER DEFAULT 0,
  content TEXT NOT NULL,

  locale TEXT DEFAULT 'es',
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),

  meta_title TEXT,
  meta_description TEXT,

  UNIQUE(slug, locale)
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_locale ON blog_posts(locale);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_date ON blog_posts(date DESC);

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- =====================
-- SETTINGS (key-value)
-- =====================
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Default settings
INSERT INTO settings (key, value) VALUES
  ('company_name', '"Tricholand"'),
  ('company_email', '"info@tricholand.com"'),
  ('company_phone', '"+34 968 000 000"'),
  ('min_order_units', '100'),
  ('default_tax_rate', '21'),
  ('notify_email', '"info@tricholand.com"'),
  ('auto_reply', 'true');


-- =====================
-- RLS POLICIES
-- =====================

-- Products: public read, admin write
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products visible to all" ON products FOR SELECT USING (true);
CREATE POLICY "Admin manages products" ON products FOR ALL USING (
  auth.role() = 'authenticated'
);

-- Orders: admin only
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin manages orders" ON orders FOR ALL USING (
  auth.role() = 'authenticated'
);

-- Order items: admin only
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin manages order items" ON order_items FOR ALL USING (
  auth.role() = 'authenticated'
);

-- Contacts: admin only
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin manages contacts" ON contacts FOR ALL USING (
  auth.role() = 'authenticated'
);

-- Allow anonymous inserts for orders and contacts (from public forms)
CREATE POLICY "Public can create orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can create order items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can create contacts" ON contacts FOR INSERT WITH CHECK (true);

-- Blog posts: public read (published), admin write
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Blog posts visible when published" ON blog_posts FOR SELECT USING (
  status = 'published' OR auth.role() = 'authenticated'
);
CREATE POLICY "Admin manages blog posts" ON blog_posts FOR ALL USING (
  auth.role() = 'authenticated'
);

-- Settings: public read (company name, min order, etc.), admin write
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Settings readable by all" ON settings FOR SELECT USING (true);
CREATE POLICY "Admin manages settings" ON settings FOR ALL USING (
  auth.role() = 'authenticated'
);
