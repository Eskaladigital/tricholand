-- Eliminar campos obsoletos lot_type y additional_to_product_id
-- Estos campos ya no se usan después de la simplificación del sistema de lotes

ALTER TABLE products
  DROP COLUMN IF EXISTS lot_type,
  DROP COLUMN IF EXISTS additional_to_product_id;

COMMENT ON TABLE products IS 'Productos/lotes de la tienda B2B. Sistema simplificado: min_order_qty (pedido mínimo en unidades), qty_step (incremento mínimo en unidades), units_per_lot (unidades por lote para calcular precio/ud)';
