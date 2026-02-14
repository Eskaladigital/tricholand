-- ================================================
-- MIGRACIÓN: Slugs localizados por idioma (SEO)
-- Ejecutar en Supabase SQL Editor si ya tienes blog_posts
-- Permite URLs como /de/blog/trichocereus-in-der-landschaftsarchitektur
-- en lugar de /de/blog/trichocereus-en-la-arquitectura-paisajistica
-- ================================================

-- 1. Añadir source_slug (slug en español, vincula traducciones)
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS source_slug TEXT;

-- 2. Rellenar source_slug en filas existentes
UPDATE blog_posts SET source_slug = slug WHERE source_slug IS NULL;

-- 3. Hacer NOT NULL
ALTER TABLE blog_posts ALTER COLUMN source_slug SET NOT NULL;

-- 4. Añadir constraint único para vincular traducciones (source_slug = slug español)
ALTER TABLE blog_posts DROP CONSTRAINT IF EXISTS blog_posts_slug_locale_key;
ALTER TABLE blog_posts ADD CONSTRAINT blog_posts_source_slug_locale_key UNIQUE (source_slug, locale);
-- Slug debe ser único por locale para la URL
ALTER TABLE blog_posts ADD CONSTRAINT blog_posts_slug_locale_key UNIQUE (slug, locale);

-- 5. Índices para búsqueda
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug_locale ON blog_posts(slug, locale);
CREATE INDEX IF NOT EXISTS idx_blog_posts_source_slug ON blog_posts(source_slug);
