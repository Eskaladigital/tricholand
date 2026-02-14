import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacybeleid',
  description: 'Tricholand privacybeleid en bescherming van persoonsgegevens.',
  robots: { index: false, follow: false },
}

export default function PoliticaPrivacidadPage() {
  return (
    <section className="px-5 lg:px-8 py-16 max-w-3xl mx-auto">
      <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase mb-6">
        Privacybeleid
      </h1>

      <div className="space-y-6 text-sm text-marron-claro leading-relaxed">
        <p>
          <strong className="text-negro">Laatst bijgewerkt:</strong> Januari 2025
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          1. Verantwoordelijke voor de verwerking
        </h2>
        <p>
          Tricholand · Murcia, Spanje · info@tricholand.com
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          2. Gegevens die we verzamelen
        </h2>
        <p>
          Via het contactformulier verzamelen we: naam, e-mail, telefoon (optioneel), bedrijf (optioneel),
          land, stad (optioneel) en de inhoud van uw bericht. We verzamelen ook het type aanvraag
          en hoe u ons heeft gevonden om onze service te verbeteren.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          3. Doel van de verwerking
        </h2>
        <p>
          Gegevens worden verwerkt voor: het beheren van aanvragen ontvangen via de website, het verzenden van
          aangevraagde offertes en het beantwoorden van informatieverzoeken.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          4. Rechtsgrond
        </h2>
        <p>
          De verwerking is gebaseerd op de uitdrukkelijke toestemming van de betrokkene, verleend door het accepteren
          van dit beleid en het verzenden van het contactformulier.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          5. Bewaring van gegevens
        </h2>
        <p>
          Gegevens worden bewaard zolang nodig is om op de aanvraag te reageren en, indien van toepassing,
          voor de tijd die nodig is om te voldoen aan de toepasselijke wettelijke verplichtingen.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          6. Rechten van de betrokkene
        </h2>
        <p>
          U kunt uw rechten op toegang, rectificatie, wissen, bezwaar, beperking van
          verwerking en gegevensoverdraagbaarheid uitoefenen door contact op te nemen met info@tricholand.com.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          7. Cookies
        </h2>
        <p>
          Deze website gebruikt geen cookies van derden of trackingcookies. Alleen strikt noodzakelijke
          technische cookies voor het functioneren van de website worden gebruikt.
        </p>
      </div>
    </section>
  )
}
