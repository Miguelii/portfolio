import { describe, expect, it } from 'vitest'
import {
    BAND_CARD_MODEL_URL,
    GTM_ID,
    GTM_ID_WITHOUT_G,
    HOME_PAGE_URL,
    motionPressProps,
    NEXT_IMAGE_PATH,
    NEXT_STATIC_PATH,
    NOT_FOUND_VIDEO_URL,
    STATIC_PREFIXES,
} from '@/lib/constants'

describe('constants', () => {
    it('should define GTM_ID correctly', () => {
        expect(GTM_ID).toBe('G-N6QNF85PTV')
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

    it('should define motionPressProps', () => {
        expect(motionPressProps).toBeDefined()
        expect(motionPressProps.whileTap).toEqual({ scale: 0.96 })
        expect(motionPressProps.transition).toEqual({ type: 'spring', stiffness: 500, damping: 20 })
    })

    it('should define STATIC_PREFIXES', () => {
        expect(STATIC_PREFIXES).toBeDefined()
    })

    it('should define NEXT_IMAGE_PATH', () => {
        expect(NEXT_IMAGE_PATH).toBe('/_next/image')
    })

    it('should define NEXT_STATIC_PATH', () => {
        expect(NEXT_STATIC_PATH).toBe('/_next/static')
    })

    it('should define NOT_FOUND_VIDEO_URL', () => {
        expect(NOT_FOUND_VIDEO_URL).toBeDefined()
    })
})
