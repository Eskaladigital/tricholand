import type { Metadata } from 'next'
import { getHomeAlternates } from '@/lib/i18n/paths'
import { pt } from '@/lib/i18n/pt'
import { HeroSection } from '@/components/home/HeroSection'
import { StatsBar } from '@/components/home/StatsBar'
import { CatalogPreview } from '@/components/home/CatalogPreview'
import { ServicesSection } from '@/components/home/ServicesSection'
import { CertificationsBar } from '@/components/home/CertificationsBar'
import { CtaSection } from '@/components/home/CtaSection'


export const metadata: Metadata = {
  alternates: getHomeAlternates('pt'),
}

export default function HomePT() {
  return (
    <>
      <HeroSection locale="pt" dict={pt} />
      <StatsBar dict={pt} />
      <CatalogPreview locale="pt" dict={pt} />
      <ServicesSection dict={pt} />
      <CertificationsBar dict={pt} />
      <CtaSection locale="pt" dict={pt} />
    </>
  )
}
