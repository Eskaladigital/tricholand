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
- **Sistema de lotes flexible**: pedido mínimo + incrementos adicionales (ej: 750 uds mínimo, después de 150 en 150)
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

## Sistema de lotes (B2B)

El sistema permite a los clientes comprar productos en cantidades flexibles adaptadas a la venta mayorista:

### Configuración en el admin

Para cada producto se definen **3 campos**:

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| **Unidades por lote** | Cuántas plantas incluye un lote completo (para calcular precio/ud) | 750 |
| **Pedido mínimo** | Cuántas unidades DEBE comprar el cliente como mínimo (primera compra) | 750 |
| **Incremento mínimo** | Cuántas unidades puede añadir después del pedido mínimo | 150 |

### Funcionamiento en la tienda

**Ejemplo**: Trichocereus Pachanoi 35-45 cm

1. **Primera compra** (producto NO en carrito):
   - Cliente ve botón: `Añadir al pedido (750 uds)`
   - Click → añade 750 unidades al carrito

2. **Compras adicionales** (producto YA en carrito):
   - Cliente ve 2 botones + selector:
     - `+ Lote (750)` → añade otro lote completo
     - `+ X uds` → añade la cantidad seleccionada
   - Selector desplegable: "Añadir 150/300/450/600/750 uds"

### Cantidades válidas

Con configuración: mínimo 750, incremento 150:

- ✅ 750 uds (1 lote inicial)
- ✅ 900 uds (750 + 150)
- ✅ 1050 uds (750 + 150 + 150)
- ✅ 1200 uds (750 + 150 + 150 + 150)
- ✅ 1500 uds (750 + 750)
- ✅ 1650 uds (750 + 750 + 150)
- ❌ 500 uds (menor que mínimo)
- ❌ 800 uds (no es múltiplo válido)

### Cálculo de precios

- **Precio del lote**: configurado en el admin (ej: 2775€ por 750 uds)
- **Precio por unidad**: calculado automáticamente (2775€ / 750 = 3.70€/ud)
- **Precio total carrito**: `(precio_lote / units_per_lot) × cantidad_unidades`

Ejemplo: cliente compra 900 uds
- Precio por unidad: 2775€ / 750 = 3.70€
- Total: 3.70€ × 900 = 3330€

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
| `npm run images:webp` | Convertir imágenes PNG/JPG a WebP en `images/` (para subir a Supabase) |
| `npm run seed:products` | Seed de productos de ejemplo |
| `npm run seed:blog` | Seed de posts del blog |
| `npm run import:blog` | Importar blog desde CSV |
| `npm run migrate:customers` | Migrar datos a tabla customers |

**Scripts de blog (ejecutar con `node`):**
- `node scripts/migrate-blog-markdown-to-html.mjs` — Convierte contenido Markdown → HTML en blog_posts
- `node scripts/ai-blog-perfect.mjs` — Limpia y optimiza HTML con OpenAI; `--translate` traduce a 6 idiomas
- `node scripts/ai-blog-perfect.mjs --slug mi-articulo` — Procesar un artículo por slug
- `node scripts/ai-blog-perfect.mjs --dry-run` — Simular sin guardar

---

## Blog — Contenido e imágenes

- **Renderizado**: `renderBlogContent()` en `src/lib/blog-content.ts` convierte Markdown o HTML híbrido a HTML (público y admin).
- **Fallback de imagen**: Las traducciones (EN, NL, FR, etc.) sin imagen usan la del artículo ES (`getPostBySlug` y `getPostsMeta`).
- **Revalidación**: Páginas de blog con `revalidate = 10` (todos los idiomas).
- **API de traducción**: `POST /api/blog/translate` con `source_slug` genera traducciones desde el artículo ES.

---

## Imágenes — REGLA DE ORO

> **MUY IMPORTANTE**: Las imágenes tienen **dos orígenes distintos** según la sección.
> No mezclarlos. Seguir esta tabla siempre.

| Sección | Origen | Ruta / Método | `<Image>` |
|---------|--------|---------------|-----------|
| **Home** (Hero, CatalogPreview) | `public/images/` | `/images/products/...`, `/images/varieties/...` | `unoptimized` |
| **Variedades** (`/variedades`) | `public/images/` | `/images/varieties/...`, `/images/vivero/...` | `unoptimized` |
| **Sobre nosotros** (7 idiomas) | `public/images/` | `/images/vivero/productores_cactus_*.webp` | `unoptimized` |
| **Logo** (Header, Footer) | `public/images/` | `/images/icons/logo_tricho_yellow_200_200.webp` | `unoptimized` |
| **OG image** (layouts) | `public/images/` | `https://www.tricholand.com/images/og-image.webp` | — |
| **Tienda** (productos) | **Supabase Storage** (bucket `plants`) | URL completa `https://xxx.supabase.co/...` vía BD | **`unoptimized` siempre** |
| **Blog** (artículos) | **Supabase Storage** (bucket `blog`) | `getBlogImageUrl()` en `storage.ts` | **`unoptimized` siempre** |

