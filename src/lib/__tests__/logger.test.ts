import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Logger } from '@/lib/logger'

describe('Logger', () => {
    beforeEach(() => {
        vi.restoreAllMocks()
    })

    it.each([
        {
            name: 'error with context',
            level: 'error' as const,
            error: new Error('Boom'),
            context: 'fetchUser',
            expectedPrefix: '[Logger] in fetchUser:',
            expectedMessage: 'Boom',
        },
        {
            name: 'log without context',
            level: 'log' as const,
            error: 'Hello world',
            expectedPrefix: '[Logger]',
            expectedMessage: 'Hello world',
        },
        {
            name: 'custom prefix',
            level: 'error' as const,
            error: new Error('Boom'),
            context: 'customContext',
            prefix: 'CustomLogger',
            expectedPrefix: '[CustomLogger] in customContext:',
            expectedMessage: 'Boom',
        },
        {
            name: 'warn level',
            level: 'warn' as const,
            error: 'Something suspicious',
            context: 'authCheck',
            expectedPrefix: '[Logger] in authCheck:',
            expectedMessage: 'Something suspicious',
        },
        {
            name: 'info level',
            level: 'info' as const,
            error: 'Server started',
            expectedPrefix: '[Logger]',
            expectedMessage: 'Server started',
        },
    ])(
        'should call console.$level — $name',
        ({ level, error, context, prefix, expectedPrefix, expectedMessage }) => {
            const spy = vi.spyOn(console, level).mockImplementation(() => {})

            Logger({ level, error, context, prefix })

            expect(spy).toHaveBeenCalledOnce()
            expect(spy).toHaveBeenCalledWith(
                expectedPrefix,
                expect.objectContaining({ message: expectedMessage, timestamp: expect.any(String) })
            )
        }
    )

    it('should include stack trace for Error instances', () => {
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

        Logger({ level: 'error', error: new Error('Stack test') })

        expect(spy).toHaveBeenCalledWith(
            '[Logger]',
            expect.objectContaining({ stack: expect.stringContaining('Stack test') })
        )
    })
})
