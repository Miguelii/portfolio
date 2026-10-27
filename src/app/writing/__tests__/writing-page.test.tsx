import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import WritingPage from '@/app/writing/page'

const mockSanityClientFetch = vi.fn()

vi.mock('@/sanity/lib/client', () => ({
    sanityClientFetch: (...args: unknown[]) => mockSanityClientFetch(...args),
}))

vi.mock('@/env/client', () => ({
    ClientEnv: {
        NEXT_PUBLIC_VERCEL_URL: 'https://miguel-goncalves.pt',
    },
}))

const POSTS = [
    {
        id: 'post-2',
        title: 'Newer post',
        slug: 'newer-post',
        publishedAt: '2026-11-02',
        summary: 'Newer',
    },
    {
        id: 'post-1',
        title: "Don't Cache Your Failures",
        slug: 'dont-cache-your-failures',
        publishedAt: '2026-10-27',
        summary: 'Older',
    },
]

describe('WritingPage', () => {
    beforeEach(() => {
        mockSanityClientFetch.mockResolvedValue(POSTS)
    })

    it('should render the page heading', async () => {
        render(await WritingPage())
        expect(screen.getByRole('heading', { level: 1, name: 'Writing' })).toBeInTheDocument()
    })

    it('should link back to the home page from the author name', async () => {
        render(await WritingPage())
        expect(screen.getByRole('link', { name: 'Miguel Gonçalves' })).toHaveAttribute('href', '/')
    })

    it('should link to every post in the order returned by Sanity', async () => {
        render(await WritingPage())
        const postLinks = screen
            .getAllByRole('listitem')
            .map((item) => item.querySelector('a')?.getAttribute('href'))

        expect(postLinks).toEqual(['/writing/newer-post', '/writing/dont-cache-your-failures'])
    })

    it('should format the publish date', async () => {
        render(await WritingPage())
        expect(screen.getByText('27 October 2026')).toHaveAttribute('datetime', '2026-10-27')
    })

    it('should render no posts when Sanity is unavailable', async () => {
        mockSanityClientFetch.mockRejectedValue(new Error('Unavailable'))
        render(await WritingPage())
        expect(screen.queryAllByRole('listitem')).toHaveLength(0)
    })
})
