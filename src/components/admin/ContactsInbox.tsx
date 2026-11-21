'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { deleteContact, type ContactRow } from '@/lib/actions/contacts'
import {
  CONTACT_STATUS_LABELS,
  PROFESSIONAL_SUBTYPE_LABELS,
  REFERRAL_LABELS,
  contactLabel,
  contactMailto,
  formatContactWhen,
  inquiryLabel,
  type ContactStatus,
} from '@/types/contact'

const STATUSES: ContactStatus[] = ['new', 'read', 'replied', 'archived', 'spam']

const statusClass: Record<ContactStatus, string> = {
  new: 'bg-amber-100 text-amber-900',
  read: 'bg-verde-claro text-verde-oscuro',
  replied: 'bg-green-100 text-green-800',
  archived: 'bg-gray-100 text-gray-500',
  spam: 'bg-red-50 text-red-700',
}

function csvCell(value: string): string {
  const safe = /^[=+\-@]/.test(value) ? `'${value}` : value
  return `"${safe.replace(/"/g, '""')}"`
}

function exportContacts(rows: ContactRow[]) {
  const headers = [
    'Fecha',
    'Nombre',
    'Empresa',
    'NIF / IVA',
    'Email',
    'Teléfono',
    'País',
    'Ciudad',
    'Tipo',
    'Perfil',
    'Consulta',
    'Origen',
    'Estado',
    'Mensaje',
  ]
  const lines = rows.map((c) =>
    [
      new Date(c.created_at).toLocaleString('es-ES'),
      c.name,
      c.company ?? '',
      c.vat_number ?? '',
      c.email,
      c.phone ?? '',
      c.country,
      c.city ?? '',
      c.contact_type === 'professional' ? 'Profesional' : 'Particular',
      contactLabel(PROFESSIONAL_SUBTYPE_LABELS, c.professional_subtype, ''),
      inquiryLabel(c.inquiry_type),
      contactLabel(REFERRAL_LABELS, c.referral_source, ''),
      CONTACT_STATUS_LABELS[c.status] ?? c.status,
      (c.message ?? '').replace(/\s+/g, ' ').trim(),
    ]
      .map((v) => csvCell(String(v)))
      .join(';')
  )
  const csv = `\uFEFF${headers.join(';')}\n${lines.join('\n')}`
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `contactos-tricholand-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

function MailLink({ contact, className = '' }: { contact: ContactRow; className?: string }) {
  return (
    <a
      href={contactMailto(contact.email, contact.name, contact.inquiry_type)}
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
      title="Responder"
      aria-label={`Responder a ${contact.name}`}
      className={`p-2 text-naranja hover:bg-naranja/10 rounded transition-colors ${className}`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </a>
  )
}

function DeleteButton({ id, name, className = '' }: { id: string; name: string; className?: string }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  async function onDelete(event: React.MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    if (!confirm(`¿Borrar el contacto de ${name}? Esta acción no se puede deshacer.`)) return
    setDeleting(true)
    const { error } = await deleteContact(id)
    setDeleting(false)
    if (error) alert(error)
    else router.refresh()
  }

  return (
    <button
      type="button"
      onClick={onDelete}
      onKeyDown={(event) => event.stopPropagation()}
      disabled={deleting}
      title="Borrar"
      aria-label={`Borrar el contacto de ${name}`}
      className={`p-2 text-marron-claro hover:text-red-700 hover:bg-red-50 rounded transition-colors disabled:opacity-50 ${className}`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  )
}

export function ContactsInbox({ contacts }: { contacts: ContactRow[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')

  const estadoParam = searchParams.get('estado')
  const estado: ContactStatus | 'all' = STATUSES.includes(estadoParam as ContactStatus)
    ? (estadoParam as ContactStatus)
    : 'all'
  const tipoParam = searchParams.get('tipo')
  const tipo = tipoParam === 'particular' || tipoParam === 'professional' ? tipoParam : 'all'

  function setParam(key: 'estado' | 'tipo', value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'all') params.delete(key)
    else params.set(key, value)
    const next = params.toString()
    router.replace(next ? `?${next}` : '/administrator/contacts', { scroll: false })
  }

  const counts = useMemo(() => {
    const byStatus = Object.fromEntries(STATUSES.map((s) => [s, 0])) as Record<ContactStatus, number>
    let particular = 0
    let professional = 0
    for (const c of contacts) {
      byStatus[c.status] = (byStatus[c.status] ?? 0) + 1
      if (c.contact_type === 'professional') professional += 1
      else particular += 1
    }
    return { byStatus, particular, professional }
  }, [contacts])

  const unread = counts.byStatus.new
  const waiting = counts.byStatus.new + counts.byStatus.read

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return contacts.filter((c) => {
      if (estado !== 'all' && c.status !== estado) return false
      if (tipo !== 'all' && c.contact_type !== tipo) return false
      if (!q) return true
      const haystack = [
        c.name,
        c.company,
        c.email,
        c.phone,
        c.country,
        c.city,
        c.message,
        inquiryLabel(c.inquiry_type),
        contactLabel(PROFESSIONAL_SUBTYPE_LABELS, c.professional_subtype, ''),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [contacts, estado, tipo, query])

  const filtering = estado !== 'all' || tipo !== 'all' || query.trim().length > 0

  return (
    <>
      <div className="flex flex-wrap justify-between items-end gap-4 mb-6">
        <div>
          <h1 className="font-[family-name:var(--font-archivo-narrow)] text-3xl font-bold uppercase">
            Contactos
          </h1>
          <p className="text-sm text-marron-claro mt-1">
            {contacts.length} en total
            <span className="mx-1.5">·</span>
            <span className={unread > 0 ? 'text-naranja font-semibold' : ''}>
              {unread} sin leer
            </span>
            <span className="mx-1.5">·</span>
            {waiting} por responder
          </p>
        </div>
        <button
          type="button"
          onClick={() => exportContacts(visible)}
          disabled={visible.length === 0}
          className="bg-verde text-blanco px-4 py-2 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {filtering ? `Exportar ${visible.length}` : 'Exportar CSV'}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <FilterChip active={estado === 'all'} onClick={() => setParam('estado', 'all')}>
          Todos <Count n={contacts.length} active={estado === 'all'} />
        </FilterChip>
        {STATUSES.map((s) => (
          <FilterChip
            key={s}
            active={estado === s}
            attention={s === 'new' && counts.byStatus[s] > 0 && estado !== s}
            onClick={() => setParam('estado', s)}
          >
            {CONTACT_STATUS_LABELS[s]} <Count n={counts.byStatus[s]} active={estado === s} />
          </FilterChip>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <label className="flex-1 block">
          <span className="sr-only">Buscar contactos</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar nombre, empresa, email o mensaje"
            className="w-full px-3 py-2.5 border border-linea bg-blanco text-sm focus:outline-none focus:border-naranja"
          />
        </label>
        <div className="inline-flex border border-linea self-start" role="group" aria-label="Tipo de contacto">
          {(
            [
              ['all', 'Todos', contacts.length],
              ['particular', 'Particular', counts.particular],
              ['professional', 'Profesional', counts.professional],
            ] as const
          ).map(([value, label, n]) => (
            <button
              key={value}
              type="button"
              onClick={() => setParam('tipo', value)}
              className={`px-3 py-2.5 text-xs font-bold uppercase tracking-wide transition-colors ${
                tipo === value ? 'bg-negro text-crudo' : 'bg-blanco text-marron-claro hover:text-negro'
              }`}
            >
              {label}
              <span className={`ml-1.5 ${tipo === value ? 'text-crudo/70' : ''}`}>{n}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-blanco border border-linea overflow-hidden">
        {contacts.length === 0 ? (
          <p className="px-4 py-12 text-center text-sm text-marron-claro">
            No hay contactos. Los del formulario aparecerán aquí.
          </p>
        ) : visible.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <p className="text-sm text-marron-claro">Ningún contacto con este filtro.</p>
            <button
              type="button"
              onClick={() => {
                setQuery('')
                router.replace('/administrator/contacts', { scroll: false })
              }}
              className="mt-3 text-sm text-naranja font-semibold hover:underline"
            >
              Quitar filtros
            </button>
          </div>
        ) : (
          <>
            <ul className="md:hidden divide-y divide-linea/70">
              {visible.map((c) => (
                <ContactCard key={c.id} contact={c} />
              ))}
            </ul>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-crudo border-b border-linea">
                    {['Cuándo', 'Contacto', 'Consulta', 'Lugar', 'Estado', ''].map((label) => (
                      <th
                        key={label || 'acciones'}
                        className="text-left px-4 py-3 font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide text-marron-claro"
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visible.map((c) => (
                    <ContactRowView key={c.id} contact={c} onOpen={() => router.push(`/administrator/contacts/${c.id}`)} />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      {visible.length > 0 && (
        <p className="mt-3 text-xs text-marron-claro">
          {filtering
            ? `${visible.length} de ${contacts.length}`
            : 'Pulsa una fila para abrir el mensaje.'}
        </p>
      )}
    </>
  )
}

function Count({ n, active }: { n: number; active: boolean }) {
  return <span className={`ml-1.5 tabular-nums ${active ? 'text-crudo/70' : 'text-marron-claro'}`}>{n}</span>
}

function FilterChip({
  active,
  attention,
  onClick,
  children,
}: {
  active: boolean
  attention?: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wide border transition-colors ${
        active
          ? 'bg-negro text-crudo border-negro'
          : attention
            ? 'bg-blanco text-naranja border-naranja hover:bg-naranja/5'
            : 'bg-blanco text-marron border-linea hover:border-marron-claro'
      }`}
    >
      {children}
    </button>
  )
}

