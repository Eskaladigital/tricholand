import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getFullPath } from '@/lib/i18n/paths'

const LOCALE = 'es'
const BASE_URL = 'https://www.tricholand.com'
const SLUG = 'trichocereus-pachanoi-venta-espana'

export const metadata: Metadata = {
  title: 'Trichocereus Pachanoi en Venta España — Mayorista B2B | Tricholand',
  description:
    'Comprar Trichocereus Pachanoi al por mayor en España, vivero productor B2B en Murcia, Pasaporte Fitosanitario UE, mínimo 200 unidades',
  keywords: [
    'trichocereus pachanoi en venta',
    'san pedro cactus comprar españa',
    'cactus al por mayor españa',
    'trichocereus mayorista',
    'comprar cactus al por mayor',
    'vivero trichocereus españa',
    'trichocereus pachanoi mayorista',
    'cactus san pedro mayorista españa',
  ],
  alternates: {
    canonical: `${BASE_URL}/es/variedades/${SLUG}`,
  },
  openGraph: {
    title: 'Trichocereus Pachanoi en Venta España — Mayorista B2B | Tricholand',
    description:
      'Trichocereus Pachanoi al por mayor desde nuestro vivero en Murcia. Pasaporte Fitosanitario UE incluido. Envío nacional en 24-48h. Mínimo 200 unidades.',
    images: ['/images/varieties/Trichocereus_Pachanoi_1.webp'],
    type: 'website',
    locale: 'es_ES',
  },
}

const SIZES = [
  { range: '15–20 cm', label: 'Plántulas', desc: 'Ideal para continuar cultivo, como portainjertos o para venta al detalle' },
  { range: '25–35 cm', label: 'Plantas jóvenes', desc: 'Sistema radicular fuerte, listas para presentación en garden center' },
  { range: '35–55 cm', label: 'Plantas establecidas', desc: 'Nuestra talla más demandada en mayorista — impacto visual y resistentes' },
  { range: '55–80 cm', label: 'Ejemplares', desc: 'Piezas destacadas para paisajismo y retail premium' },
]

const BENEFITS = [
  {
    icon: '🌱',
    title: 'Pasaporte Fitosanitario UE',
    desc: 'Todas las entregas incluyen el Pasaporte Fitosanitario oficial de la UE. Totalmente conforme para la venta en España y el resto de Europa.',
  },
  {
    icon: '🚛',
    title: 'Envío Nacional España',
    desc: 'Somos productores en España. Envío directo desde Murcia a toda la península en 24-48h. Sin aduanas, sin logística internacional, los mejores plazos y precios.',
  },
  {
    icon: '📦',
    title: 'Mínimo 200 unidades',
    desc: 'Pedido mínimo de 200 plantas por variedad — ideal para garden centers, viveros, paisajistas y distribuidores profesionales.',
  },
  {
    icon: '💰',
    title: 'Precios de Productor',
    desc: 'Precios directos de vivero, sin intermediarios. Descuentos por volumen en pedidos superiores a 750 unidades. Presupuesto personalizado en 24 horas.',
  },
  {
    icon: '☀️',
    title: 'Cultivado en Murcia',
    desc: 'Nuestros Trichocereus se cultivan al aire libre bajo el sol mediterráneo — plantas más robustas y sanas que las alternativas de invernadero.',
  },
  {
    icon: '🤝',
    title: 'Atención B2B Personalizada',
    desc: 'Atención directa en español. Conocemos el mercado nacional. Condiciones de pago flexibles para clientes habituales. Ser productores en España significa el mejor servicio.',
  },
]

