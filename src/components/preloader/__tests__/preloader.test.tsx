import { describe, expect, it, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { PropsWithChildren } from 'react'
import { PreloaderContext } from '@/providers/preloader-provider'
import type { PreloaderPhase } from '@/providers/preloader-provider'
import { Preloader } from '@/components/preloader'

vi.mock('motion/react', () => ({
    AnimatePresence: ({ children }: PropsWithChildren) => children,
    motion: {
        div: (props: Record<string, unknown>) => <div {...props} />,
        p: (props: Record<string, unknown>) => <p {...props} />,
        path: (props: Record<string, unknown>) => <path {...props} />,
    },
}))

vi.mock('@/features/landing/hooks/use-preloader-animations', () => ({
    usePreloaderAnimations: () => ({
        opacity: {},
        slideUp: {},
        curve: {},
        index: 0,
        dimension: { width: 0, height: 0 },
        setDimension: vi.fn(),
        setIndex: vi.fn(),
    }),
}))

function Wrapper({ children, phase = 'idle' }: PropsWithChildren<{ phase?: PreloaderPhase }>) {
    return <PreloaderContext value={phase}>{children}</PreloaderContext>
}

afterEach(() => {
    document.getElementById('preloader-shell')?.remove()
})

describe('Preloader', () => {
    it('should remove the preloader shell on mount', () => {
        const shell = document.createElement('div')
        shell.id = 'preloader-shell'
        document.body.appendChild(shell)

        expect(document.getElementById('preloader-shell')).not.toBeNull()

        render(<Preloader />, { wrapper: ({ children }) => <Wrapper>{children}</Wrapper> })

        expect(document.getElementById('preloader-shell')).toBeNull()
    })

    it('should not throw when preloader shell does not exist', () => {
        expect(document.getElementById('preloader-shell')).toBeNull()

        expect(() =>
            render(<Preloader />, { wrapper: ({ children }) => <Wrapper>{children}</Wrapper> })
        ).not.toThrow()
    })

    it('should not render PreloaderContent when phase is idle', () => {
        render(<Preloader />, { wrapper: ({ children }) => <Wrapper>{children}</Wrapper> })

        expect(screen.queryByText('Hello')).toBeNull()
    })

    it('should render PreloaderContent when phase is loading', () => {
        render(<Preloader />, {
            wrapper: ({ children }) => <Wrapper phase="loading">{children}</Wrapper>,
        })

        const elements = screen.queryAllByRole('generic', { hidden: true })
        expect(elements.length).toBeGreaterThan(0)
    })
})
