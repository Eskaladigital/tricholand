import type { Metadata } from 'next'
import { ContactFormWizard } from '@/components/contact/ContactFormWizard'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contacta con Tricholand para solicitar presupuesto de Trichocereus al por mayor. Respuesta en menos de 24h laborables.',
}

export default function ContactoPage() {
  return (
    <section className="px-5 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 pb-4 border-b-2 border-negro">
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Contacto
          </h1>
          <p className="text-marron-claro mt-2">
            Solicita tu presupuesto o haznos cualquier consulta. Respondemos en menos de 24h laborables.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* Form */}
          <ContactFormWizard locale="fr" />

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Direct contact */}
            <div className="bg-negro text-crudo p-6">
              <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide text-naranja mb-4">
                Contacto directo
              </h3>
              <a
                href="mailto:info@tricholand.com"
                className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold hover:text-naranja transition-colors block mb-2"
              >
                info@tricholand.com
              </a>
              <p className="text-sm opacity-60">Murcia, España</p>

              <div className="flex gap-4 mt-4 pt-4 border-t border-white/10">
                <a
                  href="https://www.facebook.com/tricholand/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm opacity-65 hover:opacity-100 transition-opacity"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/tricholand/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm opacity-65 hover:opacity-100 transition-opacity"
                >
                  Instagram
                </a>
              </div>
            </div>

            {/* FAQ mini */}
            <div className="bg-blanco border border-linea p-6">
              <h3 className="font-[family-name:var(--font-archivo-narrow)] text-sm font-bold uppercase tracking-wide text-naranja mb-4">
                Preguntas rápidas
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-bold mb-0.5">¿Cuál es el pedido mínimo?</h4>
                  <p className="text-marron-claro">100 unidades por pedido.</p>
                </div>
                <div>
                  <h4 className="font-bold mb-0.5">¿Hacéis envíos a particulares?</h4>
                  <p className="text-marron-claro">
                    Somos un vivero mayorista B2B. Para compras pequeñas, podemos orientarte a distribuidores en tu zona.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-0.5">¿Cuánto tardáis en responder?</h4>
                  <p className="text-marron-claro">Menos de 24 horas laborables.</p>
                </div>
                <div>
                  <h4 className="font-bold mb-0.5">¿Enviáis a toda Europa?</h4>
                  <p className="text-marron-claro">
                    Sí. UE y Reino Unido con toda la documentación fitosanitaria incluida.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
