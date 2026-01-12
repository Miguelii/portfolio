import { describe, expect, it } from 'vitest'
import { normalizePath } from '../normalize-path'

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
