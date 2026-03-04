import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getFullPath } from '@/lib/i18n/paths'

const LOCALE = 'de'
const BASE_URL = 'https://www.tricholand.com'
const SLUG = 'trichocereus-pachanoi-kaufen-deutschland'

export const metadata: Metadata = {
  title: 'Trichocereus Pachanoi kaufen Deutschland — Großhandel B2B | Tricholand',
  description:
    'Trichocereus Pachanoi Großhandel kaufen Deutschland, B2B Gärtnerei Spanien, EU-Pflanzenpass, ab 200 Stück',
  keywords: [
    'trichocereus pachanoi kaufen',
    'san pedro kaktus kaufen deutschland',
    'kaktus großhandel',
    'trichocereus großhandel deutschland',
    'san pedro kaktus großhandel',
    'kaktus großhandel europa',
    'trichocereus gärtnerei',
    'B2B kaktus lieferant deutschland',
  ],
  alternates: {
    canonical: `${BASE_URL}/de/sorten/${SLUG}`,
  },
  openGraph: {
    title: 'Trichocereus Pachanoi kaufen Deutschland — Großhandel B2B | Tricholand',
    description:
      'Trichocereus Pachanoi Großhandel von einer spezialisierten Gärtnerei in Spanien. EU-Pflanzenpass inklusive. Lieferung nach Deutschland und Europa.',
    images: ['/images/varieties/Trichocereus_Pachanoi_1.webp'],
    type: 'website',
    locale: 'de_DE',
  },
}

const SIZES = [
  { range: '15–20 cm', label: 'Jungpflanzen', desc: 'Ideal für Weiterkultur, Veredelungsunterlage oder Einzelhandel' },
  { range: '25–35 cm', label: 'Jungpflanzen mit Wurzel', desc: 'Starkes Wurzelsystem, bereit für Gartencenter-Präsentation' },
  { range: '35–55 cm', label: 'Etablierte Pflanzen', desc: 'Unsere beliebteste Großhandelsgröße — wirkungsvoll und winterhart' },
  { range: '55–80 cm', label: 'Solitärpflanzen', desc: 'Hingucker für Landschaftsgestaltung und Premium-Einzelhandel' },
]

const BENEFITS = [
  {
    icon: '🌱',
    title: 'EU-Pflanzenpass inklusive',
    desc: 'Jede Lieferung enthält einen offiziellen EU-Pflanzenpass. Voll konform für den Import nach Deutschland gemäß geltender phytosanitärer Vorschriften.',
  },
  {
    icon: '🚛',
    title: 'Lieferung Deutschland',
    desc: 'Wir liefern palettierte Bestellungen direkt von unserer Gärtnerei in Murcia, Spanien nach ganz Deutschland. Transport mit Temperaturkontrolle möglich.',
  },
  {
    icon: '📦',
    title: 'Min 200 Stück',
    desc: 'Unsere Mindestbestellmenge beträgt 200 Pflanzen pro Sorte — ideal für Gartencenter, Gärtnereien, Landschaftsarchitekten und Fachhändler.',
  },
  {
    icon: '💰',
    title: 'Günstige Großhandelspreise',
    desc: 'Direkte Gärtnereipreise ohne Zwischenhändler. Mengenrabatte bei Bestellungen über 750 Stück. Individuelles Angebot innerhalb von 24 Stunden.',
  },
  {
    icon: '☀️',
    title: 'Freilandkultur Murcia',
    desc: 'Unsere Trichocereus werden im Freiland unter der spanischen Mittelmeersonne kultiviert — kräftigere und gesündere Pflanzen als Gewächshausalternativen.',
  },
  {
    icon: '🤝',
    title: 'Deutschsprachiger B2B-Support',
    desc: 'Persönlicher Ansprechpartner für deutsche Kunden. Wir sprechen Deutsch und kennen den deutschen Markt. Flexible Zahlungsbedingungen für Stammkunden.',
  },
]

