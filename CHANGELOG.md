# Changelog

Todos los cambios notables del proyecto Tricholand Web.

## [1.2.6] - 2026-02

### Añadido

- **Landings B2B en Supabase**: Migración de las 8 landings B2B Pachanoi (UK, Europe, España, Francia, Alemania, Países Bajos, Italia, Portugal) de archivos estáticos a la tabla `landing_pages` en Supabase
- **Componente `PachanoiLanding`**: Renderizado dinámico de landings desde `content` y `config` (JSONB)
- **`src/lib/landings.ts`**: Funciones `getLandingBySlug`, `getAllLandingSlugs`, `getAllLandingAlternates`, `getSlugsByLocaleForVarietyOrLanding`
- **API `/api/variety-alternate-slugs`**: Devuelve el slug traducido por idioma para variedades y landings (usado por el selector de idioma)
- **Selector de idioma para variedades/landings**: El Header consulta la API y construye enlaces con el slug correcto al cambiar de idioma (ej: FR `trichocereus-pachanoi-a-vendre-france` → EN `trichocereus-pachanoi-for-sale-uk`)
- **Sitemap dinámico para landings**: `getSitemapEntries` lee slugs desde Supabase con hreflang alternates
- **Scripts**: `seed-landings.mjs` (insertar 8 landings), `translate-landings.mjs` (traducir con OpenAI)

### Modificado

- **Rutas `/varieties/[slug]`** (7 idiomas): Fallback a `landing_pages` si el slug no es una variedad estática; `dynamicParams`, `revalidate = 60`
- **Estructura**: Eliminadas 8 carpetas de landings estáticas (~3500 líneas)

### Archivos nuevos

- `supabase/landing-pages-schema.sql` — Tabla `landing_pages` con RLS
- `src/lib/landings.ts` — Lectura landings desde Supabase
- `src/components/landings/PachanoiLanding.tsx` — Componente reutilizable
- `src/app/api/variety-alternate-slugs/route.ts` — API para selector de idioma
- `scripts/seed-landings.mjs` — Seed de landings
- `scripts/translate-landings.mjs` — Traducción de landings

---

## [1.2.5] - 2026-02

### Corregido (SEO / Blog)

- **Slugs del blog en 6 idiomas**: Los 564 artículos traducidos (94 posts × 6 idiomas) tenían títulos y slugs en español en lugar del idioma correspondiente (ej: `/de/blog/como-crear-un-vivero-casero...` en vez de `/de/blog/wie-man-eine-heimzucht...`). Re-traducidos todos los títulos, descripciones, slugs e image_alt con OpenAI
- **Títulos con tags HTML**: Algunos títulos traducidos contenían `<h1>`, `<title>` dentro del texto; corregidos en la re-traducción

### Añadido

- **hreflang en sitemap para blog**: Las entradas del blog en `sitemap.xml` ahora incluyen `alternates` con hreflang apuntando a los slugs correctos de cada idioma. Nueva función `getAllBlogAlternates()` en `src/lib/blog.ts`
- **Modo `--retranslate-all`** en `scripts/translate-blog-posts.mjs`: re-traduce título + descripción + slug de todos los posts existentes. Soporta `--dry-run`, `--locale XX`, `--full` (incluye contenido)

---

## [1.2.4] - 2026-02

### Corregido (i18n)

- **de/uber-uns**: Contenido traducido de español a alemán (párrafos, features, CTA)
- **de/zertifizierungen**: Contenido traducido de español a alemán (hero, FAQ, badges, CTA)
- **BlogGrid**: Textos hardcodeados (Todos/All, Buscar, etc.) → diccionario `blog` en 7 idiomas
- **it/blog, pt/blog**: Metadata y descripción en español → italiano y portugués

### Añadido

- **Diccionarios blog**: `filterAll`, `searchPlaceholder`, `articlesFound`, `noArticlesFound`, `featured`, `noImage`, `loadMore` en es, en, de, fr, nl, it, pt
- **CHECKLIST-I18N-EN.md**: Ampliado para cubrir los 7 idiomas (antes solo EN)

---

## [1.2.3] - 2026-02

### Modificado

- **Script `convert-images-to-webp.mjs`**: ahora solo procesa la carpeta `images/` (raíz del proyecto), convierte in situ sin mover nada a `public/`
- **Script `images:webp`**: ya no ejecuta `update-image-refs-to-webp.mjs` (solo conversión)
- **Carpeta `images/`**: añadida a `.gitignore` — contiene imágenes fuente para subir a Supabase (161 imágenes convertidas a WebP)

---

## [1.2.2] - 2026-02

### Añadido

- **Script `ai-blog-perfect.mjs`**: limpieza y optimización SEO con OpenAI; opción `--translate` para traducir a 6 idiomas
- **Fallback de imagen en blog**: traducciones (EN, NL, FR, etc.) sin imagen usan la del artículo ES — en detalle (`getPostBySlug`) y en listado (`getPostsMeta`)

### Modificado

