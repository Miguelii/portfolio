import { describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useIsMounted } from '../use-is-mounted'

describe('useIsMounted', () => {
    it('should return a function', () => {
        const { result } = renderHook(() => useIsMounted())
        expect(typeof result.current).toBe('function')
    })

    it('should return true after component mounts', () => {
        const { result } = renderHook(() => useIsMounted())
        expect(result.current()).toBe(true)
    })

    it('should return false after component unmounts', () => {
        const { result, unmount } = renderHook(() => useIsMounted())

        act(() => {
            unmount()
        })

        expect(result.current()).toBe(false)
    })


    it('should return consistent state in multiple calls', () => {
        const { result } = renderHook(() => useIsMounted())

        const isMounted1 = result.current()
        const isMounted2 = result.current()

        expect(isMounted1).toBe(isMounted2)
    })

    it('should be callable after component mounts', () => {
        const { result } = renderHook(() => useIsMounted())
        const isMountedFn = result.current

        expect(() => {
            isMountedFn()
        }).not.toThrow()
    })
})
