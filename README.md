# Tricholand Web

Web corporativa de **Tricholand** — vivero productor de Trichocereus y cactáceas columnares. Plataforma B2B para profesionales del sector con venta mayorista, catálogo de variedades y gestión de pedidos.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)

### Inicio rápido

```bash
git clone https://github.com/Eskaladigital/tricholand.git
cd tricholand
npm install
cp .env.example .env.local   # Editar con tus credenciales
npm run dev
```

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)

---

## Características

- **7 idiomas**: ES, EN, NL, FR, DE, IT, PT — formulario de pedido, checkout, página de pedido, emails y PDFs 100% traducidos
- **Selector de idioma** en navbar (menú desplegable)
- **Tienda B2B** con carrito, lotes mayoristas y solicitud de presupuesto
- **Transparencia IVA B2B**: base imponible + IVA estimado (21%) visibles en todo el flujo de compra
- **Nota exención IVA intracomunitario** para entregas UE con NIF-IVA válido
- **Selector de país** en checkout: 28 países permitidos (UE-27 + UK), nombres traducidos y ordenados por locale
- **Catálogo de variedades** con fichas detalladas
- **Blog** con artículos técnicos
- **Panel de administración** (productos, pedidos, clientes, contactos, blog, media, configuración)
- **Pipeline automatizado de pedidos**: validación → proforma PDF → email al cliente → pago → factura
- **Pagos**: transferencia bancaria, TPV Redsys, Stripe (infraestructura lista)
- **Emails en idioma del cliente**: confirmación pedido, validación, pago confirmado, datos bancarios
- **Página pública de pedido multiidioma**: `/pedido/[order_number]` — standalone, detecta el locale del pedido
- **Sistema de traducciones** con Supabase + OpenAI
- **SEO**: sitemap, robots, meta alternates por idioma
- **Google Analytics** (GA4)
- **Favicon** con logo sobre fondo blanco
- **PWA** en panel administrator (instalable)
- **Redirecciones** desde rutas legacy (Joomla)

---

## Flujo de pedidos y pagos

1. **Cliente** hace pedido → recibe email de confirmación (en su idioma)
2. **Admin** revisa, ajusta precios/descuentos/envío → pulsa **Validar pedido**
3. Sistema genera **proforma PDF**, la sube a Supabase Storage, envía email al cliente con proforma adjunta y enlace a `/pedido/TRI-XXXX`
4. Cliente entra en su página de pedido y elige método de pago:
   - **Transferencia bancaria** → recibe email con datos bancarios (IBAN, titular, etc.)
   - **TPV Redsys** o **Stripe** → redirección a pasarela de pago
5. Tras el pago (webhook Stripe/Redsys o confirmación manual del admin para transferencias):
   - Se genera **factura PDF**
   - Se envía email al cliente con factura adjunta
   - Se notifica al admin

Los emails al cliente van en su idioma (locale del pedido). Los emails al admin siempre en español.

---

## Stack técnico

| Tecnología | Versión |
|------------|---------|
| Next.js (App Router) | 15.x |
| React | 19.x |
| TypeScript | 5.9 |
| Tailwind CSS | 4.x |
| Supabase | 2.x |

---

## Requisitos previos

- Node.js 18+
- Cuenta Supabase (para traducciones y datos en producción)
- OpenAI API Key (para scripts de traducción)

---

## Instalación

```bash
# Clonar
git clone https://github.com/Eskaladigital/tricholand.git
cd tricholand

# Instalar dependencias
npm install

# Configurar variables de entorno
# Copia .env.example a .env.local y edita con tus valores
```

---

## Variables de entorno

Crea un archivo `.env.local` en la raíz (o copia `.env.example`):