const FAQ = [
  {
    q: 'Kann ich Trichocereus Pachanoi nach Deutschland importieren?',
    a: 'Ja. Trichocereus Pachanoi ist eine legale Zierpflanze in Deutschland. Alle unsere Lieferungen enthalten den erforderlichen EU-Pflanzenpass und phytosanitäre Dokumentation für reibungslose Zollabwicklung. Der Handel innerhalb der EU erfolgt ohne zusätzliche Einfuhrgenehmigungen.',
  },
  {
    q: 'Wie hoch ist die Mindestbestellmenge?',
    a: 'Unsere Mindestbestellmenge beträgt 200 Pflanzen pro Sorte. Bei gemischten Bestellungen mit verschiedenen Trichocereus-Sorten (Pachanoi, Peruvianus, Bridgesii) können wir individuelle Paletten zusammenstellen.',
  },
  {
    q: 'Wie lange dauert die Lieferung nach Deutschland?',
    a: 'Die Standardlieferung beträgt 3–4 Werktage von unserer Gärtnerei in Murcia nach ganz Deutschland. Wir planen 7 Tage für die Auftragsvorbereitung vor dem Versand ein.',
  },
  {
    q: 'Bieten Sie Mengenrabatte?',
    a: 'Ja. Wir bieten gestaffelte Preise je nach Bestellmenge. Kontaktieren Sie uns mit Ihren Anforderungen und wir erstellen innerhalb von 24 Arbeitsstunden ein individuelles Angebot.',
  },
  {
    q: 'Welche Größen sind verfügbar?',
    a: 'Wir liefern Trichocereus Pachanoi in Größen von 15 cm Jungpflanzen bis 80 cm+ Solitärpflanzen. Die beliebteste Großhandelsgröße für deutsche Käufer ist 35–55 cm.',
  },
  {
    q: 'Sind die Pflanzen winterhart im deutschen Klima?',
    a: 'Trichocereus Pachanoi ist bis -2°C winterhart. Im deutschen Winter empfehlen wir jedoch einen Schutz (z. B. Überwinterung im Kalthaus oder Abdeckung bei Dauerfrost). Wir liefern professionelle Pflegeanleitungen mit jeder Bestellung, inklusive spezifischer Hinweise für das deutsche Klima.',
  },
]

