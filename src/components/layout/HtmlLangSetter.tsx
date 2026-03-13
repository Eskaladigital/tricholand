'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const SUPPORTED_LOCALES = ['es', 'en', 'de', 'fr', 'it', 'pt', 'nl'] as const
const DEFAULT_LOCALE = 'es'

export function HtmlLangSetter() {
  const pathname = usePathname()

  useEffect(() => {
    const segment = pathname.split('/')[1]
    const lang = SUPPORTED_LOCALES.includes(segment as (typeof SUPPORTED_LOCALES)[number])
      ? segment
      : DEFAULT_LOCALE
    document.documentElement.lang = lang
  }, [pathname])

  return null
}
