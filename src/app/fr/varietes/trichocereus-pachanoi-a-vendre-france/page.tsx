import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getFullPath } from '@/lib/i18n/paths'

const LOCALE = 'fr'
const BASE_URL = 'https://www.tricholand.com'
const SLUG = 'trichocereus-pachanoi-a-vendre-france'

export const metadata: Metadata = {
  title: 'Trichocereus Pachanoi à Vendre France — Grossiste B2B | Tricholand',
  description:
    'Achetez du Trichocereus Pachanoi (cactus San Pedro) en gros en France. Pépinière B2B en Espagne, livraison France avec Passeport Phytosanitaire UE. Commande minimum 200 unités.',
  keywords: [
    'trichocereus pachanoi à vendre',
    'san pedro cactus france',
    'cactus grossiste france',
    'acheter trichocereus pachanoi',
    'trichocereus pachanoi grossiste',
    'cactus san pedro en gros',
    'pépinière trichocereus',
    'fournisseur cactus B2B france',
  ],
  alternates: {
    canonical: `${BASE_URL}/fr/varietes/${SLUG}`,
  },
  openGraph: {
    title: 'Trichocereus Pachanoi à Vendre France — Grossiste B2B | Tricholand',
    description:
      'Achetez du Trichocereus Pachanoi en gros auprès d\'une pépinière spécialisée en Espagne. Passeport Phytosanitaire UE inclus. Livraison France.',
    images: ['/images/varieties/Trichocereus_Pachanoi_1.webp'],
    type: 'website',
    locale: 'fr_FR',
  },
}

const SIZES = [
  { range: '15–20 cm', label: 'Jeunes plants', desc: 'Idéal pour la culture, le greffage ou la revente en détail' },
  { range: '25–35 cm', label: 'Plants juvéniles', desc: 'Système racinaire développé, prêts pour les jardineries' },
  { range: '35–55 cm', label: 'Plants établis', desc: 'Notre taille la plus demandée — impact visuel et rusticité' },
  { range: '55–80 cm', label: 'Spécimens', desc: 'Pièces d\'exception pour l\'aménagement paysager et le retail premium' },
]

const BENEFITS = [
  {
    icon: '🌱',
    title: 'Passeport Phytosanitaire UE',
    desc: 'Chaque envoi inclut un Passeport Phytosanitaire UE officiel. Conformité totale pour l\'import en France (échanges intracommunautaires, pas de douane supplémentaire).',
  },
  {
    icon: '🚛',
    title: 'Livraison France',
    desc: 'Nous expédions vos commandes palettisées directement depuis notre pépinière à Murcie, Espagne, vers toute la France. Transport possible sous contrôle de température.',
  },
  {
    icon: '📦',
    title: 'Minimum 200 unités',
    desc: 'Commande minimum de 200 plants par variété — idéal pour jardineries, pépinières, paysagistes et revendeurs spécialisés.',
  },
  {
    icon: '💰',
    title: 'Prix compétitifs',
    desc: 'Tarifs direct pépinière sans intermédiaires. Remises volume pour les commandes de plus de 750 unités. Devis personnalisé sous 24 h.',
  },
  {
    icon: '☀️',
    title: 'Cultivé à Murcie',
    desc: 'Nos Trichocereus sont cultivés en plein champ sous le soleil méditerranéen espagnol — des plants plus vigoureux et sains qu\'en serre.',
  },
  {
    icon: '🤝',
    title: 'Support B2B francophone',
    desc: 'Interlocuteur dédié pour les clients français. Nous parlons français et connaissons le marché. Conditions de paiement souples pour les clients réguliers.',
  },
]

