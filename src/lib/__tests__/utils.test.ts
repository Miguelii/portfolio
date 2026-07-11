import { describe, it, expect, vi, beforeEach } from 'vitest'
import { cn, getClientSideCookieConsent, normalizePath } from '@/lib/utils'

describe('utils', () => {
    describe('cn', () => {
        it('should merge class names', () => {
            expect(cn('text-sm', 'font-bold')).toBe('text-sm font-bold')
        })

        it('should handle conditional classes', () => {
            expect(cn('base', false, 'visible')).toBe('base visible')
        })

        it('should resolve tailwind conflicts (last wins)', () => {
            expect(cn('px-4', 'px-2')).toBe('px-2')
        })

        it('should handle undefined and null values', () => {
            expect(cn('base', undefined, null, 'end')).toBe('base end')
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
