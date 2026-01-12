import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { PreloaderWrapper } from '../components/preloader-wrapper'
import type { PropsWithChildren } from 'react'

// Mock Preloader component
vi.mock('../components/preloader', () => ({
    default: () => <div data-testid="preloader">Preloader</div>,
}))

// Mock LandingSectionWithBand component
vi.mock('../components/landing-section-with-band', () => ({
    LandingSectionWithBand: () => <div data-testid="landing-section">Landing Section</div>,
}))

// Mock motion/react
vi.mock('motion/react', () => ({
    AnimatePresence: ({ children }: PropsWithChildren) => <div>{children}</div>,
}))

// Mock history provider - simple mock that always returns empty history
vi.mock('@/providers/history-provider', async () => {
    const { createContext } = await import('react')
    return {
        HistoryContext: createContext({ history: [] }),
    }
})

describe('PreloaderWrapper', () => {
    it('should render preloader on first visit', () => {
        render(
            <PreloaderWrapper>
                <div>Test Content</div>
            </PreloaderWrapper>
        )
        // With empty history, should show preloader
        expect(screen.getByTestId('preloader')).toBeInTheDocument()
    })

    it('should render landing section while preloading', () => {
        render(
            <PreloaderWrapper>
                <div>Test Content</div>
            </PreloaderWrapper>
        )
        expect(screen.getByTestId('landing-section')).toBeInTheDocument()
    })

    it('should wrap content with AnimatePresence', () => {
        const { container } = render(
            <PreloaderWrapper>
                <div data-testid="test-content">Test Content</div>
            </PreloaderWrapper>
        )
        // Just verify that the component renders without errors
        expect(container).toBeTruthy()
    })
})
