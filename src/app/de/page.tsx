import { de } from '@/lib/i18n/de'
import { HeroSection } from '@/components/home/HeroSection'
import { StatsBar } from '@/components/home/StatsBar'
import { CatalogPreview } from '@/components/home/CatalogPreview'
import { ServicesSection } from '@/components/home/ServicesSection'
import { CertificationsBar } from '@/components/home/CertificationsBar'
import { CtaSection } from '@/components/home/CtaSection'

export default function HomeDE() {
  return (
    <>
      <HeroSection locale="de" dict={de} />
      <StatsBar dict={de} />
      <CatalogPreview locale="de" dict={de} />
      <ServicesSection dict={de} />
      <CertificationsBar dict={de} />
      <CtaSection locale="de" dict={de} />
    </>
  )
}
