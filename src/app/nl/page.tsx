import { nl } from '@/lib/i18n/nl'
import { HeroSection } from '@/components/home/HeroSection'
import { StatsBar } from '@/components/home/StatsBar'
import { CatalogPreview } from '@/components/home/CatalogPreview'
import { ServicesSection } from '@/components/home/ServicesSection'
import { CertificationsBar } from '@/components/home/CertificationsBar'
import { CtaSection } from '@/components/home/CtaSection'

export default function HomeNL() {
  return (
    <>
      <HeroSection locale="nl" dict={nl} />
      <StatsBar dict={nl} />
      <CatalogPreview locale="nl" dict={nl} />
      <ServicesSection dict={nl} />
      <CertificationsBar dict={nl} />
      <CtaSection locale="nl" dict={nl} />
    </>
  )
}
