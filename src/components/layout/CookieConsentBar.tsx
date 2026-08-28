'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getFullPath } from '@/lib/i18n/paths'
import { getLocaleFromPath } from '@/lib/i18n'

export const OPEN_COOKIE_SETTINGS = 'openCookieSettings'
const KEY = 'tricholand_cookie_consent'
const PREFS_KEY = 'tricholand_cookie_preferences'

type Prefs = {
  necessary: true
  analytics: boolean
  functional: boolean
  marketing: boolean
}

const ALL_ON: Prefs = { necessary: true, analytics: true, functional: true, marketing: true }
const ONLY_NECESSARY: Prefs = { necessary: true, analytics: false, functional: false, marketing: false }

const COPY: Record<string, Record<string, string>> = {
  es: {
    bannerLabel: 'Banner de consentimiento de cookies',
    title: 'Utilizamos cookies',
    text: 'Usamos cookies propias y de terceros para mejorar tu experiencia, analizar el tráfico y mostrarte contenido personalizado. Puedes aceptar todas o configurar tus preferencias.',
    policy: 'Política de privacidad',
    configure: 'Configurar',
    acceptAll: 'Aceptar todas',
    settingsTitle: 'Configuración de cookies',
    settingsIntro: 'Elige qué tipos de cookies deseas aceptar. Las cookies necesarias no se pueden desactivar ya que son imprescindibles para el funcionamiento del sitio.',
    necessary: 'Cookies necesarias',
    necessaryDesc: 'Estas cookies son esenciales para el funcionamiento del sitio web. Sin ellas, el sitio no funcionaría correctamente.',
    analytics: 'Cookies analíticas',
    analyticsDesc: 'Nos permiten contar las visitas y analizar cómo los usuarios navegan por el sitio para mejorarlo.',
    functional: 'Cookies funcionales',
    functionalDesc: 'Permiten recordar tus preferencias para una experiencia más personalizada.',
    marketing: 'Cookies de marketing',
    marketingDesc: 'Se utilizan para mostrarte anuncios relevantes y medir la efectividad de las campañas publicitarias.',
    alwaysOn: 'Siempre activas',
    more: 'Más información en la',
    reject: 'Rechazar todas',
    save: 'Guardar preferencias',
    close: 'Cerrar',
    footer: 'Configurar cookies',
  },
  en: {
    bannerLabel: 'Cookie consent banner',
    title: 'We use cookies',
    text: 'We use our own and third-party cookies to improve your experience, analyse traffic and show you personalised content. You can accept all or set your preferences.',
    policy: 'Privacy policy',
    configure: 'Settings',
    acceptAll: 'Accept all',
    settingsTitle: 'Cookie settings',
    settingsIntro: 'Choose which cookies to accept. Necessary cookies cannot be turned off because they are essential for the site to work.',
    necessary: 'Necessary cookies',
    necessaryDesc: 'These cookies are essential for the website to work. Without them, the site would not function correctly.',
    analytics: 'Analytics cookies',
    analyticsDesc: 'Allow us to count visits and analyse how users browse the site in order to improve it.',
    functional: 'Functional cookies',
    functionalDesc: 'Remember your preferences for a more personalised experience.',
    marketing: 'Marketing cookies',
    marketingDesc: 'Used to show you relevant ads and measure the effectiveness of advertising campaigns.',
    alwaysOn: 'Always on',
    more: 'More information in our',
    reject: 'Reject all',
    save: 'Save preferences',
    close: 'Close',
    footer: 'Manage cookies',
  },
}

function t(locale: string, key: string) {
  return COPY[locale]?.[key] || COPY.es[key]
}

function updateGtag(prefs: Prefs) {
  if (typeof window === 'undefined' || !(window as any).gtag) return
  const analytics = prefs.analytics ? 'granted' : 'denied'
  const ads = prefs.marketing ? 'granted' : 'denied'
  ;(window as any).gtag('consent', 'update', {
    analytics_storage: analytics,
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  })
}

function persist(prefs: Prefs) {
  localStorage.setItem(KEY, prefs.analytics ? 'granted' : 'denied')
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs))
  updateGtag(prefs)
}

