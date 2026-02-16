import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { de } from '@/lib/i18n/de'
import { getFullPath, getAlternatesMetadata } from '@/lib/i18n/paths'
import { StatsBar } from '@/components/home/StatsBar'
export const metadata: Metadata = {
  title: 'Über uns',
  description: 'Lernen Sie Tricholand kennen: Produzentengärtnerei spezialisiert auf Trichocereus und säulenförmige Kakteen in Murcia, Spanien. 5+ Trichocereus-Sorten, 2.500 m² Anbaufläche.',
  alternates: getAlternatesMetadata('de', 'about'),
}

export default function SobreNosotrosPage() {
  return (
    <>
      <section className="px-5 lg:px-8 py-16">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Über uns
          </h1>
          <p className="text-marron-claro mt-2">Produzentengärtnerei in Murcia, Spanien</p>
        </div>

        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase mb-4">
              Wir sind <span className="text-naranja">Produzenten</span>
            </h2>
            <div className="space-y-4 text-marron-claro leading-relaxed">
              <p>
                Tricholand ist eine Produzentengärtnerei, spezialisiert auf den Anbau und die
                Großhandelsverteilung von Kakteen der Gattung Trichocereus und anderen säulenförmigen
                Kakteen. Von unseren 2.500 m² Anlagen in Murcia, Spanien kultivieren wir 5+ Trichocereus-Sorten, die wir an Gärtnereien, Gartencenter und Händler in ganz Europa verteilen.
              </p>
              <p>
                Trichocereus-Kakteen sind eine Gattung sukkulenter Pflanzen aus der Familie der
                Cactaceae, ursprünglich aus Südamerika — insbesondere Argentinien, Bolivien, Chile,
                Ecuador und Peru. Sie sind bekannt für ihre imposante säulenförmige Gestalt und ihre
                spektakuläre nächtliche Blüte.
              </p>
              <p>
                Wir sind ein Unternehmen in stetigem Wachstum mit dem Ziel, unseren Kunden die
                Pflanzen zu bieten, die sie jedes Jahr benötigen, indem wir einen Teil unserer
                Anbaufläche reservieren, um einen an die Nachfrage jedes Kunden angepassten Bestand
                zu garantieren.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Image
              src="/images/vivero/productores_cactus_1.webp"
              alt="Tricholand Gärtnerei"
              width={500}
              height={350}
              sizes="(max-width: 1024px) 50vw, 25vw"
              quality={65}
              unoptimized
              className="w-full h-[200px] lg:h-full object-cover"
            />
            <Image
              src="/images/vivero/productores_cactus_2.webp"
              alt="Trichocereus-Anbau"
              width={500}
              height={350}
              sizes="(max-width: 1024px) 50vw, 25vw"
              quality={65}
              unoptimized
              className="w-full h-[200px] lg:h-full object-cover"
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: 'Eigene Produktion',
              text: 'Unser gesamter Bestand stammt aus unseren Anlagen. Wir kontrollieren den gesamten Prozess vom Samen oder Steckling bis zur verkaufsfertigen Pflanze.',
            },
            {
              title: 'Versand in ganz Europa',
              text: 'Wir versenden in die gesamte Europäische Union und importieren nach Großbritannien mit vollständiger aktueller Dokumentation für Großhandelsversand.',
            },
            {
              title: 'Phytosanitäre Zertifizierung',
              text: 'Alle unsere Exemplare enthalten einen EU-Pflanzenpass. Vollständige Zolldokumentation für den Export nach UK.',
            },
            {
              title: '5+ Trichocereus-Sorten',
              text: 'Unsere Sammlung umfasst die wichtigsten Trichocereus-Arten sowie ausgewählte Hybride, Kammformen und seltene Sorten.',
            },
            {
              title: 'Garantierte Lieferung',
              text: 'Vorabreservierung von Produktion zur Sicherstellung der Lieferung der Sorten und Mengen, die Ihr Unternehmen benötigt.',
            },
            {
              title: 'Fachberatung',
              text: 'Wir unterstützen unsere Kunden mit technischer Beratung zu Anbau, Pflege und Präsentation der Pflanzen.',
            },
          ].map((item, i) => (
            <div key={i} className="bg-blanco border border-linea p-6">
              <h3 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-marron-claro leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-negro text-crudo p-8 lg:p-12 text-center max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase mb-3">
            Möchten Sie mit uns zusammenarbeiten?
          </h2>
          <p className="opacity-70 mb-6">
            Wenn Sie ein Fachmann der Branche sind und an unseren Produkten interessiert sind,
            kontaktieren Sie uns für Katalog und Konditionen.
          </p>
          <Link
            href={getFullPath('de', 'contact')}
            className="inline-flex bg-naranja text-blanco px-8 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Informationen anfordern →
          </Link>
        </div>
      </section>

      <StatsBar dict={de} />
    </>
  )
}
