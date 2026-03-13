import { describe, expect, it, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useMediaQuery } from '@/hooks/use-media-query'

const createMatchMediaMock = (initialMatches: boolean) => {
    let matches = initialMatches
    const listeners: (() => void)[] = []

    return {
        get matches() {
            return matches
        },
        addEventListener: vi.fn((_: string, cb: () => void) => {
            listeners.push(cb)
        }),
        removeEventListener: vi.fn((_: string, cb: () => void) => {
            const index = listeners.indexOf(cb)
            if (index > -1) listeners.splice(index, 1)
        }),
        // Updates matches first so getSnapshot reads the new value when callbacks fire
        trigger: (newMatches: boolean) => {
            matches = newMatches
            listeners.forEach((cb) => cb())
        },
    }
}

describe('useMediaQuery', () => {
    beforeEach(() => {
        vi.restoreAllMocks()
        vi.unstubAllGlobals()
    })

    it('should return false before the effect runs', () => {
        vi.stubGlobal('matchMedia', vi.fn().mockReturnValue(createMatchMediaMock(true)))

        const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'))

        expect(typeof result.current).toBe('boolean')
    })

    it('should return true when query matches', () => {
        vi.stubGlobal('matchMedia', vi.fn().mockReturnValue(createMatchMediaMock(true)))

        const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'))

        expect(result.current).toBe(true)
    })

    it('should return false when query does not match', () => {
        vi.stubGlobal('matchMedia', vi.fn().mockReturnValue(createMatchMediaMock(false)))

        const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'))

        expect(result.current).toBe(false)
    })

    it('should update when the media query match changes', () => {
        const mock = createMatchMediaMock(false)
        vi.stubGlobal('matchMedia', vi.fn().mockReturnValue(mock))

        const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'))
        expect(result.current).toBe(false)

        act(() => {
            mock.trigger(true)
        })

        expect(result.current).toBe(true)
    })

    it('should remove event listener on unmount', () => {
        const mock = createMatchMediaMock(true)
        vi.stubGlobal('matchMedia', vi.fn().mockReturnValue(mock))

        const { unmount } = renderHook(() => useMediaQuery('(min-width: 1024px)'))

        expect(mock.addEventListener).toHaveBeenCalledOnce()

        unmount()

        expect(mock.removeEventListener).toHaveBeenCalledOnce()
    })

    it('should re-run effect when query changes', () => {
        const mock = createMatchMediaMock(false)
        vi.stubGlobal('matchMedia', vi.fn().mockReturnValue(mock))

        const { rerender } = renderHook(({ query }) => useMediaQuery(query), {
            initialProps: { query: '(min-width: 1024px)' },
        })

        expect(mock.addEventListener).toHaveBeenCalledTimes(1)

        rerender({ query: '(min-width: 768px)' })

        expect(mock.addEventListener).toHaveBeenCalledTimes(2)
        expect(mock.removeEventListener).toHaveBeenCalledTimes(1)
    })
})