function readPrefs(): Prefs | null {
  try {
    const raw = localStorage.getItem(PREFS_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Prefs>
      return {
        necessary: true,
        analytics: Boolean(parsed.analytics),
        functional: Boolean(parsed.functional),
        marketing: Boolean(parsed.marketing),
      }
    }
    const legacy = localStorage.getItem(KEY)
    if (legacy === 'granted') return ALL_ON
    if (legacy === 'denied') return ONLY_NECESSARY
  } catch {
    /* modo privado */
  }
  return null
}

export function openCookieSettings() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))
}

export function CookieSettingsButton({
  className,
  locale = 'es',
}: {
  className?: string
  locale?: string
}) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      {t(locale, 'footer')}
    </button>
  )
}

function CookieIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2a9.5 9.5 0 0 0-1.2 18.93A10 10 0 1 0 21.8 11.4 7 7 0 0 1 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="8.2" cy="10" r="1.1" fill="currentColor" />
      <circle cx="12.5" cy="8" r="1" fill="currentColor" />
      <circle cx="10.5" cy="14.2" r="1.15" fill="currentColor" />
    </svg>
  )
}

export function CookieConsentBar() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname || '/')
  const isAdmin = Boolean(pathname?.startsWith('/administrator'))
  const [view, setView] = useState<'hidden' | 'banner' | 'settings'>('hidden')
  const [prefs, setPrefs] = useState<Prefs>(ALL_ON)

  useEffect(() => {
    if (isAdmin) return
    const stored = readPrefs()
    if (stored) {
      setPrefs(stored)
      updateGtag(stored)
    } else {
      setView('banner')
    }
    const open = () => {
      const current = readPrefs()
      if (current) setPrefs(current)
      setView('settings')
    }
    window.addEventListener(OPEN_COOKIE_SETTINGS, open)
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, open)
  }, [isAdmin])

  const acceptAll = useCallback(() => {
    persist(ALL_ON)
    setPrefs(ALL_ON)
    setView('hidden')
  }, [])

  const rejectAll = useCallback(() => {
    persist(ONLY_NECESSARY)
    setPrefs(ONLY_NECESSARY)
    setView('hidden')
  }, [])

  const save = useCallback(() => {
    persist(prefs)
    setView('hidden')
  }, [prefs])

  if (isAdmin || view === 'hidden') return null

  const privacyHref = getFullPath(locale, 'privacy')

  if (view === 'settings') {
    return (
      <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 bg-black/50" role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title">
        <div className="bg-crudo rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col text-negro">
          <div className="flex items-center justify-between p-6 border-b border-negro/10">
            <div className="flex items-center gap-3">
              <CookieIcon className="h-8 w-8 text-naranja" />
              <h2 id="cookie-settings-title" className="text-xl font-bold">{t(locale, 'settingsTitle')}</h2>
            </div>
            <button type="button" onClick={() => setView(readPrefs() ? 'hidden' : 'banner')} className="p-2 opacity-50 hover:opacity-100" aria-label={t(locale, 'close')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <p className="opacity-70 mb-6">{t(locale, 'settingsIntro')}</p>
            <div className="space-y-4">
              <TriCategory
                title={t(locale, 'necessary')}
                description={t(locale, 'necessaryDesc')}
                enabled
                required
                alwaysOn={t(locale, 'alwaysOn')}
                icon="shield"
              />
              <TriCategory
                title={t(locale, 'analytics')}
                description={t(locale, 'analyticsDesc')}
                enabled={prefs.analytics}
                onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
                icon="chart"
              />
              <TriCategory
                title={t(locale, 'functional')}
                description={t(locale, 'functionalDesc')}
                enabled={prefs.functional}
                onChange={(v) => setPrefs((p) => ({ ...p, functional: v }))}
                icon="cog"
              />
              <TriCategory
                title={t(locale, 'marketing')}
                description={t(locale, 'marketingDesc')}
                enabled={prefs.marketing}
                onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
                icon="megaphone"
              />
            </div>
            <p className="text-sm opacity-55 mt-6">
              {t(locale, 'more')}{' '}
              <Link href={privacyHref} className="text-naranja hover:underline" onClick={() => setView('hidden')}>
                {t(locale, 'policy')}
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-negro/10 bg-negro/5">
            <button type="button" onClick={rejectAll} className="flex-1 px-4 py-2.5 border border-negro/20 rounded-lg font-medium hover:bg-white">{t(locale, 'reject')}</button>
            <button type="button" onClick={save} className="flex-1 px-4 py-2.5 bg-white border border-negro/20 rounded-lg font-medium">{t(locale, 'save')}</button>
            <button type="button" onClick={acceptAll} className="flex-1 px-4 py-2.5 bg-naranja text-white rounded-lg font-medium">{t(locale, 'acceptAll')}</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] p-4 bg-crudo border-t border-negro/10 shadow-lg md:p-6 text-negro" role="region" aria-label={t(locale, 'bannerLabel')}>
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        <div className="flex-1 flex items-start gap-3">
          <CookieIcon className="h-8 w-8 text-naranja flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold mb-1">{t(locale, 'title')}</h3>
            <p className="text-sm opacity-70">
              {t(locale, 'text')}{' '}
              <Link href={privacyHref} className="text-naranja hover:underline">{t(locale, 'policy')}</Link>
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 flex-shrink-0">
          <button type="button" onClick={() => setView('settings')} className="px-4 py-2 bg-negro/10 rounded-lg font-medium text-sm hover:bg-negro/15">{t(locale, 'configure')}</button>
          <button type="button" onClick={acceptAll} className="px-4 py-2 bg-naranja text-white rounded-lg font-medium text-sm">{t(locale, 'acceptAll')}</button>
        </div>
      </div>
    </div>
  )
}

