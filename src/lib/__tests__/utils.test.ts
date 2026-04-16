import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getBuildId, getClientSideCookieConsent, normalizePath } from '@/lib/utils'

describe('utils', () => {
    describe('getBuildId', () => {
        it('should return NEXT_PUBLIC_BUILD_TIMESTAMP when it is defined', () => {
            vi.stubEnv('NEXT_PUBLIC_BUILD_TIMESTAMP', '1234567890')
            expect(getBuildId()).toBe('1234567890')
        })

        it('should return "1" as default when NEXT_PUBLIC_BUILD_TIMESTAMP is undefined', () => {
            vi.stubEnv('NEXT_PUBLIC_BUILD_TIMESTAMP', undefined)
            expect(getBuildId()).toBe('1')
        })

        it('should return the environment variable value when set to any string', () => {
            vi.stubEnv('NEXT_PUBLIC_BUILD_TIMESTAMP', 'build-id-123')
            expect(getBuildId()).toBe('build-id-123')
        })
    })

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

    describe('normalizePath', () => {
        it('should remove trailing slash from path', () => {
            expect(normalizePath('/path/to/page/')).toBe('/path/to/page')
        })

        it('should return "/" when path is only a slash', () => {
            expect(normalizePath('/')).toBe('/')
        })

        it('should not modify path without trailing slash', () => {
            expect(normalizePath('/path/to/page')).toBe('/path/to/page')
        })
    })
})
