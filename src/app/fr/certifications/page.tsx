import type { Metadata } from 'next'
import Link from 'next/link'
import { getFullPath, getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Certifications phytosanitaires',
  description: 'Certifications Tricholand : passeport phytosanitaire UE, documentation export UK, conformité réglementaire européenne pour cactacées.',
  alternates: getAlternatesMetadata('fr', 'certifications'),
}

export default function CertificacionesPage() {
  return (
    <section className="pb-16">
      {/* Hero band */}
      <div className="bg-verde text-blanco px-5 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl lg:text-4xl font-bold uppercase mb-3">
            Certifications phytosanitaires
          </h1>
          <p className="text-lg opacity-85 max-w-2xl mx-auto">
            Tous nos envois incluent la documentation exigée par la réglementation européenne en vigueur
          </p>
        </div>
      </div>

      <div className="px-5 lg:px-8 py-16 max-w-5xl mx-auto">
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 mb-16">
          <div className="space-y-6 text-marron-claro leading-relaxed">
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase text-negro">
              Passeport phytosanitaire <span className="text-naranja">UE</span>
            </h2>
            <p>
              Le passeport phytosanitaire est un document officiel certifiant que les plantes respectent
              les exigences phytosanitaires de l&apos;Union européenne. Il est obligatoire pour la
              commercialisation de plantes vivantes sur le territoire de l&apos;UE et garantit que les
              spécimens sont exempts de ravageurs et maladies réglementés.
            </p>
            <p>
              Chez Tricholand, tous nos spécimens incluent un passeport phytosanitaire individuel. Nos
              installations sont enregistrées et soumises à des inspections périodiques par les
              services officiels de santé des végétaux de la Région de Murcie.
            </p>
            <p>
              Le passeport phytosanitaire inclut : code d&apos;opérateur autorisé, code de traçabilité,
              nom scientifique de l&apos;espèce, pays d&apos;origine et, le cas échéant, zone protégée de destination.
            </p>

            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase text-negro pt-4">
              Export vers le <span className="text-naranja">Royaume-Uni</span>
            </h2>
            <p>
              Suite au Brexit, les exportations de plantes vers le Royaume-Uni nécessitent une documentation
              supplémentaire. Tricholand gère toute la documentation nécessaire pour que vos envois
              arrivent sans incident :
            </p>
            <ul className="space-y-2 ml-1">
              {[
                'Certificat phytosanitaire d\'exportation (délivré par les autorités espagnoles)',
                'Déclaration douanière d\'exportation',
                'Pré-notification au système IPAFFS britannique',
                'Étiquetage conforme aux exigences d\'importation UK',
                'Documentation de traçabilité complète',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-naranja font-bold mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar badges */}
          <aside className="space-y-4">
            {[
              {
                icon: '🇪🇺',
                title: 'Passeport phytosanitaire UE',
                desc: 'Inclus dans tous les envois intracommunautaires. Conformité au Règlement (UE) 2016/2031.',
              },
              {
                icon: '🇬🇧',
                title: 'Docs export UK',
                desc: 'Certificat phytosanitaire + documentation douanière pour importation au Royaume-Uni.',
              },
              {
                icon: '🔍',
                title: 'Traçabilité complète',
                desc: 'Chaque plante est traçable de son origine dans notre pépinière au point de livraison.',
              },
              {
                icon: '✓',
                title: 'Inspections officielles',
                desc: 'Installations enregistrées soumises à un contrôle phytosanitaire périodique.',
              },
            ].map((badge, i) => (
              <div key={i} className="bg-blanco border border-linea p-5">
                <div className="text-2xl mb-2">{badge.icon}</div>
                <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase mb-1">
                  {badge.title}
                </h3>
                <p className="text-sm text-marron-claro leading-relaxed">{badge.desc}</p>
              </div>
            ))}
          </aside>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold uppercase mb-6 pb-3 border-b-2 border-negro">
            Questions fréquentes
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Puis-je acheter des plantes sans passeport phytosanitaire ?',
                a: 'Non. La réglementation européenne exige que toutes les plantes vivantes commercialisées dans l\'UE incluent un passeport phytosanitaire. C\'est une garantie sanitaire pour l\'acheteur et une exigence légale pour le vendeur.',
              },
              {
                q: 'Le passeport phytosanitaire a-t-il un coût supplémentaire ?',
                a: 'Non. Le passeport phytosanitaire est inclus dans le prix de toutes nos plantes. Pas de suppléments ni de coûts cachés.',
              },
              {
                q: 'Expédiez-vous en dehors de l\'Union européenne (hors UK) ?',
                a: 'Nous expédions actuellement dans toute l\'UE et au Royaume-Uni. Pour d\'autres destinations, contactez-nous et nous évaluerons la faisabilité et la documentation nécessaire au cas par cas.',
              },
              {
                q: 'Que se passe-t-il si mon envoi est retenu en douane ?',
                a: 'Nos envois incluent toute la documentation exigée, ce qui minimise le risque de rétention. En cas improbable, notre équipe vous assistera pour la résolution.',
              },
            ].map((faq, i) => (
              <div key={i}>
                <h3 className="font-[family-name:var(--font-archivo-narrow)] font-bold text-base mb-1">
                  {faq.q}
                </h3>
                <p className="text-sm text-marron-claro leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-negro text-crudo p-8 lg:p-12 text-center">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase mb-3">
            Besoin de plus d&apos;informations ?
          </h2>
          <p className="opacity-70 mb-6">
            Si vous avez des questions sur la documentation, les exigences d&apos;importation ou les certifications, contactez notre équipe.
          </p>
          <Link
            href={getFullPath('fr', 'contact')}
            className="inline-flex bg-naranja text-blanco px-8 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Nous contacter →
          </Link>
        </div>
      </div>
    </section>
  )
}
