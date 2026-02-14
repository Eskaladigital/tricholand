-- ================================================
-- BLOG POSTS — Tabla para el blog
-- Ejecutar en Supabase SQL Editor si ya tienes el schema principal
-- ================================================

CREATE TABLE IF NOT EXISTS blog_posts (
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

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_locale ON blog_posts(locale);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON blog_posts(date DESC);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;
CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Blog posts visible when published" ON blog_posts;
CREATE POLICY "Blog posts visible when published" ON blog_posts FOR SELECT USING (
  status = 'published' OR auth.role() = 'authenticated'
);
DROP POLICY IF EXISTS "Admin manages blog posts" ON blog_posts;
CREATE POLICY "Admin manages blog posts" ON blog_posts FOR ALL USING (
  auth.role() = 'authenticated'
);
