import { describe, expect, it } from 'vitest'
import {
    ValidationError,
    CookieStoreError,
    CookieParseError,
    SanityFetchError,
    UnauthorizedError,
} from '@/lib/data-tagged-errors'

describe('data-tagged-errors', () => {
    it('should create ValidationError with correct tag', () => {
        const error = new ValidationError({ cause: 'invalid input' })
        expect(error._tag).toBe('ValidationError')
        expect(error.cause).toBe('invalid input')
    })

    it('should create CookieStoreError with correct tag', () => {
        const error = new CookieStoreError({ cause: 'store unavailable' })
        expect(error._tag).toBe('CookieStoreError')
        expect(error.cause).toBe('store unavailable')
    })

    it('should create CookieParseError with correct tag', () => {
        const error = new CookieParseError({ cause: 'malformed cookie' })
        expect(error._tag).toBe('CookieParseError')
        expect(error.cause).toBe('malformed cookie')
    })

    it('should create SanityFetchError with correct tag', () => {
        const error = new SanityFetchError({ cause: 'network timeout' })
        expect(error._tag).toBe('SanityFetchError')
        expect(error.cause).toBe('network timeout')
    })

    it('should create UnauthorizedError with correct tag', () => {
        const error = new UnauthorizedError({ cause: 'no token' })
        expect(error._tag).toBe('UnauthorizedError')
        expect(error.cause).toBe('no token')
    })

    it('should accept optional message', () => {
        const error = new ValidationError({ cause: 'bad data', message: 'Field is required' })
        expect(error.message).toBe('Field is required')
    })
})
