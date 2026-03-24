import type { Metadata } from 'next'
import { getHomeAlternates } from '@/lib/i18n/paths'
import { es } from '@/lib/i18n/es'
import { HeroSection } from '@/components/home/HeroSection'
import { StatsBar } from '@/components/home/StatsBar'
import { CatalogPreview } from '@/components/home/CatalogPreview'
import { ServicesSection } from '@/components/home/ServicesSection'
import { CertificationsBar } from '@/components/home/CertificationsBar'
import { CtaSection } from '@/components/home/CtaSection'


export const metadata: Metadata = {
  alternates: getHomeAlternates('es'),
}

export default function HomeES() {
  return (
    <>
      <HeroSection locale="es" dict={es} />
      <StatsBar dict={es} />
      <CatalogPreview locale="es" dict={es} />
      <ServicesSection dict={es} />
      <CertificationsBar dict={es} />
      <CtaSection locale="es" dict={es} />
    </>
  )
}