const FAQ = [
  {
    q: 'Puis-je importer du Trichocereus Pachanoi en France ?',
    a: 'Oui. Le Trichocereus Pachanoi est une plante ornementale légale en France. Tous nos envois incluent le Passeport Phytosanitaire UE requis. Les échanges intracommunautaires au sein de l\'UE ne nécessitent pas de formalités douanières supplémentaires.',
  },
  {
    q: 'Quelle est la quantité minimum de commande ?',
    a: 'Notre minimum est de 200 plants par variété. Pour les commandes mixtes combinant différentes variétés de Trichocereus (Pachanoi, Peruvianus, Bridgesii), nous pouvons organiser des palettes sur mesure.',
  },
  {
    q: 'Délai de livraison vers la France ?',
    a: 'La livraison standard est de 2 à 3 jours ouvrés depuis notre pépinière à Murcie jusqu\'en France. Nous prévoyons 7 jours pour la préparation de la commande avant expédition.',
  },
  {
    q: 'Proposez-vous des remises volume ?',
    a: 'Oui. Nous appliquons des tarifs dégressifs selon le volume commandé. Contactez-nous avec vos besoins et nous vous enverrons un devis personnalisé sous 24 h ouvrées.',
  },
  {
    q: 'Quelles tailles sont disponibles ?',
    a: 'Nous proposons le Trichocereus Pachanoi de 15 cm (jeunes plants) à 80 cm et plus (spécimens). La taille la plus demandée par les acheteurs français est 35–55 cm.',
  },
  {
    q: 'Résistance au gel sous le climat français ?',
    a: 'Le Trichocereus Pachanoi supporte des gelées brèves jusqu\'à -2°C. Dans le sud de la France (Méditerranée), il peut rester en extérieur avec une protection légère. Au nord, prévoir une protection hivernale ou une culture en serre froide.',
  },
]

