import { describe, expect, it } from 'vitest'
import { isPathFromStaticFiles } from '../is-path-from-static-files.ts'

describe('isPathFromStaticFiles', () => {
    describe('Next.js internal routes', () => {
        it('should return true for /_next routes', () => {
            expect(isPathFromStaticFiles('/_next/static/chunks/main.js')).toBe(true)
        })

        it('should return true for /_next/image routes', () => {
            expect(isPathFromStaticFiles('/_next/image?url=/image.png')).toBe(true)
        })
    })

    describe('API routes', () => {
        it('should return true for /api/ routes', () => {
            expect(isPathFromStaticFiles('/api/users')).toBe(true)
        })
    })

    describe('Favicon', () => {
        it('should return true for /favicon routes', () => {
            expect(isPathFromStaticFiles('/favicon.ico')).toBe(true)
        })
    })

    describe('Public folder', () => {
        it('should return true for /assets routes', () => {
            expect(isPathFromStaticFiles('/assets/image.png')).toBe(true)
        })

        it('should return true for /models routes', () => {
            expect(isPathFromStaticFiles('/models/model.glb')).toBe(true)
        })

        it('should return true for robots.txt', () => {
            expect(isPathFromStaticFiles('/robots.txt')).toBe(true)
        })
    })

    describe('Regular page routes', () => {
        it('should return false for root path', () => {
            expect(isPathFromStaticFiles('/')).toBe(false)
        })

        it('should return false for regular page routes', () => {
            expect(isPathFromStaticFiles('/about')).toBe(false)
        })

        it('should return false for nested page routes', () => {
            expect(isPathFromStaticFiles('/work/project-1')).toBe(false)
        })
    })
})
