import type { Dictionary } from '@/lib/i18n/types'

interface StatsBarProps {
  dict: Dictionary
}

export function StatsBar({ dict }: StatsBarProps) {
  const stats = [
    dict.stats.units,
    dict.stats.area,
    dict.stats.varieties,
    dict.stats.countries,
    dict.stats.delivery,
  ]

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 bg-negro text-crudo">
      {stats.map((stat, i) => (
        <div
          key={i}
          className={`py-8 px-4 text-center ${
            i < stats.length - 1 ? 'border-r border-white/10' : ''
          } ${i === stats.length - 1 && stats.length % 2 !== 0 ? 'col-span-2 sm:col-span-1' : ''}`}
        >
          <div className="font-[family-name:var(--font-archivo-narrow)] text-[2.5rem] font-bold text-naranja leading-none">
            {stat.value}
          </div>
          <div className="font-[family-name:var(--font-archivo-narrow)] text-[0.68rem] uppercase tracking-[0.12em] opacity-60 mt-1.5">
            {stat.label}
          </div>
        </div>
      ))}
    </section>
  )
}
