-- Añadir estado awaiting_transfer para pedidos que esperan transferencia bancaria
-- Ejecutar en SQL Editor de Supabase Dashboard
-- Permite distinguir en el panel: "Esperando transferencia" vs "Esperando pago TPV/Stripe"

ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_status_check;

ALTER TABLE orders ADD CONSTRAINT orders_status_check CHECK (status IN (
  'pending', 'reviewing', 'quoted', 'payment_pending', 'awaiting_transfer',
  'paid', 'preparing', 'shipped', 'delivered', 'cancelled', 'refunded'
));
