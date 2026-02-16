-- ================================================
-- Migración: Añadir units_per_lot
-- Ejecutar en Supabase SQL Editor
-- ================================================
-- Campo numérico para unidades por lote (750, 150, 100, etc.)
-- Sustituye el parsing de unit_label
-- ================================================

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS units_per_lot INTEGER DEFAULT 100 CHECK (units_per_lot > 0);

CREATE INDEX IF NOT EXISTS idx_products_units_per_lot ON products(units_per_lot);

COMMENT ON COLUMN products.units_per_lot IS 'Número de plantas/unidades incluidas en este lote (ej. 750, 150, 100)';

-- Actualizar productos existentes extrayendo de unit_label
-- Ejemplo: "lotes de 750 uds" -> 750
UPDATE products
SET units_per_lot = (
  CASE
    WHEN unit_label ~ '(\d+)\s*ud' THEN 
      (regexp_match(unit_label, '(\d+)\s*ud'))[1]::integer
    ELSE 100
  END
)
WHERE units_per_lot IS NULL OR units_per_lot = 100;
