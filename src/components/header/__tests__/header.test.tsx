import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Header } from '@/components/header'

vi.mock('next/image', () => ({
    // oxlint-disable-next-line nextjs/no-img-element - test file
    default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}))

vi.mock('next/dynamic', () => ({
    default: () => {
        const Component = ({ isMenuOpen }: { isMenuOpen: boolean }) => (
            <div data-testid="mobile-nav" data-open={isMenuOpen} />
        )
        return Component
    },
}))

vi.mock('@/lib/utils', () => ({
    getBuildId: () => 'test-build',
    cn: (...args: unknown[]) => args.filter(Boolean).join(' '),
    normalizePath: (path: string) => path.replace(/\/$/, '') || '/',
}))

vi.mock('@/lib/constants', () => ({
    HOME_PAGE_URL: '/',
    COOLER_VERSION_URL: '/cooler-version',
    motionPressProps: {},
}))

vi.mock('@/lib/haptic', () => ({
    haptic: vi.fn(),
}))

vi.mock('@/components/icons/menu-icon', () => ({
    MenuIcon: ({ onClick, ...props }: { onClick: () => void; 'aria-label': string }) => (
        <button onClick={onClick} data-testid="menu-icon" aria-label={props['aria-label']} />
    ),
}))

vi.mock('@/components/header/header-nav-desktop', () => ({
    HeaderNavDesktop: () => <nav data-testid="desktop-nav" />,
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

vi.mock('@/components/header/constants', () => ({
    NavList: [
        { title: 'OO', url: '/' },
        { title: 'linkedin', url: 'https://linkedin.com', external: true },
    ],
}))

describe('Header', () => {
    it('should render logo image with correct alt text', () => {
        render(<Header />)
        expect(screen.getByAltText('Miguel Goncalves signature logo')).toBeInTheDocument()
    })

    it('should render desktop navigation', () => {
        render(<Header />)
        expect(screen.getByTestId('desktop-nav')).toBeInTheDocument()
    })

    it('should render mobile navigation', () => {
        render(<Header />)
        expect(screen.getByTestId('mobile-nav')).toBeInTheDocument()
    })

    it('should render menu icon button', () => {
        render(<Header />)
        expect(screen.getByTestId('menu-icon')).toBeInTheDocument()
    })

    it('should toggle menu state when menu icon is clicked', () => {
        render(<Header />)
        const menuIcon = screen.getByTestId('menu-icon')
        fireEvent.click(menuIcon)
        expect(screen.getByTestId('mobile-nav')).toHaveAttribute('data-open', 'true')
    })
})
