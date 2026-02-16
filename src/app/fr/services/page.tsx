import type { Metadata } from 'next'
import Link from 'next/link'
import { fr } from '@/lib/i18n/fr'
import { getFullPath, getAlternatesMetadata } from '@/lib/i18n/paths'
import { CertificationsBar } from '@/components/home/CertificationsBar'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Services Tricholand : vente en gros Trichocereus, expéditions Europe, documentation phytosanitaire UE/UK et culture sur commande.',
  alternates: getAlternatesMetadata('fr', 'services'),
}

export default function ServiciosPage() {
  return (
    <>
      {/* Intro */}
      <section className="px-5 lg:px-8 py-16">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Services
          </h1>
          <p className="text-marron-claro mt-2">Solutions complètes pour les professionnels du secteur</p>
        </div>

        <div className="max-w-3xl space-y-4 text-marron-claro leading-relaxed mb-12">
          <p>
            Chez Tricholand, nous offrons un service complet pour les professionnels du secteur pépiniériste
            et horticole. De la production et la culture à l&apos;expédition avec toute la documentation
            nécessaire, nous veillons à ce que vous receviez vos plantes en parfait état et avec
            toutes les garanties légales.
          </p>
        </div>

        {/* Detailed services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {[
            {
              num: '01',
              title: 'Vente en gros',
              details: [
                'Commande minimum : 200 unités',
                'Conditions spéciales pour commandes récurrentes et grands volumes',
                'Paiement par virement',
                'Devis personnalisé en moins de 24h ouvrées',
                'Réservation anticipée de production disponible',
              ],
            },
            {
              num: '02',
              title: 'Expéditions dans toute l\'Europe',
              details: [
                'Espagne continentale : 48–72 heures',
                'Union européenne : 72–96 heures',
                'Royaume-Uni : 5–7 jours ouvrés',
                'Emballage spécialisé pour cactus (protection individuelle)',
                'Suivi d\'expédition en temps réel',
                'Assurance incluse sur tous les envois',
              ],
            },
            {
              num: '03',
              title: 'Documentation et certifications',
              details: [
                'Passeport végétal européen inclus dans chaque envoi',
                'Certificat phytosanitaire disponible pour les exportations hors UE (coût supplémentaire env. 60 €)',
                'Certificat d\'origine lorsque requis',
                'Étiquetage conforme à la réglementation européenne en vigueur',
                'Conseils sur les exigences d\'importation',
              ],
            },
            {
              num: '04',
              title: 'Culture sur commande',
              details: [
                'Réservation anticipée de production pour l\'année suivante',
                'Variétés spécifiques sur demande',
                'Garantie d\'approvisionnement annuel pour clients sous accord',
                'Tailles personnalisées selon les besoins',
                'Culture de variétés exclusives disponible',
              ],
            },
          ].map((service) => (
            <div key={service.num} className="bg-blanco border border-linea p-8">
              <div className="font-[family-name:var(--font-archivo-narrow)] text-4xl font-bold text-naranja leading-none mb-4">
                {service.num}
              </div>
              <h2 className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold uppercase mb-4">
                {service.title}
              </h2>
              <ul className="space-y-2">
                {service.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-marron-claro">
                    <span className="text-naranja font-bold mt-0.5">→</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-negro text-crudo p-8 lg:p-12 text-center max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase mb-3">
            Besoin d&apos;un service personnalisé ?
          </h2>
          <p className="opacity-70 mb-6">
            Contactez notre équipe commerciale et nous préparerons une proposition adaptée aux besoins de votre entreprise.
          </p>
          <Link
            href={getFullPath('fr', 'contact')}
            className="inline-flex bg-naranja text-blanco px-8 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Demander des informations →
          </Link>
        </div>
      </section>

      <CertificationsBar dict={fr} />
    </>
  )
}
