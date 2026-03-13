import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as tryCatchModule from '@/lib/try-catch'
import { getServerSideCookieConsent } from '@/lib/utils.server'

describe('utils.server', () => {
    describe('getServerSideCookieConsent', () => {
        beforeEach(() => {
            vi.clearAllMocks()
        })

        it('returns null when tryCatch returns null data', async () => {
            vi.spyOn(tryCatchModule, 'tryCatch').mockResolvedValue({ data: null, error: null })

            const result = await getServerSideCookieConsent()
            expect(result).toBeNull()
        })

        it('returns parsed CookieConsent when tryCatch returns data', async () => {
            const consent = { analytics: true, marketing: false }

            vi.spyOn(tryCatchModule, 'tryCatch').mockResolvedValue({ data: consent, error: null })

            const result = await getServerSideCookieConsent()
            expect(result).toEqual(consent)
        })

        it('returns null when tryCatch returns error', async () => {
            vi.spyOn(tryCatchModule, 'tryCatch').mockResolvedValue({
                data: null,
                error: new Error('failed'),
            })

            const result = await getServerSideCookieConsent()
            expect(result).toBeNull()
        })
    })
})
