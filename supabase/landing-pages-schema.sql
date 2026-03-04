-- ================================================
-- LANDING PAGES — Landings B2B por mercado/idioma
-- Modelo similar a blog_posts: cada fila = 1 landing × 1 idioma
-- ================================================

CREATE TABLE IF NOT EXISTS landing_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  slug TEXT NOT NULL,
  source_slug TEXT NOT NULL,
  locale TEXT DEFAULT 'en',
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),

  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  meta_keywords TEXT[] DEFAULT '{}',
  og_locale TEXT,

  content JSONB NOT NULL,
  config JSONB NOT NULL,

  UNIQUE(slug, locale),
  UNIQUE(source_slug, locale)
);

CREATE INDEX IF NOT EXISTS idx_landing_pages_slug ON landing_pages(slug);
CREATE INDEX IF NOT EXISTS idx_landing_pages_locale ON landing_pages(locale);
CREATE INDEX IF NOT EXISTS idx_landing_pages_status ON landing_pages(status);
CREATE INDEX IF NOT EXISTS idx_landing_pages_source_slug ON landing_pages(source_slug);

DROP TRIGGER IF EXISTS landing_pages_updated_at ON landing_pages;
CREATE TRIGGER landing_pages_updated_at
  BEFORE UPDATE ON landing_pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE landing_pages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Landing pages visible when published" ON landing_pages;
CREATE POLICY "Landing pages visible when published" ON landing_pages FOR SELECT USING (
  status = 'published' OR auth.role() = 'authenticated'
);

DROP POLICY IF EXISTS "Admin manages landing pages" ON landing_pages;
CREATE POLICY "Admin manages landing pages" ON landing_pages FOR ALL USING (
  auth.role() = 'authenticated'
);
