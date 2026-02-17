'use client'

import type { CookieConsent } from '@/types/CookieConsent'
import { Logger } from './logger'

// client side logic

export default class CookieConsentManager {
    static getCookieConsent(): CookieConsent | null {
        try {
            if (typeof document === 'undefined') {
                return null
            }

            const consentCookie = document.cookie
                .split('; ')
                .find((row) => row.startsWith('cookieConsent='))

            if (!consentCookie) {
                return null
            }

            const value = consentCookie.split('=')[1]
            const decodedValue = decodeURIComponent(value)

            const json: CookieConsent = JSON.parse(decodedValue)

            return json
        } catch (error) {
            Logger({
                level: 'error',
                error,
                context: 'getCookieConsent',
            })
            return null
        }
    }
}
