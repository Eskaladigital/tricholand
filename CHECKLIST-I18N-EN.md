# Checklist i18n — Contenido en español en páginas EN (y otros idiomas)

Revisión de contenido hardcodeado en español en la versión inglesa. Usar este checklist para EN y replicar la revisión en nl, fr, de, it, pt.

---

## Resumen EN — Contenido en español detectado

### 1. Blog

| Archivo | Línea | Texto ES | Debe ser |
|---------|-------|----------|----------|
| `en/blog/page.tsx` | 7 | `Blog de Tricholand: guías técnicas...` | English meta description |
| `en/blog/page.tsx` | 21 | `Guías técnicas, consejos de cultivo...` | English subtitle |
| `en/blog/[slug]/page.tsx` | 76 | `formatDate(post.date, 'es')` | `'en'` |
| `en/blog/[slug]/page.tsx` | 142-144 | `¿Necesitas Trichocereus para tu negocio?` / `Presupuesto personalizado...` / `Solicitar presupuesto →` | English CTA |
| `en/blog/[slug]/page.tsx` | 159 | `Posts relacionados` | Related posts |

### 2. Contacto

| Archivo | Línea | Texto ES | Debe ser |
|---------|-------|----------|----------|
| `en/contacto/page.tsx` | 5 | `title: 'Contacto'` | Contact |
| `en/contacto/page.tsx` | 6 | `description: Contacta con Tricholand...` | English meta |
| `en/contacto/page.tsx` | 15 | `Contacto` | Contact |
| `en/contacto/page.tsx` | 18 | `Solicita tu presupuesto...` | Request quote... |
| `en/contacto/page.tsx` | 30 | `Contacto directo` | Direct contact |
| `en/contacto/page.tsx` | 38 | `Murcia, España` | Murcia, Spain |
| `en/contacto/page.tsx` | 63 | `Preguntas rápidas` | Quick questions |
| `en/contacto/page.tsx` | 67-84 | FAQ completo en español | English FAQ |

### 3. Servicios

| Archivo | Línea | Texto ES | Debe ser |
|---------|-------|----------|----------|
| `en/servicios/page.tsx` | 4 | `import { es }` | `import { en }` |
| `en/servicios/page.tsx` | 8-9 | `title: 'Servicios'` / description | Services / English |
| `en/servicios/page.tsx` | 18-21 | `Servicios` / `Soluciones completas...` | Services / Solutions... |
| `en/servicios/page.tsx` | 25-31 | Párrafo intro en español | English intro |
| `en/servicios/page.tsx` | 37-79 | Array de servicios (títulos y detalles) en español | English |
| `en/servicios/page.tsx` | 104-115 | CTA en español | English CTA |
| `en/servicios/page.tsx` | 121 | `CertificationsBar dict={es}` | `dict={en}` |

### 4. Sobre nosotros

| Archivo | Línea | Texto ES | Debe ser |
|---------|-------|----------|----------|
| `en/sobre-nosotros/page.tsx` | 4 | `import { es }` | `import { en }` |
| `en/sobre-nosotros/page.tsx` | 8-9 | metadata en español | English |
| `en/sobre-nosotros/page.tsx` | 17-20 | `Sobre nosotros` / `Vivero productor...` | About us / ... |
| `en/sobre-nosotros/page.tsx` | 26-46 | Párrafos intro en español | English |
| `en/sobre-nosotros/page.tsx` | 73-95 | Features en español | English |
| `en/sobre-nosotros/page.tsx` | 109-122 | CTA en español | English CTA |
| `en/sobre-nosotros/page.tsx` | 127 | `StatsBar dict={es}` | `dict={en}` |

### 5. Certificaciones

| Archivo | Línea | Texto ES | Debe ser |
|---------|-------|----------|----------|
| `en/certificaciones/page.tsx` | 5-7 | metadata en español | English |
| `en/certificaciones/page.tsx` | 16-20 | Título y subtítulo en español | English |
| `en/certificaciones/page.tsx` | 28-69 | Contenido principal en español | English |
| `en/certificaciones/page.tsx` | 74-95 | Sidebar badges (algunos mezclados ES/EN) | All English |
| `en/certificaciones/page.tsx` | 112-133 | FAQ en español | English |
| `en/certificaciones/page.tsx` | 149-161 | CTA en español | English CTA |

### 6. Política de privacidad

| Archivo | Línea | Texto ES | Debe ser |
|---------|-------|----------|----------|
| `en/politica-privacidad/page.tsx` | 4-6 | metadata en español | English |
| `en/politica-privacidad/page.tsx` | 13-76 | Todo el contenido en español | English |

### 7. Aviso legal

| Archivo | Línea | Texto ES | Debe ser |
|---------|-------|----------|----------|
| `en/aviso-legal/page.tsx` | 4-6 | metadata en español | English |
| `en/aviso-legal/page.tsx` | 13-57 | Todo el contenido en español | English |

### 8. Catálogo

| Archivo | Línea | Texto ES | Debe ser |
|---------|-------|----------|----------|
| `en/catalogo/page.tsx` | 6-7 | metadata en español | English |
| `en/catalogo/page.tsx` | 16-20 | `Catálogo` / `Producción disponible...` | Catalog / ... |
| `en/catalogo/page.tsx` | 27 | `Solicitar presupuesto →` | Request quote → |

### 9. Variedades

