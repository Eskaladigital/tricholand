import { fr } from '@/lib/i18n/fr'
import { HeroSection } from '@/components/home/HeroSection'
import { StatsBar } from '@/components/home/StatsBar'
import { CatalogPreview } from '@/components/home/CatalogPreview'
import { ServicesSection } from '@/components/home/ServicesSection'
import { CertificationsBar } from '@/components/home/CertificationsBar'
import { CtaSection } from '@/components/home/CtaSection'

export default function HomeFR() {
  return (
    <>
      <HeroSection locale="fr" dict={fr} />
      <StatsBar dict={fr} />
      <CatalogPreview locale="fr" dict={fr} />
      <ServicesSection dict={fr} />
      <CertificationsBar dict={fr} />
      <CtaSection locale="fr" dict={fr} />
    </>
  )
}
