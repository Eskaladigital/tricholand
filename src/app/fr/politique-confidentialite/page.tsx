import type { Metadata } from 'next'
import { getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et protection des données personnelles de Tricholand.',
  robots: { index: false, follow: false },
  alternates: getAlternatesMetadata('fr', 'privacy'),
}

export default function PoliticaPrivacidadPage() {
  return (
    <section className="px-5 lg:px-8 py-16 max-w-3xl mx-auto">
      <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase mb-6">
        Politique de confidentialité
      </h1>

      <div className="space-y-6 text-sm text-marron-claro leading-relaxed">
        <p>
          <strong className="text-negro">Dernière mise à jour :</strong> Janvier 2025
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          1. Responsable du traitement
        </h2>
        <p>
          Tricholand · Murcie, Espagne · info@tricholand.com
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          2. Données que nous collectons
        </h2>
        <p>
          Via le formulaire de contact, nous collectons : nom, e-mail, téléphone (optionnel), entreprise (optionnel),
          pays, ville (optionnelle) et le contenu de votre message. Nous collectons également le type de demande et
          comment vous nous avez connu pour améliorer notre service.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          3. Finalité du traitement
        </h2>
        <p>
          Les données sont traitées pour : gérer les demandes reçues via le site, envoyer les devis demandés et
          répondre aux demandes d&apos;information.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          4. Base légale
        </h2>
        <p>
          Le traitement est basé sur le consentement explicite de la personne concernée, accordé en acceptant
          cette politique et en soumettant le formulaire de contact.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          5. Conservation des données
        </h2>
        <p>
          Les données seront conservées le temps nécessaire pour répondre à la demande et, le cas échéant,
          pendant le délai nécessaire pour respecter les obligations légales applicables.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          6. Droits de la personne concernée
        </h2>
        <p>
          Vous pouvez exercer vos droits d&apos;accès, de rectification, d&apos;effacement, d&apos;opposition, de limitation du
          traitement et de portabilité des données en contactant info@tricholand.com.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          7. Cookies
        </h2>
        <p>
          Ce site n&apos;utilise pas de cookies tiers ni de cookies de suivi. Seuls des cookies techniques strictement
          nécessaires au fonctionnement du site sont utilisés.
        </p>
      </div>
    </section>
  )
}
