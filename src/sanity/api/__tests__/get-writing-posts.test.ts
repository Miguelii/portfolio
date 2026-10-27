import { describe, it, expect, vi, beforeEach } from 'vitest'
import { runSanityService } from '@/sanity/lib/sanity-service'

const mockSanityClientFetch = vi.fn()

vi.mock('@/sanity/lib/client', () => ({
    sanityClientFetch: (...args: unknown[]) => mockSanityClientFetch(...args),
}))

vi.mock('@/sanity/queries/writing-posts.groq', () => ({
    WRITING_POSTS_GROQ: 'mock-writing-posts-query',
}))

vi.mock('@/lib/logger', () => ({
    Logger: vi.fn(),
}))

describe('getWritingPosts', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should return posts when fetch succeeds', async () => {
        const mockData = [
            {
                id: 'post-1',
                title: "Don't Cache Your Failures",
                slug: 'dont-cache-your-failures',
                publishedAt: '2026-10-27',
                summary: 'Summary',
            },
        ]
        mockSanityClientFetch.mockResolvedValue(mockData)

        const { getWritingPosts } = await import('@/sanity/api/get-writing-posts')
        const result = await runSanityService(getWritingPosts)

        expect(result).toEqual(mockData)
        expect(mockSanityClientFetch).toHaveBeenCalledWith('mock-writing-posts-query', {})
    })

    it('should return an empty list when fetch returns null', async () => {
        mockSanityClientFetch.mockResolvedValue(null)

        const { getWritingPosts } = await import('@/sanity/api/get-writing-posts')
        const result = await runSanityService(getWritingPosts)

        expect(result).toEqual([])
    })

    it('should return an empty list and log error when fetch fails', async () => {
        mockSanityClientFetch.mockRejectedValue(new Error('Unauthorized'))

        const { getWritingPosts } = await import('@/sanity/api/get-writing-posts')
        const { Logger } = await import('@/lib/logger')
        const result = await runSanityService(getWritingPosts)

        expect(result).toEqual([])
        expect(Logger).toHaveBeenCalledWith(
            expect.objectContaining({
                level: 'error',
                context: expect.stringContaining('getWritingPosts'),
            })
        )
    })
})
