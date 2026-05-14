import { describe, it, expect, vi, beforeEach } from 'vitest'
import { runSanityService } from '@/sanity/lib/sanity-service'

const mockSanityClientFetch = vi.fn()

vi.mock('@/sanity/lib/client', () => ({
    sanityClientFetch: (...args: unknown[]) => mockSanityClientFetch(...args),
}))

vi.mock('@/sanity/queries/about-parahraph.groq', () => ({
    ABOUT_SECTION_GROQ: 'mock-about-query',
}))

vi.mock('@/lib/logger', () => ({
    Logger: vi.fn(),
}))

describe('getAboutSection', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should return data when fetch succeeds', async () => {
        const mockData = {
            title: 'About Me',
            paragraphs: [{ id: '1', text: [] }],
        }
        mockSanityClientFetch.mockResolvedValue(mockData)

        const { getAboutSection } = await import('@/sanity/api/get-about-section')
        const result = await runSanityService(getAboutSection)

        expect(result).toEqual(mockData)
        expect(mockSanityClientFetch).toHaveBeenCalledWith('mock-about-query')
    })

    it('should return null when fetch returns null', async () => {
        mockSanityClientFetch.mockResolvedValue(null)

        const { getAboutSection } = await import('@/sanity/api/get-about-section')
        const result = await runSanityService(getAboutSection)

        expect(result).toBeNull()
    })

    it('should return null and log error when fetch fails', async () => {
        mockSanityClientFetch.mockRejectedValue(new Error('Network error'))

        const { getAboutSection } = await import('@/sanity/api/get-about-section')
        const { Logger } = await import('@/lib/logger')
        const result = await runSanityService(getAboutSection)

        expect(result).toBeNull()
        expect(Logger).toHaveBeenCalledWith(
            expect.objectContaining({
                level: 'error',
                context: expect.stringContaining('getAboutSection'),
            })
        )
    })
})
