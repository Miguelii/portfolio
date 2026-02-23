import type { CookieConsent } from '@/types/CookieConsent'
import { Logger } from './logger'

export const getClientSideCookieConsent = (): CookieConsent | null => {
    // We dont use `tryCatch` here because we dont want the function to be async
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
