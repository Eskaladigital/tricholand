import type { Metadata } from 'next'
import { getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales et conditions d\'utilisation du site Tricholand.',
  robots: { index: false, follow: false },
  alternates: getAlternatesMetadata('fr', 'legal'),
}

export default function AvisoLegalPage() {
  return (
    <section className="px-5 lg:px-8 py-16 max-w-3xl mx-auto">
      <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase mb-6">
        Mentions légales
      </h1>

      <div className="space-y-6 text-sm text-marron-claro leading-relaxed">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          1. Données d&apos;identification
        </h2>
        <p>
          Propriétaire : Tricholand · Lieu : Murcie, Espagne · E-mail : info@tricholand.com
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          2. Objet
        </h2>
        <p>
          Ce site a pour objet de fournir des informations sur les produits et services de Tricholand, pépinière
          productrice spécialisée en Trichocereus et cactacées colonnaires pour la vente en gros B2B.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          3. Propriété intellectuelle
        </h2>
        <p>
          Tout le contenu de ce site (textes, photographies, conception graphique, code source, logos,
          marques) est la propriété de Tricholand ou de ses propriétaires légitimes et est protégé par les
          lois sur la propriété intellectuelle et industrielle.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          4. Conditions d&apos;utilisation
        </h2>
        <p>
          Les informations de ce site sont à titre indicatif. Les prix, la disponibilité et les conditions de
          vente sont fournis sur demande et peuvent varier sans préavis. Tricholand se réserve le droit de
          modifier le contenu du site sans préavis.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          5. Droit applicable
        </h2>
        <p>
          Ce site est régi par la législation espagnole. Pour tout litige découlant de l&apos;utilisation de ce site,
          les parties se soumettent aux tribunaux de Murcie, Espagne.
        </p>
      </div>
    </section>
  )
}
