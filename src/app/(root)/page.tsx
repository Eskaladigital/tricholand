import { redirect } from 'next/navigation'

// La raíz redirige a /es/ (el middleware se encarga de detectar el idioma del navegador)
// Este page.tsx es un fallback por si el middleware no actúa
export default function RootPage() {
  redirect('/es')
}
