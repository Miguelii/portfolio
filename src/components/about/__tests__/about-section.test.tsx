import { render, screen, act } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Suspense } from 'react'
import { AboutSection } from '@/components/about'
import type { AboutSectionDTO } from '@/sanity/api/get-about-section'

vi.mock('motion/react-client', () => ({
    h2: ({ children, ...props }: React.PropsWithChildren) => <h2 {...props}>{children}</h2>,
    div: ({ children, ...props }: React.PropsWithChildren) => <div {...props}>{children}</div>,
}))

vi.mock('@portabletext/react', () => ({
    PortableText: ({ value }: { value: unknown }) => (
        <div data-testid="portable-text">{JSON.stringify(value)}</div>
    ),
}))

function resolvedPromise<T>(value: T): Promise<T> {
    const p = Promise.resolve(value)
    Object.assign(p, { status: 'fulfilled', value })
    return p
}

const mockModel: AboutSectionDTO = {
    title: 'About Me',
    paragraphs: [
        { id: '1', text: [{ _type: 'block', children: [{ _type: 'span', text: 'Paragraph 1' }] }] },
        { id: '2', text: [{ _type: 'block', children: [{ _type: 'span', text: 'Paragraph 2' }] }] },
    ],
}

describe('AboutSection', () => {
    it('should render title from model', async () => {
        const modelPromise = resolvedPromise(mockModel)

        await act(async () => {
            render(
                <Suspense fallback={null}>
                    <AboutSection modelPromise={modelPromise} />
                </Suspense>
            )
        })

        expect(screen.getByText('About Me')).toBeInTheDocument()
    })

    it('should render all paragraphs', async () => {
        const modelPromise = resolvedPromise(mockModel)

        await act(async () => {
            render(
                <Suspense fallback={null}>
                    <AboutSection modelPromise={modelPromise} />
                </Suspense>
            )
        })

        const portableTexts = screen.getAllByTestId('portable-text')
        expect(portableTexts).toHaveLength(2)
    })

    it('should handle null model gracefully', async () => {
        const modelPromise = resolvedPromise(null)

        let container: HTMLElement
        await act(async () => {
            const result = render(
                <Suspense fallback={null}>
                    <AboutSection modelPromise={modelPromise} />
                </Suspense>
            )
            container = result.container
        })

        expect(container!.querySelector('section')).toBeInTheDocument()
    })
})
