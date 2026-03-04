import Image from 'next/image'
import Link from 'next/link'
import { getFullPath } from '@/lib/i18n/paths'
import type { LandingContent, LandingConfig } from '@/lib/landings'

const BASE_URL = 'https://www.tricholand.com'

interface Props {
  locale: string
  content: LandingContent
  config: LandingConfig
}

export function PachanoiLanding({ locale, content, config }: Props) {
  const c = content
  const aboutPath = getFullPath(locale, 'about')

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end">
        <Image
          src={config.heroImage}
          alt={`${c.heroTitle} ${c.heroTitleHighlight}`}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-negro/80 via-negro/30 to-transparent" />
        <div className="relative z-10 w-full px-5 lg:px-8 pb-12 lg:pb-16 max-w-5xl mx-auto">
          <span className="inline-block bg-naranja text-blanco px-3 py-1.5 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold tracking-widest uppercase mb-4">
            {c.heroBadge}
          </span>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-4xl lg:text-6xl font-bold text-blanco uppercase leading-[1.05]">
            {c.heroTitle}
            <br />
            <span className="text-naranja">{c.heroTitleHighlight}</span>
          </h1>
          <p className="text-lg lg:text-xl text-blanco/85 mt-4 max-w-2xl">
            {c.heroDescription}
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href={getFullPath(locale, 'contact')}
              className="bg-naranja text-blanco px-7 py-3.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
            >
              {c.ctaPrimary}
            </Link>
            <Link
              href={getFullPath(locale, 'varieties')}
              className="bg-blanco/10 backdrop-blur text-blanco border border-blanco/30 px-7 py-3.5 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-blanco/20 transition-colors"
            >
              {c.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-negro text-crudo">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 py-5 flex flex-wrap justify-center gap-x-10 gap-y-2 text-sm font-[family-name:var(--font-archivo-narrow)] uppercase tracking-wide">
          {c.trustItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      {/* About this variety */}
      <section className="px-5 lg:px-8 py-16 lg:py-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-6 pb-3 border-b-2 border-negro">
              {c.aboutTitle}
            </h2>
            <p className="text-marron-claro leading-relaxed mb-4"
              dangerouslySetInnerHTML={{ __html: c.aboutP1 }}
            />
            <p className="text-marron-claro leading-relaxed mb-4">
              {c.aboutP2}
            </p>
            <ul className="space-y-2 mt-6">
              {c.aboutHighlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="text-naranja font-bold mt-0.5">→</span>
                  <span className="text-marron-claro text-sm">{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] bg-crudo">
            <Image
              src={config.aboutImage}
              alt={c.aboutTitle}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Available sizes */}
      <section className="bg-crudo px-5 lg:px-8 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-2 text-center">
            {c.sizesTitle}
          </h2>
          <p className="text-marron-claro text-center mb-10">
            {c.sizesSubtitle}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.sizes.map((s) => (
              <div key={s.range} className="bg-blanco border border-linea p-6 text-center hover:-translate-y-1 hover:shadow-lg transition-all">
                <p className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold text-naranja mb-1">
                  {s.range}
                </p>
                <p className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide mb-3">
                  {s.label}
                </p>
                <p className="text-xs text-marron-claro leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-sm text-marron-claro">
            {c.sizesFooter}{' '}
            <Link href={getFullPath(locale, 'contact')} className="text-naranja font-semibold hover:underline">
              {c.sizesFooterLink}
            </Link>
          </p>
        </div>
      </section>

      {/* Photo gallery strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-0">
        {config.galleryImages.map((src, i) => (
          <div key={i} className="relative aspect-square">
            <Image
              src={src}
              alt={`Trichocereus Pachanoi ${i + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ))}
      </section>

      {/* Countries section (optional, e.g. Europe landing) */}
      {c.countriesSection && (
        <section className="px-5 lg:px-8 py-16 lg:py-20 max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-2 text-center">
            {c.countriesSection.title}
          </h2>
          <p className="text-marron-claro text-center mb-10 max-w-2xl mx-auto">
            {c.countriesSection.subtitle}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {c.countriesSection.countries.map((ct) => (
              <div key={ct.name} className="bg-crudo border border-linea p-4 text-center">
                <span className="text-2xl block mb-1">{ct.flag}</span>
                <p className="font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide">{ct.name}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-6 text-sm text-marron-claro">
            {c.countriesSection.footer}{' '}
            <Link href={getFullPath(locale, 'contact')} className="text-naranja font-semibold hover:underline">
              {c.countriesSection.footerLink}
            </Link>
          </p>
        </section>
      )}

      {/* Why buy from Tricholand */}
      <section className="px-5 lg:px-8 py-16 lg:py-20 max-w-5xl mx-auto">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-2 text-center">
          {c.benefitsTitle}
        </h2>
        <p className="text-marron-claro text-center mb-12 max-w-2xl mx-auto">
          {c.benefitsSubtitle}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {c.benefits.map((b) => (
            <div key={b.title} className="bg-crudo border border-linea p-6">
              <span className="text-2xl mb-3 block">{b.icon}</span>
              <h3 className="font-[family-name:var(--font-archivo-narrow)] font-bold uppercase text-sm tracking-wide mb-2">
                {b.title}
              </h3>
              <p className="text-xs text-marron-claro leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Nursery */}
      <section className="bg-negro text-crudo px-5 lg:px-8 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3]">
            <Image
              src={config.nurseryImage}
              alt="Tricholand nursery — Trichocereus producers in Murcia, Spain"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-6">
              {c.nurseryTitle}
            </h2>
            <p className="text-crudo/80 leading-relaxed mb-4">
              {c.nurseryP1}
            </p>
            <p className="text-crudo/80 leading-relaxed mb-6">
              {c.nurseryP2}
            </p>
            <Link
              href={aboutPath}
              className="inline-flex font-[family-name:var(--font-archivo-narrow)] text-naranja font-bold uppercase text-sm tracking-wide hover:underline"
            >
              {c.nurseryLink}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 lg:px-8 py-16 lg:py-20 max-w-3xl mx-auto">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-10 text-center">
          {c.faqTitle}
        </h2>
        <div className="space-y-6">
          {c.faq.map((item) => (
            <details
              key={item.q}
              className="group border border-linea bg-blanco"
            >
              <summary className="cursor-pointer px-6 py-4 font-[family-name:var(--font-archivo-narrow)] font-bold uppercase text-sm tracking-wide flex items-center justify-between hover:text-naranja transition-colors">
                {item.q}
                <span className="text-naranja ml-4 transition-transform group-open:rotate-45 text-lg">+</span>
              </summary>
              <div className="px-6 pb-5 text-sm text-marron-claro leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Other varieties */}
      <section className="bg-crudo px-5 lg:px-8 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl lg:text-3xl font-bold uppercase mb-2 text-center">
            {c.otherTitle}
          </h2>
          <p className="text-marron-claro text-center mb-10">
            {c.otherSubtitle}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {config.otherVarietySlugs.map((v, i) => {
              const labels = c.otherVarietiesLabels[i]
              return (
                <Link
                  key={v.slug}
                  href={getFullPath(locale, 'varieties', v.slug)}
                  className="group bg-blanco border border-linea overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-[3/2]">
                    <Image src={v.img} alt={labels?.name || v.slug} fill className="object-cover group-hover:scale-[1.04] transition-transform" unoptimized />
                  </div>
                  <div className="p-4">
                    <h3 className="font-[family-name:var(--font-archivo-narrow)] font-bold group-hover:text-naranja transition-colors">{labels?.name || v.slug}</h3>
                    <p className="text-xs text-marron-claro">{labels?.common || ''}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-negro text-crudo px-5 lg:px-8 py-16 lg:py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-3xl lg:text-4xl font-bold uppercase mb-4">
            {c.ctaTitle}
          </h2>
          <p className="text-crudo/75 mb-8">
            {c.ctaDescription}
          </p>
          <Link
            href={getFullPath(locale, 'contact')}
            className="inline-flex bg-naranja text-blanco px-8 py-4 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            {c.ctaButton}
          </Link>
          <p className="text-xs text-crudo/50 mt-6">
            {c.ctaEmailText}{' '}
            <a href="mailto:info@tricholand.com" className="text-naranja hover:underline">info@tricholand.com</a>
          </p>
        </div>
      </section>

      {/* JSON-LD: Organization + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Tricholand',
              url: BASE_URL,
              logo: `${BASE_URL}/images/icons/logo_tricho_yellow_200_200.webp`,
              description: c.jsonLdDescription,
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Murcia',
                addressRegion: 'Murcia',
                addressCountry: 'ES',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'info@tricholand.com',
                contactType: 'sales',
                availableLanguage: c.jsonLdLanguages,
              },
              areaServed: config.areaServed.map((a) => ({
                '@type': 'Country',
                name: a.name,
              })),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: c.faq.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            },
          ]),
        }}
      />
    </>
  )
}
