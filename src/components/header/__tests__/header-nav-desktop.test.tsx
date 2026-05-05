import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { HeaderNavDesktop } from '@/components/header/header-nav-desktop'
import type { NavItem } from '../types'

vi.mock('next/navigation', () => ({
    usePathname: () => '/',
}))

vi.mock('next/link', () => ({
    default: ({ children, href }: React.PropsWithChildren<{ href: string }>) => (
        <a href={href}>{children}</a>
    ),
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

vi.mock('@next/third-parties/google', () => ({
    sendGTMEvent: vi.fn(),
}))

vi.mock('@/lib/utils', () => ({
    cn: (...args: string[]) => args.filter(Boolean).join(' '),
    normalizePath: (path: string) => path.replace(/\/$/, '') || '/',
}))

vi.mock('@/lib/constants', () => ({
    HOME_PAGE_URL: '/',
    motionPressProps: {},
}))

vi.mock('@/lib/haptic', () => ({
    haptic: vi.fn(),
}))

const navList: NavItem[] = [
    { title: 'OO', url: '/' },
    { title: 'linkedin', url: 'https://linkedin.com', external: true },
    { title: 'Github', url: 'https://github.com', external: true },
]

describe('HeaderNavDesktop', () => {
    it('should render all nav items', () => {
        render(<HeaderNavDesktop navList={navList} />)
        expect(screen.getByText('OO')).toBeInTheDocument()
        expect(screen.getByText('linkedin')).toBeInTheDocument()
        expect(screen.getByText('Github')).toBeInTheDocument()
    })

    it('should mark current page with aria-current', () => {
        render(<HeaderNavDesktop navList={navList} />)
        const homeLink = screen.getByText('OO').closest('a')
        expect(homeLink).toHaveAttribute('aria-current', 'page')
    })

    it('should set external links with target _blank', () => {
        render(<HeaderNavDesktop navList={navList} />)
        const linkedinLink = screen.getByText('linkedin').closest('a')
        expect(linkedinLink).toHaveAttribute('target', '_blank')
        expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('should set internal links with target _self', () => {
        render(<HeaderNavDesktop navList={navList} />)
        const homeLink = screen.getByText('OO').closest('a')
        expect(homeLink).toHaveAttribute('target', '_self')
    })
})
