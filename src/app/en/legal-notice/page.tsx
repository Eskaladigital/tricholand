import type { Metadata } from 'next'
import { getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Legal notice',
  description: 'Tricholand legal notice and website terms of use.',
  robots: { index: false, follow: false },
  alternates: getAlternatesMetadata('en', 'legal'),
}

export default function AvisoLegalPage() {
  return (
    <section className="px-5 lg:px-8 py-16 max-w-3xl mx-auto">
      <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase mb-6">
        Legal notice
      </h1>

      <div className="space-y-6 text-sm text-marron-claro leading-relaxed">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          1. Identifying data
        </h2>
        <p>
          Owner: Tricholand · Location: Murcia, Spain · Email: info@tricholand.com
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          2. Purpose
        </h2>
        <p>
          This website aims to provide information about Tricholand products and services, a producer
          nursery specialized in Trichocereus and columnar cacti for B2B wholesale sales.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          3. Intellectual property
        </h2>
        <p>
          All content on this website (texts, photographs, graphic design, source code, logos,
          trademarks) is the property of Tricholand or its legitimate owners and is protected by
          intellectual and industrial property laws.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          4. Terms of use
        </h2>
        <p>
          The information on this website is for guidance only. Prices, availability and sales
          conditions are provided on request and may vary without prior notice. Tricholand
          reserves the right to modify the website content without prior notice.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          5. Applicable law
        </h2>
        <p>
          This website is governed by Spanish legislation. For any dispute arising from the use of
          this website, the parties submit to the courts and tribunals of Murcia, Spain.
        </p>
      </div>
    </section>
  )
}
