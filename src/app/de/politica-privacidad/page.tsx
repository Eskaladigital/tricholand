import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Tricholand Datenschutzerklärung und Schutz personenbezogener Daten.',
  robots: { index: false, follow: false },
}

export default function PoliticaPrivacidadPage() {
  return (
    <section className="px-5 lg:px-8 py-16 max-w-3xl mx-auto">
      <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase mb-6">
        Datenschutzerklärung
      </h1>

      <div className="space-y-6 text-sm text-marron-claro leading-relaxed">
        <p>
          <strong className="text-negro">Letzte Aktualisierung:</strong> Januar 2025
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          1. Verantwortlicher für die Verarbeitung
        </h2>
        <p>
          Tricholand · Murcia, Spanien · info@tricholand.com
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          2. Von uns erhobene Daten
        </h2>
        <p>
          Über das Kontaktformular erfassen wir: Name, E-Mail, Telefon (optional), Unternehmen (optional),
          Land, Stadt (optional) und den Inhalt Ihrer Nachricht. Wir erfassen auch die Art der Anfrage und
          wie Sie uns gefunden haben, um unseren Service zu verbessern.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          3. Zweck der Verarbeitung
        </h2>
        <p>
          Die Daten werden verarbeitet für: die Bearbeitung von über die Website eingegangenen Anfragen, das
          Versenden angefordeter Angebote und die Beantwortung von Informationsanfragen.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          4. Rechtsgrundlage
        </h2>
        <p>
          Die Verarbeitung basiert auf der ausdrücklichen Einwilligung der betroffenen Person, die durch die
          Annahme dieser Richtlinie und das Absenden des Kontaktformulars erteilt wird.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          5. Aufbewahrung der Daten
        </h2>
        <p>
          Die Daten werden so lange aufbewahrt, wie es zur Beantwortung der Anfrage erforderlich ist und,
          falls zutreffend, für die zur Einhaltung der geltenden gesetzlichen Verpflichtungen erforderliche Zeit.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          6. Rechte der betroffenen Person
        </h2>
        <p>
          Sie können Ihre Rechte auf Zugang, Berichtigung, Löschung, Widerspruch, Einschränkung der
          Verarbeitung und Datenübertragbarkeit ausüben, indem Sie info@tricholand.com kontaktieren.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          7. Cookies
        </h2>
        <p>
          Diese Website verwendet keine Cookies von Drittanbietern oder Tracking-Cookies. Es werden nur
          technisch notwendige Cookies für den Betrieb der Website verwendet.
        </p>
      </div>
    </section>
  )
}
