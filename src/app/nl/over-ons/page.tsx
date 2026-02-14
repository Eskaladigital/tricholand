import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getFullPath, getAlternatesMetadata } from '@/lib/i18n/paths'
import { nl } from '@/lib/i18n/nl'
import { StatsBar } from '@/components/home/StatsBar'

export const metadata: Metadata = {
  title: 'Over ons',
  description: 'Maak kennis met Tricholand: producentenkwekerij gespecialiseerd in Trichocereus en kolomvormige cactussen in Murcia, Spanje. Meer dan 50 variëteiten, 2.500 m² teelt.',
  alternates: getAlternatesMetadata('nl', 'about'),
}

export default function SobreNosotrosPage() {
  return (
    <>
      <section className="px-5 lg:px-8 py-16">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Over ons
          </h1>
          <p className="text-marron-claro mt-2">Producentenkwekerij in Murcia, Spanje</p>
        </div>

        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase mb-4">
              Wij zijn <span className="text-naranja">producenten</span>
            </h2>
            <div className="space-y-4 text-marron-claro leading-relaxed">
              <p>
                Tricholand is een producentenkwekerij gespecialiseerd in de teelt en groothandelsdistributie
                van cactussen van het geslacht Trichocereus en andere kolomvormige cactussen. Vanuit onze
                faciliteiten van 2.500 m² in Murcia, Spanje, kweken we meer dan 50 variëteiten die we
                distribueren aan kwekerijen, tuincentra en distributeurs in heel Europa.
              </p>
              <p>
                Trichocereus-cactussen zijn een geslacht van vetplanten die behoren tot de Cactaceae-familie,
                afkomstig uit Zuid-Amerika — met name Argentinië, Bolivia, Chili, Ecuador en Peru.
                Ze staan bekend om hun imposante kolomvorm en spectaculaire nachtelijke bloei.
              </p>
              <p>
                Wij zijn een bedrijf in continue groei met als doel al onze klanten de planten te bieden die
                ze elk jaar nodig hebben, waarbij we een deel van onze teelt reserveren om een voorraad te
                garanderen die is afgestemd op de vraag van elke klant.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Image
              src="/images/vivero/productores_cactus_1.png"
              alt="Tricholand kwekerij"
              width={500}
              height={350}
              className="w-full h-[200px] lg:h-full object-cover"
            />
            <Image
              src="/images/vivero/productores_cactus_2.png"
              alt="Trichocereus teelt"
              width={500}
              height={350}
              className="w-full h-[200px] lg:h-full object-cover"
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: 'Eigen productie',
              text: 'Al onze voorraad komt uit onze faciliteiten. Wij beheersen het hele proces van zaad of stek tot plant klaar voor verkoop.',
            },
            {
              title: 'Leveringen in heel Europa',
              text: 'Wij leveren aan de hele Europese Unie en importeren naar het Verenigd Koninkrijk met alle documentatie up-to-date voor groothandelszendingen.',
            },
            {
              title: 'Fytosanitaire certificering',
              text: 'Al onze exemplaren bevatten het EU fytosanitair paspoort. Volledige douanedocumentatie voor export naar het VK.',
            },
            {
              title: 'Meer dan 50 variëteiten',
              text: 'Onze collectie omvat de belangrijkste Trichocereus-soorten plus geselecteerde hybriden, kuifvormen en zeldzame variëteiten.',
            },
            {
              title: 'Gegarandeerde levering',
              text: 'Vroegtijdige productiereservering om de levering van de variëteiten en hoeveelheden te garanderen die uw bedrijf nodig heeft.',
            },
            {
              title: 'Professioneel advies',
              text: 'Wij ondersteunen onze klanten met technisch advies over teelt, verzorging en presentatie van planten.',
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
            Wilt u met ons samenwerken?
          </h2>
          <p className="opacity-70 mb-6">
            Als u een professional in de sector bent en geïnteresseerd in onze producten, neem dan contact
            met ons op om onze catalogus en voorwaarden te ontvangen.
          </p>
          <Link
            href={getFullPath('nl', 'contact')}
            className="inline-flex bg-naranja text-blanco px-8 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Informatie aanvragen →
          </Link>
        </div>
      </section>

      <StatsBar dict={nl} />
    </>
  )
}
