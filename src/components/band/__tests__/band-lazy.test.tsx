import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import type { PropsWithChildren } from 'react'
import { BandLazy } from '@/components/band/band-lazy'

let mockPhase = 'idle'

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
            return mockPhase
        },
        get _currentValue2() {
            return mockPhase
        },
        Provider: ({ children }: PropsWithChildren) => children,
    },
}))

describe('BandLazy', () => {
    beforeEach(() => {
        mockPhase = 'idle'
    })

    it('should render BandCanvas when phase is idle', () => {
        render(<BandLazy />)
        expect(screen.getByTestId('band-canvas')).toBeInTheDocument()
    })

    it('should not render BandCanvas when phase is loading', () => {
        mockPhase = 'loading'

        render(<BandLazy />)
        expect(screen.queryByTestId('band-canvas')).not.toBeInTheDocument()
    })

    it('should always reserve space with canvas-h wrapper', () => {
        mockPhase = 'loading'

        const { container } = render(<BandLazy />)
        const wrapper = container.querySelector('.canvas-h')
        expect(wrapper).toBeInTheDocument()
    })
})
