import type { Dictionary } from '@/lib/i18n/types'

interface CertificationsBarProps {
  dict: Dictionary
}

export function CertificationsBar({ dict }: CertificationsBarProps) {
  return (
    <section className="bg-verde text-blanco px-5 lg:px-8 py-12">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="text-center lg:text-left">
          <h3 className="font-[family-name:var(--font-archivo-narrow)] text-[1.4rem] font-bold uppercase mb-1.5">
            {dict.certifications.title}
          </h3>
          <p className="text-[0.95rem] opacity-85">
            {dict.certifications.description}
          </p>
        </div>

        <div className="flex gap-6 flex-wrap justify-center">
          {dict.certifications.badges.map((badge, i) => (
            <div
              key={i}
              className="text-center px-7 py-4 border-2 border-white/30 hover:border-white/60 transition-colors"
            >
              <strong className="block font-[family-name:var(--font-archivo-narrow)] text-xl font-bold">
                {badge.value}
              </strong>
              <span className="font-[family-name:var(--font-archivo-narrow)] text-[0.62rem] uppercase tracking-[0.1em] opacity-70">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
