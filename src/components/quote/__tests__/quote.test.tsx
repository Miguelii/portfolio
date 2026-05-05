import { render, screen, act } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Suspense } from 'react'
import { QuoteCard } from '@/components/quote'

vi.mock('motion/react-client', () => ({
    div: ({ children, ...props }: React.PropsWithChildren) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: React.PropsWithChildren) => <h2 {...props}>{children}</h2>,
}))

function resolvedPromise<T>(value: T): Promise<T> {
    const p = Promise.resolve(value)
    // Pre-resolve the promise so React's `use()` can read it synchronously
    Object.assign(p, { status: 'fulfilled', value })
    return p
}

describe('QuoteCard', () => {
    it('should render quote text', async () => {
        const modelPromise = resolvedPromise({ quote: 'Stay hungry, stay foolish' })

        await act(async () => {
            render(
                <Suspense fallback={<div data-testid="fallback" />}>
                    <QuoteCard modelPromise={modelPromise} />
                </Suspense>
            )
        })

        expect(screen.getByText(/Stay hungry, stay foolish/)).toBeInTheDocument()
    })

    it('should not render when quote is null', async () => {
        const modelPromise = resolvedPromise({ quote: null })

        let container: HTMLElement
        await act(async () => {
            const result = render(
                <Suspense fallback={<div data-testid="fallback" />}>
                    <QuoteCard modelPromise={modelPromise as never} />
                </Suspense>
            )
            container = result.container
        })

        expect(container!.querySelector('section')).not.toBeInTheDocument()
    })

    it('should not render when quote is empty string', async () => {
        const modelPromise = resolvedPromise({ quote: '   ' })

        let container: HTMLElement
        await act(async () => {
            const result = render(
                <Suspense fallback={<div data-testid="fallback" />}>
                    <QuoteCard modelPromise={modelPromise} />
                </Suspense>
            )
            container = result.container
        })

        expect(container!.querySelector('section')).not.toBeInTheDocument()
    })
})
