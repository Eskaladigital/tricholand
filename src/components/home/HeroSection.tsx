import Image from 'next/image'
import Link from 'next/link'
import type { Dictionary } from '@/lib/i18n/types'
import { getFullPath } from '@/lib/i18n/paths'
import { getPlantImageUrl } from '@/lib/storage'

interface HeroSectionProps {
  locale: string
  dict: Dictionary
}

export function HeroSection({ locale, dict }: HeroSectionProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] min-h-[75vh]">
      {/* Image */}
      <div className="relative min-h-[400px] lg:min-h-0 order-first">
        <Image
          src={getPlantImageUrl('Vivero/productores_cactus_1.webp')}
          alt="Tricholand vivero de Trichocereus"
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          quality={65}
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-l from-blanco/5 to-transparent" />
        <span className="absolute top-6 left-6 bg-naranja text-blanco px-4 py-2 font-[family-name:var(--font-archivo-narrow)] text-[0.72rem] font-bold uppercase tracking-[0.1em] z-10">
          {dict.hero.image_tag}
        </span>
      </div>

      {/* Content */}
      <div className="bg-blanco px-6 lg:px-16 py-12 lg:py-16 flex flex-col justify-center">
        <span className="inline-flex items-center gap-2 bg-verde text-blanco px-4 py-1.5 font-[family-name:var(--font-archivo-narrow)] text-[0.7rem] font-bold uppercase tracking-[0.1em] mb-8 w-fit">
          {dict.hero.badge}
        </span>

        <h1 className="font-[family-name:var(--font-archivo-narrow)] text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold leading-[1.08] uppercase mb-6">
          {dict.hero.title_line1}{' '}
          <span className="text-naranja">{dict.hero.title_highlight}</span>
          <br />
          {dict.hero.title_line2}
        </h1>

        <p className="text-base text-marron-claro max-w-[460px] mb-6 leading-relaxed">
          {dict.hero.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {dict.hero.tags.map((tag) => (
            <span
              key={tag}
              className="bg-verde-claro text-verde px-3 py-1.5 font-[family-name:var(--font-archivo-narrow)] text-[0.72rem] font-semibold tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={getFullPath(locale, 'contact')}
          className="inline-flex items-center gap-2 bg-naranja text-blanco px-8 py-4 font-[family-name:var(--font-archivo-narrow)] text-[0.9rem] font-bold uppercase tracking-wide w-fit hover:bg-marron transition-colors"
        >
          {dict.hero.cta}
        </Link>
      </div>
    </section>
  )
}
