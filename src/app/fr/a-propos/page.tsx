import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getFullPath, getAlternatesMetadata } from '@/lib/i18n/paths'
import { fr } from '@/lib/i18n/fr'
import { StatsBar } from '@/components/home/StatsBar'
export const metadata: Metadata = {
  title: 'À propos de nous',
  description: 'Découvrez Tricholand : pépinière productrice spécialisée en Trichocereus et cactacées colonnaires à Murcie, Espagne. Plus de 50 variétés, 2 500 m² de culture.',
  alternates: getAlternatesMetadata('fr', 'about'),
}

export default function SobreNosotrosPage() {
  return (
    <>
      <section className="px-5 lg:px-8 py-16">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            À propos de nous
          </h1>
          <p className="text-marron-claro mt-2">Pépinière productrice à Murcie, Espagne</p>
        </div>

        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase mb-4">
              Nous sommes <span className="text-naranja">producteurs</span>
            </h2>
            <div className="space-y-4 text-marron-claro leading-relaxed">
              <p>
                Tricholand est une pépinière productrice spécialisée dans la culture et la distribution en gros
                de cactus du genre Trichocereus et autres cactacées colonnaires. Depuis nos installations de
                2 500 m² à Murcie, Espagne, nous cultivons plus de 50 variétés que nous distribuons aux pépinières,
                jardineries et distributeurs de toute l&apos;Europe.
              </p>
              <p>
                Les cactus Trichocereus sont un genre de plantes succulentes de la famille des Cactaceae,
                originaires d&apos;Amérique du Sud — notamment d&apos;Argentine, Bolivie, Chili, Équateur et Pérou.
                Ils sont connus pour leur forme colonnaire imposante et leur floraison nocturne spectaculaire.
              </p>
              <p>
                Nous sommes une entreprise en croissance continue visant à offrir à tous nos clients les
                plantes dont ils ont besoin chaque année, en réservant une partie de notre culture pour
                garantir un stock adapté à la demande de chaque client.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Image
              src="/images/vivero/productores_cactus_1.webp"
              alt="Pépinière Tricholand"
              width={500}
              height={350}
              sizes="(max-width: 1024px) 50vw, 25vw"
              quality={65}
              unoptimized
              className="w-full h-[200px] lg:h-full object-cover"
            />
            <Image
              src="/images/vivero/productores_cactus_2.webp"
              alt="Culture Trichocereus"
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
            { title: 'Production propre', text: 'Tout notre stock provient de nos installations. Nous maîtrisons tout le processus de la graine ou bouture à la plante prête à la vente.' },
            { title: 'Expéditions Europe', text: 'Nous expédions dans toute l\'Union européenne et importons au Royaume-Uni avec toute la documentation à jour pour les envois en gros.' },
            { title: 'Certification phytosanitaire', text: 'Tous nos spécimens incluent le passeport phytosanitaire UE. Documentation douanière complète pour l\'exportation vers le Royaume-Uni.' },
            { title: 'Plus de 50 variétés', text: 'Notre collection couvre les principales espèces de Trichocereus plus des hybrides sélectionnés, formes crêtées et variétés rares.' },
            { title: 'Approvisionnement garanti', text: 'Réservation anticipée de production pour garantir l\'approvisionnement des variétés et quantités dont votre entreprise a besoin.' },
            { title: 'Conseil professionnel', text: 'Nous accompagnons nos clients avec des conseils techniques sur la culture, l\'entretien et la présentation des plantes.' },
          ].map((item, i) => (
            <div key={i} className="bg-blanco border border-linea p-6">
              <h3 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-2">{item.title}</h3>
              <p className="text-sm text-marron-claro leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-negro text-crudo p-8 lg:p-12 text-center max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase mb-3">
            Vous voulez travailler avec nous ?
          </h2>
          <p className="opacity-70 mb-6">
            Si vous êtes un professionnel du secteur et intéressé par nos produits, contactez-nous pour recevoir notre catalogue et nos conditions.
          </p>
          <Link href={getFullPath('fr', 'contact')} className="inline-flex bg-naranja text-blanco px-8 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors">
            Demander des informations →
          </Link>
        </div>
      </section>

      <StatsBar dict={fr} />
    </>
  )
}
