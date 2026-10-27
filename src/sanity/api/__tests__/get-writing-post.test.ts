import { describe, it, expect, vi, beforeEach } from 'vitest'
import { runSanityService } from '@/sanity/lib/sanity-service'

const mockSanityClientFetch = vi.fn()

vi.mock('@/sanity/lib/client', () => ({
    sanityClientFetch: (...args: unknown[]) => mockSanityClientFetch(...args),
}))

vi.mock('@/sanity/queries/writing-post.groq', () => ({
    WRITING_POST_GROQ: 'mock-writing-post-query',
}))

vi.mock('@/lib/logger', () => ({
    Logger: vi.fn(),
}))

describe('getWritingPost', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should fetch the post by slug', async () => {
        const mockData = {
            id: 'post-1',
            title: "Don't Cache Your Failures",
            slug: 'dont-cache-your-failures',
            publishedAt: '2026-10-27',
            summary: 'Summary',
            _updatedAt: '2026-10-27T10:00:00Z',
            body: [],
        }
        mockSanityClientFetch.mockResolvedValue(mockData)

        const { getWritingPost } = await import('@/sanity/api/get-writing-post')
        const result = await runSanityService(getWritingPost('dont-cache-your-failures'))

        expect(result).toEqual(mockData)
        expect(mockSanityClientFetch).toHaveBeenCalledWith('mock-writing-post-query', {
            slug: 'dont-cache-your-failures',
        })
    })

    it('should return null when the post does not exist', async () => {
        mockSanityClientFetch.mockResolvedValue(null)

        const { getWritingPost } = await import('@/sanity/api/get-writing-post')
        const result = await runSanityService(getWritingPost('missing'))

        expect(result).toBeNull()
    })

    it('should return null and log error when fetch fails', async () => {
        mockSanityClientFetch.mockRejectedValue(new Error('Unauthorized'))

        const { getWritingPost } = await import('@/sanity/api/get-writing-post')
        const { Logger } = await import('@/lib/logger')
        const result = await runSanityService(getWritingPost('dont-cache-your-failures'))

        expect(result).toBeNull()
        expect(Logger).toHaveBeenCalledWith(
            expect.objectContaining({
                level: 'error',
                context: expect.stringContaining('getWritingPost'),
            })
        )
    })
})
