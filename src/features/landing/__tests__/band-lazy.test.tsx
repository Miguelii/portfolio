import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import type { PropsWithChildren } from 'react'
import { BandLazy } from '../components/band-lazy'

const mockPreloaderContext = {
    shouldAnimate: true,
    showPreloader: false,
}

vi.mock('next/dynamic', () => ({
    default: () => {
        const Component = () => <div data-testid="band-canvas">Band Canvas</div>
        return Component
    },
}))

vi.mock('motion/react-client', async (importOriginal) => {
    const actual: Record<string, PropsWithChildren> = await importOriginal()
    return {
        ...actual,
        default: {
            div: ({ children, ...props }: PropsWithChildren) => <div {...props}>{children}</div>,
        },
    }
})

vi.mock('@/providers/preloader-provider', () => ({
    PreloaderContext: {
        $$typeof: Symbol.for('react.context'),
        get _currentValue() {
            return mockPreloaderContext
        },
        get _currentValue2() {
            return mockPreloaderContext
        },
        Provider: ({ children }: PropsWithChildren) => <>{children}</>,
    },
}))

describe('BandLazy', () => {
    beforeEach(() => {
        mockPreloaderContext.shouldAnimate = true
        mockPreloaderContext.showPreloader = false
    })

    it('should render BandCanvas when shouldAnimate is true', () => {
        render(<BandLazy />)
        expect(screen.getByTestId('band-canvas')).toBeInTheDocument()
    })

    it('should not render BandCanvas when shouldAnimate is false', () => {
        mockPreloaderContext.shouldAnimate = false

        render(<BandLazy />)
        expect(screen.queryByTestId('band-canvas')).not.toBeInTheDocument()
    })

    it('should always reserve space with canvas-h wrapper', () => {
        mockPreloaderContext.shouldAnimate = false

        const { container } = render(<BandLazy />)
        const wrapper = container.querySelector('.canvas-h')
        expect(wrapper).toBeInTheDocument()
    })
})
