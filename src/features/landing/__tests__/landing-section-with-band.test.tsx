import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { LandingSectionWithBand } from '../components/landing-section-with-band'
import type { PropsWithChildren } from 'react'

vi.mock('@/components/ui/band', () => ({
    default: () => <div data-testid="band-canvas">Band Canvas</div>,
}))

vi.mock('motion/react-client', async (importOriginal) => {
    const actual = (await importOriginal()) as Record<string, PropsWithChildren>
    return {
        ...actual,
        default: {
            div: ({ children, ...props }: PropsWithChildren) => <div {...props}>{children}</div>,
            h1: ({ children, ...props }: PropsWithChildren) => <h1 {...props}>{children}</h1>,
            p: ({ children, ...props }: PropsWithChildren) => <p {...props}>{children}</p>,
        },
    }
})

describe('LandingSectionWithBand', () => {
    it('should render main heading', () => {
        render(<LandingSectionWithBand />)
        expect(screen.getByText('Crafting Experiences, Delivering Results')).toBeInTheDocument()
    })

    it('should render description text', () => {
        render(<LandingSectionWithBand />)
        expect(
            screen.getByText('Delivered products that have reached over a million users worldwide.')
        ).toBeInTheDocument()
    })

    it('should render BandCanvas by default', () => {
        render(<LandingSectionWithBand />)
        expect(screen.getByTestId('band-canvas')).toBeInTheDocument()
    })
})
