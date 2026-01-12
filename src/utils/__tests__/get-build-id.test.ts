import { describe, expect, it, vi } from 'vitest'
import { getBuildId } from '../get-build-id'

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
