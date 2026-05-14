import { describe, it, expect, vi, beforeEach } from 'vitest'
import { runSanityService } from '@/sanity/lib/sanity-service'

const mockSanityClientFetch = vi.fn()

vi.mock('@/sanity/lib/client', () => ({
    sanityClientFetch: (...args: unknown[]) => mockSanityClientFetch(...args),
}))

vi.mock('@/sanity/queries/quote-section.groq', () => ({
    QUOTE_SECTION_GROQ: 'mock-quote-query',
}))

vi.mock('@/lib/logger', () => ({
    Logger: vi.fn(),
}))

describe('getQuoteSection', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should return data when fetch succeeds', async () => {
        const mockData = { quote: 'Stay hungry, stay foolish' }
        mockSanityClientFetch.mockResolvedValue(mockData)

        const { getQuoteSection } = await import('@/sanity/api/get-quote-section')
        const result = await runSanityService(getQuoteSection)

        expect(result).toEqual(mockData)
        expect(mockSanityClientFetch).toHaveBeenCalledWith('mock-quote-query')
    })

    it('should return null when fetch returns null', async () => {
        mockSanityClientFetch.mockResolvedValue(null)

        const { getQuoteSection } = await import('@/sanity/api/get-quote-section')
        const result = await runSanityService(getQuoteSection)

        expect(result).toBeNull()
    })

    it('should return null and log error when fetch fails', async () => {
        mockSanityClientFetch.mockRejectedValue(new Error('Connection refused'))

        const { getQuoteSection } = await import('@/sanity/api/get-quote-section')
        const { Logger } = await import('@/lib/logger')
        const result = await runSanityService(getQuoteSection)

        expect(result).toBeNull()
        expect(Logger).toHaveBeenCalledWith(
            expect.objectContaining({
                level: 'error',
                context: expect.stringContaining('getQuoteSection'),
            })
        )
    })
})