| Archivo | Línea | Texto ES | Debe ser |
|---------|-------|----------|----------|
| `en/variedades/page.tsx` | 4 | `varietiesES` | Usar variedades traducidas (content/translations) |
| `en/variedades/page.tsx` | 7-8 | metadata en español | English |
| `en/variedades/page.tsx` | 11-15 | `stockLabels` en español | English |
| `en/variedades/page.tsx` | 28-32 | Título y descripción en español | English |
| `en/variedades/page.tsx` | 40 | `href="/es/variedades/..."` | `href="/en/variedades/..."` |
| `en/variedades/page.tsx` | 75 | `Ficha →` | Sheet → |
| `en/variedades/[slug]/page.tsx` | 5 | `getVarietyBySlug` de ES | Usar traducción |
| `en/variedades/[slug]/page.tsx` | 14 | `Variedad no encontrada` | Variety not found |
| `en/variedades/[slug]/page.tsx` | 39-43 | `stockLabels` en español | English |
| `en/variedades/[slug]/page.tsx` | 72-76 | Breadcrumb: `Inicio` / `Variedades` / `href="/es/..."` | Home / Varieties / `/en/...` |
| `en/variedades/[slug]/page.tsx` | 85-86 | `Tamaños:` / `Solicitar presupuesto →` | Sizes: / Request quote |
| `en/variedades/[slug]/page.tsx` | 89 | `href="/es/contacto"` | `href="/en/contacto"` |
| `en/variedades/[slug]/page.tsx` | 100-110 | `Descripción` / `Características destacadas` | Description / Key features |
| `en/variedades/[slug]/page.tsx` | 125-163 | `Guía de cuidados` / Luz, Riego, Temperatura, Sustrato / `Consultar disponibilidad` | Care guide / Light, Water, etc. |
| `en/variedades/[slug]/page.tsx` | 161 | `href="/es/contacto"` | `href="/en/contacto"` |

### 10. Tienda

| Archivo | Línea | Texto ES | Debe ser |
|---------|-------|----------|----------|
| `en/tienda/page.tsx` | 6-8 | metadata en español | English |
| `en/tienda/page.tsx` | 21-28 | `Tienda B2B` / `Lotes al por mayor...` / `Envío a toda la UE + UK` | B2B Shop / ... |
| `en/tienda/page.tsx` | 36-39 | Pasos del proceso en español | English |
| `en/tienda/[slug]/page.tsx` | 17 | `Producto no encontrado` | Product not found |
| `en/tienda/[slug]/page.tsx` | 36-38 | Breadcrumb: `Inicio` / `Tienda B2B` | Home / B2B Shop |
| `en/tienda/[slug]/page.tsx` | 57 | `Destacado` | Featured |
| `en/tienda/[slug]/page.tsx` | 74 | `Ver ficha de variedad →` | View variety sheet → |
| `en/tienda/pedido/page.tsx` | 5-7 | metadata en español | English |
| `en/tienda/pedido/page.tsx` | 15-19 | `Solicitud de pedido` / descripción | Order request / ... |

### 11. Componentes compartidos (afectan a todos los idiomas)

| Archivo | Texto ES | Nota |
|---------|----------|------|
| `ContactFormWizard.tsx` | Todo el formulario en español (labels, botones, mensajes, FAQ) | No recibe `dict`; hay que pasar dict y usar para locale |
| `CatalogGrid` (en catalogo) | ¿Usa traducciones? | Verificar |
| `varietiesES` / `getVarietyBySlug` | Contenido de variedades en español | Las variedades vienen de `content/varieties/es/data` — usar sistema `content`+`translations` |

---

## Checklist para aplicar a nl, fr, de, it, pt

Para cada idioma (nl, fr, de, it, pt), revisar:

- [ ] **Blog** — metadata, subtítulo, formatDate(locale), CTA, "Posts relacionados"
- [ ] **Contacto** — metadata, títulos, FAQ, "Murcia, España" → "Murcia, Spain" (o mantener si es nombre propio)
- [ ] **Servicios** — import correcto (nl, fr, de, it, pt), todo el contenido, CertificationsBar dict
- [ ] **Sobre nosotros** — import correcto, todo el contenido, StatsBar dict
- [ ] **Certificaciones** — metadata y todo el contenido
- [ ] **Política de privacidad** — metadata y todo el contenido
- [ ] **Aviso legal** — metadata y todo el contenido
- [ ] **Catálogo** — metadata, títulos, CTA
- [ ] **Variedades** — metadata, stockLabels, breadcrumbs, hrefs a `/XX/` (no `/es/`), descripción/care (usar traducciones)
- [ ] **Tienda** — metadata, títulos, pasos, breadcrumbs, labels
- [ ] **Tienda pedido** — metadata y descripción
- [ ] **ContactFormWizard** — debe recibir `dict` y usarlo (afecta a todos los idiomas)

---

## Estrategia recomendada

1. **Diccionarios (i18n)**: Ampliar `en.ts`, `nl.ts`, etc. con todas las cadenas que faltan.
2. **Páginas**: Sustituir texto hardcodeado por `dict.xxx` o equivalentes.
3. **Variedades/Productos**: Usar `content`+`translations` de Supabase o `getTranslation()`.
4. **ContactFormWizard**: Añadir prop `dict` y usar para todos los labels/botones/mensajes.
5. **URLs internas**: Revisar que los `href` usen `/${locale}/` y no `/es/` fijo.
