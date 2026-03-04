# Checklist i18n — Revisión de contenido por idioma

Revisión de contenido hardcodeado en español en páginas de otros idiomas. Cobertura: **ES, EN, NL, FR, DE, IT, PT** (7 idiomas).

---

## Estado actual (revisado 2026-02)

### ✅ Completamente traducido

| Idioma | Páginas clave | Estado |
|--------|---------------|--------|
| **EN** | Blog, Contact, Services, About us, Certifications, Privacy, Legal notice, Shop, Shop order | Todo en inglés |
| **DE** | Blog, Kontakt, Dienstleistungen, Über uns, Zertifizierungen, Datenschutz, Impressum, Shop | Todo en alemán (corregido 2026-02) |
| **FR** | Blog, Contact, Services, À propos, Certifications, Privacy, Note légales, Boutique | Todo en francés |
| **NL** | Blog, Contact, Diensten, Over ons, Certificeringen, Privacybeleid, Juridische info, Winkel | Todo en holandés |
| **IT** | Blog, Contatto, Servizi, Chi siamo, Certificazioni, Privacy, Note legali, Shop | Todo en italiano |
| **PT** | Blog, Contacto, Serviços, Sobre nós, Certificações, Política privacidade, Aviso legal, Loja | Todo en portugués |

### Correcciones aplicadas (2026-02)

| Archivo | Cambio |
|---------|--------|
| `de/uber-uns/page.tsx` | Contenido traducido de español → alemán (párrafos, features, CTA) |
| `de/zertifizierungen/page.tsx` | Contenido traducido de español → alemán (hero, FAQ, badges, CTA) |
| `BlogGrid.tsx` | Textos hardcodeados → `dict.blog` (filterAll, searchPlaceholder, articlesFound, noArticlesFound, featured, noImage, loadMore, readingTime) |
| `it/blog/page.tsx` | Metadata y descripción en español → italiano |
| `pt/blog/page.tsx` | Metadata y descripción en español → portugués |

### Diccionarios i18n

- **blog**: Añadidos `filterAll`, `searchPlaceholder`, `articlesFound`, `noArticlesFound`, `featured`, `noImage`, `loadMore` en los 7 idiomas.

---

## Rutas por idioma (referencia)

| ES | EN | NL | FR | DE | IT | PT |
|----|----|----|----|----|----|-----|
| contacto | contact | contact | contact | kontakt | contatto | contacto |
| servicios | services | diensten | services | dienstleistungen | servizi | servicos |
| sobre-nosotros | about-us | over-ons | a-propos | uber-uns | chi-siamo | sobre-nos |
| certificaciones | certifications | certificeringen | certifications | zertifizierungen | certificazioni | certificacoes |
| politica-privacidad | privacy-policy | privacybeleid | privacy | datenschutz | privacy | politica-privacidade |
| aviso-legal | legal-notice | juridische-informatie | note-legales | impressum | note-legali | aviso-legal |
| variedades | varieties | varieteiten | varietes | sorten | varieta | variedades |
| tienda | shop | winkel | boutique | shop | shop | loja |
| tienda/pedido | shop/order | winkel/bestelling | shop/ordre | shop/bestellung | shop/ordine | loja/pedido |

---

### Correcciones aplicadas (2026-02, slugs blog)

| Cambio | Detalle |
|--------|---------|
| 564 artículos del blog | Títulos, descripciones y slugs re-traducidos de español al idioma correcto en los 6 idiomas (EN, NL, FR, DE, IT, PT) |
| Sitemap hreflang blog | Añadidos `alternates` con hreflang a las entradas del blog en `sitemap.xml` via `getAllBlogAlternates()` |
| Script `--retranslate-all` | Nuevo modo en `translate-blog-posts.mjs` para re-traducir títulos y slugs masivamente |

### Correcciones aplicadas (2026-02, landings B2B y selector de idioma)

| Cambio | Detalle |
|--------|---------|
| Landings B2B en Supabase | 8 landings Pachanoi migradas a tabla `landing_pages`; slugs traducidos por idioma |
| Selector de idioma variedades/landings | Header consulta `/api/variety-alternate-slugs` y construye enlaces con el slug correcto (ej: FR → trichocereus-pachanoi-a-vendre-france, EN → trichocereus-pachanoi-for-sale-uk) |

---

## Checklist para futuras revisiones

1. **Componentes compartidos**: Verificar que reciben `locale` y `dict` correctos (ContactFormWizard, OrderForm, ShopGrid, BlogGrid, etc.).
2. **Páginas estáticas**: Si se añaden nuevas páginas con contenido, traducir a los 7 idiomas.
3. **Variedades y landings**: `getVarietyForLocale` soporta variedades estáticas; las landings B2B están en Supabase con slugs traducidos. El selector de idioma usa `/api/variety-alternate-slugs` para ambos.
4. **URLs internas**: Usar `getFullPath(locale, 'contact')` o `/${locale}/...` en lugar de rutas fijas.
5. **Blog — nuevos artículos**: Al crear un artículo nuevo en español y traducirlo, verificar que el slug generado en cada idioma sea correcto (no mezcla de idiomas). Si hay problemas, ejecutar `node scripts/translate-blog-posts.mjs --retranslate-all --locale XX`.
6. **Sitemap**: Blog y landings incluyen hreflang. Si se añaden nuevas secciones dinámicas, añadir alternates en `src/lib/sitemap-urls.ts`.
7. **Landings B2B**: Contenido en Supabase (`landing_pages`). Para nuevas landings: `seed-landings.mjs` o `translate-landings.mjs`.
