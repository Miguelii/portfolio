import { describe, it, expect, vi, beforeEach } from 'vitest'
import { runSanityService } from '@/sanity/lib/sanity-service'

const mockSanityClientFetch = vi.fn()

vi.mock('@/sanity/lib/client', () => ({
    sanityClientFetch: (...args: unknown[]) => mockSanityClientFetch(...args),
}))

vi.mock('@/sanity/queries/privacy-notice-section.groq', () => ({
    PRIVACY_NOTICE_SECTION_GROQ: 'mock-privacy-query',
}))

vi.mock('@/lib/logger', () => ({
    Logger: vi.fn(),
}))

describe('getPrivacyNoticeSection', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should return data when fetch succeeds', async () => {
        const mockData = {
            title: 'Privacy Notice',
            paragraphs: [{ id: '1', text: [] }],
            _updatedAt: '2024-01-01T00:00:00Z',
        }
        mockSanityClientFetch.mockResolvedValue(mockData)

        const { getPrivacyNoticeSection } = await import('@/sanity/api/get-privacy-notice-section')
        const result = await runSanityService(getPrivacyNoticeSection)

        expect(result).toEqual(mockData)
        expect(mockSanityClientFetch).toHaveBeenCalledWith('mock-privacy-query')
    })

    it('should return null when fetch returns null', async () => {
        mockSanityClientFetch.mockResolvedValue(null)

        const { getPrivacyNoticeSection } = await import('@/sanity/api/get-privacy-notice-section')
        const result = await runSanityService(getPrivacyNoticeSection)

        expect(result).toBeNull()
    })

    it('should return null and log error when fetch fails', async () => {
        mockSanityClientFetch.mockRejectedValue(new Error('Unauthorized'))

        const { getPrivacyNoticeSection } = await import('@/sanity/api/get-privacy-notice-section')
        const { Logger } = await import('@/lib/logger')
        const result = await runSanityService(getPrivacyNoticeSection)

        expect(result).toBeNull()
        expect(Logger).toHaveBeenCalledWith(
            expect.objectContaining({
                level: 'error',
                context: expect.stringContaining('getPrivacyNoticeSection'),
            })
        )
    })
})
