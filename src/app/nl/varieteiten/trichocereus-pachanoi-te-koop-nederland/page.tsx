import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getFullPath } from '@/lib/i18n/paths'

const LOCALE = 'nl'
const BASE_URL = 'https://www.tricholand.com'
const SLUG = 'trichocereus-pachanoi-te-koop-nederland'

export const metadata: Metadata = {
  title: 'Trichocereus Pachanoi te Koop Nederland — Groothandel B2B | Tricholand',
  description:
    'Trichocereus Pachanoi (San Pedro cactus) groothandel in Nederland. B2B-kwekerij in Spanje, levering heel Europa met EU Plantenpaspoort. Minimum order 750 stuks.',
  keywords: [
    'trichocereus pachanoi te koop',
    'san pedro cactus kopen nederland',
    'cactus groothandel nederland',
    'trichocereus groothandel',
    'san pedro cactus groothandel',
    'cactus groothandel europa',
    'trichocereus kwekerij',
    'B2B cactus leverancier nederland',
  ],
  alternates: {
    canonical: `${BASE_URL}/nl/varieteiten/${SLUG}`,
  },
  openGraph: {
    title: 'Trichocereus Pachanoi te Koop Nederland — Groothandel B2B | Tricholand',
    description:
      'Trichocereus Pachanoi groothandel van een gespecialiseerde kwekerij in Spanje. EU Plantenpaspoort inbegrepen. Levering naar Nederland en Europa.',
    images: ['/images/varieties/Trichocereus_Pachanoi_1.webp'],
    type: 'website',
    locale: 'nl_NL',
  },
}

const SIZES = [
  { range: '15–20 cm', label: 'Jonge zaailingen', desc: 'Ideaal voor doorverkoop, onderstam of retail' },
  { range: '25–35 cm', label: 'Jonge planten', desc: 'Sterk wortelstelsel, klaar voor tuincentrum' },
  { range: '35–55 cm', label: 'Stabiele planten', desc: 'Onze populairste groothandelmaat — impactvol en winterhard' },
  { range: '55–80 cm', label: 'Specimen', desc: 'Blikvangers voor landschapsarchitectuur en premium retail' },
]

const BENEFITS = [
  {
    icon: '🌱',
    title: 'EU Plantenpaspoort inbegrepen',
    desc: 'Elke zending bevat een officieel EU Plantenpaspoort. Volledig conform voor import in Nederland onder de huidige fytosanitaire regelgeving.',
  },
  {
    icon: '🚛',
    title: 'Directe Levering Nederland',
    desc: 'We leveren palletzendingen direct van onze kwekerij in Murcia, Spanje naar heel Nederland. Transport met temperatuurcontrole mogelijk.',
  },
  {
    icon: '📦',
    title: 'Min 750 stuks',
    desc: 'Onze minimum order is 750 planten per variëteit, daarna in stappen van 150 stuks. Ideaal voor tuincentra, kwekerijen, hoveniers en gespecialiseerde retailers.',
  },
  {
    icon: '💰',
    title: 'Concurrerende Prijzen',
    desc: 'Directe kwekerijprijzen zonder tussenpersonen. Volumekortingen bij orders boven 750 stuks. Offerte op maat binnen 24 uur.',
  },
  {
    icon: '☀️',
    title: 'Gekweekt in Murcia',
    desc: 'Onze Trichocereus worden in de volle grond gekweekt onder de Spaanse mediterrane zon — sterkere en gezondere planten dan kasalternatieven.',
  },
  {
    icon: '🤝',
    title: 'Nederlandstalige B2B Support',
    desc: 'Persoonlijke accountmanager voor Nederlandse klanten. We spreken Nederlands en kennen de Nederlandse markt. Flexibele betalingsvoorwaarden voor vaste klanten.',
  },
]

const FAQ = [
  {
    q: 'Mag ik Trichocereus Pachanoi importeren in Nederland?',
    a: 'Ja. Trichocereus Pachanoi is een legale sierplant in Nederland. Al onze zendingen bevatten het vereiste EU Plantenpaspoort en fytosanitaire documentatie voor soepele douane-afhandeling.',
  },
  {
    q: 'Wat is de minimum orderhoeveelheid?',
    a: 'Onze minimum order is 750 planten per variëteit (één volledig lot). Daarna kunt u bijbestellen in stappen van 150 stuks. Bij gemengde orders met verschillende Trichocereus-variëteiten (Pachanoi, Peruvianus, Bridgesii) kunnen we aangepaste pallets samenstellen.',
  },
  {
    q: 'Hoe lang duurt de levering naar Nederland?',
    a: 'Standaardlevering is 2–3 werkdagen van onze kwekerij in Murcia naar heel Nederland. We rekenen 7 dagen voor orderverwerking vóór verzending.',
  },
  {
    q: 'Bieden jullie volumekortingen?',
    a: 'Ja. We bieden gelaagde prijzen op basis van ordervolume. Neem contact met ons op met uw wensen en we sturen binnen 24 werkuren een offerte op maat.',
  },
  {
    q: 'Welke maten zijn beschikbaar?',
    a: 'We leveren Trichocereus Pachanoi in maten van 15 cm zaailingen tot 80 cm+ specimenplanten. De populairste groothandelmaat voor Nederlandse kopers is 35–55 cm.',
  },
  {
    q: 'Zijn de planten winterhard in het Nederlandse klimaat?',
    a: 'Ja. Trichocereus Pachanoi is verrassend winterhard en verdraagt korte vorst tot -2°C. We leveren professionele verzorgingsinstructies mee met elke order, inclusief advies voor het Nederlandse klimaat.',
  },
]