- **Blog**: detección Markdown más amplia en `renderBlogContent` (###, __, listas numeradas, híbrido HTML+Markdown)
- **Blog**: `revalidate = 10` en todas las páginas de artículo (7 idiomas) para actualizaciones más frecuentes
- **Admin BlogPostForm**: usa `renderBlogContent` en vista de solo lectura de traducciones — renderiza igual que el blog público
- **Admin BlogPostForm**: fallback Markdown/híbrido en editor TinyMCE; `key` por `updated_at` para forzar remontaje tras guardar
- **Admin blog.ts**: `unstable_noStore()` en `getBlogPostById` para evitar caché y datos frescos en el editor
- **Fix build**: comentario con `**/` rompía bloque de comentario; tipo TypeScript en `replace` de entidades HTML

---

## [1.2.1] - 2026-02

### Añadido

- **Script `images:webp`**: convierte imágenes PNG/JPG en `public/images` a WebP (sharp, calidad 82)
- **Script `update-image-refs-to-webp.mjs`**: actualiza referencias en código tras conversión

### Modificado

- **Optimización de rendimiento**:
  - Fuentes: Google Fonts reemplazado por `next/font` (Archivo, Archivo Narrow) auto-hospedado — elimina ~750ms de recursos bloqueantes
  - Imágenes: `sizes` y `quality` optimizados en CatalogPreview, HeroSection, Header, Footer, CatalogGrid, ProductCardShop, BlogGrid y páginas sobre-nosotros (7 idiomas)
- **Imágenes convertidas a WebP**: 140 imágenes PNG/JPG → WebP en `public/images` (blog, icons, products, varieties, vivero)
- **Referencias actualizadas**: 22 archivos (componentes, páginas, content, scripts) apuntan a `.webp`
- **Favicon**: `generate-favicon.mjs` usa ahora `logo_tricho.webp` como fuente

---

## [1.2.0] - 2026-02

### Añadido

- **Formulario de pedido traducido** a 7 idiomas (OrderForm, CartButton): labels, placeholders, botones, mensajes de éxito/error
- **Página pública de pedido multiidioma**: `/pedido/[order_number]` detecta el locale del pedido y muestra toda la interfaz en el idioma del cliente (standalone, sin layout principal)
- **Selector de país** en checkout: `<select>` con los 28 países de venta (UE-27 + UK), nombres en el idioma del usuario, ordenados alfabéticamente por locale
- **Transparencia IVA en flujo B2B**: base imponible + IVA estimado 21% + total estimado visible en carrito, checkout, sidebar, emails y PDFs
- **Nota exención IVA intracomunitario**: aviso en resumen de pedido para entregas UE con NIF-IVA válido
- **Sección `orderForm` en i18n**: ~60 textos traducidos (7 idiomas) para todo el flujo de compra
- **Sección `orderPage` en i18n**: ~35 textos traducidos (7 idiomas) para la página pública del pedido (estados, tabla, totales, mensajes)

### Modificado

- **Emails**: etiquetas mejoradas — "Base imponible (sin IVA)", "IVA (21%)", "TOTAL CON IVA" en templates y traducciones de emails
- **PDF proforma/factura**: etiquetas actualizadas — "Base imponible", "IVA (21%)", "TOTAL CON IVA"
- **Página IT** (`/it/shop/ordine`): título y descripción corregidos de español a italiano
- **Página PT** (`/pt/loja/pedido`): título y descripción corregidos de español a portugués

---

## [1.1.0] - 2026-02

### Añadido

- **Pipeline automatizado de pedidos**: validación → proforma PDF → email → pago → factura
- **Generación de PDFs** en servidor (jsPDF): proformas y facturas con estilo Tricholand
- **Supabase Storage** bucket `order-documents` para proformas y facturas
- **Emails en idioma del cliente** (7 idiomas): confirmación pedido, validación, pago confirmado, datos bancarios
- **Pago por transferencia bancaria**: botón en página de pedido → email con IBAN/titular/banco (datos nunca públicos)
- **Infraestructura Stripe**: API checkout session + webhook para confirmación automática
- **Infraestructura Redsys**: API formulario TPV + webhook para confirmación automática
- **Página pública del pedido** `/pedido/[order_number]`: resumen, botones de pago, descarga de factura
- **Timeline/stepper** en detalle de pedido del admin: pipeline visual con 6 pasos
- **SMTP** con Nodemailer (OVH): emails de pedidos, contactos, proformas, facturas
- **Variables de entorno**: SMTP, Stripe, Redsys, datos bancarios, `NEXT_PUBLIC_SITE_URL`

### Modificado

- **Panel admin**: orden del menú (dashboard, productos, clientes, pedidos, contactos, blog, media, configuración)
- **Acciones de pedidos**: "Validar y enviar al cliente" reemplaza envío manual; pipeline automático
- **Clientes**: acciones Ver y Borrar; página de detalle de cliente
- **Emails**: adjuntos en `sendMail()`; templates HTML con layout Tricholand

### Archivos nuevos

- `src/lib/pdf/generate-pdf.ts` — generación proformas y facturas
- `src/lib/storage/documents.ts` — subida/URL de PDFs en Supabase
- `src/lib/email/i18n.ts` — traducciones de emails (7 idiomas: es, en, de, fr, it, nl, pt)
- `src/lib/payments/redsys.ts` — utilidades Redsys (firma HMAC)
- `src/app/api/payments/stripe/route.ts` — checkout session Stripe
- `src/app/api/payments/redsys/route.ts` — formulario TPV Redsys
- `src/app/api/payments/transfer/route.ts` — email con datos bancarios
- `src/app/api/webhooks/stripe/route.ts` — confirmación pago Stripe
- `src/app/api/webhooks/redsys/route.ts` — confirmación pago Redsys
- `src/components/shop/PaymentButtons.tsx` — botones Stripe, Redsys, Transferencia
- `supabase/storage-bucket.sql` — bucket `order-documents` y políticas

---

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
