import { describe, expect, it } from 'vitest'
import { renderHook } from '@testing-library/react'
import { usePreloaderAnimations } from '../hooks/use-preloader-animations'

describe('usePreloaderAnimations', () => {
    it('should return all animation variants and state setters', () => {
        const { result } = renderHook(() => usePreloaderAnimations())

        expect(result.current.opacity).toBeDefined()
        expect(result.current.slideUp).toBeDefined()
        expect(result.current.setDimension).toBeDefined()
        expect(result.current.setIndex).toBeDefined()
        expect(result.current.index).toBeDefined()
        expect(result.current.dimension).toBeDefined()
        expect(result.current.curve).toBeDefined()
    })

    it('should have initial index of 0', () => {
        const { result } = renderHook(() => usePreloaderAnimations())
        expect(result.current.index).toBe(0)
    })

    it('should have default dimension initially', () => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1440,
        })
        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: 900,
        })

        const { result } = renderHook(() => usePreloaderAnimations())

        expect(result.current.dimension.width).toBe(1440)
        expect(result.current.dimension.height).toBe(900)
    })
})
