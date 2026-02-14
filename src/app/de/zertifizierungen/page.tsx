import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getFullPath, getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Certificaciones fitosanitarias',
  description: 'Certificaciones de Tricholand: pasaporte fitosanitario UE, documentación de exportación UK, cumplimiento normativo europeo para cactáceas.',
  alternates: getAlternatesMetadata('de', 'certifications'),
}

export default function CertificacionesPage() {
  return (
    <section className="pb-16">
      {/* Hero band */}
      <div className="bg-verde text-blanco px-5 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl lg:text-4xl font-bold uppercase mb-3">
            Certificaciones fitosanitarias
          </h1>
          <p className="text-lg opacity-85 max-w-2xl mx-auto">
            Todos nuestros envíos incluyen la documentación exigida por la normativa europea vigente
          </p>
        </div>
      </div>

      <div className="px-5 lg:px-8 py-16 max-w-5xl mx-auto">
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 mb-16">
          <div className="space-y-6 text-marron-claro leading-relaxed">
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase text-negro">
              Pasaporte fitosanitario <span className="text-naranja">UE</span>
            </h2>
            <p>
              El pasaporte fitosanitario es un documento oficial que certifica que las plantas cumplen
              con los requisitos fitosanitarios de la Unión Europea. Es obligatorio para la
              comercialización de plantas vivas dentro del territorio de la UE y garantiza que los
              ejemplares están libres de plagas y enfermedades reguladas.
            </p>
            <p>
              En Tricholand, todos nuestros ejemplares incluyen pasaporte fitosanitario individual.
              Nuestras instalaciones están registradas y sometidas a inspecciones periódicas por parte
              de los servicios oficiales de sanidad vegetal de la Región de Murcia.
            </p>
            <p>
              El pasaporte fitosanitario incluye: código de operador autorizado, código de trazabilidad,
              nombre científico de la especie, país de origen y, cuando procede, zona protegida de destino.
            </p>

            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase text-negro pt-4">
              Exportación a <span className="text-naranja">Reino Unido</span>
            </h2>
            <p>
              Tras el Brexit, las exportaciones de plantas a Reino Unido requieren documentación
              adicional. Tricholand gestiona toda la documentación necesaria para que tus envíos
              lleguen sin incidencias:
            </p>
            <ul className="space-y-2 ml-1">
              {[
                'Certificado fitosanitario de exportación (emitido por las autoridades españolas)',
                'Declaración aduanera de exportación',
                'Pre-notificación al sistema IPAFFS británico',
                'Etiquetado conforme a los requisitos de importación UK',
                'Documentación de trazabilidad completa',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-naranja font-bold mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar badges */}
          <aside className="space-y-4">
            {[
              {
                icon: '🇪🇺',
                title: 'Pasaporte fitosanitario UE',
                desc: 'Incluido en todos los envíos intracomunitarios. Cumplimiento del Reglamento (UE) 2016/2031.',
              },
              {
                icon: '🇬🇧',
                title: 'Export docs UK',
                desc: 'Certificado fitosanitario + documentación aduanera para importación al Reino Unido.',
              },
              {
                icon: '🔍',
                title: 'Trazabilidad completa',
                desc: 'Cada planta es trazable desde su origen en nuestro vivero hasta el punto de entrega.',
              },
              {
                icon: '✓',
                title: 'Inspecciones oficiales',
                desc: 'Instalaciones registradas y sujetas a control periódico por sanidad vegetal.',
              },
            ].map((badge, i) => (
              <div key={i} className="bg-blanco border border-linea p-5">
                <div className="text-2xl mb-2">{badge.icon}</div>
                <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase mb-1">
                  {badge.title}
                </h3>
                <p className="text-sm text-marron-claro leading-relaxed">{badge.desc}</p>
              </div>
            ))}
          </aside>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-xl font-bold uppercase mb-6 pb-3 border-b-2 border-negro">
            Preguntas frecuentes
          </h2>
          <div className="space-y-6">
            {[
              {
                q: '¿Puedo comprar plantas sin pasaporte fitosanitario?',
                a: 'No. La normativa europea exige que todas las plantas vivas comercializadas dentro de la UE incluyan pasaporte fitosanitario. Es una garantía sanitaria para el comprador y un requisito legal para el vendedor.',
              },
              {
                q: '¿El pasaporte fitosanitario tiene coste adicional?',
                a: 'No. El pasaporte fitosanitario está incluido en el precio de todas nuestras plantas. No hay recargos ni costes ocultos.',
              },
              {
                q: '¿Hacéis envíos fuera de la Unión Europea (además de UK)?',
                a: 'Actualmente realizamos envíos a toda la UE y Reino Unido. Para otros destinos, consúltanos y estudiaremos la viabilidad y documentación necesaria caso por caso.',
              },
              {
                q: '¿Qué ocurre si mi envío es retenido en aduanas?',
                a: 'Nuestros envíos incluyen toda la documentación exigida, lo que minimiza el riesgo de retenciones. En el improbable caso de que ocurra, nuestro equipo te asistirá en la resolución.',
              },
            ].map((faq, i) => (
              <div key={i}>
                <h3 className="font-[family-name:var(--font-archivo-narrow)] font-bold text-base mb-1">
                  {faq.q}
                </h3>
                <p className="text-sm text-marron-claro leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-negro text-crudo p-8 lg:p-12 text-center">
          <h2 className="font-[family-name:var(--font-archivo-narrow)] text-2xl font-bold uppercase mb-3">
            ¿Necesitas más información?
          </h2>
          <p className="opacity-70 mb-6">
            Si tienes dudas sobre documentación, requisitos de importación o certificaciones, contacta con nuestro equipo.
          </p>
          <Link
            href={getFullPath('de', 'contact')}
            className="inline-flex bg-naranja text-blanco px-8 py-3 font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide hover:bg-verde transition-colors"
          >
            Contactar →
          </Link>
        </div>
      </div>
    </section>
  )
}