const FAQ = [
  {
    q: '¿Qué tipo de cliente puede comprar Trichocereus Pachanoi al por mayor?',
    a: 'Vendemos exclusivamente a profesionales B2B: viveros, garden centers, paisajistas, distribuidores y empresas con CIF/NIF. No realizamos ventas al público final en esta modalidad.',
  },
  {
    q: '¿Cuál es el pedido mínimo?',
    a: 'El pedido mínimo es de 200 plantas por variedad. En pedidos mixtos con varias variedades (Pachanoi, Peruvianus, Bridgesii) podemos preparar paletas combinadas según sus necesidades.',
  },
  {
    q: '¿Cuánto tarda el envío dentro de España?',
    a: 'Al estar nuestro vivero en Murcia, el envío a la península suele ser de 24-48 horas laborables. Para Canarias y Baleares los plazos pueden variar. Planificamos unos 7 días para la preparación del pedido antes del envío.',
  },
  {
    q: '¿Ofrecen descuentos por volumen?',
    a: 'Sí. Aplicamos precios escalonados según la cantidad. Contáctenos con sus necesidades y le enviaremos un presupuesto personalizado en un máximo de 24 horas laborables.',
  },
  {
    q: '¿Qué tallas tienen disponibles?',
    a: 'Suministramos Trichocereus Pachanoi desde plántulas de 15 cm hasta ejemplares de más de 80 cm. La talla más demandada por mayoristas en España es la de 35–55 cm.',
  },
  {
    q: '¿Puedo visitar el vivero?',
    a: 'Sí. Estamos en Murcia y recibimos visitas de profesionales previa cita. Contáctenos para coordinar una visita y conocer nuestras instalaciones y cultivos.',
  },
]