export default function PachanoiAVendreFrance() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end">
        <Image
          src="/images/varieties/Trichocereus_Pachanoi_1.webp"
          alt="Trichocereus Pachanoi — Cactus San Pedro en gros pour acheteurs français"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-negro/80 via-negro/30 to-transparent" />
        <div className="relative z-10 w-full px-5 lg:px-8 pb-12 lg:pb-16 max-w-5xl mx-auto">
          <span className="inline-block bg-naranja text-blanco px-3 py-1.5 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold tracking-widest uppercase mb-4">
            Grossiste B2B · Livraison France
          </span>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-4xl lg:text-6xl font-bold text-blanco uppercase leading-[1.05]">
            Trichocereus Pachanoi
            <br />
            <span className="text-naranja">à Vendre en France</span>
          </h1>
          <p className="text-lg lg:text-xl text-blanco/85 mt-4 max-w-2xl">
            Cactus San Pedro de pépinière spécialisée, expédiés directement d&apos;Espagne vers la France.
            Passeport Phytosanitaire UE inclus. Tarifs grossiste à partir de 200 unités.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href={getFullPath(LOCALE, 'contact')}
              className="bg-naranja text-blanco px-7 py-3.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
            >
              Demander un Devis →
            </Link>
            <Link
              href={getFullPath(LOCALE, 'varieties')}
              className="bg-blanco/10 backdrop-blur text-blanco border border-blanco/30 px-7 py-3.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-blanco/20 transition-colors"
            >
              Toutes les Variétés
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-negro text-crudo">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 py-5 flex flex-wrap justify-center gap-x-10 gap-y-2 text-sm font-[family-name:var(--font-archivo-narrow)] uppercase tracking-wide">
          <span>Passeport Phytosanitaire UE ✓</span>
          <span>Direct Pépinière ✓</span>
          <span>Livraison France ✓</span>
          <span>Devis en 24h ✓</span>
        </div>
      </section>

      {/* About this variety */}
      <section className="px-5 lg:px-8 py-16 lg:py-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-6 pb-3 border-b-2 border-negro">
              Pourquoi le Trichocereus Pachanoi ?
            </h2>
            <p className="text-marron-claro leading-relaxed mb-4">
              <strong className="text-negro">Trichocereus Pachanoi</strong> (San Pedro) est l&apos;un des cactus colonnaires les plus emblématiques et commercialement réussis sur le marché européen. Originaire des Andes, il s&apos;adapte bien au climat français avec un sol drainant et une exposition ensoleillée — un choix idéal pour les jardineries, les aménagements paysagers et les collections de retail spécialisé.
            </p>
            <p className="text-marron-claro leading-relaxed mb-4">
              Sa couleur bleu-vert distinctive, sa forme colonnaire élégante et sa croissance rapide (jusqu&apos;à 30 cm par an) en font un choix très populaire auprès des consommateurs. Il produit des fleurs blanches nocturnes spectaculaires pouvant atteindre 22 cm de diamètre.
            </p>
            <ul className="space-y-2 mt-6">
              {[
                'Croissance rapide : jusqu\'à 30 cm/an en conditions optimales',
                'Rustique jusqu\'à -2°C — adapté aux positions abritées en France',
                'Fleurs blanches nocturnes spectaculaires de 22 cm',
                'Entretien minimal une fois installé',
                'Excellent comme porte-greffe',
                'Forte demande — valeur retail éprouvée',
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
              alt="Trichocereus Pachanoi prêt pour expédition en gros"
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
            Tailles disponibles
          </h2>
          <p className="text-marron-claro text-center mb-10">
            Toutes les tailles cultivées dans notre pépinière à Murcie, Espagne — expédition directe vers la France
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
            Tailles sur mesure et palettes mixtes sur demande.{' '}
            <Link href={getFullPath(LOCALE, 'contact')} className="text-naranja font-semibold hover:underline">
              Contactez-nous pour la disponibilité
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
              alt={`Trichocereus Pachanoi pépinière image ${i + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ))}
      </section>

      {/* Why buy from Tricholand */}
      <section className="px-5 lg:px-8 py-16 lg:py-20 max-w-5xl mx-auto">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-2 text-center">
          Pourquoi acheter chez Tricholand ?
        </h2>
        <p className="text-marron-claro text-center mb-12 max-w-2xl mx-auto">
          Nous sommes une pépinière spécialisée Trichocereus basée à Murcie, Espagne —
          l&apos;une des principales régions de culture de cactus en Europe. Nous vendons exclusivement en B2B.
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

      {/* Nursery photos */}
      <section className="bg-negro text-crudo px-5 lg:px-8 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3]">
            <Image
              src="/images/vivero/productores_cactus_1.webp"
              alt="Équipe Tricholand — Producteurs de Trichocereus à Murcie, Espagne"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-6">
              Notre pépinière à Murcie
            </h2>
            <p className="text-crudo/80 leading-relaxed mb-4">
              Tricholand est une pépinière familiale dans la région de Murcie, au sud-est de l&apos;Espagne, spécialisée exclusivement dans les Trichocereus et cactus colonnaires. Nos plants sont cultivés en plein champ sous le soleil méditerranéen — des spécimens plus vigoureux, sains et dotés d&apos;un système racinaire supérieur aux cultures sous serre.
            </p>
            <p className="text-crudo/80 leading-relaxed mb-6">
              Nous fournissons jardineries, pépinières, paysagistes et revendeurs spécialisés en Europe depuis des années. Nos clients français apprécient particulièrement notre qualité constante, nos prix compétitifs et nos livraisons simplifiées.
            </p>
            <Link
              href={getFullPath(LOCALE, 'about')}
              className="inline-flex font-[family-name:var(--font-archivo-narrow)] text-naranja font-bold uppercase text-sm tracking-wide hover:underline"
            >
              En savoir plus sur nous →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 lg:px-8 py-16 lg:py-20 max-w-3xl mx-auto">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-10 text-center">
          Questions fréquentes
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
            Autres variétés de Trichocereus
          </h2>
          <p className="text-marron-claro text-center mb-10">
            Combinez plusieurs variétés dans un même envoi pour optimiser votre commande
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { slug: 'trichocereus-peruvianus', name: 'T. Peruvianus', common: 'Torche péruvienne', img: '/images/varieties/Trichocereus_peruvianus_1.webp' },
              { slug: 'trichocereus-bridgesii', name: 'T. Bridgesii', common: 'Achuma', img: '/images/varieties/Trichocereus_Bridgessi_1.webp' },
              { slug: 'trichocereus-pasacana-terscheckii', name: 'T. Terscheckii', common: 'Cardón géant', img: '/images/varieties/Trichocereus_terscheckii_1.webp' },
            ].map((v) => (
              <Link
                key={v.slug}
                href={`/fr/varietes/${v.slug}`}
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
            Prêt à Commander ?
          </h2>
          <p className="text-crudo/75 mb-8">
            Obtenez un devis grossiste personnalisé pour du Trichocereus Pachanoi livré en France.
            Réponse sous 24 h ouvrées.
          </p>
          <Link
            href={getFullPath(LOCALE, 'contact')}
            className="inline-flex bg-naranja text-blanco px-8 py-4 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Demander votre Devis →
          </Link>
          <p className="text-xs text-crudo/50 mt-6">
            Ou écrivez-nous directement à{' '}
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
              description: 'Pépinière spécialisée Trichocereus à Murcie, Espagne. Grossiste B2B pour professionnels en France et en Europe.',
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
                availableLanguage: ['French', 'English', 'Spanish'],
              },
              areaServed: [
                { '@type': 'Country', name: 'France' },
                { '@type': 'Country', name: 'Spain' },
                { '@type': 'Country', name: 'United Kingdom' },
                { '@type': 'Country', name: 'Germany' },
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
