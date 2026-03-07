import { describe, expect, it } from 'vitest'
import { BAND_CARD_MODEL_URL, GTM_ID, GTM_ID_WITHOUT_G, HOME_PAGE_URL } from '@/lib/constants'

describe('constants', () => {
    it('should define GTM_ID correctly', () => {
        expect(GTM_ID).toBe('G-GRCH01BRT9')
    })

    it('should derive GTM_ID_WITHOUT_G from GTM_ID', () => {
        expect(GTM_ID_WITHOUT_G).toBe(GTM_ID.replace('G-', ''))
    })

    it('should not contain the "G-" prefix in GTM_ID_WITHOUT_G', () => {
        expect(GTM_ID_WITHOUT_G.startsWith('G-')).toBe(false)
    })

    it('should define BAND_CARD_MODEL_URL as a .glb file path', () => {
        expect(BAND_CARD_MODEL_URL).toMatch(/\.glb$/)
    })

    it('should define HOME_PAGE_URL as the root path', () => {
        expect(HOME_PAGE_URL).toBe('/')
    })
})