```env
# Supabase (obligatorio)
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key

# OpenAI (para scripts translate:ui y translate:content)
OPENAI_API_KEY=sk-...

# Google Analytics (opcional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# SMTP — Correo para emails (pedidos, contactos, proformas, facturas)
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_USER=info@tricholand.com
SMTP_PASS=tu_contraseña
SMTP_FROM=Tricholand <info@tricholand.com>

# URL del sitio (callbacks de pago, links en emails)
NEXT_PUBLIC_SITE_URL=https://www.tricholand.com

# Stripe (opcional — pago con tarjeta)
# STRIPE_SECRET_KEY=sk_live_...
# STRIPE_WEBHOOK_SECRET=whsec_...

# Redsys TPV (opcional — pago con TPV virtual)
# REDSYS_MERCHANT_CODE=...
# REDSYS_TERMINAL=1
# REDSYS_SECRET_KEY=...
# REDSYS_ENVIRONMENT=test

# Transferencia bancaria (opcional — datos se envían por email al cliente)
# BANK_IBAN=ES12 3456 7890 1234 5678 9012
# BANK_ACCOUNT_HOLDER=Tricholand
# BANK_NAME=Nombre del banco
# BANK_BIC=CAIXESBBXXX

# Admin: login con usuarios de Supabase Auth (Authentication → Users)
```

---

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (puerto 3000) |
| `npm run build` | Build de producción |
| `npm start` | Servidor de producción |
| `npm run lint` | Ejecutar ESLint |
| `npm run translate:ui` | Traducir diccionarios i18n con OpenAI |
| `npm run translate:content` | Sincronizar y traducir contenido (variedades, blog) a Supabase |
| `npm run translate:all` | Ejecutar translate:ui + translate:content |
| `npm run translate:dry` | Simular translate:content sin escribir |
| `npm run translate:blog` | Traducir posts del blog a otros idiomas (OpenAI) |
| `npm run favicon` | Regenerar favicon y apple-touch-icon desde logo |
| `npm run images:webp` | Convertir imágenes PNG/JPG a WebP (optimización) |
| `npm run seed:products` | Seed de productos de ejemplo |
| `npm run seed:blog` | Seed de posts del blog |
| `npm run import:blog` | Importar blog desde CSV |
| `npm run migrate:customers` | Migrar datos a tabla customers |

---

## Favicon e imágenes

El favicon se genera desde `public/images/icons/logo_tricho.webp` con fondo blanco. Para regenerar:

```bash
npm run favicon
```

Genera `public/favicon.png` (32×32), `public/apple-touch-icon.png` (180×180) y `public/images/og-image.webp` (1200×630 para Open Graph / redes sociales).

Las imágenes del sitio están en formato **WebP** para optimizar rendimiento. Para convertir nuevas imágenes PNG/JPG a WebP:

```bash
npm run images:webp
```

---

## Estructura del proyecto

```
tricholand-web/
├── src/
│   ├── app/                    # App Router (Next.js 15)
│   │   ├── es/, en/, nl/, fr/, de/, it/, pt/   # 7 idiomas (variedades, tienda, blog, contacto...)
│   │   ├── administrator/      # Panel admin (protegido)
│   │   ├── pedido/[order_number]  # Página pública del pedido (standalone, multiidioma, pago, factura)
│   │   └── api/                # API routes (contact, orders, payments, webhooks, transfer)
│   ├── components/
│   │   ├── layout/             # Header, Footer
│   │   ├── home/               # Hero, StatsBar, CatalogPreview, etc.
│   │   ├── shop/               # ShopGrid, CartButton, OrderForm
│   │   ├── contact/            # ContactFormWizard
│   │   ├── varieties/          # CatalogGrid
│   │   └── admin/              # AdminSidebar, ProductForm
│   ├── content/                # Datos estáticos (variedades, blog, productos)
│   ├── lib/
│   │   ├── i18n/               # Diccionarios por idioma
│   │   ├── shop/               # Cart context
│   │   ├── email/              # Templates y i18n de emails
│   │   ├── pdf/                # Generación proformas y facturas
│   │   ├── storage/            # Supabase Storage (documentos)
│   │   ├── payments/           # Redsys (Stripe vía SDK)
│   │   └── translations.ts     # Integración Supabase traducciones
│   └── types/
├── scripts/
│   ├── translate-ui.mjs        # Traducción diccionarios
│   ├── translate-content.mjs   # Traducción contenido → Supabase
│   ├── translate-blog-posts.mjs # Traducción posts del blog
│   ├── generate-locales.mjs    # Generador de páginas por idioma
│   ├── generate-favicon.mjs    # Favicon desde logo (fondo blanco)
│   ├── convert-images-to-webp.mjs   # Conversión PNG/JPG → WebP
│   ├── update-image-refs-to-webp.mjs # Actualizar referencias a .webp
│   ├── seed-products.mjs       # Seed productos
│   ├── seed-blog-posts.mjs     # Seed blog
│   ├── import-blog-from-csv.mjs # Importar blog desde CSV
│   └── migrate-customers.mjs   # Migrar a tabla customers
├── supabase/
│   ├── schema.sql              # Schema principal (products, orders, contacts, settings)
│   ├── translations-schema.sql # Tablas content + translations
│   └── storage-bucket.sql       # Bucket order-documents (proformas, facturas)
└── public/
│   ├── favicon.png             # Favicon 32×32
│   ├── apple-touch-icon.png    # Icono iOS 180×180
│   ├── administrator/          # PWA admin (manifest, icons, sw)
│   └── images/
```

