'use client'

import { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Registrar service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/administrator/sw.js', { scope: '/administrator/' })
        .catch(() => {})
    }

    // Detectar si ya está instalado (standalone o display-mode)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as { standalone?: boolean }).standalone
      || document.referrer.includes('android-app://')
    if (isStandalone) {
      setIsInstalled(true)
      return
    }

    // No mostrar si ya rechazó o instaló (localStorage)
    if (localStorage.getItem('pwa-install-dismissed') === 'true') return

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  async function handleInstall() {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') setIsInstalled(true)
    setShowPrompt(false)
    setDeferredPrompt(null)
  }

  function handleDismiss() {
    setShowPrompt(false)
    localStorage.setItem('pwa-install-dismissed', 'true')
  }

  if (!showPrompt || isInstalled) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50">
      <div className="bg-negro text-crudo p-4 rounded-lg shadow-lg border border-linea">
        <p className="font-[family-name:var(--font-archivo-narrow)] text-sm font-semibold uppercase tracking-wide mb-2">
          Instalar Tricholand Admin
        </p>
        <p className="text-xs text-crudo/80 mb-3">
          Instala la app en tu móvil para acceder al panel desde la pantalla de inicio.
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleInstall}
            className="flex-1 py-2 bg-verde text-crudo font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide hover:bg-verde-oscuro transition-colors"
          >
            Instalar
          </button>
          <button
            onClick={handleDismiss}
            className="px-3 py-2 border border-linea font-[family-name:var(--font-archivo-narrow)] text-xs font-bold uppercase tracking-wide hover:bg-white/5 transition-colors"
          >
            Ahora no
          </button>
        </div>
      </div>
    </div>
  )
}
