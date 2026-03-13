'use client'

import dynamic from 'next/dynamic'

const CookieConsent = dynamic(
    () => import('@/components/cookie-consent').then((mod) => ({ default: mod.CookieConsent })),
    { ssr: false }
)

export function CookieConsentLazy() {
    return <CookieConsent />
}
