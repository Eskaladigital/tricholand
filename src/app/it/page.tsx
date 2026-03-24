import type { Metadata } from 'next'
import { getHomeAlternates } from '@/lib/i18n/paths'
import { it } from '@/lib/i18n/it'
import { HeroSection } from '@/components/home/HeroSection'
import { StatsBar } from '@/components/home/StatsBar'
import { CatalogPreview } from '@/components/home/CatalogPreview'
import { ServicesSection } from '@/components/home/ServicesSection'
import { CertificationsBar } from '@/components/home/CertificationsBar'
import { CtaSection } from '@/components/home/CtaSection'


export const metadata: Metadata = {
  alternates: getHomeAlternates('it'),
}

export default function HomeIT() {
  return (
    <>
      <HeroSection locale="it" dict={it} />
      <StatsBar dict={it} />
      <CatalogPreview locale="it" dict={it} />
      <ServicesSection dict={it} />
      <CertificationsBar dict={it} />
      <CtaSection locale="it" dict={it} />
    </>
  )
}
