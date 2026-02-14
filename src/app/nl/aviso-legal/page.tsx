import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Juridische kennisgeving',
  description: 'Tricholand juridische kennisgeving en gebruiksvoorwaarden van de website.',
  robots: { index: false, follow: false },
}

export default function AvisoLegalPage() {
  return (
    <section className="px-5 lg:px-8 py-16 max-w-3xl mx-auto">
      <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase mb-6">
        Juridische kennisgeving
      </h1>

      <div className="space-y-6 text-sm text-marron-claro leading-relaxed">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          1. Identificatiegegevens
        </h2>
        <p>
          Eigenaar: Tricholand · Locatie: Murcia, Spanje · E-mail: info@tricholand.com
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          2. Doel
        </h2>
        <p>
          Deze website heeft als doel informatie te verstrekken over Tricholand-producten en -diensten, een
          producentenkwekerij gespecialiseerd in Trichocereus en kolomvormige cactussen voor B2B-groothandel.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          3. Intellectueel eigendom
        </h2>
        <p>
          Alle inhoud op deze website (teksten, foto&apos;s, grafisch ontwerp, broncode, logo&apos;s,
          handelsmerken) is eigendom van Tricholand of zijn legitieme eigenaren en wordt beschermd door
          wetten op intellectueel en industrieel eigendom.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          4. Gebruiksvoorwaarden
        </h2>
        <p>
          De informatie op deze website is alleen ter oriëntatie. Prijzen, beschikbaarheid en verkoopvoorwaarden
          worden op aanvraag verstrekt en kunnen zonder voorafgaande kennisgeving wijzigen. Tricholand
          behoudt zich het recht voor om de inhoud van de website zonder voorafgaande kennisgeving te wijzigen.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          5. Toepasselijk recht
        </h2>
        <p>
          Deze website valt onder de Spaanse wetgeving. Voor elk geschil voortvloeiend uit het gebruik van
          deze website, onderwerpen de partijen zich aan de rechtbanken en tribunalen van Murcia, Spanje.
        </p>
      </div>
    </section>
  )
}
