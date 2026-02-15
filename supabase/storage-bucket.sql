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
DROP POLICY IF EXISTS "Public read access for order documents" ON storage.objects;
CREATE POLICY "Public read access for order documents"
ON storage.objects
FOR SELECT
USING (bucket_id = 'order-documents');

-- Política: Solo service role puede subir/modificar documentos
-- (los PDFs se generan desde el servidor, no desde el cliente)
DROP POLICY IF EXISTS "Service role can upload order documents" ON storage.objects;
CREATE POLICY "Service role can upload order documents"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'order-documents'
  AND auth.role() = 'service_role'
);

DROP POLICY IF EXISTS "Service role can update order documents" ON storage.objects;
CREATE POLICY "Service role can update order documents"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'order-documents'
  AND auth.role() = 'service_role'
);

DROP POLICY IF EXISTS "Service role can delete order documents" ON storage.objects;
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

-- ============================================
-- Buckets blog y plants (imágenes)
-- Sin límite de tamaño por archivo
-- ============================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog',
  'blog',
  true,
  NULL,  -- Sin límite de tamaño
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'plants',
  'plants',
  true,
  NULL,  -- Sin límite de tamaño
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Políticas blog: lectura pública, escritura solo service role
DROP POLICY IF EXISTS "Public read access for blog" ON storage.objects;
CREATE POLICY "Public read access for blog"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog');

DROP POLICY IF EXISTS "Service role can upload blog" ON storage.objects;
CREATE POLICY "Service role can upload blog"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog' AND auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role can update blog" ON storage.objects;
CREATE POLICY "Service role can update blog"
ON storage.objects FOR UPDATE
USING (bucket_id = 'blog' AND auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role can delete blog" ON storage.objects;
CREATE POLICY "Service role can delete blog"
ON storage.objects FOR DELETE
USING (bucket_id = 'blog' AND auth.role() = 'service_role');

-- Políticas plants: lectura pública, escritura solo service role
DROP POLICY IF EXISTS "Public read access for plants" ON storage.objects;
CREATE POLICY "Public read access for plants"
ON storage.objects FOR SELECT
USING (bucket_id = 'plants');

DROP POLICY IF EXISTS "Service role can upload plants" ON storage.objects;
CREATE POLICY "Service role can upload plants"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'plants' AND auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role can update plants" ON storage.objects;
CREATE POLICY "Service role can update plants"
ON storage.objects FOR UPDATE
USING (bucket_id = 'plants' AND auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role can delete plants" ON storage.objects;
CREATE POLICY "Service role can delete plants"
ON storage.objects FOR DELETE
USING (bucket_id = 'plants' AND auth.role() = 'service_role');
