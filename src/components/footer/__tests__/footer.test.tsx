import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Footer } from '@/components/footer'

vi.mock('@/lib/haptic', () => ({
    haptic: vi.fn(),
    supportsHaptic: false,
}))

vi.mock('@/components/ui/social-item', () => ({
    SocialItem: ({
        children,
        ariaLabel,
    }: React.PropsWithChildren<{ ariaLabel: string; href: string }>) => (
        <a aria-label={ariaLabel}>{children}</a>
    ),
}))

vi.mock('@/components/icons/linkedin-icon', () => ({
    LinkedinIcon: (props: { 'aria-label': string }) => (
        <span data-testid="linkedin-icon" aria-label={props['aria-label']} />
    ),
}))

vi.mock('@/components/icons/github-icon', () => ({
    GithubIcon: (props: { 'aria-label': string }) => (
        <span data-testid="github-icon" aria-label={props['aria-label']} />
    ),
}))

vi.mock('@/components/footer/footer-link-client', () => ({
    FooterLinkClient: ({ children, href }: React.PropsWithChildren<{ href: string }>) => (
        <a href={href}>{children}</a>
    ),
}))

vi.mock('@/lib/constants', () => ({
    motionPressProps: {},
    LINKEDIN_URL: 'https://www.linkedin.com/in/test',
    GITHUB_URL: 'https://github.com/test',
}))

vi.mock('motion/react', () => ({
    motion: {
        create: () => {
            const Component = ({
                children,
                href,
                ...props
            }: React.PropsWithChildren<{ href: string }>) => (
                <a href={href} {...props}>
                    {children}
                </a>
            )
            return Component
        },
    },
}))

describe('Footer', () => {
    it('should render copyright text with current year', () => {
        render(<Footer />)
        const year = new Date().getFullYear()
        expect(screen.getByText(`© ${year}. All rights reserved.`)).toBeInTheDocument()
    })

    it('should render privacy notice link', () => {
        render(<Footer />)
        expect(screen.getByText('Privacy Notice')).toBeInTheDocument()
    })

    it('should render social icons', () => {
        render(<Footer />)
        expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument()
        expect(screen.getByTestId('github-icon')).toBeInTheDocument()
    })

    it('should have correct social link aria labels', () => {
        render(<Footer />)
        expect(screen.getByLabelText('see linkedin profile')).toBeInTheDocument()
        expect(screen.getByLabelText('see github profile')).toBeInTheDocument()
    })
})
