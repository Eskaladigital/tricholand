import { en } from '@/lib/i18n/en'
import { HeroSection } from '@/components/home/HeroSection'
import { StatsBar } from '@/components/home/StatsBar'
import { CatalogPreview } from '@/components/home/CatalogPreview'
import { ServicesSection } from '@/components/home/ServicesSection'
import { CertificationsBar } from '@/components/home/CertificationsBar'
import { CtaSection } from '@/components/home/CtaSection'

export default function HomeEN() {
  return (
    <>
      <HeroSection locale="en" dict={en} />
      <StatsBar dict={en} />
      <CatalogPreview locale="en" dict={en} />
      <ServicesSection dict={en} />
      <CertificationsBar dict={en} />
      <CtaSection locale="en" dict={en} />
    </>
  )
}
