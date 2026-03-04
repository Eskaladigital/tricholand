import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getFullPath } from '@/lib/i18n/paths'

const LOCALE = 'it'
const BASE_URL = 'https://www.tricholand.com'
const SLUG = 'trichocereus-pachanoi-vendita-italia'

export const metadata: Metadata = {
  title: 'Trichocereus Pachanoi in Vendita Italia — Ingrosso B2B | Tricholand',
  description:
    'Trichocereus Pachanoi all\'ingrosso in Italia, vivaio B2B in Spagna, Passaporto Fitosanitario UE, minimo 200 unità. Consegna diretta in tutta Italia.',
  keywords: [
    'trichocereus pachanoi vendita',
    'san pedro cactus italia',
    'cactus all ingrosso italia',
    'comprare trichocereus pachanoi',
    'trichocereus groothandel italia',
    'cactus ingrosso europa',
    'vivaio trichocereus',
    'B2B cactus fornitore italia',
  ],
  alternates: {
    canonical: `${BASE_URL}/it/varieta/${SLUG}`,
  },
  openGraph: {
    title: 'Trichocereus Pachanoi in Vendita Italia — Ingrosso B2B | Tricholand',
    description:
      'Trichocereus Pachanoi all\'ingrosso da vivaio specializzato in Spagna. Passaporto Fitosanitario UE incluso. Consegna in Italia ed Europa.',
    images: ['/images/varieties/Trichocereus_Pachanoi_1.webp'],
    type: 'website',
    locale: 'it_IT',
  },
}

const SIZES = [
  { range: '15–20 cm', label: 'Pianticelle', desc: 'Ideali per rivendita, portinnesto o retail' },
  { range: '25–35 cm', label: 'Piante giovani', desc: 'Apparato radicale robusto, pronte per garden center' },
  { range: '35–55 cm', label: 'Piante stabili', desc: 'La nostra taglia più richiesta — impatto e rusticità' },
  { range: '55–80 cm', label: 'Esemplari', desc: 'Punti focali per paesaggistica e retail premium' },
]

const BENEFITS = [
  {
    icon: '🌱',
    title: 'Passaporto Fitosanitario UE',
    desc: 'Ogni spedizione include il Passaporto Fitosanitario UE ufficiale. Conformità completa per l\'importazione in Italia secondo la normativa fitosanitaria vigente.',
  },
  {
    icon: '🚛',
    title: 'Spedizione Italia',
    desc: 'Consegniamo pallet direttamente dal nostro vivaio a Murcia, Spagna, in tutta Italia. Possibilità di trasporto con controllo temperatura.',
  },
  {
    icon: '📦',
    title: 'Min 200 unità',
    desc: 'L\'ordine minimo è di 200 piante per varietà — ideale per garden center, vivai, paesaggisti e rivenditori specializzati.',
  },
  {
    icon: '💰',
    title: 'Prezzi Competitivi',
    desc: 'Prezzi da vivaio senza intermediari. Sconti volume per ordini oltre 750 unità. Preventivo personalizzato entro 24 ore.',
  },
  {
    icon: '☀️',
    title: 'Coltivato a Murcia',
    desc: 'I nostri Trichocereus sono coltivati in pieno campo sotto il sole mediterraneo spagnolo — piante più robuste e sane rispetto alle alternative in serra.',
  },
  {
    icon: '🤝',
    title: 'Assistenza B2B in Italiano',
    desc: 'Account manager dedicato per clienti italiani. Parliamo italiano e conosciamo il mercato. Condizioni di pagamento flessibili per clienti abituali.',
  },
]

