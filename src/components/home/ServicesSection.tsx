import type { Dictionary } from '@/lib/i18n/types'

interface ServicesSectionProps {
  dict: Dictionary
}

export function ServicesSection({ dict }: ServicesSectionProps) {
  return (
    <section className="bg-marron text-crudo px-5 lg:px-8 py-16">
      {/* Section header */}
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/20">
        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-[1.6rem] font-bold uppercase">
          {dict.services.title}
        </h2>
        <span className="font-[family-name:var(--font-archivo-narrow)] text-sm text-white/50">
          {dict.services.subtitle}
        </span>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {dict.services.items.map((item, i) => (
          <div
            key={i}
            className="py-10 px-6 border-l-[3px] border-l-naranja border-r border-r-white/[0.08] last:border-r-0 hover:bg-white/[0.04] transition-colors"
          >
            <div className="font-[family-name:var(--font-archivo-narrow)] text-[2.8rem] font-bold text-naranja leading-none mb-5">
              {String(i + 1).padStart(2, '0')}
            </div>
            <h3 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-3">
              {item.title}
            </h3>
            <p className="text-[0.9rem] opacity-70 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
