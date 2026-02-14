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

- **7 idiomas**: ES, EN, NL, FR, DE, IT, PT
- **Selector de idioma** en navbar (menú desplegable)
- **Tienda B2B** con carrito, lotes mayoristas y solicitud de presupuesto
- **Catálogo de variedades** con fichas detalladas
- **Blog** con artículos técnicos
- **Panel de administración** (productos, pedidos, contactos)
- **Sistema de traducciones** con Supabase + OpenAI
- **SEO**: sitemap, robots, meta alternates por idioma
- **Google Analytics** (GA4)
- **Favicon** con logo sobre fondo blanco
- **PWA** en panel administrator (instalable)
- **Redirecciones** desde rutas legacy (Joomla)

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

Crea un archivo `.env.local` en la raíz:

```env
# Supabase (obligatorio para traducciones y datos)
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key

# Supabase Service Role (solo para scripts de traducción)
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key

# OpenAI (para scripts translate:ui y translate:content)
OPENAI_API_KEY=sk-...

# Google Analytics (opcional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Admin (opcional, valores por defecto en desarrollo)
ADMIN_EMAIL=admin@tricholand.com
ADMIN_PASSWORD=tricholand2025
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
| `npm run favicon` | Regenerar favicon y apple-touch-icon desde logo |

---

## Favicon

El favicon se genera desde `public/images/icons/logo_tricho.png` con fondo blanco. Para regenerar:

```bash
npm run favicon
```

Genera `public/favicon.png` (32×32) y `public/apple-touch-icon.png` (180×180).

---

## Estructura del proyecto

```
tricholand-web/
├── src/
│   ├── app/                    # App Router (Next.js 15)
│   │   ├── es/, en/, nl/, fr/, de/, it/, pt/   # 7 idiomas (variedades, tienda, blog, contacto...)
│   │   ├── administrator/      # Panel admin (protegido)
│   │   └── api/                # API routes (contact, orders, auth)
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
│   │   └── translations.ts     # Integración Supabase traducciones
│   └── types/
├── scripts/
│   ├── translate-ui.mjs        # Traducción diccionarios
│   ├── translate-content.mjs  # Traducción contenido → Supabase
│   ├── generate-locales.mjs    # Generador de páginas por idioma
│   └── generate-favicon.mjs     # Favicon desde logo (fondo blanco)
├── supabase/
│   ├── schema.sql              # Schema principal (products, orders, contacts, settings)
│   └── translations-schema.sql # Tablas content + translations
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
   - `orders` — pedidos (customer_*, totales, estados, pago, envío)
   - `order_items` — líneas de pedido
   - `contacts` — formulario contacto (professional_subtype, gdpr_consent, priority, status)
   - `settings` — key-value (company_name, min_order_units, etc.)
   - RLS en todas las tablas

2. **`supabase/translations-schema.sql`** — Sistema de traducciones:
   - `content` — contenido fuente (variety, blog, product)
   - `translations` — traducciones por locale
   - Vista `content_with_translations`

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
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-NG0PKMVECG` | Production |
| `OPENAI_API_KEY` | sk-... | Production (si usas translate) |
| `ADMIN_EMAIL` | admin@tricholand.com | Production |
| `ADMIN_PASSWORD` | tu contraseña | Production |

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
