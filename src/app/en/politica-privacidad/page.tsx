import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Tricholand privacy policy and personal data protection.',
  robots: { index: false, follow: false },
}

export default function PoliticaPrivacidadPage() {
  return (
    <section className="px-5 lg:px-8 py-16 max-w-3xl mx-auto">
      <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase mb-6">
        Privacy Policy
      </h1>

      <div className="space-y-6 text-sm text-marron-claro leading-relaxed">
        <p>
          <strong className="text-negro">Last updated:</strong> January 2025
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          1. Data controller
        </h2>
        <p>
          Tricholand · Murcia, Spain · info@tricholand.com
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          2. Data we collect
        </h2>
        <p>
          Through the contact form we collect: name, email, phone (optional), company (optional),
          country, city (optional) and the content of your message. We also collect the type of inquiry
          and how you found us to improve our service.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          3. Purpose of processing
        </h2>
        <p>
          Data is processed for: managing inquiries received through the website, sending requested
          quotes and responding to information requests.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          4. Legal basis
        </h2>
        <p>
          Processing is based on the explicit consent of the data subject, granted by accepting
          this policy and submitting the contact form.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          5. Data retention
        </h2>
        <p>
          Data will be retained for as long as necessary to respond to the inquiry and, where applicable,
          for the time necessary to comply with applicable legal obligations.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          6. Data subject rights
        </h2>
        <p>
          You may exercise your rights of access, rectification, erasure, objection, restriction of
          processing and data portability by contacting info@tricholand.com.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          7. Cookies
        </h2>
        <p>
          This website does not use third-party cookies or tracking cookies. Only strictly necessary
          technical cookies for the operation of the website are used.
        </p>
      </div>
    </section>
  )
}
