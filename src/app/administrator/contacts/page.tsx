import Link from 'next/link'
import { getContacts, deleteContact } from '@/lib/actions/contacts'
import { TableActions } from '@/components/admin/TableActions'

const statusLabels: Record<string, string> = {
  new: 'Nuevo',
  read: 'Leído',
  replied: 'Respondido',
  archived: 'Archivado',
  spam: 'Spam',
}

export default async function ContactsPage() {
  const contacts = await getContacts()
  const newCount = contacts.filter((c) => c.status === 'new').length

  return (
    <>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
              Contactos
            </h1>
            <p className="text-sm text-marron-claro mt-1">
              {contacts.length} contactos · {newCount} nuevos
            </p>
          </div>
          <button className="bg-verde text-blanco px-4 py-2 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide hover:opacity-90 transition-opacity">
            Exportar CSV
          </button>
        </div>

        <div className="bg-blanco border border-linea overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-crudo border-b border-linea">
                  <th className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">Fecha</th>
                  <th className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">Nombre</th>
                  <th className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">Empresa</th>
                  <th className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">Email</th>
                  <th className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">País</th>
                  <th className="text-center px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">Tipo</th>
                  <th className="text-center px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">Estado</th>
                  <th className="text-center px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-marron-claro">
                      No hay contactos. Los contactos del formulario aparecerán aquí.
                    </td>
                  </tr>
                ) : (
                  contacts.map((contact) => (
                    <tr key={contact.id} className="border-b border-linea/50 hover:bg-crudo/50 transition-colors">
                      <td className="px-4 py-3 text-xs text-marron-claro">
                        {new Date(contact.created_at).toLocaleDateString('es-ES')}
                      </td>
                      <td className="px-4 py-3 font-bold">
                        <Link href={`/administrator/contacts/${contact.id}`} className="hover:text-naranja hover:underline">
                          {contact.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-marron-claro">{contact.company || '—'}</td>
                      <td className="px-4 py-3">
                        <a href={`mailto:${contact.email}`} className="text-naranja hover:underline text-xs" onClick={(e) => e.stopPropagation()}>
                          {contact.email}
                        </a>
                      </td>
                      <td className="px-4 py-3">{contact.country}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 text-xs font-bold uppercase ${
                          contact.contact_type === 'professional' ? 'bg-naranja/10 text-naranja' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {contact.contact_type === 'professional' ? 'PRO' : 'Part.'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 text-xs font-bold uppercase ${
                          contact.status === 'new' ? 'bg-yellow-100 text-yellow-700' :
                          contact.status === 'replied' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-400'
                        }`}>
                          {statusLabels[contact.status] ?? contact.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <TableActions
                          editHref={`/administrator/contacts/${contact.id}`}
                          deleteAction={deleteContact}
                          entityId={contact.id}
                          entityLabel={`el contacto de ${contact.name}`}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
    </>
  )
}
