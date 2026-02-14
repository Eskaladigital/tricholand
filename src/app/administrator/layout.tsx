import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Administración | Tricholand',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {children}
    </div>
  )
}
