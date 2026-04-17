import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// supportsHaptic is evaluated at module load time, so we need to mock window before importing
const mockMatchMedia = (matches: boolean) => {
    Object.defineProperty(globalThis, 'matchMedia', {
        writable: true,
        value: vi.fn().mockReturnValue({ matches }),
    })
}

describe('haptic', () => {
    beforeEach(() => {
        vi.resetModules()
        vi.restoreAllMocks()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    describe('supportsHaptic', () => {
        it('should be true when pointer is coarse', async () => {
            mockMatchMedia(true)
            const { supportsHaptic } = await import('@/lib//haptic')
            expect(supportsHaptic).toBe(true)
        })

        it('should be false when pointer is not coarse', async () => {
            mockMatchMedia(false)
            const { supportsHaptic } = await import('@/lib//haptic')
            expect(supportsHaptic).toBe(false)
        })
    })

    describe('haptic()', () => {
        it('should call navigator.vibrate with default pattern (50ms)', async () => {
            mockMatchMedia(true)
            const vibrateMock = vi.fn().mockReturnValue(true)
            Object.defineProperty(navigator, 'vibrate', {
                writable: true,
                configurable: true,
                value: vibrateMock,
            })

            const { haptic } = await import('@/lib//haptic')
            haptic()

            expect(vibrateMock).toHaveBeenCalledOnce()
            expect(vibrateMock).toHaveBeenCalledWith(50)
        })

        it('should call navigator.vibrate with custom number pattern', async () => {
            mockMatchMedia(true)
            const vibrateMock = vi.fn().mockReturnValue(true)
            Object.defineProperty(navigator, 'vibrate', {
                writable: true,
                configurable: true,
                value: vibrateMock,
            })

            const { haptic } = await import('@/lib//haptic')
            haptic(200)

            expect(vibrateMock).toHaveBeenCalledWith(200)
        })

        it('should call navigator.vibrate with array pattern', async () => {
            mockMatchMedia(true)
            const vibrateMock = vi.fn().mockReturnValue(true)
            Object.defineProperty(navigator, 'vibrate', {
                writable: true,
                configurable: true,
                value: vibrateMock,
            })

            const { haptic } = await import('@/lib//haptic')
            haptic([100, 50, 100])

            expect(vibrateMock).toHaveBeenCalledWith([100, 50, 100])
        })

        it('should not call navigator.vibrate when haptic is not supported', async () => {
            mockMatchMedia(false)
            const vibrateMock = vi.fn()
            Object.defineProperty(navigator, 'vibrate', {
                writable: true,
                configurable: true,
                value: vibrateMock,
            })

            const { haptic } = await import('@/lib//haptic')
            haptic()

            expect(vibrateMock).not.toHaveBeenCalled()
        })

        it('should use iOS checkbox trick when vibrate is not available', async () => {
            mockMatchMedia(true)
            Object.defineProperty(navigator, 'vibrate', {
                writable: true,
                configurable: true,
                value: undefined,
            })

            const appendChildSpy = vi.spyOn(document.body, 'appendChild')
            const { haptic } = await import('@/lib//haptic')
            haptic()

            expect(appendChildSpy).toHaveBeenCalledOnce()

            const label = appendChildSpy.mock.calls[0][0] as HTMLLabelElement
            expect(label.tagName).toBe('LABEL')
            expect(label.ariaHidden).toBe('true')
            expect(label.style.display).toBe('none')
        })

        it('should remove the iOS label element after click', async () => {
            mockMatchMedia(true)
            Object.defineProperty(navigator, 'vibrate', {
                writable: true,
                configurable: true,
                value: undefined,
            })

            const removedElements: Element[] = []
            const originalRemove = Element.prototype.remove
            Element.prototype.remove = function () {
                removedElements.push(this)
                originalRemove.call(this)
            }

            const { haptic } = await import('@/lib//haptic')
            haptic()

            expect(removedElements.length).toBeGreaterThan(0)
            expect(removedElements[0].tagName).toBe('LABEL')

            Element.prototype.remove = originalRemove
        })

        it('should log error and not throw if an exception occurs', async () => {
            mockMatchMedia(true)
            Object.defineProperty(navigator, 'vibrate', {
                writable: true,
                configurable: true,
                value: () => {
                    throw new Error('vibrate failed')
                },
            })

            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

            const { haptic } = await import('@/lib//haptic')

            expect(() => haptic()).not.toThrow()
            expect(consoleSpy).toHaveBeenCalled()
        })
    })
})
