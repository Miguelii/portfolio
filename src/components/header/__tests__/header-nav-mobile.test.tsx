import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { HeaderNavMobile } from '@/components/header/header-nav-mobile'
import type { NavItem } from '../types'

vi.mock('motion/react', () => ({
    AnimatePresence: ({ children }: React.PropsWithChildren) => children,
    motion: {
        div: ({ children, ...props }: React.PropsWithChildren) => <div {...props}>{children}</div>,
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
    normalizePath: (path: string) => path.replace(/\/$/, '') || '/',
}))

vi.mock('@/lib/constants', () => ({
    HOME_PAGE_URL: '/',
    motionPressProps: {},
}))

vi.mock('@/lib/haptic', () => ({
    haptic: vi.fn(),
}))

vi.mock('@/components/icons/close-icon', () => ({
    CloseIcon: ({ onClick }: { onClick: () => void }) => (
        <button onClick={onClick} data-testid="close-icon">
            Close
        </button>
    ),
}))

vi.mock('@/components/header/header-nav-mobile-animations', () => ({
    menuVariants: {},
    itemVariants: {},
}))

const navList: NavItem[] = [
    { title: 'OO', url: '/' },
    { title: 'linkedin', url: 'https://linkedin.com', external: true },
]

describe('HeaderNavMobile', () => {
    it('should render nav items when menu is open', () => {
        render(<HeaderNavMobile isMenuOpen={true} toggleMenu={vi.fn()} navList={navList} />)
        expect(screen.getByText('OO')).toBeInTheDocument()
        expect(screen.getByText('linkedin')).toBeInTheDocument()
    })

    it('should not render nav items when menu is closed', () => {
        render(<HeaderNavMobile isMenuOpen={false} toggleMenu={vi.fn()} navList={navList} />)
        expect(screen.queryByText('OO')).not.toBeInTheDocument()
    })

    it('should render close icon when open', () => {
        render(<HeaderNavMobile isMenuOpen={true} toggleMenu={vi.fn()} navList={navList} />)
        expect(screen.getByTestId('close-icon')).toBeInTheDocument()
    })

    it('should set external links with target _blank', () => {
        render(<HeaderNavMobile isMenuOpen={true} toggleMenu={vi.fn()} navList={navList} />)
        const linkedinLink = screen.getByText('linkedin').closest('a')
        expect(linkedinLink).toHaveAttribute('target', '_blank')
    })
})
