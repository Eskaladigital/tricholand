import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getContactById } from '@/lib/actions/contacts'
import { ContactDetailActions } from '@/components/admin/ContactDetailActions'

const statusLabels: Record<string, string> = {
  new: 'Nuevo',
  read: 'Leído',
  replied: 'Respondido',
  archived: 'Archivado',
  spam: 'Spam',
}

export default async function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const contact = await getContactById(id)
  if (!contact) notFound()

  return (
    <>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            {contact.name}
          </h1>
          <p className="text-sm text-marron-claro mt-1">
            {new Date(contact.created_at).toLocaleString('es-ES')} · {statusLabels[contact.status] ?? contact.status}
          </p>
        </div>
        <Link
          href="/administrator/contacts"
          className="text-sm text-naranja font-semibold hover:underline"
        >
          ← Volver a contactos
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-6">
          {/* Mensaje */}
          <section className="bg-blanco border border-linea p-6">
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-4 pb-2 border-b border-linea">
              Mensaje
            </h2>
            <p className="text-sm whitespace-pre-wrap">{contact.message || '—'}</p>
          </section>
        </div>

        <div className="space-y-6">
          {/* Datos de contacto */}
          <section className="bg-blanco border border-linea p-6">
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-4 pb-2 border-b border-linea">
              Datos
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <span className="block text-xs font-bold uppercase text-marron-claro mb-0.5">Email</span>
                <a href={`mailto:${contact.email}`} className="text-naranja hover:underline">
                  {contact.email}
                </a>
              </div>
              {contact.phone && (
                <div>
                  <span className="block text-xs font-bold uppercase text-marron-claro mb-0.5">Teléfono</span>
                  <a href={`tel:${contact.phone}`} className="hover:underline">{contact.phone}</a>
                </div>
              )}
              <div>
                <span className="block text-xs font-bold uppercase text-marron-claro mb-0.5">País</span>
                <p>{contact.country}</p>
              </div>
              {contact.city && (
                <div>
                  <span className="block text-xs font-bold uppercase text-marron-claro mb-0.5">Ciudad</span>
                  <p>{contact.city}</p>
                </div>
              )}
              {contact.company && (
                <div>
                  <span className="block text-xs font-bold uppercase text-marron-claro mb-0.5">Empresa</span>
                  <p>{contact.company}</p>
                </div>
              )}
            </div>
          </section>

          {/* Tipo de consulta */}
          <section className="bg-blanco border border-linea p-6">
            <h2 className="font-[family-name:var(--font-archivo-narrow)] text-base font-bold uppercase mb-4 pb-2 border-b border-linea">
              Tipo de consulta
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-marron-claro">Tipo:</span>{' '}
                <span className={`px-2 py-0.5 text-xs font-bold uppercase ${
                  contact.contact_type === 'professional' ? 'bg-naranja/10 text-naranja' : 'bg-gray-100 text-gray-600'
                }`}>
                  {contact.contact_type === 'professional' ? 'Profesional' : 'Particular'}
                </span>
              </p>
              {contact.professional_subtype && (
                <p><span className="text-marron-claro">Subtipo:</span> {contact.professional_subtype}</p>
              )}
              {contact.inquiry_type && (
                <p><span className="text-marron-claro">Consulta:</span> {contact.inquiry_type}</p>
              )}
              {contact.referral_source && (
                <p><span className="text-marron-claro">Origen:</span> {contact.referral_source}</p>
              )}
            </div>
          </section>

          {/* Acciones */}
          <ContactDetailActions
            contactId={contact.id}
            contactName={contact.name}
            contactEmail={contact.email}
          />
        </div>
      </div>
    </>
  )
}
