import { beforeEach, describe, expect, it } from 'vitest'
import { getClientSideCookieConsent } from '../get-client-side-cookie-consent'

describe('getClientSideCookieConsent', () => {
    beforeEach(() => {
        Object.defineProperty(document, 'cookie', {
            writable: true,
            value: '',
        })
    })

    it('returns null if document is undefined', () => {
        const originalDocument = globalThis.document
        // @ts-expect-error - Simulate document being undefined
        delete globalThis.document

        const result = getClientSideCookieConsent()
        expect(result).toBeNull()

        globalThis.document = originalDocument
    })

    it('returns null if cookieConsent cookie is not present', () => {
        document.cookie = 'otherCookie=someValue'

        const result = getClientSideCookieConsent()
        expect(result).toBeNull()
    })

    it('returns parsed CookieConsent when cookie exists', () => {
        const consent = { analytics: true, marketing: false }
        document.cookie = `cookieConsent=${encodeURIComponent(JSON.stringify(consent))}`

        const result = getClientSideCookieConsent()
        expect(result).toEqual(consent)
    })

    it('returns null on invalid JSON', () => {
        document.cookie = `cookieConsent=${encodeURIComponent('{invalid json')}`

        const result = getClientSideCookieConsent()

        expect(result).toBeNull()
    })
})
