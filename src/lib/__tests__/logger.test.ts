import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Logger } from '@/lib/logger'

describe('Logger', () => {
    beforeEach(() => {
        vi.restoreAllMocks()
    })

    it('should call console.error with context', () => {
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

        Logger({
            level: 'error',
            error: new Error('Boom'),
            context: 'fetchUser',
        })

        expect(spy).toHaveBeenCalledOnce()
        expect(spy).toHaveBeenCalledWith(
            '[Logger] in fetchUser:',
            expect.objectContaining({
                message: 'Boom',
                timestamp: expect.any(String),
            })
        )
    })

    it('should call console.log without context', () => {
        const spy = vi.spyOn(console, 'log').mockImplementation(() => {})

        Logger({
            level: 'log',
            error: 'Hello world',
        })

        expect(spy).toHaveBeenCalledOnce()
        expect(spy).toHaveBeenCalledWith(
            '[Logger]',
            expect.objectContaining({
                message: 'Hello world',
                timestamp: expect.any(String),
            })
        )
    })

    it('should call with custom prefix', () => {
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

        Logger({
            level: 'error',
            error: new Error('Boom'),
            context: 'customContext',
            prefix: 'CustomLogger',
        })

        expect(spy).toHaveBeenCalledOnce()
        expect(spy).toHaveBeenCalledWith(
            '[CustomLogger] in customContext:',
            expect.objectContaining({
                message: 'Boom',
                timestamp: expect.any(String),
            })
        )
    })
})
