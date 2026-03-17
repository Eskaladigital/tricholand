-- ================================================
-- Migración: Añadir vat_number a contacts
-- Ejecutar en Supabase SQL Editor
-- ================================================
-- Campo para NIF/IVA / VAT number en formulario de empresa
-- ================================================

ALTER TABLE contacts
  ADD COLUMN IF NOT EXISTS vat_number TEXT;

COMMENT ON COLUMN contacts.vat_number IS 'NIF/IVA o VAT number de la empresa (solo contactos profesionales)';
