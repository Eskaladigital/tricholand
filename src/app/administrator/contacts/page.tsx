import { AdminSidebar } from '@/components/admin/AdminSidebar'

// Demo contacts
const contactsDemo = [
  { id: 'c_001', name: 'Marco Visser', company: 'Garden Center Holanda B.V.', email: 'marco@gcholanda.nl', country: 'Países Bajos', type: 'professional', inquiry: 'quote_catalog', status: 'new', date: '2025-01-20' },
  { id: 'c_002', name: 'Pierre Dupont', company: 'Jardinerie du Sud', email: 'pierre@jardinerie-sud.fr', country: 'Francia', type: 'professional', inquiry: 'shipping_info', status: 'replied', date: '2025-01-19' },
  { id: 'c_003', name: 'Carlos Gómez', company: null, email: 'carlos@gmail.com', country: 'España', type: 'particular', inquiry: 'purchase', status: 'new', date: '2025-01-18' },
  { id: 'c_004', name: 'Lisa van den Berg', company: 'Cactus Paradise', email: 'lisa@cactusparadise.nl', country: 'Países Bajos', type: 'professional', inquiry: 'recurring_order', status: 'replied', date: '2025-01-16' },
  { id: 'c_005', name: 'Antonio Ruiz', company: 'Paisajes del Sur', email: 'antonio@paisajesdelsur.es', country: 'España', type: 'professional', inquiry: 'quote_catalog', status: 'archived', date: '2025-01-12' },
]

export default function ContactsPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
              Contactos
            </h1>
            <p className="text-sm text-marron-claro mt-1">
              {contactsDemo.length} contactos · {contactsDemo.filter((c) => c.status === 'new').length} nuevos
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
                </tr>
              </thead>
              <tbody>
                {contactsDemo.map((contact) => (
                  <tr key={contact.id} className="border-b border-linea/50 hover:bg-crudo/50 transition-colors cursor-pointer">
                    <td className="px-4 py-3 text-xs text-marron-claro">{contact.date}</td>
                    <td className="px-4 py-3 font-bold">{contact.name}</td>
                    <td className="px-4 py-3 text-marron-claro">{contact.company || '—'}</td>
                    <td className="px-4 py-3">
                      <a href={`mailto:${contact.email}`} className="text-naranja hover:underline text-xs">
                        {contact.email}
                      </a>
                    </td>
                    <td className="px-4 py-3">{contact.country}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 text-xs font-bold uppercase ${
                        contact.type === 'professional' ? 'bg-naranja/10 text-naranja' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {contact.type === 'professional' ? 'PRO' : 'Part.'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 text-xs font-bold uppercase ${
                        contact.status === 'new' ? 'bg-yellow-100 text-yellow-700' :
                        contact.status === 'replied' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-400'
                      }`}>
                        {contact.status === 'new' ? 'Nuevo' : contact.status === 'replied' ? 'Respondido' : 'Archivado'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
