import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NextResponse } from 'next/server'
import { setCSP } from '../set-csp'
import * as staticFilesModule from '../is-path-from-static-files'

vi.mock('../is-path-from-static-files', () => ({
    isPathFromStaticFiles: vi.fn(),
    NEXT_IMAGE_PATH: '/_next/image',
    NEXT_STATIC_PATH: '/_next/static',
}))

describe('setCSP', () => {
    let mockResponse: NextResponse

    beforeEach(() => {
        mockResponse = new NextResponse('test')
        vi.clearAllMocks()
    })

    describe('security headers', () => {
        it('should set all required security headers', () => {
            vi.mocked(staticFilesModule.isPathFromStaticFiles).mockReturnValue(false)

            setCSP(mockResponse, '/')

            expect(mockResponse.headers.get('X-Frame-Options')).toBe('DENY')
            expect(mockResponse.headers.get('Referrer-Policy')).toBe('no-referrer')
            expect(mockResponse.headers.get('X-Content-Type-Options')).toBe('nosniff')
            expect(mockResponse.headers.get('X-Ua-Compatible')).toBe('IE=edge')
            expect(mockResponse.headers.get('Strict-Transport-Security')).toBe(
                'max-age=31536000; includeSubDomains; preload'
            )
            expect(mockResponse.headers.get('X-Xss-Protection')).toBe('1; mode=block')
        })
    })

    describe('CSP for non-static files', () => {
        beforeEach(() => {
            vi.mocked(staticFilesModule.isPathFromStaticFiles).mockReturnValue(false)
        })

        it('should set full CSP with required directives and services', () => {
            setCSP(mockResponse, '/')

            const csp = mockResponse.headers.get('Content-Security-Policy')
            expect(csp).toContain('default-src')
            expect(csp).toContain('script-src')
            expect(csp).toContain('googletagmanager.com')
            expect(csp).toContain('recaptcha.net')
        })

        it('should set no-cache Cache-Control for non-static files', () => {
            setCSP(mockResponse, '/')

            expect(mockResponse.headers.get('Cache-Control')).toBe(
                'public, max-age=0, must-revalidate'
            )
        })
    })

    describe('CSP for static files', () => {
        beforeEach(() => {
            vi.mocked(staticFilesModule.isPathFromStaticFiles).mockReturnValue(true)
        })

        it('should set simplified CSP for static files without third-party scripts', () => {
            setCSP(mockResponse, '/_next/static/chunks/main.js')

            const csp = mockResponse.headers.get('Content-Security-Policy')
            expect(csp).toContain('default-src')
            expect(csp).toContain('block-all-mixed-content')
            expect(csp).not.toContain('googletagmanager.com')
        })

        it('should set long-term cache for /_next/image with must-revalidate', () => {
            setCSP(mockResponse, '/_next/image?url=/image.png')

            expect(mockResponse.headers.get('Cache-Control')).toBe(
                'public, max-age=31536000, must-revalidate'
            )
        })

        it('should set long-term cache with immutable for other static files', () => {
            setCSP(mockResponse, '/_next/static/chunks/main.js')

            expect(mockResponse.headers.get('Cache-Control')).toBe(
                'public, max-age=31536000, immutable'
            )
        })
    })
})