export default function PachanoiVentaEspana() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end">
        <Image
          src="/images/varieties/Trichocereus_Pachanoi_1.webp"
          alt="Trichocereus Pachanoi — San Pedro cactus mayorista para compradores en España"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-negro/80 via-negro/30 to-transparent" />
        <div className="relative z-10 w-full px-5 lg:px-8 pb-12 lg:pb-16 max-w-5xl mx-auto">
          <span className="inline-block bg-naranja text-blanco px-3 py-1.5 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold tracking-widest uppercase mb-4">
            Mayorista B2B · Envío en España
          </span>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-4xl lg:text-6xl font-bold text-blanco uppercase leading-[1.05]">
            Trichocereus Pachanoi
            <br />
            <span className="text-naranja">en venta en España</span>
          </h1>
          <p className="text-lg lg:text-xl text-blanco/85 mt-4 max-w-2xl">
            San Pedro desde un vivero productor en Murcia. Envío nacional en 24-48h. Pasaporte Fitosanitario UE incluido.
            Precios de mayorista a partir de 200 unidades.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href={getFullPath(LOCALE, 'contact')}
              className="bg-naranja text-blanco px-7 py-3.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
            >
              Solicitar Presupuesto →
            </Link>
            <Link
              href={getFullPath(LOCALE, 'varieties')}
              className="bg-blanco/10 backdrop-blur text-blanco border border-blanco/30 px-7 py-3.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-blanco/20 transition-colors"
            >
              Todas las Variedades
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-negro text-crudo">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 py-5 flex flex-wrap justify-center gap-x-10 gap-y-2 text-sm font-[family-name:var(--font-archivo-narrow)] uppercase tracking-wide">
          <span>Pasaporte Fitosanitario UE ✓</span>
          <span>Directo del Vivero ✓</span>
          <span>Envío Nacional ✓</span>
          <span>Presupuesto en 24h ✓</span>
        </div>
      </section>

      {/* About this variety */}
      <section className="px-5 lg:px-8 py-16 lg:py-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-6 pb-3 border-b-2 border-negro">
              ¿Por qué Trichocereus Pachanoi?
            </h2>
            <p className="text-marron-claro leading-relaxed mb-4">
              <strong className="text-negro">Trichocereus Pachanoi</strong> (San Pedro) es uno de los cactus columnares más
              icónicos y comercialmente exitosos del mercado europeo. Originario de los Andes, se adapta perfectamente al
              clima español — el clima mediterráneo de España es ideal para su cultivo. Nuestro vivero está en Murcia:
              somos productores nacionales, lo que significa envíos más rápidos, sin aduanas y sin complicaciones
              logísticas internacionales.
            </p>
            <p className="text-marron-claro leading-relaxed mb-4">
              Su color verde azulado, forma columnar elegante y crecimiento rápido (hasta 30 cm al año) lo hacen muy
              demandado por el consumidor final. Produce espectaculares flores blancas nocturnas de hasta 22 cm de
              diámetro. Para el mercado español, comprar a un productor nacional supone los mejores precios y la entrega
              más rápida posible.
            </p>
            <ul className="space-y-2 mt-6">
              {[
                'Crecimiento rápido: hasta 30 cm/año en condiciones óptimas',
                'Resistente hasta -2°C — adecuado para zonas protegidas en España',
                'Flores nocturnas blancas espectaculares de 22 cm',
                'Mínimo mantenimiento una vez establecido',
                'Excelente como portainjerto',
                'Alta demanda — venta probada en retail',
              ].map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="text-naranja font-bold mt-0.5">→</span>
                  <span className="text-marron-claro text-sm">{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] bg-crudo">
            <Image
              src="/images/products/producto_trichocereus_pachanoi_1.webp"
              alt="Trichocereus Pachanoi listo para envío mayorista"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Available sizes */}
      <section className="bg-crudo px-5 lg:px-8 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-2 text-center">
            Tallas disponibles
          </h2>
          <p className="text-marron-claro text-center mb-10">
            Todas las tallas cultivadas en nuestro vivero en Murcia — envío directo en España
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SIZES.map((s) => (
              <div key={s.range} className="bg-blanco border border-linea p-6 text-center hover:-translate-y-1 hover:shadow-lg transition-all">
                <p className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold text-naranja mb-1">
                  {s.range}
                </p>
                <p className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide mb-3">
                  {s.label}
                </p>
                <p className="text-xs text-marron-claro leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-sm text-marron-claro">
            Tallas personalizadas y paletas mixtas bajo consulta.{' '}
            <Link href={getFullPath(LOCALE, 'contact')} className="text-naranja font-semibold hover:underline">
              Contáctenos para disponibilidad
            </Link>
          </p>
        </div>
      </section>

      {/* Photo gallery strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-0">
        {[
          '/images/varieties/Trichocereus_Pachanoi_2.webp',
          '/images/products/producto_trichocereus_pachanoi_bio_1_v2.webp',
          '/images/vivero/vivero_mayorista_cactus.webp',
          '/images/products/producto_trichocereus_pachanoi_2.webp',
        ].map((src, i) => (
          <div key={i} className="relative aspect-square">
            <Image
              src={src}
              alt={`Trichocereus Pachanoi — foto vivero ${i + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ))}
      </section>

      {/* Benefits */}
      <section className="px-5 lg:px-8 py-16 lg:py-20 max-w-5xl mx-auto">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-2 text-center">
          ¿Por qué Tricholand?
        </h2>
        <p className="text-marron-claro text-center mb-12 max-w-2xl mx-auto">
          Somos un vivero especializado en Trichocereus en Murcia, España — una de las principales regiones productoras
          de cactus de Europa. Vendemos exclusivamente B2B. Ser productores en España significa los mejores precios y la
          entrega más rápida para el mercado nacional.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((b) => (
            <div key={b.title} className="bg-crudo border border-linea p-6">
              <span className="text-2xl mb-3 block">{b.icon}</span>
              <h3 className="font-[family-name:var(--font-archivo-narrow)] font-bold uppercase text-sm tracking-wide mb-2">
                {b.title}
              </h3>
              <p className="text-xs text-marron-claro leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Nursery section */}
      <section className="bg-negro text-crudo px-5 lg:px-8 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3]">
            <Image
              src="/images/vivero/productores_cactus_1.webp"
              alt="Tricholand — vivero productor de Trichocereus en Murcia, España"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-6">
              Nuestro vivero en Murcia
            </h2>
            <p className="text-crudo/80 leading-relaxed mb-4">
              Tricholand es un vivero familiar en la región de Murcia, en el sureste de España, especializado
              exclusivamente en Trichocereus y cactus columnares. Nuestras plantas se cultivan al aire libre bajo el sol
              mediterráneo — ejemplares más robustos y sanos, con sistemas radiculares superiores a las alternativas de
              invernadero.
            </p>
            <p className="text-crudo/80 leading-relaxed mb-6">
              Suministramos desde hace años a garden centers, viveros, paisajistas y distribuidores en toda España y
              Europa. Nuestros clientes españoles valoran especialmente nuestra calidad constante, precios competitivos
              y la ventaja de comprar a un productor nacional: envíos rápidos y sin trámites aduaneros.
            </p>
            <Link
              href={getFullPath(LOCALE, 'about')}
              className="inline-flex font-[family-name:var(--font-archivo-narrow)] text-naranja font-bold uppercase text-sm tracking-wide hover:underline"
            >
              Más sobre nosotros →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 lg:px-8 py-16 lg:py-20 max-w-3xl mx-auto">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-10 text-center">
          Preguntas frecuentes
        </h2>
        <div className="space-y-6">
          {FAQ.map((item) => (
            <details key={item.q} className="group border border-linea bg-blanco">
              <summary className="cursor-pointer px-6 py-4 font-[family-name:var(--font-archivo-narrow)] font-bold uppercase text-sm tracking-wide flex items-center justify-between hover:text-naranja transition-colors">
                {item.q}
                <span className="text-naranja ml-4 transition-transform group-open:rotate-45 text-lg">+</span>
              </summary>
              <div className="px-6 pb-5 text-sm text-marron-claro leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Other varieties */}
      <section className="bg-crudo px-5 lg:px-8 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-2 text-center">
            Otras variedades de Trichocereus
          </h2>
          <p className="text-marron-claro text-center mb-10">
            Combine variedades en un mismo pedido para optimizar su compra
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { slug: 'trichocereus-peruvianus', name: 'T. Peruvianus', common: 'Antorcha peruana', img: '/images/varieties/Trichocereus_peruvianus_1.webp' },
              { slug: 'trichocereus-bridgesii', name: 'T. Bridgesii', common: 'Achuma', img: '/images/varieties/Trichocereus_Bridgessi_1.webp' },
              { slug: 'trichocereus-pasacana-terscheckii', name: 'T. Terscheckii', common: 'Cardón gigante', img: '/images/varieties/Trichocereus_terscheckii_1.webp' },
            ].map((v) => (
              <Link
                key={v.slug}
                href={getFullPath(LOCALE, 'varieties', v.slug)}
                className="group bg-blanco border border-linea overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[3/2]">
                  <Image src={v.img} alt={v.name} fill className="object-cover group-hover:scale-[1.04] transition-transform" unoptimized />
                </div>
                <div className="p-4">
                  <h3 className="font-[family-name:var(--font-archivo-narrow)] font-bold group-hover:text-naranja transition-colors">{v.name}</h3>
                  <p className="text-xs text-marron-claro">{v.common}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-negro text-crudo px-5 lg:px-8 py-16 lg:py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-3xl lg:text-4xl font-bold uppercase mb-4">
            ¿Listo para Pedir?
          </h2>
          <p className="text-crudo/75 mb-8">
            Solicite un presupuesto mayorista personalizado para Trichocereus Pachanoi en España. Le respondemos en un
            máximo de 24 horas laborables.
          </p>
          <Link
            href={getFullPath(LOCALE, 'contact')}
            className="inline-flex bg-naranja text-blanco px-8 py-4 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Solicitar Presupuesto →
          </Link>
          <p className="text-xs text-crudo/50 mt-6">
            O escríbanos directamente a{' '}
            <a href="mailto:info@tricholand.com" className="text-naranja hover:underline">
              info@tricholand.com
            </a>
          </p>
        </div>
      </section>

      {/* JSON-LD: Organization + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Tricholand',
              url: BASE_URL,
              logo: `${BASE_URL}/images/icons/logo_tricho_yellow_200_200.webp`,
              description:
                'Vivero especializado en Trichocereus en Murcia, España. Mayorista B2B para profesionales en España y Europa.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Murcia',
                addressRegion: 'Murcia',
                addressCountry: 'ES',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'info@tricholand.com',
                contactType: 'sales',
                availableLanguage: ['Spanish', 'English'],
              },
              areaServed: [
                { '@type': 'Country', name: 'Spain' },
                { '@type': 'Country', name: 'Germany' },
                { '@type': 'Country', name: 'United Kingdom' },
                { '@type': 'Country', name: 'France' },
                { '@type': 'Country', name: 'Netherlands' },
                { '@type': 'Country', name: 'Italy' },
                { '@type': 'Country', name: 'Portugal' },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: FAQ.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            },
          ]),
        }}
      />
    </>
  )
}
