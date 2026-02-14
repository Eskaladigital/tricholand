# Changelog

Todos los cambios notables del proyecto Tricholand Web.

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
