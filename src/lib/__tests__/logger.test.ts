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

    it('should call console.warn for warn level', () => {
        const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})

        Logger({
            level: 'warn',
            error: 'Something suspicious',
            context: 'authCheck',
        })

        expect(spy).toHaveBeenCalledOnce()
        expect(spy).toHaveBeenCalledWith(
            '[Logger] in authCheck:',
            expect.objectContaining({
                message: 'Something suspicious',
                timestamp: expect.any(String),
            })
        )
    })

    it('should call console.info for info level', () => {
        const spy = vi.spyOn(console, 'info').mockImplementation(() => {})

        Logger({
            level: 'info',
            error: 'Server started',
        })

        expect(spy).toHaveBeenCalledOnce()
        expect(spy).toHaveBeenCalledWith(
            '[Logger]',
            expect.objectContaining({
                message: 'Server started',
                timestamp: expect.any(String),
            })
        )
    })

    it('should include stack trace for Error instances', () => {
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
        const error = new Error('Stack test')

        Logger({ level: 'error', error })

        expect(spy).toHaveBeenCalledWith(
            '[Logger]',
            expect.objectContaining({
                message: 'Stack test',
                stack: expect.stringContaining('Stack test'),
            })
        )
    })

    it('should have undefined stack for non-Error values', () => {
        const spy = vi.spyOn(console, 'log').mockImplementation(() => {})

        Logger({ level: 'log', error: 'plain string' })

        expect(spy).toHaveBeenCalledWith(
            '[Logger]',
            expect.objectContaining({
                message: 'plain string',
                stack: undefined,
            })
        )
    })
})