function preview(message: string | null): string {
  return (message ?? '').replace(/\s+/g, ' ').trim()
}

function ContactCard({ contact }: { contact: ContactRow }) {
  const when = formatContactWhen(contact.created_at)
  const isNew = contact.status === 'new'
  const done = contact.status === 'replied' || contact.status === 'archived' || contact.status === 'spam'
  return (
    <li className={`relative ${isNew ? 'bg-naranja/[0.04]' : ''} ${contact.status === 'spam' ? 'opacity-60' : ''}`}>
      <Link href={`/administrator/contacts/${contact.id}`} className="block px-4 py-3.5 pr-14">
        <div className="flex items-baseline justify-between gap-3">
          <span className={`font-bold ${done ? 'text-marron' : 'text-negro'}`}>
            {contact.name}
          </span>
          <time dateTime={contact.created_at} className="text-[11px] text-marron-claro shrink-0" title={when.absolute}>
            {when.relative}
          </time>
        </div>
        <p className="text-xs text-marron-claro mt-0.5 truncate">
          {[contact.company, contact.country].filter(Boolean).join(' · ') || contact.email}
        </p>
        <p className="text-sm mt-1.5 line-clamp-3">
          <span className="font-semibold">{inquiryLabel(contact.inquiry_type)}</span>
          {preview(contact.message) && (
            <span className="text-marron-claro"> — {preview(contact.message)}</span>
          )}
        </p>
        <span className={`inline-block mt-2 px-2 py-0.5 text-[10px] font-bold uppercase ${statusClass[contact.status]}`}>
          {CONTACT_STATUS_LABELS[contact.status]}
        </span>
      </Link>
      <div className="absolute top-1.5 right-1 flex flex-col">
        <MailLink contact={contact} />
        <DeleteButton id={contact.id} name={contact.name} />
      </div>
    </li>
  )
}

