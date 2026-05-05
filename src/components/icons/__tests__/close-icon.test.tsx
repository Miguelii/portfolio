import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CloseIcon } from '@/components/icons/close-icon'

vi.mock('motion/react', () => ({
    motion: {
        button: ({ children, ...props }: React.PropsWithChildren) => (
            <button {...props}>{children}</button>
        ),
        path: (props: Record<string, unknown>) => <path {...props} />,
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

describe('CloseIcon', () => {
    it('should render with aria-label', () => {
        render(<CloseIcon aria-label="Close menu" />)
        expect(screen.getByLabelText('Close menu')).toBeInTheDocument()
    })

    it('should call onClick handler when clicked', () => {
        const onClick = vi.fn()
        render(<CloseIcon aria-label="Close menu" onClick={onClick} />)
        fireEvent.click(screen.getByLabelText('Close menu'))
        expect(onClick).toHaveBeenCalledOnce()
    })

    it('should render svg element', () => {
        const { container } = render(<CloseIcon aria-label="Close" />)
        expect(container.querySelector('svg')).toBeInTheDocument()
    })
})