export default function PachanoiTeKoopNederland() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end">
        <Image
          src="/images/varieties/Trichocereus_Pachanoi_1.webp"
          alt="Trichocereus Pachanoi — San Pedro cactus groothandel voor Nederlandse kopers"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-negro/80 via-negro/30 to-transparent" />
        <div className="relative z-10 w-full px-5 lg:px-8 pb-12 lg:pb-16 max-w-5xl mx-auto">
          <span className="inline-block bg-naranja text-blanco px-3 py-1.5 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold tracking-widest uppercase mb-4">
            B2B Groothandel · Levering Nederland
          </span>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-4xl lg:text-6xl font-bold text-blanco uppercase leading-[1.05]">
            Trichocereus Pachanoi
            <br />
            <span className="text-naranja">te Koop in Nederland</span>
          </h1>
          <p className="text-lg lg:text-xl text-blanco/85 mt-4 max-w-2xl">
            San Pedro-cactussen van een gespecialiseerde kwekerij, direct geleverd vanuit Spanje naar Nederland.
            EU Plantenpaspoort inbegrepen. Groothandelsprijzen vanaf 750 stuks.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href={getFullPath(LOCALE, 'contact')}
              className="bg-naranja text-blanco px-7 py-3.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
            >
              Offerte Aanvragen →
            </Link>
            <Link
              href={getFullPath(LOCALE, 'varieties')}
              className="bg-blanco/10 backdrop-blur text-blanco border border-blanco/30 px-7 py-3.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-blanco/20 transition-colors"
            >
              Alle Variëteiten
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-negro text-crudo">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 py-5 flex flex-wrap justify-center gap-x-10 gap-y-2 text-sm font-[family-name:var(--font-archivo-narrow)] uppercase tracking-wide">
          <span>EU Plantenpaspoort ✓</span>
          <span>Direct van Kwekerij ✓</span>
          <span>Levering Nederland ✓</span>
          <span>Offerte in 24u ✓</span>
        </div>
      </section>

      {/* About this variety */}
      <section className="px-5 lg:px-8 py-16 lg:py-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-6 pb-3 border-b-2 border-negro">
              Waarom Trichocereus Pachanoi?
            </h2>
            <p className="text-marron-claro leading-relaxed mb-4">
              <strong className="text-negro">Trichocereus Pachanoi</strong> (San Pedro) is een van de meest iconische en commercieel
              succesvolle zuilcactussen op de Europese markt. Oorspronkelijk uit de Andes gedijt hij goed in het Nederlandse klimaat
              met goed doorlatende grond en een zonnige standplaats — ideaal voor tuincentra, landschapsprojecten en gespecialiseerde retail.
            </p>
            <p className="text-marron-claro leading-relaxed mb-4">
              De opvallende blauwgroene kleur, elegante zuilvorm en snelle groei (tot 30 cm per jaar)
              maken hem zeer populair bij eindconsumenten. Hij produceert spectaculaire nachtelijke witte
              bloemen tot 22 cm doorsnede.
            </p>
            <ul className="space-y-2 mt-6">
              {[
                'Snelle groei: tot 30 cm/jaar onder optimale omstandigheden',
                'Winterhard tot -2°C — geschikt voor beschutte standplaatsen in Nederland',
                'Spectaculaire 22 cm witte nachtbloemen',
                'Minimaal onderhoud eenmaal gevestigd',
                'Uitstekend als onderstam voor enten',
                'Hoge consumentenvraag — bewezen retailverkoop',
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
              alt="Trichocereus Pachanoi klaar voor groothandellevering"
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
            Beschikbare maten
          </h2>
          <p className="text-marron-claro text-center mb-10">
            Alle maten gekweekt op onze kwekerij in Murcia, Spanje — direct geleverd naar Nederland
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
            Aangepaste maten en gemengde pallets op aanvraag.{' '}
            <Link href={getFullPath(LOCALE, 'contact')} className="text-naranja font-semibold hover:underline">
              Neem contact op voor beschikbaarheid
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
              alt={`Trichocereus Pachanoi kwekerijfoto ${i + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ))}
      </section>

      {/* Why Tricholand */}
      <section className="px-5 lg:px-8 py-16 lg:py-20 max-w-5xl mx-auto">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-2 text-center">
          Waarom Tricholand?
        </h2>
        <p className="text-marron-claro text-center mb-12 max-w-2xl mx-auto">
          Wij zijn een gespecialiseerde Trichocereus-kwekerij in Murcia, Spanje —
          een van de belangrijkste cactusregio&apos;s van Europa. We verkopen uitsluitend B2B.
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
              alt="Tricholand kwekerijteam — Trichocereus-producenten in Murcia, Spanje"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-6">
              Onze kwekerij in Murcia
            </h2>
            <p className="text-crudo/80 leading-relaxed mb-4">
              Tricholand is een familiebedrijf in de regio Murcia in Zuidoost-Spanje, gespecialiseerd
              uitsluitend in Trichocereus en zuilcactussen. Onze planten worden in de volle grond gekweekt
              onder de mediterrane zon — sterkere en gezondere exemplaren met superieure wortelstelsels
              vergeleken met kasalternatieven.
            </p>
            <p className="text-crudo/80 leading-relaxed mb-6">
              Wij leveren al jaren aan tuincentra, kwekerijen, hoveniers en gespecialiseerde retailers
              in heel Europa. Onze Nederlandse klanten waarderen vooral onze betrouwbare kwaliteit,
              concurrerende prijzen en soepele importprocedure.
            </p>
            <Link
              href={getFullPath(LOCALE, 'about')}
              className="inline-flex font-[family-name:var(--font-archivo-narrow)] text-naranja font-bold uppercase text-sm tracking-wide hover:underline"
            >
              Meer over ons →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 lg:px-8 py-16 lg:py-20 max-w-3xl mx-auto">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-10 text-center">
          Veelgestelde vragen
        </h2>
        <div className="space-y-6">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group border border-linea bg-blanco"
            >
              <summary className="cursor-pointer px-6 py-4 font-[family-name:var(--font-archivo-narrow)] font-bold uppercase text-sm tracking-wide flex items-center justify-between hover:text-naranja transition-colors">
                {item.q}
                <span className="text-naranja ml-4 transition-transform group-open:rotate-45 text-lg">+</span>
              </summary>
              <div className="px-6 pb-5 text-sm text-marron-claro leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Other varieties */}
      <section className="bg-crudo px-5 lg:px-8 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-2 text-center">
            Andere Trichocereus-variëteiten
          </h2>
          <p className="text-marron-claro text-center mb-10">
            Combineer variëteiten in één zending om uw order te optimaliseren
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { slug: 'trichocereus-peruvianus', name: 'T. Peruvianus', common: 'Peruaanse Fakkel', img: '/images/varieties/Trichocereus_peruvianus_1.webp' },
              { slug: 'trichocereus-bridgesii', name: 'T. Bridgesii', common: 'Achuma', img: '/images/varieties/Trichocereus_Bridgessi_1.webp' },
              { slug: 'trichocereus-pasacana-terscheckii', name: 'T. Terscheckii', common: 'Reuzen Cardón', img: '/images/varieties/Trichocereus_terscheckii_1.webp' },
            ].map((v) => (
              <Link
                key={v.slug}
                href={`/nl/varieteiten/${v.slug}`}
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
            Klaar om te bestellen?
          </h2>
          <p className="text-crudo/75 mb-8">
            Ontvang een offerte op maat voor Trichocereus Pachanoi geleverd in Nederland.
            We reageren binnen 24 werkuren.
          </p>
          <Link
            href={getFullPath(LOCALE, 'contact')}
            className="inline-flex bg-naranja text-blanco px-8 py-4 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Offerte Aanvragen →
          </Link>
          <p className="text-xs text-crudo/50 mt-6">
            Of mail ons direct op{' '}
            <a href="mailto:info@tricholand.com" className="text-naranja hover:underline">info@tricholand.com</a>
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
              description: 'Gespecialiseerde Trichocereus-kwekerij in Murcia, Spanje. B2B groothandel voor professionals in heel Europa en Nederland.',
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
                availableLanguage: ['Dutch', 'English', 'Spanish'],
              },
              areaServed: [
                { '@type': 'Country', name: 'Netherlands' },
                { '@type': 'Country', name: 'Spain' },
                { '@type': 'Country', name: 'United Kingdom' },
                { '@type': 'Country', name: 'France' },
                { '@type': 'Country', name: 'Germany' },
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