function ContactRowView({ contact, onOpen }: { contact: ContactRow; onOpen: () => void }) {
  const when = formatContactWhen(contact.created_at)
  const isNew = contact.status === 'new'
  const done = contact.status === 'replied' || contact.status === 'archived' || contact.status === 'spam'
  const place = [contact.city, contact.country].filter(Boolean).join(', ')
  const text = preview(contact.message)

  return (
    <tr
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onOpen()
      }}
      tabIndex={0}
      className={`border-b border-linea/50 cursor-pointer transition-colors hover:bg-crudo/60 ${
        isNew ? 'bg-naranja/[0.05]' : ''
      } ${contact.status === 'spam' ? 'opacity-60' : ''}`}
    >
      <td className={`px-4 py-3 align-top whitespace-nowrap ${isNew ? 'border-l-2 border-l-naranja' : 'border-l-2 border-l-transparent'}`}>
        <time dateTime={contact.created_at} title={when.absolute} className="block text-xs font-semibold">
          {when.relative}
        </time>
        <span className="block text-[11px] text-marron-claro mt-0.5">{when.absolute}</span>
      </td>
      <td className="px-4 py-3 align-top max-w-[240px]">
        <span className={`block truncate ${done ? 'font-medium text-marron' : 'font-bold'}`}>{contact.name}</span>
        <span className="block text-xs text-marron-claro truncate">{contact.company || contact.email}</span>
        {contact.company && <span className="block text-[11px] text-marron-claro truncate">{contact.email}</span>}
      </td>
      <td className="px-4 py-3 align-top max-w-md">
        <span className="flex flex-wrap items-center gap-1.5">
          <span className="font-semibold">{inquiryLabel(contact.inquiry_type)}</span>
          <span
            className={`px-1.5 py-0.5 text-[10px] font-bold uppercase ${
              contact.contact_type === 'professional' ? 'bg-naranja/10 text-naranja' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {contact.contact_type === 'professional' ? 'Pro' : 'Part.'}
          </span>
        </span>
        {contact.professional_subtype && (
          <span className="block text-[11px] text-marron-claro mt-0.5">
            {contactLabel(PROFESSIONAL_SUBTYPE_LABELS, contact.professional_subtype)}
          </span>
        )}
        {text && <span className="block text-xs text-marron-claro mt-1 line-clamp-2">{text}</span>}
      </td>
      <td className="px-4 py-3 align-top text-xs text-marron whitespace-nowrap">{place}</td>
      <td className="px-4 py-3 align-top">
        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase whitespace-nowrap ${statusClass[contact.status]}`}>
          {CONTACT_STATUS_LABELS[contact.status]}
        </span>
      </td>
      <td className="px-2 py-3 align-top">
        <div className="flex items-center justify-end">
          <MailLink contact={contact} />
          <DeleteButton id={contact.id} name={contact.name} />
        </div>
      </td>
    </tr>
  )
}
