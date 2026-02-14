# Changelog

Todos los cambios notables del proyecto Tricholand Web.

## [1.0.0] - 2025-02

### Añadido

- **Web corporativa** con 7 idiomas (ES, EN, NL, FR, DE, IT, PT)
- **Tienda B2B** con carrito, lotes mayoristas y solicitud de presupuesto
- **Catálogo de variedades** con fichas detalladas
- **Blog** con artículos técnicos
- **Panel de administración** (productos, pedidos, contactos, configuración)
- **Sistema de traducciones** Supabase + OpenAI
- **Google Analytics** (GA4)
- **Favicon** con logo sobre fondo blanco
- **PWA** en panel administrator
- **SEO**: sitemap, robots, meta alternates
- **Supabase**: schema completo (products, orders, contacts, settings, content, translations)
- **Despliegue** Vercel + GitHub con CI/CD

### Schema Supabase

- `products` — catálogo con variety_slug, SKU, precios, stock
- `orders` / `order_items` — pedidos y líneas
- `contacts` — formulario con professional_subtype, gdpr_consent, priority
- `settings` — key-value con RLS
- `content` / `translations` — sistema de traducciones

### Scripts

- `npm run dev` — desarrollo
- `npm run translate:ui` — traducir diccionarios
- `npm run translate:content` — sincronizar contenido a Supabase
- `npm run favicon` — regenerar favicon
