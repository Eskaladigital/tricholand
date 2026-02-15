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

## Checklist para futuras revisiones

1. **Componentes compartidos**: Verificar que reciben `locale` y `dict` correctos (ContactFormWizard, OrderForm, ShopGrid, BlogGrid, etc.).
2. **Páginas estáticas**: Si se añaden nuevas páginas con contenido, traducir a los 7 idiomas.
3. **Variedades**: `getVarietyForLocale` ya soporta traducciones; completar `VARIETY_TRANSLATIONS` para todos los slugs si falta alguno.
4. **URLs internas**: Usar `getFullPath(locale, 'contact')` o `/${locale}/...` en lugar de rutas fijas.
