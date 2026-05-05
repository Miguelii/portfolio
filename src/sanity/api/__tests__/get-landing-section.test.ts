import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Effect } from 'effect'

const mockSanityClientFetch = vi.fn()

vi.mock('@/sanity/lib/client', () => ({
    sanityClientFetch: (...args: unknown[]) => mockSanityClientFetch(...args),
}))

vi.mock('@/sanity/queries/landing-section.groq', () => ({
    LANDING_SECTION_GROQ: 'mock-landing-query',
}))

vi.mock('@/lib/logger', () => ({
    Logger: vi.fn(),
}))

vi.mock('@/lib/data-tagged-errors', () => ({
    SanityFetchError: class SanityFetchError {
        readonly _tag = 'SanityFetchError'
        constructor(public props: { cause: unknown }) {}
    },
}))

describe('getLandingSection', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should return data when fetch succeeds', async () => {
        const mockData = { title: 'Hello', subtitle: 'World' }
        mockSanityClientFetch.mockResolvedValue(mockData)

        const { getLandingSection } = await import('@/sanity/api/get-landing-section')
        const result = await Effect.runPromise(getLandingSection)

        expect(result).toEqual(mockData)
        expect(mockSanityClientFetch).toHaveBeenCalledWith('mock-landing-query')
    })

    it('should return null when fetch returns null', async () => {
        mockSanityClientFetch.mockResolvedValue(null)

        const { getLandingSection } = await import('@/sanity/api/get-landing-section')
        const result = await Effect.runPromise(getLandingSection)

        expect(result).toBeNull()
    })

    it('should return null and log error when fetch fails', async () => {
        mockSanityClientFetch.mockRejectedValue(new Error('Timeout'))

        const { getLandingSection } = await import('@/sanity/api/get-landing-section')
        const { Logger } = await import('@/lib/logger')
        const result = await Effect.runPromise(getLandingSection)

        expect(result).toBeNull()
        expect(Logger).toHaveBeenCalledWith(
            expect.objectContaining({
                level: 'error',
                context: expect.stringContaining('getLandingSection'),
            })
        )
    })
})
