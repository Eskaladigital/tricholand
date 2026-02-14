-- ================================================
-- TRICHOLAND — Content Translation System
-- Añadir al schema.sql existente
-- ================================================

-- Tabla principal de contenido fuente (español)
-- Aquí se almacena TODO el contenido traducible
CREATE TABLE content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  -- Tipo y referencia
  content_type TEXT NOT NULL,           -- 'variety' | 'product' | 'blog' | 'page'
  content_id TEXT NOT NULL,             -- slug o ID del item (ej: 'trichocereus-pachanoi')
  field TEXT NOT NULL,                  -- campo específico (ej: 'description', 'title', 'highlights')

  -- Contenido original en español
  source_text TEXT NOT NULL,
  source_hash TEXT NOT NULL,            -- MD5 para detectar cambios

  UNIQUE(content_type, content_id, field)
);

CREATE INDEX idx_content_type_id ON content(content_type, content_id);
CREATE INDEX idx_content_hash ON content(source_hash);

CREATE TRIGGER content_updated_at
  BEFORE UPDATE ON content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- Traducciones generadas
CREATE TABLE translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  -- Referencia al contenido fuente
  content_id UUID NOT NULL REFERENCES content(id) ON DELETE CASCADE,

  -- Idioma destino
  locale TEXT NOT NULL,                 -- 'en' | 'nl' | 'fr' | 'de' | 'it' | 'pt'

  -- Traducción
  translated_text TEXT NOT NULL,
  
  -- Hash del original cuando se tradujo (para detectar desactualización)
  source_hash_at_translation TEXT NOT NULL,

  -- Estado
  status TEXT DEFAULT 'translated' CHECK (status IN (
    'pending',         -- Pendiente de traducción
    'translated',      -- Traducido por IA
    'reviewed',        -- Revisado por humano
    'outdated'         -- El original cambió, hay que re-traducir
  )),

  -- Metadata
  translated_by TEXT DEFAULT 'openai',  -- 'openai' | 'manual' | 'deepl'
  model_used TEXT,                      -- 'gpt-4o' etc.

  UNIQUE(content_id, locale)
);

CREATE INDEX idx_translations_locale ON translations(locale);
CREATE INDEX idx_translations_status ON translations(status);
CREATE INDEX idx_translations_content ON translations(content_id);

CREATE TRIGGER translations_updated_at
  BEFORE UPDATE ON translations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ================================================
-- Vista útil: contenido + traducciones en un solo query
-- ================================================
CREATE OR REPLACE VIEW content_with_translations AS
SELECT
  c.content_type,
  c.content_id,
  c.field,
  c.source_text,
  c.source_hash,
  t.locale,
  t.translated_text,
  t.status AS translation_status,
  CASE 
    WHEN t.source_hash_at_translation != c.source_hash THEN true
    ELSE false
  END AS is_outdated
FROM content c
LEFT JOIN translations t ON t.content_id = c.id;


-- ================================================
-- Función para marcar traducciones como outdated
-- cuando el contenido fuente cambia
-- ================================================
CREATE OR REPLACE FUNCTION mark_translations_outdated()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.source_hash != NEW.source_hash THEN
    UPDATE translations
    SET status = 'outdated', updated_at = now()
    WHERE content_id = NEW.id
      AND source_hash_at_translation != NEW.source_hash;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER content_change_marks_outdated
  AFTER UPDATE ON content
  FOR EACH ROW EXECUTE FUNCTION mark_translations_outdated();


-- ================================================
-- RLS
-- ================================================
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;

-- Lectura pública (las traducciones se leen desde el frontend)
CREATE POLICY "Content readable by all" ON content FOR SELECT USING (true);
CREATE POLICY "Translations readable by all" ON translations FOR SELECT USING (true);

-- Escritura solo admin
CREATE POLICY "Admin manages content" ON content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manages translations" ON translations FOR ALL USING (auth.role() = 'authenticated');

-- Permitir inserts desde scripts de traducción (service role)
CREATE POLICY "Service can insert translations" ON translations FOR INSERT WITH CHECK (true);
CREATE POLICY "Service can update translations" ON translations FOR UPDATE USING (true);
