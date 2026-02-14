import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Tricholand Impressum und Nutzungsbedingungen der Website.',
  robots: { index: false, follow: false },
}

export default function AvisoLegalPage() {
  return (
    <section className="px-5 lg:px-8 py-16 max-w-3xl mx-auto">
      <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase mb-6">
        Impressum
      </h1>

      <div className="space-y-6 text-sm text-marron-claro leading-relaxed">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          1. Identifikationsdaten
        </h2>
        <p>
          Inhaber: Tricholand · Standort: Murcia, Spanien · E-Mail: info@tricholand.com
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          2. Zweck
        </h2>
        <p>
          Diese Website dient der Bereitstellung von Informationen über Tricholand-Produkte und -Dienstleistungen, eine
          Produzentengärtnerei, die auf Trichocereus und säulenförmige Kakteen für den B2B-Großhandel spezialisiert ist.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          3. Geistiges Eigentum
        </h2>
        <p>
          Alle Inhalte dieser Website (Texte, Fotografien, Grafikdesign, Quellcode, Logos,
          Marken) sind Eigentum von Tricholand oder seiner rechtmäßigen Inhaber und durch
          Gesetze zum Schutz des geistigen und gewerblichen Eigentums geschützt.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          4. Nutzungsbedingungen
        </h2>
        <p>
          Die Informationen auf dieser Website sind nur zur Orientierung. Preise, Verfügbarkeit und
          Verkaufsbedingungen werden auf Anfrage bereitgestellt und können ohne vorherige Ankündigung variieren.
          Tricholand behält sich das Recht vor, den Inhalt der Website ohne vorherige Ankündigung zu ändern.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          5. Anwendbares Recht
        </h2>
        <p>
          Diese Website unterliegt der spanischen Gesetzgebung. Für Streitigkeiten aus der Nutzung dieser
          Website unterwerfen sich die Parteien den Gerichten von Murcia, Spanien.
        </p>
      </div>
    </section>
  )
}
