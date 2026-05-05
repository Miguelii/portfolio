import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { FooterLinkClient } from '@/components/footer/footer-link-client'

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

vi.mock('@/lib/utils', () => ({
    cn: (...args: string[]) => args.filter(Boolean).join(' '),
}))

vi.mock('@/lib/constants', () => ({
    motionPressProps: {},
}))

vi.mock('@/lib/haptic', () => ({
    haptic: vi.fn(),
}))

vi.mock('next/link', () => ({
    default: ({ children, href }: React.PropsWithChildren<{ href: string }>) => (
        <a href={href}>{children}</a>
    ),
}))

describe('FooterLinkClient', () => {
    it('should render children text', () => {
        render(<FooterLinkClient href="/privacy-notice">Privacy Notice</FooterLinkClient>)
        expect(screen.getByText('Privacy Notice')).toBeInTheDocument()
    })

    it('should render with correct href', () => {
        render(<FooterLinkClient href="/privacy-notice">Privacy</FooterLinkClient>)
        expect(screen.getByText('Privacy').closest('a')).toHaveAttribute('href', '/privacy-notice')
    })
})