function CategoryGlyph({ icon }: { icon: 'shield' | 'chart' | 'cog' | 'megaphone' }) {
  const d =
    icon === 'shield'
      ? 'M12 3 4 6v6c0 5 3.4 8.4 8 9.5C16.6 20.4 20 17 20 12V6l-8-3Z'
      : icon === 'chart'
        ? 'M4 19h16M7 16v-5m5 5V8m5 8V5'
        : icon === 'cog'
          ? 'M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm8.2 3.1-.9-.5.2-1-1.7-1.7-1 .2-.5-.9.2-1.9h-2.4l.2 1.9-.5.9-1-.2-1.7 1.7.2 1-.9.5-1.8.6v2.4l1.8.6.9.5-.2 1 1.7 1.7 1-.2.5.9-.2 1.9h2.4l-.2-1.9.5-.9 1 .2 1.7-1.7-.2-1 .9-.5 1.8-.6v-2.4l-1.8-.6Z'
          : 'M4 10v4h3l5 4V6L7 10H4Zm14.5 2a5.5 5.5 0 0 0-1.6-3.9l-1.1 1.1A4 4 0 0 1 17 12a4 4 0 0 1-1.2 2.8l1.1 1.1A5.5 5.5 0 0 0 18.5 12Z'
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d={d} strokeLinejoin="round" />
    </svg>
  )
}

function TriCategory({
  title,
  description,
  enabled,
  required,
  alwaysOn,
  onChange,
  icon,
}: {
  title: string
  description: string
  enabled: boolean
  required?: boolean
  alwaysOn?: string
  onChange?: (v: boolean) => void
  icon: 'shield' | 'chart' | 'cog' | 'megaphone'
}) {
  return (
    <div className={`p-4 rounded-xl border-2 ${enabled ? 'border-naranja bg-naranja/10' : 'border-negro/10 bg-negro/5'}`}>
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${enabled ? 'bg-naranja text-white' : 'bg-negro/10 text-negro/50'}`} aria-hidden="true">
          <CategoryGlyph icon={icon} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-3 mb-1">
            <h3 className="font-semibold">{title}</h3>
            {required ? (
              <span className="text-xs bg-negro/10 px-2 py-1 rounded-full whitespace-nowrap">{alwaysOn}</span>
            ) : (
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input type="checkbox" className="sr-only peer" checked={enabled} onChange={(e) => onChange?.(e.target.checked)} aria-label={title} />
                <span className="w-10 h-6 bg-negro/20 rounded-full peer-checked:bg-naranja transition-colors" />
                <span className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
              </label>
            )}
          </div>
          <p className="text-sm opacity-65">{description}</p>
        </div>
      </div>
    </div>
  )
}
