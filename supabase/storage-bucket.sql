-- ============================================
-- Supabase Storage: Bucket para documentos de pedidos
-- Ejecutar en el SQL Editor de Supabase Dashboard
-- ============================================

-- Crear bucket para documentos de pedidos (proformas, facturas)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'order-documents',
  'order-documents',
  true,  -- Público para que los clientes puedan descargar sus facturas
  5242880,  -- 5MB máximo por archivo
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- Política: Cualquiera puede leer documentos (para que clientes descarguen facturas)
CREATE POLICY "Public read access for order documents"
ON storage.objects
FOR SELECT
USING (bucket_id = 'order-documents');

-- Política: Solo service role puede subir/modificar documentos
-- (los PDFs se generan desde el servidor, no desde el cliente)
CREATE POLICY "Service role can upload order documents"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'order-documents'
  AND auth.role() = 'service_role'
);

CREATE POLICY "Service role can update order documents"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'order-documents'
  AND auth.role() = 'service_role'
);

CREATE POLICY "Service role can delete order documents"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'order-documents'
  AND auth.role() = 'service_role'
);

-- También añadir campo paid_at a orders si no existe
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'paid_at') THEN
    ALTER TABLE orders ADD COLUMN paid_at TIMESTAMPTZ;
  END IF;
END $$;
