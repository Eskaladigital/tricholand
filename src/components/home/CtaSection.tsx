import Link from 'next/link'
import type { Dictionary } from '@/lib/i18n/types'

interface CtaSectionProps {
  locale: string
  dict: Dictionary
}

export function CtaSection({ locale, dict }: CtaSectionProps) {
  return (
    <section className="px-5 lg:px-8 py-16 bg-blanco">
      <div className="max-w-[1050px] mx-auto bg-negro text-crudo p-8 lg:p-14 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center">
        <div>
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-[2rem] font-bold uppercase mb-3">
            {dict.cta.title}
          </h2>
          <p className="opacity-70 leading-relaxed">
            {dict.cta.description}
          </p>
        </div>

        <div className="text-center lg:text-right">
          <a
            href={`mailto:${dict.cta.email}`}
            className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold text-naranja hover:text-crudo transition-colors block mb-3"
          >
            {dict.cta.email}
          </a>
          <span className="font-[family-name:var(--font-archivo-narrow)] text-sm opacity-60 block mb-5">
            {dict.cta.location}
          </span>
          <Link
            href={`/${locale}/contacto`}
            className="inline-flex bg-naranja text-blanco px-7 py-3 font-[family-name:var(--font-archivo-narrow)] text-[0.82rem] font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            {dict.cta.button}
          </Link>
        </div>
      </div>
    </section>
  )
}
