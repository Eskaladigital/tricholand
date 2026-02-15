# Checklist i18n — Contenido en español en páginas EN (y otros idiomas)

Revisión de contenido hardcodeado en español en la versión inglesa. Rutas EN: `contact`, `services`, `about-us`, `certifications`, `privacy-policy`, `legal-notice`, `varieties`, `shop`, `shop/order`.

---

## Estado actual (revisado 2026-02)

### ✅ Completamente en inglés

| Sección | Archivo | Estado |
|---------|---------|--------|
| **Blog** | `en/blog/page.tsx`, `en/blog/[slug]/page.tsx` | Metadata, subtítulo, formatDate('en'), CTA, "Related posts" — todo EN |
| **Contact** | `en/contact/page.tsx` | Metadata, títulos, FAQ, "Murcia, Spain", ContactFormWizard dict={en} |
| **Services** | `en/services/page.tsx` | Metadata, contenido, CertificationsBar dict={en} |
| **About us** | `en/about-us/page.tsx` | Metadata, párrafos, features, CTA, StatsBar dict={en} |
| **Certifications** | `en/certifications/page.tsx` | Metadata, contenido, sidebar, FAQ, CTA — todo EN |
| **Privacy policy** | `en/privacy-policy/page.tsx` | Metadata y contenido completo en inglés |
| **Legal notice** | `en/legal-notice/page.tsx` | Metadata y contenido completo en inglés |
| **Shop** (índice) | `en/shop/page.tsx` | Metadata, títulos, pasos del proceso — todo EN |
| **Shop order** | `en/shop/order/page.tsx` | Metadata, títulos — todo EN |

### ✅ Corregido (2026-02)

| Archivo | Cambio |
|---------|--------|
| `en/shop/[slug]/page.tsx` | priceNote, stock messages, specsLabel, productDescriptionLabel → `t.shop.*` (getDictionary) |

### ⚠️ Contenido de variedades (parcial)

| Archivo | Nota |
|---------|------|
| `en/varieties/page.tsx` | Usa `varietiesES` directamente. Los `commonName` vienen del data ES (ej. "Antorcha Peruana"). Considerar usar `getAllVarietiesForLocale('en')` o equivalente si existe. |
| `en/varieties/[slug]/page.tsx` | Usa `getVarietyForLocale(slug, 'en')` — tiene traducciones en `VARIETY_TRANSLATIONS.en` para las variedades principales. Si falta traducción para un slug, muestra español. |

---

## Rutas por idioma (referencia)

| ES | EN | NL | FR | DE | IT | PT |
|----|----|----|----|----|----|-----|
| contacto | contact | contact | contact | kontakt | contatto | contacto |
| servicios | services | diensten | services | dienstleistungen | servizi | servicos |
| sobre-nosotros | about-us | over-ons | chi-siamo | uber-uns | chi-siamo | sobre-nos |
| certificaciones | certifications | certificeringen | — | zertifizierungen | certificazioni | certificacoes |
| politica-privacidad | privacy-policy | privacybeleid | privacy | datenschutz | privacy | politica-privacidade |
| aviso-legal | legal-notice | juridische-informatie | note-legales | impressum | note-legali | aviso-legal |
| variedades | varieties | varieteiten | varietes | sorten | varieta | variedades |
| tienda | shop | winkel | shop | shop | shop | loja |
| tienda/pedido | shop/order | winkel/bestelling | shop/ordre | shop/bestellung | shop/ordine | loja/pedido |

---

## Checklist para aplicar a nl, fr, de, it, pt

Para cada idioma, revisar las mismas secciones. Los componentes compartidos (`ContactFormWizard`, `OrderForm`, `ShopGrid`, etc.) reciben `locale` y `dict` — verificar que cada página pasa el diccionario correcto.

---

## Estrategia recomendada

1. **Diccionarios (i18n)**: Ampliar `en.ts`, `nl.ts`, etc. con cadenas que falten (ej. shop product detail).
2. **Páginas**: Sustituir texto hardcodeado por `dict.xxx` o `t.shop.xxx`.
3. **Variedades**: `getVarietyForLocale` ya soporta traducciones; completar `VARIETY_TRANSLATIONS` para todos los slugs si falta alguno.
4. **URLs internas**: Usar `getFullPath(locale, 'contact')` o `/${locale}/...` en lugar de rutas fijas.
