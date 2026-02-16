-- ================================================
-- Migración: Lote principal vs Lote adicional
-- Ejecutar en Supabase SQL Editor
-- ================================================
-- Permite productos con:
-- - lot_type 'main': lote estándar (ej. 750 uds = 5 carros)
-- - lot_type 'additional': lotes suplementarios (ej. 50 uds = 1 carro)
--   Solo se pueden añadir si el lote principal está en el pedido.
-- ================================================

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS lot_type TEXT DEFAULT 'main' CHECK (lot_type IN ('main', 'additional')),
  ADD COLUMN IF NOT EXISTS additional_to_product_id UUID REFERENCES products(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_products_lot_type ON products(lot_type);
CREATE INDEX IF NOT EXISTS idx_products_additional_to ON products(additional_to_product_id) WHERE additional_to_product_id IS NOT NULL;

COMMENT ON COLUMN products.lot_type IS 'main = lote estándar (ej. 750 uds). additional = suplemento (ej. 50 uds), requiere lote principal en pedido';
COMMENT ON COLUMN products.additional_to_product_id IS 'Para lot_type=additional: ID del producto principal que debe estar en el pedido';
