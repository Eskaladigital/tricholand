/**
 * Seed landing pages into Supabase landing_pages table.
 * Inserts 8 landings (2 EN + ES, FR, DE, NL, IT, PT) with full content and config.
 *
 * Usage:
 *   node scripts/seed-landings.mjs              (insert all)
 *   node scripts/seed-landings.mjs --dry-run    (preview without inserting)
 *
 * Requires: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const envPath = join(ROOT, '.env.local')
if (existsSync(envPath)) {
  const content = readFileSync(envPath, 'utf8')
  for (const line of content.split('\n')) {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      let value = match[2].trim()
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      process.env[key] = value
    }
  }
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
const DRY_RUN = process.argv.includes('--dry-run')

// Shared config for all landings (images are local public/)
const SHARED_CONFIG = {
  heroImage: '/images/varieties/Trichocereus_Pachanoi_1.webp',
  aboutImage: '/images/products/producto_trichocereus_pachanoi_1.webp',
  galleryImages: [
    '/images/varieties/Trichocereus_Pachanoi_2.webp',
    '/images/products/producto_trichocereus_pachanoi_bio_1_v2.webp',
    '/images/vivero/vivero_mayorista_cactus.webp',
    '/images/products/producto_trichocereus_pachanoi_2.webp',
  ],
  nurseryImage: '/images/vivero/productores_cactus_1.webp',
  otherVarietySlugs: [
    { slug: 'trichocereus-peruvianus', img: '/images/varieties/Trichocereus_peruvianus_1.webp' },
    { slug: 'trichocereus-bridgesii', img: '/images/varieties/Trichocereus_Bridgessi_1.webp' },
    { slug: 'trichocereus-pasacana-terscheckii', img: '/images/varieties/Trichocereus_terscheckii_1.webp' },
  ],
  areaServed: [
    { name: 'United Kingdom' }, { name: 'Spain' }, { name: 'France' },
    { name: 'Germany' }, { name: 'Netherlands' }, { name: 'Italy' }, { name: 'Portugal' },
  ],
}

const EUROPE_CONFIG = {
  ...SHARED_CONFIG,
  heroImage: '/images/varieties/Trichocereus_Pachanoi_2.webp',
  nurseryImage: '/images/vivero/productores_cactus_2.webp',
  galleryImages: [
    '/images/varieties/Trichocereus_Pachanoi_1.webp',
    '/images/products/producto_trichocereus_pachanoi_bio_1_v2.webp',
    '/images/vivero/vivero_mayorista_cactus.webp',
    '/images/products/producto_trichocereus_pachanoi_bio_3.webp',
  ],
  areaServed: [{ name: 'Europe' }],
}

// ─────────────────────────────────────────────
// LANDING DATA
// ─────────────────────────────────────────────

const LANDINGS = [
  // ── EN UK ──
  {
    slug: 'trichocereus-pachanoi-for-sale-uk',
    source_slug: 'trichocereus-pachanoi-for-sale-uk',
    locale: 'en',
    meta_title: 'Trichocereus Pachanoi for Sale UK — Wholesale B2B | Tricholand',
    meta_description: 'Buy Trichocereus Pachanoi (San Pedro cactus) wholesale in the UK. B2B specialist nursery in Spain, shipping across Europe with EU Plant Passport. Minimum order 750 units.',
    meta_keywords: ['trichocereus pachanoi for sale uk','san pedro cactus for sale uk','trichocereus wholesale uk','buy trichocereus pachanoi uk','san pedro cactus wholesale','cactus wholesale europe','trichocereus nursery','B2B cactus supplier uk'],
    og_locale: 'en_GB',
    content: {
      heroBadge: 'B2B Wholesale · UK Delivery',
      heroTitle: 'Trichocereus Pachanoi',
      heroTitleHighlight: 'for Sale in the UK',
      heroDescription: 'Specialist nursery-grown San Pedro cacti shipped directly from Spain to the UK. EU Plant Passport included. Wholesale pricing from 750 units.',
      ctaPrimary: 'Request a Quote →',
      ctaSecondary: 'View All Varieties',
      trustItems: ['EU Plant Passport ✓','Direct from Nursery ✓','UK Shipping ✓','Quote in 24h ✓'],
      aboutTitle: 'Why Trichocereus Pachanoi?',
      aboutP1: '<strong class="text-negro">Trichocereus Pachanoi</strong> (San Pedro) is one of the most iconic and commercially successful columnar cacti in the European market. Native to the Andes, it thrives in the UK climate when given well-draining soil and a sunny position — making it a perfect addition to garden centre ranges, landscaping schemes and specialist retail collections.',
      aboutP2: 'Its striking blue-green colour, elegant columnar form and fast growth rate (up to 30 cm per year) make it an incredibly popular choice with end consumers. It produces spectacular nocturnal white flowers up to 22 cm in diameter.',
      aboutHighlights: [
        'Fast growth: up to 30 cm/year under optimal conditions',
        'Hardy to -2°C — suitable for UK sheltered positions',
        'Spectacular 22 cm white nocturnal flowers',
        'Minimal maintenance once established',
        'Excellent as rootstock for grafting',
        'High consumer demand — proven retail seller',
      ],
      sizesTitle: 'Available Sizes',
      sizesSubtitle: 'All sizes grown at our nursery in Murcia, Spain — shipped directly to the UK',
      sizes: [
        { range: '15–20 cm', label: 'Young seedlings', desc: 'Ideal for growing on, grafting stock or retail resale' },
        { range: '25–35 cm', label: 'Juvenile plants', desc: 'Strong root system, ready for garden centre display' },
        { range: '35–55 cm', label: 'Established plants', desc: 'Our most popular wholesale size — impactful and hardy' },
        { range: '55–80 cm', label: 'Specimen size', desc: 'Statement pieces for landscaping and premium retail' },
      ],
      sizesFooter: 'Custom sizes and mixed pallets available on request.',
      sizesFooterLink: 'Contact us for availability',
      benefitsTitle: 'Why Buy from Tricholand?',
      benefitsSubtitle: "We are a specialist Trichocereus producer nursery based in Murcia, Spain — one of Europe's premier cactus-growing regions. We sell exclusively B2B.",
      benefits: [
        { icon: '🌱', title: 'EU Plant Passport Included', desc: 'Every shipment includes an official EU Plant Passport. Fully compliant for import into the UK under current phytosanitary regulations.' },
        { icon: '🚛', title: 'Direct Shipping to the UK', desc: 'We ship palletised orders directly from our nursery in Murcia, Spain to anywhere in the UK. Temperature-controlled transport available.' },
        { icon: '📦', title: 'Minimum Order 750 Units', desc: 'Our minimum order is 750 plants per variety, with additional increments of 150 units. Perfect for garden centres, nurseries, landscapers and specialist retailers.' },
        { icon: '💰', title: 'Competitive Wholesale Prices', desc: 'Nursery-direct pricing with no middlemen. Volume discounts available for orders over 750 units. Custom quotes within 24 hours.' },
        { icon: '☀️', title: 'Grown in Murcia, Spain', desc: 'Our Trichocereus are field-grown under the Spanish Mediterranean sun — producing stronger, healthier plants than greenhouse-grown alternatives.' },
        { icon: '🤝', title: 'Dedicated B2B Support', desc: 'Personal account manager for UK clients. We speak English and understand the UK market. Flexible payment terms for repeat customers.' },
      ],
      nurseryTitle: 'Our Nursery in Murcia',
      nurseryP1: 'Tricholand is a family-run nursery in the Murcia region of south-east Spain, specialising exclusively in Trichocereus and columnar cacti. Our plants are field-grown under the Mediterranean sun — producing stronger, healthier specimens with superior root systems compared to greenhouse-grown alternatives.',
      nurseryP2: 'We have been supplying garden centres, nurseries, landscapers and specialist retailers across Europe for years. Our UK clients particularly value our reliable quality, competitive pricing and hassle-free import process.',
      nurseryLink: 'Learn more about us →',
      faqTitle: 'Frequently Asked Questions',
      faq: [
        { q: 'Can I import Trichocereus Pachanoi into the UK?', a: 'Yes. Trichocereus Pachanoi is a legal ornamental plant in the UK. All our shipments include the required EU Plant Passport and phytosanitary documentation for smooth customs clearance.' },
        { q: 'What is the minimum order quantity?', a: 'Our minimum order is 750 plants per variety (one full lot). After the initial order, you can add increments of 150 units. For mixed orders combining different Trichocereus varieties (Pachanoi, Peruvianus, Bridgesii), we can arrange custom pallets.' },
        { q: 'How long does shipping take to the UK?', a: 'Standard delivery is 5–7 working days from our nursery in Murcia to anywhere in the UK. We allow 7 days for order preparation before dispatch.' },
        { q: 'Do you offer volume discounts?', a: 'Yes. We offer tiered pricing based on order volume. Contact us with your requirements and we will provide a bespoke quote within 24 working hours.' },
        { q: 'What sizes are available?', a: 'We offer Trichocereus Pachanoi in sizes from 15 cm seedlings to 80 cm+ specimen plants. The most popular wholesale size for UK buyers is 35–55 cm.' },
        { q: 'Do plants come with care instructions?', a: 'Yes. We provide professional growing guides with each order, including specific advice for the UK climate. Trichocereus Pachanoi is surprisingly hardy and can tolerate brief frosts down to -2°C.' },
      ],
      otherTitle: 'Other Trichocereus Varieties',
      otherSubtitle: 'Combine varieties in a single shipment to maximise your order',
      otherVarietiesLabels: [
        { name: 'T. Peruvianus', common: 'Peruvian Torch' },
        { name: 'T. Bridgesii', common: 'Achuma' },
        { name: 'T. Terscheckii', common: 'Giant Cardón' },
      ],
      ctaTitle: 'Ready to Order?',
      ctaDescription: 'Get a custom wholesale quote for Trichocereus Pachanoi delivered to the UK. We respond within 24 working hours.',
      ctaButton: 'Request Your Quote →',
      ctaEmailText: 'Or email us directly at',
      jsonLdDescription: 'Specialist Trichocereus producer nursery in Murcia, Spain. B2B wholesale for professionals across Europe and the UK.',
      jsonLdLanguages: ['English', 'Spanish'],
    },
    config: SHARED_CONFIG,
  },

  // ── EN EUROPE ──
  {
    slug: 'trichocereus-pachanoi-for-sale-europe',
    source_slug: 'trichocereus-pachanoi-for-sale-europe',
    locale: 'en',
    meta_title: 'Trichocereus Pachanoi for Sale Europe — Wholesale B2B | Tricholand',
    meta_description: 'Buy Trichocereus Pachanoi (San Pedro cactus) wholesale in Europe. B2B nursery in Spain shipping to EU-27 & UK with EU Plant Passport included. Minimum order 750 units.',
    meta_keywords: ['trichocereus pachanoi for sale europe','san pedro cactus wholesale europe','trichocereus wholesale','buy trichocereus pachanoi europe','cactus wholesale europe','trichocereus nursery spain','B2B cactus supplier europe','columnar cactus wholesale','san pedro cactus nursery'],
    og_locale: 'en',
    content: {
      heroBadge: 'B2B Wholesale · EU & UK Delivery',
      heroTitle: 'Trichocereus Pachanoi',
      heroTitleHighlight: 'for Sale in Europe',
      heroDescription: 'Wholesale San Pedro cacti grown in our nursery in Murcia, Spain — shipped across all of Europe with EU Plant Passport included. From 750 units.',
      ctaPrimary: 'Request a Quote →',
      ctaSecondary: 'View All Varieties',
      trustItems: ['EU Plant Passport ✓','Producer Nursery ✓','EU-27 & UK Shipping ✓','Quote in 24h ✓'],
      aboutTitle: 'The Most Popular Columnar Cactus in Europe',
      aboutP1: '<strong class="text-negro">Trichocereus Pachanoi</strong> (San Pedro) is the best-selling columnar cactus across European garden centres, nurseries and landscaping projects. Its striking blue-green colour, elegant form and fast growth rate make it an irresistible choice for consumers — and a reliable profit driver for B2B buyers.',
      aboutP2: 'Native to the Andes of Ecuador and Peru, it adapts remarkably well to Mediterranean and temperate European climates. Under optimal conditions it grows up to 30 cm per year and produces spectacular nocturnal white flowers up to 22 cm in diameter.',
      aboutHighlights: [
        'Fast growth: up to 30 cm/year — visible results for end consumers',
        'Hardy to -2°C — thrives outdoors in southern and western Europe',
        'Spectacular 22 cm white nocturnal flowers',
        'Minimal maintenance — ideal low-care plant for retail',
        'Excellent as rootstock for grafting',
        'Proven high demand across all European markets',
      ],
      sizesTitle: 'Available Sizes',
      sizesSubtitle: 'Field-grown at our nursery in Murcia, Spain — shipped directly to your door across Europe',
      sizes: [
        { range: '15–20 cm', label: 'Young seedlings', desc: 'Perfect for growing on, grafting stock or retail resale across Europe' },
        { range: '25–35 cm', label: 'Juvenile plants', desc: 'Strong root system, ready for garden centre shelves' },
        { range: '35–55 cm', label: 'Established plants', desc: 'Our best-selling wholesale size — the sweet spot of impact and value' },
        { range: '55–80 cm', label: 'Specimen size', desc: 'Premium pieces for landscaping projects and high-end retail' },
      ],
      sizesFooter: 'Custom sizes and mixed pallets available on request.',
      sizesFooterLink: 'Contact us for availability',
      benefitsTitle: 'Why Buy from Tricholand?',
      benefitsSubtitle: "We are a specialist Trichocereus producer nursery in Murcia, Spain — one of Europe's premier cactus-growing regions. We sell exclusively B2B.",
      benefits: [
        { icon: '🌱', title: 'EU Plant Passport Included', desc: 'Every order ships with an official EU Plant Passport — no extra paperwork for EU-27 countries. Full phytosanitary compliance for UK imports too.' },
        { icon: '🚛', title: 'Shipping Across Europe', desc: 'Palletised shipments from Murcia to any EU country and the UK. Regular routes to France, Germany, Netherlands, Italy, Portugal, Belgium and more.' },
        { icon: '📦', title: 'Minimum Order 750 Units', desc: 'Start with 750 plants per variety, with additional increments of 150 units. Ideal for garden centres, nurseries, landscapers, wholesalers and specialist retailers.' },
        { icon: '💰', title: 'Nursery-Direct Pricing', desc: 'No middlemen. You buy directly from the producer. Volume discounts for orders over 750 units. Custom quote within 24 hours.' },
        { icon: '☀️', title: 'Field-Grown in Murcia, Spain', desc: 'Mediterranean sun-grown Trichocereus produce stronger, healthier plants with superior root systems compared to greenhouse-grown alternatives.' },
        { icon: '🤝', title: 'Multilingual B2B Support', desc: 'We speak English, Spanish, French and German. Dedicated account management, flexible payment terms and reliable supply all year round.' },
      ],
      nurseryTitle: 'Our Nursery in Murcia, Spain',
      nurseryP1: 'Tricholand is a family-run nursery in the Murcia region of south-east Spain, specialising exclusively in Trichocereus and columnar cacti. Our plants are field-grown under over 300 days of sunshine per year — producing stronger, healthier specimens that arrive in peak condition anywhere in Europe.',
      nurseryP2: "We supply garden centres, wholesale nurseries, landscaping firms and specialist retailers across France, Germany, Netherlands, Belgium, Italy, Portugal, the UK and beyond. Reliable quality, competitive pricing and hassle-free logistics — that's the Tricholand promise.",
      nurseryLink: 'Learn more about us →',
      faqTitle: 'Frequently Asked Questions',
      faq: [
        { q: 'Which European countries do you ship to?', a: 'We ship to all EU-27 member states and the United Kingdom. Our most frequent routes cover France, Germany, Netherlands, Belgium, Italy, Portugal, Austria, Ireland and Switzerland. For other destinations, contact us for a shipping quote.' },
        { q: 'Is an EU Plant Passport included?', a: 'Yes. Every shipment includes an official EU Plant Passport at no extra cost. This is mandatory for intra-EU plant trade and ensures compliance with all phytosanitary regulations.' },
        { q: 'What is the minimum order quantity?', a: 'Our minimum order is 750 plants per variety (one full lot). After the initial order, you can add increments of 150 units. You can combine different Trichocereus varieties (Pachanoi, Peruvianus, Bridgesii, Terscheckii) in a single shipment.' },
        { q: 'How long does shipping take within Europe?', a: 'Typical delivery times: France 2–3 days, Germany/Netherlands/Belgium 3–4 days, Italy/Portugal 2–3 days, UK 5–7 days, Eastern Europe 4–6 days. We allow 7 days for order preparation before dispatch.' },
        { q: 'Can Trichocereus Pachanoi survive European winters?', a: 'Trichocereus Pachanoi tolerates brief frosts down to -2°C when the soil is dry. In Mediterranean climates (Spain, Portugal, southern France, Italy) it thrives outdoors year-round. In northern Europe it performs well in sheltered positions or as a seasonal outdoor display.' },
        { q: 'Do you offer exclusivity for my region?', a: 'We offer preferred supplier agreements for high-volume clients. Contact us to discuss exclusivity terms for your market or region.' },
      ],
      otherTitle: 'Other Trichocereus Varieties',
      otherSubtitle: 'Combine varieties in a single shipment to maximise your order',
      otherVarietiesLabels: [
        { name: 'T. Peruvianus', common: 'Peruvian Torch' },
        { name: 'T. Bridgesii', common: 'Achuma' },
        { name: 'T. Terscheckii', common: 'Giant Cardón' },
      ],
      ctaTitle: 'Ready to Order?',
      ctaDescription: 'Get a custom wholesale quote for Trichocereus Pachanoi delivered anywhere in Europe. We respond within 24 working hours.',
      ctaButton: 'Request Your Quote →',
      ctaEmailText: 'Or email us directly at',
      jsonLdDescription: 'Specialist Trichocereus producer nursery in Murcia, Spain. B2B wholesale for professionals across Europe.',
      jsonLdLanguages: ['English', 'Spanish', 'French', 'German'],
      countriesSection: {
        title: 'We Ship Across Europe',
        subtitle: 'Regular palletised shipments from our nursery in Murcia to all major European markets',
        countries: [
          { name: 'France', flag: '🇫🇷' }, { name: 'Germany', flag: '🇩🇪' },
          { name: 'Netherlands', flag: '🇳🇱' }, { name: 'Belgium', flag: '🇧🇪' },
          { name: 'Italy', flag: '🇮🇹' }, { name: 'Portugal', flag: '🇵🇹' },
          { name: 'United Kingdom', flag: '🇬🇧' }, { name: 'Austria', flag: '🇦🇹' },
          { name: 'Ireland', flag: '🇮🇪' }, { name: 'Switzerland', flag: '🇨🇭' },
          { name: 'Poland', flag: '🇵🇱' }, { name: 'Czech Republic', flag: '🇨🇿' },
        ],
        footer: '+ all other EU-27 countries.',
        footerLink: 'Ask for a shipping quote',
      },
    },
    config: EUROPE_CONFIG,
  },

  // ── ES ──
  {
    slug: 'trichocereus-pachanoi-venta-espana',
    source_slug: 'trichocereus-pachanoi-for-sale-uk',
    locale: 'es',
    meta_title: 'Trichocereus Pachanoi en Venta España — Mayorista B2B | Tricholand',
    meta_description: 'Comprar Trichocereus Pachanoi al por mayor en España, vivero productor B2B en Murcia, Pasaporte Fitosanitario UE, mínimo 750 unidades',
    meta_keywords: ['trichocereus pachanoi en venta','san pedro cactus comprar españa','cactus al por mayor españa','trichocereus mayorista','comprar cactus al por mayor','vivero trichocereus españa','trichocereus pachanoi mayorista','cactus san pedro mayorista españa'],
    og_locale: 'es_ES',
    content: {
      heroBadge: 'Mayorista B2B · Envío en España',
      heroTitle: 'Trichocereus Pachanoi',
      heroTitleHighlight: 'en venta en España',
      heroDescription: 'San Pedro desde un vivero productor en Murcia. Envío nacional en 24-48h. Pasaporte Fitosanitario UE incluido. Precios de mayorista a partir de 750 unidades.',
      ctaPrimary: 'Solicitar Presupuesto →',
      ctaSecondary: 'Todas las Variedades',
      trustItems: ['Pasaporte Fitosanitario UE ✓','Directo del Vivero ✓','Envío Nacional ✓','Presupuesto en 24h ✓'],
      aboutTitle: '¿Por qué Trichocereus Pachanoi?',
      aboutP1: '<strong class="text-negro">Trichocereus Pachanoi</strong> (San Pedro) es uno de los cactus columnares más icónicos y comercialmente exitosos del mercado europeo. Originario de los Andes, se adapta perfectamente al clima español — el clima mediterráneo de España es ideal para su cultivo. Nuestro vivero está en Murcia: somos productores nacionales, lo que significa envíos más rápidos, sin aduanas y sin complicaciones logísticas internacionales.',
      aboutP2: 'Su color verde azulado, forma columnar elegante y crecimiento rápido (hasta 30 cm al año) lo hacen muy demandado por el consumidor final. Produce espectaculares flores blancas nocturnas de hasta 22 cm de diámetro. Para el mercado español, comprar a un productor nacional supone los mejores precios y la entrega más rápida posible.',
      aboutHighlights: [
        'Crecimiento rápido: hasta 30 cm/año en condiciones óptimas',
        'Resistente hasta -2°C — adecuado para zonas protegidas en España',
        'Flores nocturnas blancas espectaculares de 22 cm',
        'Mínimo mantenimiento una vez establecido',
        'Excelente como portainjerto',
        'Alta demanda — venta probada en retail',
      ],
      sizesTitle: 'Tallas disponibles',
      sizesSubtitle: 'Todas las tallas cultivadas en nuestro vivero en Murcia — envío directo en España',
      sizes: [
        { range: '15–20 cm', label: 'Plántulas', desc: 'Ideal para continuar cultivo, como portainjertos o para venta al detalle' },
        { range: '25–35 cm', label: 'Plantas jóvenes', desc: 'Sistema radicular fuerte, listas para presentación en garden center' },
        { range: '35–55 cm', label: 'Plantas establecidas', desc: 'Nuestra talla más demandada en mayorista — impacto visual y resistentes' },
        { range: '55–80 cm', label: 'Ejemplares', desc: 'Piezas destacadas para paisajismo y retail premium' },
      ],
      sizesFooter: 'Tallas personalizadas y paletas mixtas bajo consulta.',
      sizesFooterLink: 'Contáctenos para disponibilidad',
      benefitsTitle: '¿Por qué Tricholand?',
      benefitsSubtitle: 'Somos un vivero especializado en Trichocereus en Murcia, España — una de las principales regiones productoras de cactus de Europa. Vendemos exclusivamente B2B. Ser productores en España significa los mejores precios y la entrega más rápida para el mercado nacional.',
      benefits: [
        { icon: '🌱', title: 'Pasaporte Fitosanitario UE', desc: 'Todas las entregas incluyen el Pasaporte Fitosanitario oficial de la UE. Totalmente conforme para la venta en España y el resto de Europa.' },
        { icon: '🚛', title: 'Envío Nacional España', desc: 'Somos productores en España. Envío directo desde Murcia a toda la península en 24-48h. Sin aduanas, sin logística internacional, los mejores plazos y precios.' },
        { icon: '📦', title: 'Mínimo 750 unidades', desc: 'Pedido mínimo de 750 plantas por variedad, con incrementos posteriores de 150 unidades. Ideal para garden centers, viveros, paisajistas y distribuidores profesionales.' },
        { icon: '💰', title: 'Precios de Productor', desc: 'Precios directos de vivero, sin intermediarios. Descuentos por volumen en pedidos superiores a 750 unidades. Presupuesto personalizado en 24 horas.' },
        { icon: '☀️', title: 'Cultivado en Murcia', desc: 'Nuestros Trichocereus se cultivan al aire libre bajo el sol mediterráneo — plantas más robustas y sanas que las alternativas de invernadero.' },
        { icon: '🤝', title: 'Atención B2B Personalizada', desc: 'Atención directa en español. Conocemos el mercado nacional. Condiciones de pago flexibles para clientes habituales. Ser productores en España significa el mejor servicio.' },
      ],
      nurseryTitle: 'Nuestro vivero en Murcia',
      nurseryP1: 'Tricholand es un vivero familiar en la región de Murcia, en el sureste de España, especializado exclusivamente en Trichocereus y cactus columnares. Nuestras plantas se cultivan al aire libre bajo el sol mediterráneo — ejemplares más robustos y sanos, con sistemas radiculares superiores a las alternativas de invernadero.',
      nurseryP2: 'Suministramos desde hace años a garden centers, viveros, paisajistas y distribuidores en toda España y Europa. Nuestros clientes españoles valoran especialmente nuestra calidad constante, precios competitivos y la ventaja de comprar a un productor nacional: envíos rápidos y sin trámites aduaneros.',
      nurseryLink: 'Más sobre nosotros →',
      faqTitle: 'Preguntas frecuentes',
      faq: [
        { q: '¿Qué tipo de cliente puede comprar Trichocereus Pachanoi al por mayor?', a: 'Vendemos exclusivamente a profesionales B2B: viveros, garden centers, paisajistas, distribuidores y empresas con CIF/NIF. No realizamos ventas al público final en esta modalidad.' },
        { q: '¿Cuál es el pedido mínimo?', a: 'El pedido mínimo es de 750 plantas por variedad (un lote completo). Después puede añadir incrementos de 150 unidades. En pedidos mixtos con varias variedades (Pachanoi, Peruvianus, Bridgesii) podemos preparar paletas combinadas según sus necesidades.' },
        { q: '¿Cuánto tarda el envío dentro de España?', a: 'Al estar nuestro vivero en Murcia, el envío a la península suele ser de 24-48 horas laborables. Para Canarias y Baleares los plazos pueden variar. Planificamos unos 7 días para la preparación del pedido antes del envío.' },
        { q: '¿Ofrecen descuentos por volumen?', a: 'Sí. Aplicamos precios escalonados según la cantidad. Contáctenos con sus necesidades y le enviaremos un presupuesto personalizado en un máximo de 24 horas laborables.' },
        { q: '¿Qué tallas tienen disponibles?', a: 'Suministramos Trichocereus Pachanoi desde plántulas de 15 cm hasta ejemplares de más de 80 cm. La talla más demandada por mayoristas en España es la de 35–55 cm.' },
        { q: '¿Puedo visitar el vivero?', a: 'Sí. Estamos en Murcia y recibimos visitas de profesionales previa cita. Contáctenos para coordinar una visita y conocer nuestras instalaciones y cultivos.' },
      ],
      otherTitle: 'Otras variedades de Trichocereus',
      otherSubtitle: 'Combine variedades en un mismo pedido para optimizar su compra',
      otherVarietiesLabels: [
        { name: 'T. Peruvianus', common: 'Antorcha peruana' },
        { name: 'T. Bridgesii', common: 'Achuma' },
        { name: 'T. Terscheckii', common: 'Cardón gigante' },
      ],
      ctaTitle: '¿Listo para Pedir?',
      ctaDescription: 'Solicite un presupuesto mayorista personalizado para Trichocereus Pachanoi en España. Le respondemos en un máximo de 24 horas laborables.',
      ctaButton: 'Solicitar Presupuesto →',
      ctaEmailText: 'O escríbanos directamente a',
      jsonLdDescription: 'Vivero especializado en Trichocereus en Murcia, España. Mayorista B2B para profesionales en España y Europa.',
      jsonLdLanguages: ['Spanish', 'English'],
    },
    config: SHARED_CONFIG,
  },

  // ── FR ──
  {
    slug: 'trichocereus-pachanoi-a-vendre-france',
    source_slug: 'trichocereus-pachanoi-for-sale-uk',
    locale: 'fr',
    meta_title: 'Trichocereus Pachanoi à Vendre France — Grossiste B2B | Tricholand',
    meta_description: "Achetez du Trichocereus Pachanoi (cactus San Pedro) en gros en France. Pépinière B2B en Espagne, livraison France avec Passeport Phytosanitaire UE. Commande minimum 750 unités.",
    meta_keywords: ['trichocereus pachanoi à vendre','san pedro cactus france','cactus grossiste france','acheter trichocereus pachanoi','trichocereus pachanoi grossiste','cactus san pedro en gros','pépinière trichocereus','fournisseur cactus B2B france'],
    og_locale: 'fr_FR',
    content: {
      heroBadge: 'Grossiste B2B · Livraison France',
      heroTitle: 'Trichocereus Pachanoi',
      heroTitleHighlight: 'à Vendre en France',
      heroDescription: "Cactus San Pedro de pépinière spécialisée, expédiés directement d'Espagne vers la France. Passeport Phytosanitaire UE inclus. Tarifs grossiste à partir de 750 unités.",
      ctaPrimary: 'Demander un Devis →',
      ctaSecondary: 'Toutes les Variétés',
      trustItems: ['Passeport Phytosanitaire UE ✓','Direct Pépinière ✓','Livraison France ✓','Devis en 24h ✓'],
      aboutTitle: 'Pourquoi le Trichocereus Pachanoi ?',
      aboutP1: "<strong class=\"text-negro\">Trichocereus Pachanoi</strong> (San Pedro) est l'un des cactus colonnaires les plus emblématiques et commercialement réussis sur le marché européen. Originaire des Andes, il s'adapte bien au climat français avec un sol drainant et une exposition ensoleillée — un choix idéal pour les jardineries, les aménagements paysagers et les collections de retail spécialisé.",
      aboutP2: "Sa couleur bleu-vert distinctive, sa forme colonnaire élégante et sa croissance rapide (jusqu'à 30 cm par an) en font un choix très populaire auprès des consommateurs. Il produit des fleurs blanches nocturnes spectaculaires pouvant atteindre 22 cm de diamètre.",
      aboutHighlights: [
        "Croissance rapide : jusqu'à 30 cm/an en conditions optimales",
        'Rustique jusqu\'à -2°C — adapté aux positions abritées en France',
        'Fleurs blanches nocturnes spectaculaires de 22 cm',
        'Entretien minimal une fois installé',
        'Excellent comme porte-greffe',
        'Forte demande — valeur retail éprouvée',
      ],
      sizesTitle: 'Tailles disponibles',
      sizesSubtitle: 'Toutes les tailles cultivées dans notre pépinière à Murcie, Espagne — expédition directe vers la France',
      sizes: [
        { range: '15–20 cm', label: 'Jeunes plants', desc: 'Idéal pour la culture, le greffage ou la revente en détail' },
        { range: '25–35 cm', label: 'Plants juvéniles', desc: 'Système racinaire développé, prêts pour les jardineries' },
        { range: '35–55 cm', label: 'Plants établis', desc: 'Notre taille la plus demandée — impact visuel et rusticité' },
        { range: '55–80 cm', label: 'Spécimens', desc: "Pièces d'exception pour l'aménagement paysager et le retail premium" },
      ],
      sizesFooter: 'Tailles sur mesure et palettes mixtes sur demande.',
      sizesFooterLink: 'Contactez-nous pour la disponibilité',
      benefitsTitle: 'Pourquoi acheter chez Tricholand ?',
      benefitsSubtitle: "Nous sommes une pépinière spécialisée Trichocereus basée à Murcie, Espagne — l'une des principales régions de culture de cactus en Europe. Nous vendons exclusivement en B2B.",
      benefits: [
        { icon: '🌱', title: 'Passeport Phytosanitaire UE', desc: "Chaque envoi inclut un Passeport Phytosanitaire UE officiel. Conformité totale pour l'import en France (échanges intracommunautaires, pas de douane supplémentaire)." },
        { icon: '🚛', title: 'Livraison France', desc: 'Nous expédions vos commandes palettisées directement depuis notre pépinière à Murcie, Espagne, vers toute la France. Transport possible sous contrôle de température.' },
        { icon: '📦', title: 'Minimum 750 unités', desc: 'Commande minimum de 750 plants par variété, puis par incréments de 150 unités. Idéal pour jardineries, pépinières, paysagistes et revendeurs spécialisés.' },
        { icon: '💰', title: 'Prix compétitifs', desc: 'Tarifs direct pépinière sans intermédiaires. Remises volume pour les commandes de plus de 750 unités. Devis personnalisé sous 24 h.' },
        { icon: '☀️', title: 'Cultivé à Murcie', desc: "Nos Trichocereus sont cultivés en plein champ sous le soleil méditerranéen espagnol — des plants plus vigoureux et sains qu'en serre." },
        { icon: '🤝', title: 'Support B2B francophone', desc: 'Interlocuteur dédié pour les clients français. Nous parlons français et connaissons le marché. Conditions de paiement souples pour les clients réguliers.' },
      ],
      nurseryTitle: 'Notre pépinière à Murcie',
      nurseryP1: "Tricholand est une pépinière familiale dans la région de Murcie, au sud-est de l'Espagne, spécialisée exclusivement dans les Trichocereus et cactus colonnaires. Nos plants sont cultivés en plein champ sous le soleil méditerranéen — des spécimens plus vigoureux, sains et dotés d'un système racinaire supérieur aux cultures sous serre.",
      nurseryP2: 'Nous fournissons jardineries, pépinières, paysagistes et revendeurs spécialisés en Europe depuis des années. Nos clients français apprécient particulièrement notre qualité constante, nos prix compétitifs et nos livraisons simplifiées.',
      nurseryLink: 'En savoir plus sur nous →',
      faqTitle: 'Questions fréquentes',
      faq: [
        { q: 'Puis-je importer du Trichocereus Pachanoi en France ?', a: "Oui. Le Trichocereus Pachanoi est une plante ornementale légale en France. Tous nos envois incluent le Passeport Phytosanitaire UE requis. Les échanges intracommunautaires au sein de l'UE ne nécessitent pas de formalités douanières supplémentaires." },
        { q: 'Quelle est la quantité minimum de commande ?', a: 'Notre minimum est de 750 plants par variété (un lot complet). Vous pouvez ensuite ajouter des incréments de 150 unités. Pour les commandes mixtes combinant différentes variétés de Trichocereus (Pachanoi, Peruvianus, Bridgesii), nous pouvons organiser des palettes sur mesure.' },
        { q: 'Délai de livraison vers la France ?', a: "La livraison standard est de 2 à 3 jours ouvrés depuis notre pépinière à Murcie jusqu'en France. Nous prévoyons 7 jours pour la préparation de la commande avant expédition." },
        { q: 'Proposez-vous des remises volume ?', a: 'Oui. Nous appliquons des tarifs dégressifs selon le volume commandé. Contactez-nous avec vos besoins et nous vous enverrons un devis personnalisé sous 24 h ouvrées.' },
        { q: 'Quelles tailles sont disponibles ?', a: 'Nous proposons le Trichocereus Pachanoi de 15 cm (jeunes plants) à 80 cm et plus (spécimens). La taille la plus demandée par les acheteurs français est 35–55 cm.' },
        { q: 'Résistance au gel sous le climat français ?', a: "Le Trichocereus Pachanoi supporte des gelées brèves jusqu'à -2°C. Dans le sud de la France (Méditerranée), il peut rester en extérieur avec une protection légère. Au nord, prévoir une protection hivernale ou une culture en serre froide." },
      ],
      otherTitle: 'Autres variétés de Trichocereus',
      otherSubtitle: 'Combinez plusieurs variétés dans un même envoi pour optimiser votre commande',
      otherVarietiesLabels: [
        { name: 'T. Peruvianus', common: 'Torche péruvienne' },
        { name: 'T. Bridgesii', common: 'Achuma' },
        { name: 'T. Terscheckii', common: 'Cardón géant' },
      ],
      ctaTitle: 'Prêt à Commander ?',
      ctaDescription: 'Obtenez un devis grossiste personnalisé pour du Trichocereus Pachanoi livré en France. Réponse sous 24 h ouvrées.',
      ctaButton: 'Demander votre Devis →',
      ctaEmailText: 'Ou écrivez-nous directement à',
      jsonLdDescription: 'Pépinière spécialisée Trichocereus à Murcie, Espagne. Grossiste B2B pour professionnels en France et en Europe.',
      jsonLdLanguages: ['French', 'English', 'Spanish'],
    },
    config: SHARED_CONFIG,
  },

  // ── DE ──
  {
    slug: 'trichocereus-pachanoi-kaufen-deutschland',
    source_slug: 'trichocereus-pachanoi-for-sale-uk',
    locale: 'de',
    meta_title: 'Trichocereus Pachanoi kaufen Deutschland — Großhandel B2B | Tricholand',
    meta_description: 'Trichocereus Pachanoi Großhandel kaufen Deutschland, B2B Gärtnerei Spanien, EU-Pflanzenpass, ab 750 Stück',
    meta_keywords: ['trichocereus pachanoi kaufen','san pedro kaktus kaufen deutschland','kaktus großhandel','trichocereus großhandel deutschland','san pedro kaktus großhandel','kaktus großhandel europa','trichocereus gärtnerei','B2B kaktus lieferant deutschland'],
    og_locale: 'de_DE',
    content: {
      heroBadge: 'B2B Großhandel · Lieferung Deutschland',
      heroTitle: 'Trichocereus Pachanoi',
      heroTitleHighlight: 'kaufen in Deutschland',
      heroDescription: 'San Pedro Kakteen von einer spezialisierten Gärtnerei, direkt aus Spanien nach Deutschland geliefert. EU-Pflanzenpass inklusive. Großhandelspreise ab 750 Stück.',
      ctaPrimary: 'Angebot Anfordern →',
      ctaSecondary: 'Alle Sorten',
      trustItems: ['EU-Pflanzenpass ✓','Direkt von der Gärtnerei ✓','Lieferung Deutschland ✓','Angebot in 24h ✓'],
      aboutTitle: 'Warum Trichocereus Pachanoi?',
      aboutP1: '<strong class="text-negro">Trichocereus Pachanoi</strong> (San Pedro) ist einer der bekanntesten und kommerziell erfolgreichsten Säulenkakteen auf dem europäischen Markt. Aus den Anden stammend, gedeiht er mit gut durchlässigem Substrat und sonnigem Standort auch im deutschen Klima — eine ideale Ergänzung für Gartencentersortimente, Landschaftsgestaltung und spezialisierte Einzelhandelskonzepte.',
      aboutP2: 'Seine markante blaugrüne Farbe, die elegante Säulenform und die schnelle Wachstumsrate (bis 30 cm pro Jahr) machen ihn bei Endverbrauchern äußerst beliebt. Er bildet spektakuläre weiße Nachtblüten mit bis zu 22 cm Durchmesser.',
      aboutHighlights: [
        'Schnelles Wachstum: bis 30 cm/Jahr unter optimalen Bedingungen',
        'Winterhart bis -2°C — geeignet für geschützte Standorte in Deutschland',
        'Spektakuläre 22 cm weiße Nachtblüten',
        'Minimaler Pflegeaufwand nach Etablierung',
        'Hervorragend als Veredelungsunterlage',
        'Hohe Nachfrage — bewährte Retail-Pflanze',
      ],
      sizesTitle: 'Verfügbare Größen',
      sizesSubtitle: 'Alle Größen in unserer Gärtnerei in Murcia, Spanien kultiviert — Direktlieferung nach Deutschland',
      sizes: [
        { range: '15–20 cm', label: 'Jungpflanzen', desc: 'Ideal für Weiterkultur, Veredelungsunterlage oder Einzelhandel' },
        { range: '25–35 cm', label: 'Jungpflanzen mit Wurzel', desc: 'Starkes Wurzelsystem, bereit für Gartencenter-Präsentation' },
        { range: '35–55 cm', label: 'Etablierte Pflanzen', desc: 'Unsere beliebteste Großhandelsgröße — wirkungsvoll und winterhart' },
        { range: '55–80 cm', label: 'Solitärpflanzen', desc: 'Hingucker für Landschaftsgestaltung und Premium-Einzelhandel' },
      ],
      sizesFooter: 'Individuelle Größen und Mischpaletten auf Anfrage.',
      sizesFooterLink: 'Kontaktieren Sie uns für Verfügbarkeit',
      benefitsTitle: 'Warum bei Tricholand kaufen?',
      benefitsSubtitle: 'Wir sind eine auf Trichocereus spezialisierte Produktionsgärtnerei in Murcia, Spanien — einer der führenden Kakteenanbauregionen Europas. Wir verkaufen ausschließlich B2B.',
      benefits: [
        { icon: '🌱', title: 'EU-Pflanzenpass inklusive', desc: 'Jede Lieferung enthält einen offiziellen EU-Pflanzenpass. Voll konform für den Import nach Deutschland gemäß geltender phytosanitärer Vorschriften.' },
        { icon: '🚛', title: 'Lieferung Deutschland', desc: 'Wir liefern palettierte Bestellungen direkt von unserer Gärtnerei in Murcia, Spanien nach ganz Deutschland. Transport mit Temperaturkontrolle möglich.' },
        { icon: '📦', title: 'Min 750 Stück', desc: 'Unsere Mindestbestellmenge beträgt 750 Pflanzen pro Sorte, danach in Schritten von 150 Stück. Ideal für Gartencenter, Gärtnereien, Landschaftsarchitekten und Fachhändler.' },
        { icon: '💰', title: 'Günstige Großhandelspreise', desc: 'Direkte Gärtnereipreise ohne Zwischenhändler. Mengenrabatte bei Bestellungen über 750 Stück. Individuelles Angebot innerhalb von 24 Stunden.' },
        { icon: '☀️', title: 'Freilandkultur Murcia', desc: 'Unsere Trichocereus werden im Freiland unter der spanischen Mittelmeersonne kultiviert — kräftigere und gesündere Pflanzen als Gewächshausalternativen.' },
        { icon: '🤝', title: 'Deutschsprachiger B2B-Support', desc: 'Persönlicher Ansprechpartner für deutsche Kunden. Wir sprechen Deutsch und kennen den deutschen Markt. Flexible Zahlungsbedingungen für Stammkunden.' },
      ],
      nurseryTitle: 'Unsere Gärtnerei in Murcia',
      nurseryP1: 'Tricholand ist eine familiengeführte Gärtnerei in der Region Murcia im Südosten Spaniens, spezialisiert ausschließlich auf Trichocereus und Säulenkakteen. Unsere Pflanzen werden im Freiland unter der Mittelmeersonne kultiviert — kräftigere, gesündere Exemplare mit überlegenen Wurzelsystemen im Vergleich zu Gewächshausware.',
      nurseryP2: 'Wir beliefern seit Jahren Gartencenter, Gärtnereien, Landschaftsarchitekten und Fachhändler in ganz Europa. Unsere deutschen Kunden schätzen besonders unsere verlässliche Qualität, wettbewerbsfähige Preise und unkomplizierte Importabwicklung.',
      nurseryLink: 'Mehr über uns erfahren →',
      faqTitle: 'Häufig gestellte Fragen',
      faq: [
        { q: 'Kann ich Trichocereus Pachanoi nach Deutschland importieren?', a: 'Ja. Trichocereus Pachanoi ist eine legale Zierpflanze in Deutschland. Alle unsere Lieferungen enthalten den erforderlichen EU-Pflanzenpass und phytosanitäre Dokumentation für reibungslose Zollabwicklung. Der Handel innerhalb der EU erfolgt ohne zusätzliche Einfuhrgenehmigungen.' },
        { q: 'Wie hoch ist die Mindestbestellmenge?', a: 'Unsere Mindestbestellmenge beträgt 750 Pflanzen pro Sorte (ein komplettes Los). Danach können Sie in Schritten von 150 Stück nachbestellen. Bei gemischten Bestellungen mit verschiedenen Trichocereus-Sorten (Pachanoi, Peruvianus, Bridgesii) können wir individuelle Paletten zusammenstellen.' },
        { q: 'Wie lange dauert die Lieferung nach Deutschland?', a: 'Die Standardlieferung beträgt 3–4 Werktage von unserer Gärtnerei in Murcia nach ganz Deutschland. Wir planen 7 Tage für die Auftragsvorbereitung vor dem Versand ein.' },
        { q: 'Bieten Sie Mengenrabatte?', a: 'Ja. Wir bieten gestaffelte Preise je nach Bestellmenge. Kontaktieren Sie uns mit Ihren Anforderungen und wir erstellen innerhalb von 24 Arbeitsstunden ein individuelles Angebot.' },
        { q: 'Welche Größen sind verfügbar?', a: 'Wir liefern Trichocereus Pachanoi in Größen von 15 cm Jungpflanzen bis 80 cm+ Solitärpflanzen. Die beliebteste Großhandelsgröße für deutsche Käufer ist 35–55 cm.' },
        { q: 'Sind die Pflanzen winterhart im deutschen Klima?', a: 'Trichocereus Pachanoi ist bis -2°C winterhart. Im deutschen Winter empfehlen wir jedoch einen Schutz (z. B. Überwinterung im Kalthaus oder Abdeckung bei Dauerfrost). Wir liefern professionelle Pflegeanleitungen mit jeder Bestellung, inklusive spezifischer Hinweise für das deutsche Klima.' },
      ],
      otherTitle: 'Weitere Trichocereus Sorten',
      otherSubtitle: 'Kombinieren Sie verschiedene Sorten in einer Lieferung',
      otherVarietiesLabels: [
        { name: 'T. Peruvianus', common: 'Peruanische Fackel' },
        { name: 'T. Bridgesii', common: 'Achuma' },
        { name: 'T. Terscheckii', common: 'Riesenkardón' },
      ],
      ctaTitle: 'Bereit zu bestellen?',
      ctaDescription: 'Erhalten Sie ein individuelles Großhandelsangebot für Trichocereus Pachanoi mit Lieferung nach Deutschland. Antwort innerhalb von 24 Arbeitsstunden.',
      ctaButton: 'Angebot Anfordern →',
      ctaEmailText: 'Oder schreiben Sie uns direkt an',
      jsonLdDescription: 'Spezialisierte Trichocereus-Produktionsgärtnerei in Murcia, Spanien. B2B-Großhandel für Fachbetriebe in Deutschland und Europa.',
      jsonLdLanguages: ['German', 'English', 'Spanish'],
    },
    config: SHARED_CONFIG,
  },

  // ── NL ──
  {
    slug: 'trichocereus-pachanoi-te-koop-nederland',
    source_slug: 'trichocereus-pachanoi-for-sale-uk',
    locale: 'nl',
    meta_title: 'Trichocereus Pachanoi te Koop Nederland — Groothandel B2B | Tricholand',
    meta_description: 'Trichocereus Pachanoi (San Pedro cactus) groothandel in Nederland. B2B-kwekerij in Spanje, levering heel Europa met EU Plantenpaspoort. Minimum order 750 stuks.',
    meta_keywords: ['trichocereus pachanoi te koop','san pedro cactus kopen nederland','cactus groothandel nederland','trichocereus groothandel','san pedro cactus groothandel','cactus groothandel europa','trichocereus kwekerij','B2B cactus leverancier nederland'],
    og_locale: 'nl_NL',
    content: {
      heroBadge: 'B2B Groothandel · Levering Nederland',
      heroTitle: 'Trichocereus Pachanoi',
      heroTitleHighlight: 'te Koop in Nederland',
      heroDescription: 'San Pedro cactussen van een gespecialiseerde kwekerij, direct vanuit Spanje naar Nederland geleverd. EU Plantenpaspoort inbegrepen. Groothandelprijzen vanaf 750 stuks.',
      ctaPrimary: 'Offerte Aanvragen →',
      ctaSecondary: 'Alle Variëteiten',
      trustItems: ['EU Plantenpaspoort ✓','Direct van Kwekerij ✓','Levering Nederland ✓','Offerte in 24u ✓'],
      aboutTitle: 'Waarom Trichocereus Pachanoi?',
      aboutP1: '<strong class="text-negro">Trichocereus Pachanoi</strong> (San Pedro) is een van de meest iconische en commercieel succesvolle zuilvormige cactussen op de Europese markt. Oorspronkelijk uit de Andes, gedijt hij met goed doorlatende grond en een zonnige standplaats ook in het Nederlandse klimaat — een uitstekende aanvulling voor tuincentra, hoveniersbedrijven en gespecialiseerde retailers.',
      aboutP2: 'Zijn opvallende blauwgroene kleur, elegante zuilvorm en snelle groei (tot 30 cm per jaar) maken het een bijzonder populaire keuze bij consumenten. De plant produceert spectaculaire witte nachtbloemen tot 22 cm doorsnede.',
      aboutHighlights: [
        'Snelle groei: tot 30 cm/jaar onder optimale omstandigheden',
        'Winterhard tot -2°C — geschikt voor beschutte standplaatsen in Nederland',
        'Spectaculaire 22 cm witte nachtbloemen',
        'Minimaal onderhoud na vestiging',
        'Uitstekend als onderstam voor enten',
        'Hoge vraag — bewezen verkoopsucces in retail',
      ],
      sizesTitle: 'Beschikbare Maten',
      sizesSubtitle: 'Alle maten gekweekt in onze kwekerij in Murcia, Spanje — directe levering naar Nederland',
      sizes: [
        { range: '15–20 cm', label: 'Jonge zaailingen', desc: 'Ideaal voor doorverkoop, onderstam of retail' },
        { range: '25–35 cm', label: 'Jonge planten', desc: 'Sterk wortelstelsel, klaar voor tuincentrum' },
        { range: '35–55 cm', label: 'Stabiele planten', desc: 'Onze populairste groothandelmaat — impactvol en winterhard' },
        { range: '55–80 cm', label: 'Specimen', desc: 'Blikvangers voor landschapsarchitectuur en premium retail' },
      ],
      sizesFooter: 'Op maat gemaakte maten en gemengde pallets op aanvraag.',
      sizesFooterLink: 'Neem contact op voor beschikbaarheid',
      benefitsTitle: 'Waarom kopen bij Tricholand?',
      benefitsSubtitle: 'Wij zijn een gespecialiseerde Trichocereus productiekwekerij in Murcia, Spanje — een van de toonaangevende cactuskweekgebieden van Europa. Wij verkopen uitsluitend B2B.',
      benefits: [
        { icon: '🌱', title: 'EU Plantenpaspoort inbegrepen', desc: 'Elke zending bevat een officieel EU Plantenpaspoort. Volledig conform voor import in Nederland onder de huidige fytosanitaire regelgeving.' },
        { icon: '🚛', title: 'Directe Levering Nederland', desc: 'We leveren palletzendingen direct van onze kwekerij in Murcia, Spanje naar heel Nederland. Transport met temperatuurcontrole mogelijk.' },
        { icon: '📦', title: 'Min 750 stuks', desc: 'Onze minimum order is 750 planten per variëteit, daarna in stappen van 150 stuks. Ideaal voor tuincentra, kwekerijen, hoveniers en gespecialiseerde retailers.' },
        { icon: '💰', title: 'Concurrerende Prijzen', desc: 'Directe kwekerijprijzen zonder tussenpersonen. Volumekortingen bij orders boven 750 stuks. Offerte op maat binnen 24 uur.' },
        { icon: '☀️', title: 'Gekweekt in Murcia', desc: 'Onze Trichocereus worden in de volle grond gekweekt onder de Spaanse mediterrane zon — sterkere en gezondere planten dan kasalternatieven.' },
        { icon: '🤝', title: 'Nederlandstalige B2B Support', desc: 'Persoonlijke accountmanager voor Nederlandse klanten. We spreken Nederlands en kennen de Nederlandse markt. Flexibele betalingsvoorwaarden voor vaste klanten.' },
      ],
      nurseryTitle: 'Onze kwekerij in Murcia',
      nurseryP1: 'Tricholand is een familiebedrijf in de regio Murcia in het zuidoosten van Spanje, gespecialiseerd uitsluitend in Trichocereus en zuilvormige cactussen. Onze planten worden in de volle grond gekweekt onder de mediterrane zon — sterkere, gezondere exemplaren met superieure wortelstelsels vergeleken met kasalternatieven.',
      nurseryP2: 'Wij leveren al jaren aan tuincentra, kwekerijen, hoveniers en gespecialiseerde retailers door heel Europa. Onze Nederlandse klanten waarderen vooral onze betrouwbare kwaliteit, concurrerende prijzen en probleemloze importprocedure.',
      nurseryLink: 'Meer over ons →',
      faqTitle: 'Veelgestelde vragen',
      faq: [
        { q: 'Mag ik Trichocereus Pachanoi importeren in Nederland?', a: 'Ja. Trichocereus Pachanoi is een legale sierplant in Nederland. Al onze zendingen bevatten het vereiste EU Plantenpaspoort en fytosanitaire documentatie voor soepele douane-afhandeling.' },
        { q: 'Wat is de minimum orderhoeveelheid?', a: 'Onze minimum order is 750 planten per variëteit (één volledig lot). Daarna kunt u bijbestellen in stappen van 150 stuks. Bij gemengde orders met verschillende Trichocereus-variëteiten (Pachanoi, Peruvianus, Bridgesii) kunnen we aangepaste pallets samenstellen.' },
        { q: 'Hoe lang duurt de levering naar Nederland?', a: 'Standaardlevering is 2–3 werkdagen van onze kwekerij in Murcia naar heel Nederland. We rekenen 7 dagen voor orderverwerking vóór verzending.' },
        { q: 'Bieden jullie volumekortingen?', a: 'Ja. We bieden gelaagde prijzen op basis van ordervolume. Neem contact met ons op met uw wensen en we sturen binnen 24 werkuren een offerte op maat.' },
        { q: 'Welke maten zijn beschikbaar?', a: 'We leveren Trichocereus Pachanoi in maten van 15 cm zaailingen tot 80 cm+ specimenplanten. De populairste groothandelmaat voor Nederlandse kopers is 35–55 cm.' },
        { q: 'Zijn de planten winterhard in het Nederlandse klimaat?', a: 'Ja. Trichocereus Pachanoi is verrassend winterhard en verdraagt korte vorst tot -2°C. We leveren professionele verzorgingsinstructies mee met elke order, inclusief advies voor het Nederlandse klimaat.' },
      ],
      otherTitle: 'Andere Trichocereus Variëteiten',
      otherSubtitle: 'Combineer variëteiten in één zending om uw order te optimaliseren',
      otherVarietiesLabels: [
        { name: 'T. Peruvianus', common: 'Peruaanse Fakkel' },
        { name: 'T. Bridgesii', common: 'Achuma' },
        { name: 'T. Terscheckii', common: 'Reuzenkardon' },
      ],
      ctaTitle: 'Klaar om te bestellen?',
      ctaDescription: 'Vraag een offerte aan voor Trichocereus Pachanoi groothandel met levering in Nederland. Antwoord binnen 24 werkuren.',
      ctaButton: 'Offerte Aanvragen →',
      ctaEmailText: 'Of mail ons direct op',
      jsonLdDescription: 'Gespecialiseerde Trichocereus productiekwekerij in Murcia, Spanje. B2B-groothandel voor professionals in Nederland en Europa.',
      jsonLdLanguages: ['Dutch', 'English', 'Spanish'],
    },
    config: SHARED_CONFIG,
  },

  // ── IT ──
  {
    slug: 'trichocereus-pachanoi-vendita-italia',
    source_slug: 'trichocereus-pachanoi-for-sale-uk',
    locale: 'it',
    meta_title: 'Trichocereus Pachanoi in Vendita Italia — Ingrosso B2B | Tricholand',
    meta_description: "Trichocereus Pachanoi all'ingrosso in Italia, vivaio B2B in Spagna, Passaporto Fitosanitario UE, minimo 750 unità. Consegna diretta in tutta Italia.",
    meta_keywords: ['trichocereus pachanoi vendita','san pedro cactus italia','cactus all ingrosso italia','comprare trichocereus pachanoi','trichocereus groothandel italia','cactus ingrosso europa','vivaio trichocereus','B2B cactus fornitore italia'],
    og_locale: 'it_IT',
    content: {
      heroBadge: 'Ingrosso B2B · Consegna Italia',
      heroTitle: 'Trichocereus Pachanoi',
      heroTitleHighlight: 'in Vendita in Italia',
      heroDescription: "Cactus San Pedro da vivaio specializzato, spediti direttamente dalla Spagna all'Italia. Passaporto Fitosanitario UE incluso. Prezzi all'ingrosso da 750 unità.",
      ctaPrimary: 'Richiedi Preventivo →',
      ctaSecondary: 'Tutte le Varietà',
      trustItems: ['Passaporto Fitosanitario UE ✓','Diretto dal Vivaio ✓','Consegna Italia ✓','Preventivo in 24h ✓'],
      aboutTitle: 'Perché il Trichocereus Pachanoi?',
      aboutP1: '<strong class="text-negro">Trichocereus Pachanoi</strong> (San Pedro) è uno dei cactus colonnari più iconici e commercialmente riusciti sul mercato europeo. Originario delle Ande, si adatta bene al clima italiano con terreno drenante ed esposizione soleggiata — una scelta perfetta per garden center, progettazione paesaggistica e collezioni retail specializzate.',
      aboutP2: "Il suo colore verde-blu distintivo, la forma colonnare elegante e la rapida crescita (fino a 30 cm all'anno) lo rendono molto popolare tra i consumatori. Produce spettacolari fiori bianchi notturni fino a 22 cm di diametro.",
      aboutHighlights: [
        "Crescita rapida: fino a 30 cm/anno in condizioni ottimali",
        'Rustico fino a -2°C — adatto a posizioni riparate in Italia',
        'Spettacolari fiori bianchi notturni di 22 cm',
        'Minima manutenzione una volta stabilito',
        'Eccellente come portinnesto',
        'Alta domanda — vendita retail comprovata',
      ],
      sizesTitle: 'Taglie disponibili',
      sizesSubtitle: "Tutte le taglie coltivate nel nostro vivaio a Murcia, Spagna — spedizione diretta verso l'Italia",
      sizes: [
        { range: '15–20 cm', label: 'Pianticelle', desc: 'Ideali per rivendita, portinnesto o retail' },
        { range: '25–35 cm', label: 'Piante giovani', desc: 'Apparato radicale robusto, pronte per garden center' },
        { range: '35–55 cm', label: 'Piante stabili', desc: 'La nostra taglia più richiesta — impatto e rusticità' },
        { range: '55–80 cm', label: 'Esemplari', desc: 'Punti focali per paesaggistica e retail premium' },
      ],
      sizesFooter: 'Taglie personalizzate e pallet misti su richiesta.',
      sizesFooterLink: 'Contattateci per la disponibilità',
      benefitsTitle: 'Perché acquistare da Tricholand?',
      benefitsSubtitle: "Siamo un vivaio specializzato in Trichocereus a Murcia, Spagna — una delle principali regioni di coltivazione di cactus in Europa. Vendiamo esclusivamente B2B.",
      benefits: [
        { icon: '🌱', title: 'Passaporto Fitosanitario UE', desc: "Ogni spedizione include il Passaporto Fitosanitario UE ufficiale. Conformità completa per l'importazione in Italia secondo la normativa fitosanitaria vigente." },
        { icon: '🚛', title: 'Spedizione Italia', desc: 'Consegniamo pallet direttamente dal nostro vivaio a Murcia, Spagna, in tutta Italia. Possibilità di trasporto con controllo temperatura.' },
        { icon: '📦', title: 'Min 750 unità', desc: "L'ordine minimo è di 750 piante per varietà, con incrementi successivi di 150 unità. Ideale per garden center, vivai, paesaggisti e rivenditori specializzati." },
        { icon: '💰', title: 'Prezzi Competitivi', desc: 'Prezzi da vivaio senza intermediari. Sconti volume per ordini oltre 750 unità. Preventivo personalizzato entro 24 ore.' },
        { icon: '☀️', title: 'Coltivato a Murcia', desc: 'I nostri Trichocereus sono coltivati in pieno campo sotto il sole mediterraneo spagnolo — piante più robuste e sane rispetto alle alternative in serra.' },
        { icon: '🤝', title: 'Assistenza B2B in Italiano', desc: 'Account manager dedicato per clienti italiani. Parliamo italiano e conosciamo il mercato. Condizioni di pagamento flessibili per clienti abituali.' },
      ],
      nurseryTitle: 'Il nostro vivaio a Murcia',
      nurseryP1: "Tricholand è un vivaio familiare nella regione di Murcia, nel sud-est della Spagna, specializzato esclusivamente in Trichocereus e cactus colonnari. Le nostre piante sono coltivate in pieno campo sotto il sole mediterraneo — esemplari più vigorosi e sani, con apparati radicali superiori rispetto alle coltivazioni in serra.",
      nurseryP2: "Forniamo da anni garden center, vivai, paesaggisti e rivenditori specializzati in tutta Europa. I nostri clienti italiani apprezzano in particolare la nostra qualità costante, i prezzi competitivi e la vicinanza geografica che garantisce consegne rapide.",
      nurseryLink: 'Scopri di più su di noi →',
      faqTitle: 'Domande frequenti',
      faq: [
        { q: 'Posso importare Trichocereus Pachanoi in Italia?', a: "Sì. Trichocereus Pachanoi è una pianta ornamentale legale in Italia. Tutte le nostre spedizioni includono il Passaporto Fitosanitario UE e la documentazione fitosanitaria richiesta per una dogana agevole. Essendo nell'UE, la libera circolazione delle merci si applica senza restrizioni aggiuntive." },
        { q: "Qual è l'ordine minimo?", a: "L'ordine minimo è di 750 piante per varietà (un lotto completo). Successivamente è possibile aggiungere incrementi di 150 unità. Per ordini misti con diverse varietà di Trichocereus (Pachanoi, Peruvianus, Bridgesii) possiamo preparare pallet personalizzati." },
        { q: 'Quanto tempo richiede la consegna in Italia?', a: 'La consegna standard è di 2–3 giorni lavorativi dal nostro vivaio a Murcia fino a tutta Italia. La Spagna è vicina: tempi rapidi e costi di trasporto contenuti.' },
        { q: 'Offrite sconti per volume?', a: "Sì. Proponiamo prezzi a scalare in base al volume d'ordine. Contattateci con le vostre esigenze e invieremo un preventivo personalizzato entro 24 ore lavorative." },
        { q: 'Quali taglie sono disponibili?', a: 'Forniamo Trichocereus Pachanoi in taglie da 15 cm (pianticelle) fino a 80 cm+ (esemplari). La taglia più richiesta per il mercato italiano è 35–55 cm.' },
        { q: 'Le piante resistono al clima italiano?', a: "Assolutamente sì. Il clima mediterraneo italiano è ideale per Trichocereus Pachanoi. La pianta prospera all'aperto tutto l'anno nella maggior parte delle regioni italiane — dalla Sicilia alla Lombardia, con le dovute precauzioni in zone con gelate intense." },
      ],
      otherTitle: 'Altre varietà di Trichocereus',
      otherSubtitle: 'Combinate più varietà in un unico invio per ottimizzare il vostro ordine',
      otherVarietiesLabels: [
        { name: 'T. Peruvianus', common: 'Torcia peruviana' },
        { name: 'T. Bridgesii', common: 'Achuma' },
        { name: 'T. Terscheckii', common: 'Cardón gigante' },
      ],
      ctaTitle: 'Pronti a Ordinare?',
      ctaDescription: "Richiedete un preventivo all'ingrosso personalizzato per Trichocereus Pachanoi con consegna in Italia. Risposta entro 24 ore lavorative.",
      ctaButton: 'Richiedi Preventivo →',
      ctaEmailText: 'Oppure scriveteci direttamente a',
      jsonLdDescription: "Vivaio specializzato in Trichocereus a Murcia, Spagna. Ingrosso B2B per professionisti in Italia e in Europa.",
      jsonLdLanguages: ['Italian', 'English', 'Spanish'],
    },
    config: SHARED_CONFIG,
  },

  // ── PT ──
  {
    slug: 'trichocereus-pachanoi-venda-portugal',
    source_slug: 'trichocereus-pachanoi-for-sale-uk',
    locale: 'pt',
    meta_title: 'Trichocereus Pachanoi à Venda Portugal — Grossista B2B | Tricholand',
    meta_description: 'Comprar Trichocereus Pachanoi por grosso em Portugal, viveiro B2B em Espanha, Passaporte Fitossanitário UE, mínimo 750 unidades',
    meta_keywords: ['trichocereus pachanoi à venda','san pedro cactus portugal','cactus grossista portugal','comprar trichocereus pachanoi','trichocereus pachanoi grossista','cactus san pedro por grosso','viveiro trichocereus','fornecedor cactus B2B portugal'],
    og_locale: 'pt_PT',
    content: {
      heroBadge: 'Grossista B2B · Entrega Portugal',
      heroTitle: 'Trichocereus Pachanoi',
      heroTitleHighlight: 'à Venda em Portugal',
      heroDescription: 'Cactus San Pedro de viveiro especializado, enviados diretamente de Espanha para Portugal. Passaporte Fitossanitário UE incluído. Preços de grossista a partir de 750 unidades.',
      ctaPrimary: 'Pedir Orçamento →',
      ctaSecondary: 'Todas as Variedades',
      trustItems: ['Passaporte Fitossanitário UE ✓','Direto do Viveiro ✓','Entrega Portugal ✓','Orçamento em 24h ✓'],
      aboutTitle: 'Porquê o Trichocereus Pachanoi?',
      aboutP1: '<strong class="text-negro">Trichocereus Pachanoi</strong> (San Pedro) é um dos cactus colunares mais emblemáticos e comercialmente bem-sucedidos do mercado europeu. Originário dos Andes, adapta-se muito bem ao clima português — o clima mediterrânico de Portugal é ideal para o seu cultivo. A proximidade com Espanha permite entregas rápidas e sem formalidades aduaneiras.',
      aboutP2: 'A sua cor verde-azulada marcante, forma colunar elegante e crescimento rápido (até 30 cm por ano) tornam-no muito popular junto dos consumidores. Produz espetaculares flores brancas noturnas até 22 cm de diâmetro.',
      aboutHighlights: [
        'Crescimento rápido: até 30 cm/ano em condições ideais',
        'Resistente até -2°C — adequado para posições protegidas em Portugal',
        'Espetaculares flores brancas noturnas de 22 cm',
        'Manutenção mínima após estabelecido',
        'Excelente como porta-enxerto',
        'Alta procura — vendas comprovadas em retalho',
      ],
      sizesTitle: 'Tamanhos disponíveis',
      sizesSubtitle: 'Todos os tamanhos cultivados no nosso viveiro em Múrcia, Espanha — entrega direta para Portugal',
      sizes: [
        { range: '15–20 cm', label: 'Plântulas', desc: 'Ideais para revenda, enxertia ou retalho' },
        { range: '25–35 cm', label: 'Plantas jovens', desc: 'Sistema radicular desenvolvido, prontas para centros de jardinagem' },
        { range: '35–55 cm', label: 'Plantas estabelecidas', desc: 'A nossa medida mais procurada — impacto visual e rusticidade' },
        { range: '55–80 cm', label: 'Exemplares', desc: 'Peças de destaque para paisagismo e retalho premium' },
      ],
      sizesFooter: 'Tamanhos personalizados e paletes mistas sob consulta.',
      sizesFooterLink: 'Contacte-nos para disponibilidade',
      benefitsTitle: 'Porquê comprar na Tricholand?',
      benefitsSubtitle: 'Somos um viveiro especializado em Trichocereus em Múrcia, Espanha — uma das principais regiões de cultivo de cactus na Europa. Vendemos exclusivamente B2B.',
      benefits: [
        { icon: '🌱', title: 'Passaporte Fitossanitário UE', desc: 'Cada envio inclui o Passaporte Fitossanitário UE oficial. Totalmente conforme para importação em Portugal (troca intracomunitária, sem formalidades aduaneiras adicionais).' },
        { icon: '🚛', title: 'Entrega Portugal', desc: 'Enviamos as suas encomendas paletizadas diretamente do nosso viveiro em Múrcia, Espanha, para todo o Portugal. Transporte com controlo de temperatura disponível.' },
        { icon: '📦', title: 'Mín. 750 unidades', desc: 'Encomenda mínima de 750 plantas por variedade, depois em incrementos de 150 unidades. Ideal para centros de jardinagem, viveiros, paisagistas e retalhistas especializados.' },
        { icon: '💰', title: 'Preços Competitivos', desc: 'Preços diretos do viveiro, sem intermediários. Descontos por volume para encomendas acima de 750 unidades. Orçamento personalizado em 24 horas.' },
        { icon: '☀️', title: 'Cultivado em Múrcia', desc: 'Os nossos Trichocereus são cultivados em campo aberto sob o sol mediterrânico espanhol — plantas mais vigorosas e saudáveis do que em estufa.' },
        { icon: '🤝', title: 'Apoio B2B em Português', desc: 'Interlocutor dedicado para clientes portugueses. Falamos português e conhecemos o mercado. Condições de pagamento flexíveis para clientes regulares.' },
      ],
      nurseryTitle: 'O nosso viveiro em Múrcia',
      nurseryP1: 'A Tricholand é um viveiro familiar na região de Múrcia, no sudeste de Espanha, especializado exclusivamente em Trichocereus e cactus colunares. As nossas plantas são cultivadas em campo aberto sob o sol mediterrânico — exemplares mais vigorosos e saudáveis, com sistemas radiculares superiores às alternativas de estufa.',
      nurseryP2: 'Fornecemos há anos centros de jardinagem, viveiros, paisagistas e retalhistas especializados em toda a Europa. Os nossos clientes portugueses valorizam especialmente a nossa qualidade constante, preços competitivos e a proximidade geográfica que garante entregas rápidas e sem complicações.',
      nurseryLink: 'Saiba mais sobre nós →',
      faqTitle: 'Perguntas frequentes',
      faq: [
        { q: 'Posso importar Trichocereus Pachanoi em Portugal?', a: 'Sim. O Trichocereus Pachanoi é uma planta ornamental legal em Portugal. Portugal é país membro da UE — não há formalidades aduaneiras nem controlos na fronteira com Espanha. Todas as nossas remessas incluem o Passaporte Fitossanitário UE exigido para troca intracomunitária.' },
        { q: 'Qual é a quantidade mínima de encomenda?', a: 'O nosso mínimo é de 750 plantas por variedade (um lote completo). Depois pode acrescentar incrementos de 150 unidades. Para encomendas mistas com diferentes variedades de Trichocereus (Pachanoi, Peruvianus, Bridgesii), podemos preparar paletes à medida.' },
        { q: 'Quanto tempo demora a entrega a Portugal?', a: 'A entrega standard é de 1 a 2 dias úteis do nosso viveiro em Múrcia até Portugal. A proximidade da fronteira Espanha-Portugal permite entregas rápidas. Prevemos 7 dias para preparação da encomenda antes da expedição.' },
        { q: 'Oferecem descontos por volume?', a: 'Sim. Aplicamos preços escalonados conforme o volume encomendado. Contacte-nos com as suas necessidades e enviaremos um orçamento personalizado em 24 horas úteis.' },
        { q: 'Que tamanhos estão disponíveis?', a: 'Fornecemos Trichocereus Pachanoi em tamanhos desde 15 cm (plântulas) até 80 cm e mais (exemplares). O tamanho mais procurado pelos compradores portugueses é 35–55 cm.' },
        { q: 'O clima português é adequado para Trichocereus Pachanoi?', a: 'Sim. O Trichocereus Pachanoi adapta-se perfeitamente ao clima mediterrânico português. Na maior parte do país pode permanecer ao ar livre todo o ano com proteção mínima. Tolera geadas breves até -2°C. No Algarve e na costa, prospera sem necessidade de abrigo no inverno.' },
      ],
      otherTitle: 'Outras variedades de Trichocereus',
      otherSubtitle: 'Combine variedades num único envio para otimizar a sua encomenda',
      otherVarietiesLabels: [
        { name: 'T. Peruvianus', common: 'Tocha peruana' },
        { name: 'T. Bridgesii', common: 'Achuma' },
        { name: 'T. Terscheckii', common: 'Cardón gigante' },
      ],
      ctaTitle: 'Pronto para Encomendar?',
      ctaDescription: 'Peça um orçamento grossista personalizado para Trichocereus Pachanoi com entrega em Portugal. Respondemos em 24 horas úteis.',
      ctaButton: 'Pedir Orçamento →',
      ctaEmailText: 'Ou envie-nos email diretamente para',
      jsonLdDescription: 'Viveiro especializado em Trichocereus em Múrcia, Espanha. Grossista B2B para profissionais em Portugal e na Europa.',
      jsonLdLanguages: ['Portuguese', 'English', 'Spanish'],
    },
    config: SHARED_CONFIG,
  },
]

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────

async function main() {
  console.log(`\n🌵 Seed Landings — ${DRY_RUN ? 'DRY RUN' : 'LIVE'}\n`)
  console.log(`Total landings to insert: ${LANDINGS.length}\n`)

  let inserted = 0
  let skipped = 0
  let errors = 0

  for (const landing of LANDINGS) {
    const label = `[${landing.locale}] ${landing.slug}`

    // Check if already exists
    const { data: existing } = await supabase
      .from('landing_pages')
      .select('id')
      .eq('slug', landing.slug)
      .eq('locale', landing.locale)
      .single()

    if (existing) {
      console.log(`  SKIP ${label} (already exists)`)
      skipped++
      continue
    }

    if (DRY_RUN) {
      console.log(`  WOULD INSERT ${label}`)
      inserted++
      continue
    }

    const { error } = await supabase.from('landing_pages').insert({
      slug: landing.slug,
      source_slug: landing.source_slug,
      locale: landing.locale,
      status: 'published',
      meta_title: landing.meta_title,
      meta_description: landing.meta_description,
      meta_keywords: landing.meta_keywords,
      og_locale: landing.og_locale,
      content: landing.content,
      config: landing.config,
    })

    if (error) {
      console.error(`  ERROR ${label}: ${error.message}`)
      errors++
    } else {
      console.log(`  OK ${label}`)
      inserted++
    }
  }

  console.log(`\nDone! Inserted: ${inserted}, Skipped: ${skipped}, Errors: ${errors}\n`)
}

main().catch(console.error)
