import type { CookieConsent } from '@/types/CookieConsent'
import { tryCatch } from './try-catch'
import { cookies } from 'next/headers'

export const getServerSideCookieConsent = async (): Promise<CookieConsent | null> => {
    const { data } = await tryCatch(async () => {
        const cookiesStore = await cookies()

        const consentCookie = cookiesStore.get('cookieConsent')

        if (!consentCookie) {
            return null
        }

        const value = consentCookie.value
        const decodedValue = decodeURIComponent(value)

        const json: CookieConsent = JSON.parse(decodedValue)

        return json
    }, 'getServerSideCookieConsent')

    return data
}