export default function PachanoiKaufenDeutschland() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end">
        <Image
          src="/images/varieties/Trichocereus_Pachanoi_1.webp"
          alt="Trichocereus Pachanoi — San Pedro Kaktus Großhandel für deutsche Käufer"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-negro/80 via-negro/30 to-transparent" />
        <div className="relative z-10 w-full px-5 lg:px-8 pb-12 lg:pb-16 max-w-5xl mx-auto">
          <span className="inline-block bg-naranja text-blanco px-3 py-1.5 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold tracking-widest uppercase mb-4">
            B2B Großhandel · Lieferung Deutschland
          </span>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-4xl lg:text-6xl font-bold text-blanco uppercase leading-[1.05]">
            Trichocereus Pachanoi
            <br />
            <span className="text-naranja">kaufen in Deutschland</span>
          </h1>
          <p className="text-lg lg:text-xl text-blanco/85 mt-4 max-w-2xl">
            San Pedro-Kakteen von einer spezialisierten Gärtnerei, direkt aus Spanien nach Deutschland geliefert.
            EU-Pflanzenpass inklusive. Großhandelspreise ab 200 Stück.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href={getFullPath(LOCALE, 'contact')}
              className="bg-naranja text-blanco px-7 py-3.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
            >
              Angebot Anfordern →
            </Link>
            <Link
              href={getFullPath(LOCALE, 'varieties')}
              className="bg-blanco/10 backdrop-blur text-blanco border border-blanco/30 px-7 py-3.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-blanco/20 transition-colors"
            >
              Alle Sorten
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-negro text-crudo">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 py-5 flex flex-wrap justify-center gap-x-10 gap-y-2 text-sm font-[family-name:var(--font-archivo-narrow)] uppercase tracking-wide">
          <span>EU-Pflanzenpass ✓</span>
          <span>Direkt vom Erzeuger ✓</span>
          <span>Deutschlandweiter Versand ✓</span>
          <span>Angebot in 24h ✓</span>
        </div>
      </section>

      {/* About this variety */}
      <section className="px-5 lg:px-8 py-16 lg:py-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-6 pb-3 border-b-2 border-negro">
              Warum Trichocereus Pachanoi?
            </h2>
            <p className="text-marron-claro leading-relaxed mb-4">
              <strong className="text-negro">Trichocereus Pachanoi</strong> (San Pedro) ist eine der ikonischsten und kommerziell
              erfolgreichsten Säulenkakteen auf dem europäischen Markt. Ursprünglich aus den Anden stammend, gedeiht er im deutschen
              Klima bei durchlässigem Boden und sonnigem Standort — ideal für Gartencenter-Sortimente, Landschaftsprojekte und
              Fachhandelskollektionen.
            </p>
            <p className="text-marron-claro leading-relaxed mb-4">
              Seine auffällige blaugrüne Farbe, elegante Säulenform und schnelles Wachstum (bis zu 30 cm pro Jahr)
              machen ihn bei Endverbrauchern sehr beliebt. Er bildet spektakuläre nächtliche weiße
              Blüten mit bis zu 22 cm Durchmesser.
            </p>
            <ul className="space-y-2 mt-6">
              {[
                'Schnelles Wachstum: bis zu 30 cm/Jahr unter optimalen Bedingungen',
                'Winterhart bis -2°C — geeignet für geschützte Standorte in Deutschland',
                'Spektakuläre 22 cm weiße Nachtblüten',
                'Minimaler Pflegeaufwand nach Anwachsen',
                'Ausgezeichnet als Veredelungsunterlage',
                'Hohe Nachfrage — bewährter Einzelhandelsverkauf',
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
              alt="Trichocereus Pachanoi bereit für Großhandelsversand"
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
            Verfügbare Größen
          </h2>
          <p className="text-marron-claro text-center mb-10">
            Alle Größen kultiviert in unserer Gärtnerei in Murcia, Spanien — direkt nach Deutschland geliefert
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
            Individuelle Größen und gemischte Paletten auf Anfrage.{' '}
            <Link href={getFullPath(LOCALE, 'contact')} className="text-naranja font-semibold hover:underline">
              Kontaktieren Sie uns für Verfügbarkeit
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
              alt={`Trichocereus Pachanoi Gärtnereifoto ${i + 1}`}
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
          Warum Tricholand?
        </h2>
        <p className="text-marron-claro text-center mb-12 max-w-2xl mx-auto">
          Wir sind eine spezialisierte Trichocereus-Gärtnerei in Murcia, Spanien —
          eine der führenden Kaktus-Anbauregionen Europas. Wir verkaufen ausschließlich B2B.
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
              src="/images/vivero/productores_cactus_2.webp"
              alt="Tricholand Gärtnerei — Trichocereus-Produzenten in Murcia, Spanien"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-6">
              Unsere Gärtnerei in Murcia
            </h2>
            <p className="text-crudo/80 leading-relaxed mb-4">
              Tricholand ist eine familiengeführte Gärtnerei in der Region Murcia im Südosten Spaniens, spezialisiert
              ausschließlich auf Trichocereus und Säulenkakteen. Unsere Pflanzen werden im Freiland unter der
              Mittelmeersonne kultiviert — kräftigere und gesündere Exemplare mit überlegenen Wurzelsystemen
              im Vergleich zu Gewächshausalternativen.
            </p>
            <p className="text-crudo/80 leading-relaxed mb-6">
              Wir beliefern seit Jahren Gartencenter, Gärtnereien, Landschaftsarchitekten und Fachhändler
              in ganz Europa. Unsere deutschen Kunden schätzen besonders unsere zuverlässige Qualität,
              wettbewerbsfähige Preise und unkomplizierten Importprozess.
            </p>
            <Link
              href={getFullPath(LOCALE, 'about')}
              className="inline-flex font-[family-name:var(--font-archivo-narrow)] text-naranja font-bold uppercase text-sm tracking-wide hover:underline"
            >
              Mehr über uns →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 lg:px-8 py-16 lg:py-20 max-w-3xl mx-auto">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-10 text-center">
          Häufig gestellte Fragen
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
            Weitere Trichocereus-Sorten
          </h2>
          <p className="text-marron-claro text-center mb-10">
            Kombinieren Sie Sorten in einer Lieferung, um Ihre Bestellung zu optimieren
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { slug: 'trichocereus-peruvianus', name: 'T. Peruvianus', common: 'Peruanische Fackel', img: '/images/varieties/Trichocereus_peruvianus_1.webp' },
              { slug: 'trichocereus-bridgesii', name: 'T. Bridgesii', common: 'Achuma', img: '/images/varieties/Trichocereus_Bridgessi_1.webp' },
              { slug: 'trichocereus-pasacana-terscheckii', name: 'T. Terscheckii', common: 'Riesen-Cardón', img: '/images/varieties/Trichocereus_terscheckii_1.webp' },
            ].map((v) => (
              <Link
                key={v.slug}
                href={`/de/sorten/${v.slug}`}
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
            Bereit zur Bestellung?
          </h2>
          <p className="text-crudo/75 mb-8">
            Erhalten Sie ein individuelles Großhandelsangebot für Trichocereus Pachanoi nach Deutschland.
            Wir antworten innerhalb von 24 Arbeitsstunden.
          </p>
          <Link
            href={getFullPath(LOCALE, 'contact')}
            className="inline-flex bg-naranja text-blanco px-8 py-4 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Angebot Anfordern →
          </Link>
          <p className="text-xs text-crudo/50 mt-6">
            Oder schreiben Sie uns direkt an{' '}
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
              description: 'Spezialisierte Trichocereus-Gärtnerei in Murcia, Spanien. B2B Großhandel für Profis in ganz Europa und Deutschland.',
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
                availableLanguage: ['German', 'English', 'Spanish'],
              },
              areaServed: [
                { '@type': 'Country', name: 'Germany' },
                { '@type': 'Country', name: 'Spain' },
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
