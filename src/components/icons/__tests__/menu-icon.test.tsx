import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MenuIcon } from '@/components/icons/menu-icon'

vi.mock('motion/react', () => ({
    motion: {
        button: ({ children, ...props }: React.PropsWithChildren) => (
            <button {...props}>{children}</button>
        ),
        line: (props: Record<string, unknown>) => <line {...props} />,
    },
    useAnimation: () => ({
        start: vi.fn(),
    }),
    forwardRef: vi.fn(),
}))

vi.mock('@/lib/utils', () => ({
    cn: (...args: string[]) => args.filter(Boolean).join(' '),
}))

vi.mock('@/lib/constants', () => ({
    motionPressProps: {},
}))

describe('MenuIcon', () => {
    it('should render with aria-label', () => {
        render(<MenuIcon aria-label="Open navigation menu" />)
        expect(screen.getByLabelText('Open navigation menu')).toBeInTheDocument()
    })

    it('should call onClick handler when clicked', () => {
        const onClick = vi.fn()
        render(<MenuIcon aria-label="Open menu" onClick={onClick} />)
        fireEvent.click(screen.getByLabelText('Open menu'))
        expect(onClick).toHaveBeenCalledOnce()
    })

    it('should render svg with three lines', () => {
        const { container } = render(<MenuIcon aria-label="menu" />)
        const lines = container.querySelectorAll('line')
        expect(lines).toHaveLength(3)
    })

    it('should pass aria-expanded prop', () => {
        render(<MenuIcon aria-label="menu" aria-expanded={true} />)
        expect(screen.getByLabelText('menu')).toHaveAttribute('aria-expanded', 'true')
    })
})
