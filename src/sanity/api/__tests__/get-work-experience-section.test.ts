import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Effect } from 'effect'

const mockSanityClientFetch = vi.fn()

vi.mock('@/sanity/lib/client', () => ({
    sanityClientFetch: (...args: unknown[]) => mockSanityClientFetch(...args),
}))

vi.mock('@/sanity/queries/work-experience-section.groq', () => ({
    WORK_EXPERIENCE_SECTION_GROQ: 'mock-work-experience-query',
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

describe('getWorkExperienceSection', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should return data when fetch succeeds', async () => {
        const mockData = {
            title: 'Experience',
            items: [
                {
                    id: '1',
                    company: 'Acme Corp',
                    logoUrl: '/logo.png',
                    previewUrl: '/preview.png',
                    totalTime: '2 years',
                    positions: [
                        {
                            id: 'p1',
                            jobTitle: 'Senior Engineer',
                            timeLabel: 'Jan 2023 - Present',
                            achievements: [{ id: 'a1', text: [] }],
                        },
                    ],
                },
            ],
        }
        mockSanityClientFetch.mockResolvedValue(mockData)

        const { getWorkExperienceSection } =
            await import('@/sanity/api/get-work-experience-section')
        const result = await Effect.runPromise(getWorkExperienceSection)

        expect(result).toEqual(mockData)
        expect(mockSanityClientFetch).toHaveBeenCalledWith('mock-work-experience-query')
    })

    it('should return null when fetch returns null', async () => {
        mockSanityClientFetch.mockResolvedValue(null)

        const { getWorkExperienceSection } =
            await import('@/sanity/api/get-work-experience-section')
        const result = await Effect.runPromise(getWorkExperienceSection)

        expect(result).toBeNull()
    })

    it('should return null and log error when fetch fails', async () => {
        mockSanityClientFetch.mockRejectedValue(new Error('Service unavailable'))

        const { getWorkExperienceSection } =
            await import('@/sanity/api/get-work-experience-section')
        const { Logger } = await import('@/lib/logger')
        const result = await Effect.runPromise(getWorkExperienceSection)

        expect(result).toBeNull()
        expect(Logger).toHaveBeenCalledWith(
            expect.objectContaining({
                level: 'error',
                context: expect.stringContaining('getWorkExperienceSection'),
            })
        )
    })
})
