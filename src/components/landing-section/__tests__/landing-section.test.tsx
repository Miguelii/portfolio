import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Suspense, type PropsWithChildren } from 'react'
import { LandingSection } from '@/components/landing-section'
import type { LandingSectionDTO } from '@/sanity/api/get-landing-section'

vi.mock('motion/react-client', async (importOriginal) => {
    const actual: Record<string, PropsWithChildren> = await importOriginal()
    return {
        ...actual,
        default: {
            div: ({ children, ...props }: PropsWithChildren) => <div {...props}>{children}</div>,
            h1: ({ children, ...props }: PropsWithChildren) => <h1 {...props}>{children}</h1>,
            p: ({ children, ...props }: PropsWithChildren) => <p {...props}>{children}</p>,
        },
    }
})

function resolvedPromise<T>(value: T): Promise<T> {
    const p = Promise.resolve(value)
    Object.assign(p, { status: 'fulfilled', value })
    return p
}

const MOCK_MODEL: LandingSectionDTO = {
    title: 'Crafting Experiences, Delivering Results',
    subtitle: 'Delivered products that have reached over a million users worldwide.',
}

describe('LandingSection', () => {
    it('should render main heading', () => {
        render(
            <Suspense fallback={null}>
                <LandingSection modelPromise={resolvedPromise(MOCK_MODEL)} />
            </Suspense>
        )
        expect(screen.getByText(MOCK_MODEL.title!)).toBeInTheDocument()
    })

    it('should render description text', () => {
        render(
            <Suspense fallback={null}>
                <LandingSection modelPromise={resolvedPromise(MOCK_MODEL)} />
            </Suspense>
        )
        expect(screen.getByText(MOCK_MODEL.subtitle!)).toBeInTheDocument()
    })
})