---

## Base de datos (Supabase)

Ejecuta los schemas **en este orden** en el SQL Editor de Supabase:

1. **`supabase/schema.sql`** — Tablas principales:
   - `products` — catálogo tienda (variety_slug, SKU, precios, stock)
   - `orders` — pedidos (customer_*, totales, estados, pago, envío, locale, payment_method)
   - `order_items` — líneas de pedido
   - `contacts` — formulario contacto (professional_subtype, gdpr_consent, priority, status)
   - `settings` — key-value (company_name, min_order_units, etc.)
   - RLS en todas las tablas

2. **`supabase/translations-schema.sql`** — Sistema de traducciones:
   - `content` — contenido fuente (variety, blog, product)
   - `translations` — traducciones por locale
   - Vista `content_with_translations`

3. **`supabase/blog-posts-schema.sql`** — Blog:
   - `blog_posts` — artículos por locale (slug, source_slug, content, meta)
   - RLS y políticas

4. **`supabase/blog-posts-slug-migration.sql`** — Migración opcional si ya tienes blog_posts sin source_slug

5. **`supabase/customers-schema.sql`** — Clientes unificados:
   - `customers` — unifica contactos y pedidos (email, contadores, mailing_consent)
   - RLS y políticas

6. **`supabase/storage-bucket.sql`** — Bucket para documentos de pedidos:
   - `order-documents` — proformas y facturas PDF
   - Políticas de acceso (lectura pública, escritura service role)

> **Nota**: `order-status-awaiting-transfer.sql` no se usa; las transferencias usan `payment_pending` + `payment_method = 'transfer'`.

---

## Despliegue

### Vercel (recomendado, con GitHub)

1. Conecta tu repositorio GitHub en [vercel.com](https://vercel.com) → New Project → Import
2. Vercel detecta Next.js automáticamente
3. **Variables de entorno** — en Project Settings → Environment Variables añade:

| Variable | Valor | Entorno |
|----------|-------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | Production, Preview |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | tu anon key | Production, Preview |
| `SUPABASE_SERVICE_ROLE_KEY` | tu service_role key | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | `https://www.tricholand.com` | Production |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | Credenciales OVH/correo | Production |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-NG0PKMVECG` | Production |
| `OPENAI_API_KEY` | sk-... | Production (si usas translate) |
| `BANK_IBAN`, `BANK_ACCOUNT_HOLDER`, `BANK_NAME`, `BANK_BIC` | Datos bancarios (transferencia) | Production |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Claves Stripe | Production (opcional) |
| `REDSYS_*` | Claves Redsys | Production (opcional) |

4. Cada push a `main` despliega automáticamente

### Otras plataformas

Compatible con **Netlify** o cualquier plataforma que soporte Next.js:

```bash
npm run build
npm start
```

Configura las mismas variables de entorno en el panel de tu proveedor.

---

## SEO

- **Sitemap**: `/sitemap.xml` (generado automáticamente)
- **Robots**: `/robots.txt`
- Meta alternates por idioma en todas las páginas
- Incluye: home, variedades, tienda, blog, catálogo, contacto, etc.

---

## Licencia

Proyecto privado — Tricholand / Eskala Digital.

---

## Repositorio

[https://github.com/Eskaladigital/tricholand](https://github.com/Eskaladigital/tricholand)

---

## Historial de cambios

Ver [CHANGELOG.md](./CHANGELOG.md)
