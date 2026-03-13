import type { Metadata } from 'next'
import { getAlternatesMetadata } from '@/lib/i18n/paths'

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Política de privacidad y protección de datos personales de Tricholand.',
  robots: 'index, follow',
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

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          8. Seguridad de los datos
        </h2>
        <p>
          Tricholand se compromete a proteger la información personal de los usuarios mediante medidas de seguridad técnicas y organizativas adecuadas. Los datos recogidos a través del formulario de contacto se almacenan de forma segura y solo son accesibles por el personal autorizado para gestionar las consultas comerciales. No compartimos, vendemos ni cedemos tus datos personales a terceros, salvo obligación legal.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          9. Transferencias internacionales de datos
        </h2>
        <p>
          Los datos personales recogidos se almacenan en servidores ubicados dentro del Espacio Económico Europeo. En caso de utilizar servicios que impliquen transferencia de datos fuera del EEE, nos aseguraremos de que existan garantías adecuadas de protección conforme al RGPD, mediante cláusulas contractuales tipo aprobadas por la Comisión Europea o mecanismos equivalentes.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          10. Menores de edad
        </h2>
        <p>
          Este sitio web está dirigido exclusivamente a profesionales y empresas del sector viverístico. No recogemos intencionadamente datos de menores de 18 años. Si detectamos que se han recogido datos de un menor sin el consentimiento de sus padres o tutores, procederemos a eliminarlos de inmediato.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          11. Modificaciones de la política de privacidad
        </h2>
        <p>
          Tricholand se reserva el derecho de modificar esta política de privacidad en cualquier momento. Cualquier cambio será notificado mediante actualización de la fecha de "Última actualización" en la parte superior de este documento. Te recomendamos revisar esta política periódicamente para estar informado sobre cómo protegemos tu información personal.
        </p>

        <h2 className="font-[family-name:var(--font-archivo-narrow)] text-lg font-bold text-negro uppercase mt-8">
          12. Contacto para cuestiones de privacidad
        </h2>
        <p>
          Si tienes dudas, consultas o deseas ejercer tus derechos en materia de protección de datos, puedes contactar con nosotros en: <a href="mailto:info@tricholand.com" className="text-naranja hover:underline">info@tricholand.com</a>. Te responderemos en el plazo máximo de un mes desde la recepción de tu solicitud.
        </p>
      </div>
    </section>
  )
}
