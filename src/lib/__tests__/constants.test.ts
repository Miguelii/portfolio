import { describe, expect, it } from 'vitest'
import { BAND_CARD_MODEL_URL, HOME_PAGE_URL, motionPressProps } from '@/lib/constants'

describe('constants', () => {
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
})
