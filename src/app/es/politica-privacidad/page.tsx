import type { Metadata } from 'next'
import { getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Política de privacidad y protección de datos personales de Tricholand.',
  robots: { index: false, follow: false },
  alternates: getAlternatesMetadata('es', 'privacy'),
}

export default function PoliticaPrivacidadPage() {
  return (
    <section className="px-5 lg:px-8 py-16 max-w-3xl mx-auto">
      <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase mb-6">
        Política de privacidad
      </h1>

      <div className="space-y-6 text-sm text-marron-claro leading-relaxed">
        <p>
          <strong className="text-negro">Última actualización:</strong> Enero 2025
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          1. Responsable del tratamiento
        </h2>
        <p>
          Tricholand · Murcia, España · info@tricholand.com
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          2. Datos que recopilamos
        </h2>
        <p>
          A través del formulario de contacto recogemos: nombre, email, teléfono (opcional), empresa (opcional),
          país, ciudad (opcional) y el contenido de tu mensaje. También recogemos el tipo de consulta y cómo
          nos has conocido para mejorar nuestro servicio.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          3. Finalidad del tratamiento
        </h2>
        <p>
          Los datos se tratan con la finalidad de: gestionar las consultas recibidas a través de la web,
          enviar presupuestos solicitados y dar respuesta a las peticiones de información.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          4. Base legal
        </h2>
        <p>
          El tratamiento se basa en el consentimiento explícito del interesado, otorgado al aceptar
          esta política y enviar el formulario de contacto.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          5. Conservación de datos
        </h2>
        <p>
          Los datos se conservarán mientras sea necesario para dar respuesta a la consulta y, en su caso,
          durante el tiempo necesario para cumplir con las obligaciones legales aplicables.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          6. Derechos del interesado
        </h2>
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del
          tratamiento y portabilidad de datos dirigiéndote a info@tricholand.com.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          7. Cookies
        </h2>
        <p>
          Este sitio web no utiliza cookies de terceros ni cookies de seguimiento. Solo se utilizan
          cookies técnicas estrictamente necesarias para el funcionamiento de la web.
        </p>
      </div>
    </section>
  )
}
