# Changelog

Todos los cambios notables del proyecto Tricholand Web.

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
