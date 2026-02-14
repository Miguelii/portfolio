import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import CookieConsentManager from '../cookie-consent-manager'
import type { CookieConsent } from '@/types/CookieConsent'

describe('CookieConsentManager', () => {
    beforeEach(() => {
        // Reset document.cookie before each test
        Object.defineProperty(document, 'cookie', {
            writable: true,
            value: '',
        })
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    describe('getCookieConsent', () => {
        it('should return null when no cookie is found', () => {
            const result = CookieConsentManager.getCookieConsent()
            expect(result).toBeNull()
        })

        it('should parse valid cookie consent data', () => {
            const consentData: CookieConsent = {
                necessary: true,
                analytics: false,
            }

            const cookieValue = encodeURIComponent(JSON.stringify(consentData))

            Object.defineProperty(document, 'cookie', {
                writable: true,
                value: `cookieConsent=${cookieValue}`,
            })

            const result = CookieConsentManager.getCookieConsent()
            expect(result).toEqual(consentData)
        })

        it('should handle multiple cookies in document.cookie', () => {
            const consentData: CookieConsent = {
                necessary: true,
                analytics: true,
            }

            const cookieValue = encodeURIComponent(JSON.stringify(consentData))
            Object.defineProperty(document, 'cookie', {
                writable: true,
                value: `sessionId=abc123; cookieConsent=${cookieValue}; userPrefs=dark`,
            })

            const result = CookieConsentManager.getCookieConsent()
            expect(result).toEqual(consentData)
        })

        it('should return null when cookie value is invalid JSON', () => {
            Object.defineProperty(document, 'cookie', {
                writable: true,
                value: 'cookieConsent=invalid{json}',
            })

            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
            const result = CookieConsentManager.getCookieConsent()

            expect(result).toBeNull()
            expect(consoleErrorSpy).toHaveBeenCalled()
            consoleErrorSpy.mockRestore()
        })

        it('should return null when cookie value is empty', () => {
            Object.defineProperty(document, 'cookie', {
                writable: true,
                value: 'cookieConsent=',
            })

            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
            const result = CookieConsentManager.getCookieConsent()

            expect(result).toBeNull()
            expect(consoleErrorSpy).toHaveBeenCalled()
            consoleErrorSpy.mockRestore()
        })
    })
})
