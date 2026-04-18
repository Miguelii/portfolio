import { describe, it, expect, vi } from 'vitest'
import { Effect, Exit } from 'effect'
import { verifyApiKey } from '@/lib/utils.server'

vi.mock('server-only', () => ({}))

describe('verifyApiKey', () => {
    it('should succeed with true for matching keys', () => {
        const result = Effect.runSync(verifyApiKey('my-secret-key', 'my-secret-key'))
        expect(result).toBe(true)
    })

    it('should succeed with false for different keys of same length', () => {
        const result = Effect.runSync(verifyApiKey('aaaa-bbbb-cccc', 'xxxx-yyyy-zzzz'))
        expect(result).toBe(false)
    })

    it('should fail for keys of different lengths', () => {
        const exit = Effect.runSyncExit(verifyApiKey('short', 'much-longer-key'))
        expect(Exit.isFailure(exit)).toBe(true)
    })

    it('should fail for empty key', () => {
        const exit = Effect.runSyncExit(verifyApiKey('', 'secret'))
        expect(Exit.isFailure(exit)).toBe(true)
    })

    it('should fail for null key', () => {
        const exit = Effect.runSyncExit(verifyApiKey(null, 'secret'))
        expect(Exit.isFailure(exit)).toBe(true)
    })

    it('should fail for both null', () => {
        const exit = Effect.runSyncExit(verifyApiKey(null, null))
        expect(Exit.isFailure(exit)).toBe(true)
    })
})
