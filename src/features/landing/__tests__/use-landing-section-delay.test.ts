import { describe, expect, it } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useLandingSectionDelay } from '../hooks/use-landing-section-delay'

describe('useLandingSectionDelay', () => {
    it('should return all animation variants and state setters', () => {
        const { result } = renderHook(() => useLandingSectionDelay(false))
        expect(result.current.H1_DELAY).toBeDefined()
        expect(result.current.P_DELAY).toBeDefined()
        expect(result.current.CANVAS_DELAY).toBeDefined()
    })
})