const FAQ = [
  {
    q: 'Posso importare Trichocereus Pachanoi in Italia?',
    a: 'Sì. Trichocereus Pachanoi è una pianta ornamentale legale in Italia. Tutte le nostre spedizioni includono il Passaporto Fitosanitario UE e la documentazione fitosanitaria richiesta per una dogana agevole. Essendo nell\'UE, la libera circolazione delle merci si applica senza restrizioni aggiuntive.',
  },
  {
    q: 'Qual è l\'ordine minimo?',
    a: 'L\'ordine minimo è di 200 piante per varietà. Per ordini misti con diverse varietà di Trichocereus (Pachanoi, Peruvianus, Bridgesii) possiamo preparare pallet personalizzati.',
  },
  {
    q: 'Quanto tempo richiede la consegna in Italia?',
    a: 'La consegna standard è di 2–3 giorni lavorativi dal nostro vivaio a Murcia fino a tutta Italia. La Spagna è vicina: tempi rapidi e costi di trasporto contenuti.',
  },
  {
    q: 'Offrite sconti per volume?',
    a: 'Sì. Proponiamo prezzi a scalare in base al volume d\'ordine. Contattateci con le vostre esigenze e invieremo un preventivo personalizzato entro 24 ore lavorative.',
  },
  {
    q: 'Quali taglie sono disponibili?',
    a: 'Forniamo Trichocereus Pachanoi in taglie da 15 cm (pianticelle) fino a 80 cm+ (esemplari). La taglia più richiesta per il mercato italiano è 35–55 cm.',
  },
  {
    q: 'Le piante resistono al clima italiano?',
    a: 'Assolutamente sì. Il clima mediterraneo italiano è ideale per Trichocereus Pachanoi. La pianta prospera all\'aperto tutto l\'anno nella maggior parte delle regioni italiane — dalla Sicilia alla Lombardia, con le dovute precauzioni in zone con gelate intense.',
  },
]

