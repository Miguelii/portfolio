import { describe, it, expect } from 'vitest'
import { cn, normalizePath } from '@/lib/utils'

describe('utils', () => {
    describe('cn', () => {
        it('should merge class names', () => {
            expect(cn('text-sm', 'font-bold')).toBe('text-sm font-bold')
        })

        it('should handle conditional classes', () => {
            expect(cn('base', false, 'visible')).toBe('base visible')
        })

        it('should resolve tailwind conflicts (last wins)', () => {
            expect(cn('px-4', 'px-2')).toBe('px-2')
        })

        it('should handle undefined and null values', () => {
            expect(cn('base', undefined, null, 'end')).toBe('base end')
        })
    })

    describe('normalizePath', () => {
        it('should remove trailing slash from path', () => {
            expect(normalizePath('/path/to/page/')).toBe('/path/to/page')
        })

        it('should return "/" when path is only a slash', () => {
            expect(normalizePath('/')).toBe('/')
        })

        it('should not modify path without trailing slash', () => {
            expect(normalizePath('/path/to/page')).toBe('/path/to/page')
        })
    })
})
