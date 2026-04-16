import { it, expect, describe } from 'vitest'
import { STATIC_PREFIXES, NEXT_IMAGE_PATH, NEXT_STATIC_PATH } from '@/lib/constants.server'

describe('constants.server', () => {
    it('should define STATIC_PREFIXES', () => {
        expect(STATIC_PREFIXES).toBeDefined()
    })

    it('should define NEXT_IMAGE_PATH', () => {
        expect(NEXT_IMAGE_PATH).toBe('/_next/image')
    })

    it('should define NEXT_STATIC_PATH', () => {
        expect(NEXT_STATIC_PATH).toBe('/_next/static')
    })
})
