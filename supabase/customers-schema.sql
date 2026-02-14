-- ================================================
-- TRICHOLAND — Tabla customers (unifica contactos + pedidos)
-- Ejecutar en Supabase SQL Editor
-- ================================================

CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  country TEXT NOT NULL,
  city TEXT,
  address TEXT,
  vat_id TEXT,

  -- Orígenes y contadores
  contact_count INTEGER DEFAULT 0,
  order_count INTEGER DEFAULT 0,
  total_spent_cents INTEGER DEFAULT 0,
  first_contact_at TIMESTAMPTZ DEFAULT now(),
  last_contact_at TIMESTAMPTZ DEFAULT now(),

  -- Mailing
  mailing_consent BOOLEAN DEFAULT false,
  mailing_consent_date TIMESTAMPTZ,

  -- Admin
  admin_notes TEXT,
  tags TEXT[] DEFAULT '{}'
);

CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_name ON customers(name);
CREATE INDEX idx_customers_country ON customers(country);
CREATE INDEX idx_customers_last_contact ON customers(last_contact_at DESC);
CREATE INDEX idx_customers_created ON customers(created_at DESC);

CREATE TRIGGER customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin manages customers" ON customers FOR ALL USING (
  auth.role() = 'authenticated'
);

-- Función para upsert customer (ejecuta con privilegios del owner)
CREATE OR REPLACE FUNCTION upsert_customer_from_contact()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO customers (
    email, name, company, phone, country, city,
    contact_count, last_contact_at, mailing_consent, mailing_consent_date
  )
  VALUES (
    LOWER(TRIM(NEW.email)),
    COALESCE(NULLIF(TRIM(NEW.name), ''), 'Sin nombre'),
    NULLIF(TRIM(NEW.company), ''),
    NULLIF(TRIM(NEW.phone), ''),
    COALESCE(NULLIF(TRIM(NEW.country), ''), 'Desconocido'),
    NULLIF(TRIM(NEW.city), ''),
    1,
    NEW.created_at,
    COALESCE(NEW.gdpr_consent, false),
    NEW.gdpr_consent_date
  )
  ON CONFLICT (email) DO UPDATE SET
    name = COALESCE(NULLIF(TRIM(NEW.name), ''), customers.name),
    company = COALESCE(NULLIF(TRIM(NEW.company), ''), customers.company),
    phone = COALESCE(NULLIF(TRIM(NEW.phone), ''), customers.phone),
    country = COALESCE(NULLIF(TRIM(NEW.country), ''), customers.country),
    city = COALESCE(NULLIF(TRIM(NEW.city), ''), customers.city),
    contact_count = customers.contact_count + 1,
    last_contact_at = NEW.created_at,
    mailing_consent = COALESCE(NEW.gdpr_consent, customers.mailing_consent),
    mailing_consent_date = COALESCE(NEW.gdpr_consent_date, customers.mailing_consent_date),
    updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION upsert_customer_from_order()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO customers (
    email, name, company, phone, country, city, address, vat_id,
    order_count, total_spent_cents, last_contact_at
  )
  VALUES (
    LOWER(TRIM(NEW.customer_email)),
    COALESCE(NULLIF(TRIM(NEW.customer_name), ''), 'Sin nombre'),
    NULLIF(TRIM(NEW.customer_company), ''),
    NULLIF(TRIM(NEW.customer_phone), ''),
    COALESCE(NULLIF(TRIM(NEW.customer_country), ''), 'Desconocido'),
    NULLIF(TRIM(NEW.customer_city), ''),
    NULLIF(TRIM(NEW.customer_address), ''),
    NULLIF(TRIM(NEW.customer_vat_id), ''),
    1,
    COALESCE(NEW.total_cents, 0),
    NEW.created_at
  )
  ON CONFLICT (email) DO UPDATE SET
    name = COALESCE(NULLIF(TRIM(NEW.customer_name), ''), customers.name),
    company = COALESCE(NULLIF(TRIM(NEW.customer_company), ''), customers.company),
    phone = COALESCE(NULLIF(TRIM(NEW.customer_phone), ''), customers.phone),
    country = COALESCE(NULLIF(TRIM(NEW.customer_country), ''), customers.country),
    city = COALESCE(NULLIF(TRIM(NEW.customer_city), ''), customers.city),
    address = COALESCE(NULLIF(TRIM(NEW.customer_address), ''), customers.address),
    vat_id = COALESCE(NULLIF(TRIM(NEW.customer_vat_id), ''), customers.vat_id),
    order_count = customers.order_count + 1,
    total_spent_cents = customers.total_spent_cents + COALESCE(NEW.total_cents, 0),
    last_contact_at = NEW.created_at,
    updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers
DROP TRIGGER IF EXISTS trg_contact_upsert_customer ON contacts;
CREATE TRIGGER trg_contact_upsert_customer
  AFTER INSERT ON contacts
  FOR EACH ROW EXECUTE FUNCTION upsert_customer_from_contact();

DROP TRIGGER IF EXISTS trg_order_upsert_customer ON orders;
CREATE TRIGGER trg_order_upsert_customer
  AFTER INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION upsert_customer_from_order();

-- Función para generar número de pedido (si no existe)
CREATE OR REPLACE FUNCTION get_next_order_number() RETURNS TEXT AS $$
  SELECT 'TRI-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('order_number_seq')::text, 4, '0');
$$ LANGUAGE sql;