### Reglas:
- **NUNCA** mover imágenes de Home/Variedades/Sobre nosotros a Supabase. Están en `public/`.
- **NUNCA** mover imágenes de Tienda/Blog a `public/`. Están en Supabase Storage.
- Las imágenes de **Supabase** SIEMPRE llevan `unoptimized` en `<Image>` (evita error 500 por proxy de Next.js).
- Ver `src/lib/storage.ts` para los helpers de Supabase (`getPlantImageUrl`, `getBlogImageUrl`, `resolveProductImageUrl`).

### Clientes Supabase (`createClient` vs `createApiClient`)

| Cliente | Archivo | Cookies | Cuándo usar |
|---------|---------|---------|-------------|
| `createClient()` | `src/lib/supabase/server.ts` | Sí (`cookies()`) | Server Components en runtime, admin, mutaciones |
| `createApiClient()` | `src/lib/supabase/api.ts` | No | `generateStaticParams`, API routes, lecturas públicas, build time |

> **IMPORTANTE**: Las funciones de lectura pública (`getActiveProducts`, `getProductBySlug`) usan `createApiClient()`.
> Si se cambian a `createClient()`, las páginas de producto dejan de generarse en build time y dan **error 500**.

### Troubleshooting — Error 500 en páginas de producto

Si las páginas de `/tienda/[slug]` (o equivalentes en otros idiomas) dan error 500:

1. **Verificar que `getActiveProducts()` y `getProductBySlug()` usan `createApiClient()`** (no `createClient()`).
   - `createClient()` necesita `cookies()` → falla en build time → `generateStaticParams` devuelve `[]` → 0 páginas generadas → 500.
2. **Verificar que las imágenes llevan `unoptimized`** en el `<Image>`.
   - Sin `unoptimized`, Next.js intenta proxy-ar la imagen de Supabase → si falla → 500.
3. **Verificar el build**: en el output de `npm run build`, las rutas de producto deben listar los slugs:
   ```
   ├ ● /es/tienda/[slug]    2.56 kB    137 kB    1m    1y
   ├   ├ /es/tienda/pack-mixto-5-variedades
   ├   ├ /es/tienda/lote-pachanoi-15-20
   ```
   Si NO aparecen slugs debajo → `generateStaticParams` devuelve `[]` → revisar punto 1.

---

## Favicon

El favicon se genera desde `public/images/icons/logo_tricho.webp` con fondo blanco. Para regenerar:

```bash
npm run favicon
```

Genera `public/favicon.png` (32×32), `public/apple-touch-icon.png` (180×180) y `public/images/og-image.webp` (1200×630 para Open Graph / redes sociales).

Las imágenes del sitio están en formato **WebP** para optimizar rendimiento.

La carpeta `images/` (raíz del proyecto) contiene imágenes fuente para subir a Supabase. Está en `.gitignore`. Para convertir PNG/JPG a WebP antes de subirlas:

```bash
npm run images:webp
```

Convierte in situ en `images/` (no mueve nada a `public/`).

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
│   ├── migrate-blog-markdown-to-html.mjs # Markdown → HTML en blog_posts
│   ├── ai-blog-perfect.mjs     # Limpieza SEO + traducción con OpenAI
│   ├── generate-locales.mjs    # Generador de páginas por idioma
│   ├── generate-favicon.mjs    # Favicon desde logo (fondo blanco)
│   ├── convert-images-to-webp.mjs   # Conversión PNG/JPG → WebP en images/
│   ├── seed-products.mjs       # Seed productos
│   ├── seed-blog-posts.mjs     # Seed blog
│   ├── import-blog-from-csv.mjs # Importar blog desde CSV
│   └── migrate-customers.mjs   # Migrar a tabla customers
├── supabase/
│   ├── schema.sql              # Schema principal (products, orders, contacts, settings)
│   ├── translations-schema.sql # Tablas content + translations
│   └── storage-bucket.sql       # Bucket order-documents (proformas, facturas)
├── images/                     # Imágenes fuente para Supabase (gitignore)
└── public/
│   ├── favicon.png             # Favicon 32×32
│   ├── apple-touch-icon.png    # Icono iOS 180×180
│   ├── administrator/          # PWA admin (manifest, icons, sw)
│   └── images/                 # Imágenes estáticas del sitio (variedades, vivero, logo, etc.)
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
