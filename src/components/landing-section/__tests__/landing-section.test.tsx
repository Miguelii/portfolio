import { render, screen, act } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { type PropsWithChildren } from 'react'
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

const MOCK_MODEL: LandingSectionDTO = {
    title: 'Crafting Experiences, Delivering Results',
    subtitle: 'Delivered products that have reached over a million users worldwide.',
}

describe('LandingSection', () => {
    it('should render main heading', async () => {
        await act(async () => {
            return render(<LandingSection modelPromise={Promise.resolve(MOCK_MODEL)} />)
        })
        expect(screen.getByText(MOCK_MODEL.title!)).toBeInTheDocument()
    })

    it('should render description text', async () => {
        await act(async () => {
            return render(<LandingSection modelPromise={Promise.resolve(MOCK_MODEL)} />)
        })
        expect(screen.getByText(MOCK_MODEL.subtitle!)).toBeInTheDocument()
    })
})