export default function PachanoiVenditaItalia() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end">
        <Image
          src="/images/varieties/Trichocereus_Pachanoi_1.webp"
          alt="Trichocereus Pachanoi — San Pedro cactus ingrosso per acquirenti italiani"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-negro/80 via-negro/30 to-transparent" />
        <div className="relative z-10 w-full px-5 lg:px-8 pb-12 lg:pb-16 max-w-5xl mx-auto">
          <span className="inline-block bg-naranja text-blanco px-3 py-1.5 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold tracking-widest uppercase mb-4">
            Ingrosso B2B · Consegna Italia
          </span>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-4xl lg:text-6xl font-bold text-blanco uppercase leading-[1.05]">
            Trichocereus Pachanoi
            <br />
            <span className="text-naranja">in Vendita in Italia</span>
          </h1>
          <p className="text-lg lg:text-xl text-blanco/85 mt-4 max-w-2xl">
            Cactus San Pedro da vivaio specializzato, consegna diretta dalla Spagna all&apos;Italia.
            Passaporto Fitosanitario UE incluso. Prezzi da ingrosso da 200 unità.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href={getFullPath(LOCALE, 'contact')}
              className="bg-naranja text-blanco px-7 py-3.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
            >
              Richiedi un Preventivo →
            </Link>
            <Link
              href={getFullPath(LOCALE, 'varieties')}
              className="bg-blanco/10 backdrop-blur text-blanco border border-blanco/30 px-7 py-3.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-blanco/20 transition-colors"
            >
              Tutte le Varietà
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-negro text-crudo">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 py-5 flex flex-wrap justify-center gap-x-10 gap-y-2 text-sm font-[family-name:var(--font-archivo-narrow)] uppercase tracking-wide">
          <span>Passaporto UE ✓</span>
          <span>Diretto dal Vivaio ✓</span>
          <span>Spedizione Italia ✓</span>
          <span>Preventivo in 24h ✓</span>
        </div>
      </section>

      {/* About this variety */}
      <section className="px-5 lg:px-8 py-16 lg:py-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-6 pb-3 border-b-2 border-negro">
              Perché Trichocereus Pachanoi?
            </h2>
            <p className="text-marron-claro leading-relaxed mb-4">
              <strong className="text-negro">Trichocereus Pachanoi</strong> (San Pedro) è uno dei cactus colonnari
              più iconici e commercialmente di successo sul mercato europeo. Originario delle Ande, prospera
              perfettamente nel clima italiano grazie al clima mediterraneo — ideale per garden center,
              progetti paesaggistici e retail specializzato. In gran parte d&apos;Italia può restare all&apos;aperto tutto l&apos;anno.
            </p>
            <p className="text-marron-claro leading-relaxed mb-4">
              Il colore blu-verde distintivo, la forma colonnare elegante e la crescita rapida (fino a 30 cm l&apos;anno)
              lo rendono molto popolare tra i consumatori finali. Produce spettacolari fiori bianchi notturni
              fino a 22 cm di diametro.
            </p>
            <ul className="space-y-2 mt-6">
              {[
                'Crescita rapida: fino a 30 cm/anno in condizioni ottimali',
                'Rustico fino a -2°C — adatto a posizioni riparate in Italia',
                'Fiori bianchi notturni spettacolari da 22 cm',
                'Manutenzione minima una volta stabilizzato',
                'Eccellente come portinnesto per innesti',
                'Alta domanda dei consumatori — vendita retail collaudata',
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
              alt="Trichocereus Pachanoi pronto per consegna ingrosso"
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
            Taglie disponibili
          </h2>
          <p className="text-marron-claro text-center mb-10">
            Tutte le taglie coltivate nel nostro vivaio a Murcia, Spagna — consegna diretta in Italia
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
            Taglie personalizzate e pallet misti su richiesta.{' '}
            <Link href={getFullPath(LOCALE, 'contact')} className="text-naranja font-semibold hover:underline">
              Contattaci per disponibilità
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
              alt={`Trichocereus Pachanoi foto vivaio ${i + 1}`}
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
          Perché Tricholand?
        </h2>
        <p className="text-marron-claro text-center mb-12 max-w-2xl mx-auto">
          Siamo un vivaio specializzato in Trichocereus a Murcia, Spagna —
          una delle principali regioni cactus d&apos;Europa. Vendiamo esclusivamente B2B.
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
              alt="Team vivaio Tricholand — produttori Trichocereus a Murcia, Spagna"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-6">
              Il nostro vivaio a Murcia
            </h2>
            <p className="text-crudo/80 leading-relaxed mb-4">
              Tricholand è un&apos;azienda familiare nella regione di Murcia, nel sud-est della Spagna, specializzata
              esclusivamente in Trichocereus e cactus colonnari. Le nostre piante sono coltivate in pieno campo
              sotto il sole mediterraneo — esemplari più robusti e sani con apparati radicali superiori
              rispetto alle alternative in serra.
            </p>
            <p className="text-crudo/80 leading-relaxed mb-6">
              Forniamo da anni garden center, vivai, paesaggisti e rivenditori specializzati
              in tutta Europa. I nostri clienti italiani apprezzano soprattutto la qualità affidabile,
              i prezzi competitivi e la procedura d&apos;importazione agevole.
            </p>
            <Link
              href={getFullPath(LOCALE, 'about')}
              className="inline-flex font-[family-name:var(--font-archivo-narrow)] text-naranja font-bold uppercase text-sm tracking-wide hover:underline"
            >
              Scopri di più su di noi →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 lg:px-8 py-16 lg:py-20 max-w-3xl mx-auto">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-10 text-center">
          Domande frequenti
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
            Altre varietà di Trichocereus
          </h2>
          <p className="text-marron-claro text-center mb-10">
            Combina varietà in una sola spedizione per ottimizzare il tuo ordine
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { slug: 'trichocereus-peruvianus', name: 'T. Peruvianus', common: 'Torcia Peruviana', img: '/images/varieties/Trichocereus_peruvianus_1.webp' },
              { slug: 'trichocereus-bridgesii', name: 'T. Bridgesii', common: 'Achuma', img: '/images/varieties/Trichocereus_Bridgessi_1.webp' },
              { slug: 'trichocereus-pasacana-terscheckii', name: 'T. Terscheckii', common: 'Cardón Gigante', img: '/images/varieties/Trichocereus_terscheckii_1.webp' },
            ].map((v) => (
              <Link
                key={v.slug}
                href={`/it/varieta/${v.slug}`}
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
            Pronto per Ordinare?
          </h2>
          <p className="text-crudo/75 mb-8">
            Ricevi un preventivo personalizzato per Trichocereus Pachanoi consegnato in Italia.
            Rispondiamo entro 24 ore lavorative.
          </p>
          <Link
            href={getFullPath(LOCALE, 'contact')}
            className="inline-flex bg-naranja text-blanco px-8 py-4 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Richiedi un Preventivo →
          </Link>
          <p className="text-xs text-crudo/50 mt-6">
            Oppure scrivici direttamente a{' '}
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
              description: 'Vivaio specializzato in Trichocereus a Murcia, Spagna. Ingrosso B2B per professionisti in tutta Europa e Italia.',
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
                availableLanguage: ['Italian', 'English', 'Spanish'],
              },
              areaServed: [
                { '@type': 'Country', name: 'Italy' },
                { '@type': 'Country', name: 'Spain' },
                { '@type': 'Country', name: 'United Kingdom' },
                { '@type': 'Country', name: 'France' },
                { '@type': 'Country', name: 'Germany' },
                { '@type': 'Country', name: 'Netherlands' },
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
