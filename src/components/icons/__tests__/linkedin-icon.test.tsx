import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { LinkedinIcon } from '@/components/icons/linkedin-icon'

vi.mock('motion/react', () => ({
    motion: {
        path: (props: Record<string, unknown>) => <path {...props} />,
        rect: (props: Record<string, unknown>) => <rect {...props} />,
        circle: (props: Record<string, unknown>) => <circle {...props} />,
    },
    useAnimation: () => ({
        start: vi.fn(),
    }),
    forwardRef: vi.fn(),
}))

vi.mock('@/lib/utils', () => ({
    cn: (...args: string[]) => args.filter(Boolean).join(' '),
}))

describe('LinkedinIcon', () => {
    it('should render with aria-label', () => {
        render(<LinkedinIcon aria-label="open linkedin profile" />)
        expect(screen.getByLabelText('open linkedin profile')).toBeInTheDocument()
    })

    it('should render svg with correct size', () => {
        const { container } = render(<LinkedinIcon aria-label="linkedin" size={18} />)
        const svg = container.querySelector('svg')
        expect(svg).toHaveAttribute('width', '18')
        expect(svg).toHaveAttribute('height', '18')
    })

    it('should call onClick handler when clicked', () => {
        const onClick = vi.fn()
        render(<LinkedinIcon aria-label="linkedin" onClick={onClick} />)
        fireEvent.click(screen.getByLabelText('linkedin'))
        expect(onClick).toHaveBeenCalledOnce()
    })

    it('should use default size of 28', () => {
        const { container } = render(<LinkedinIcon aria-label="linkedin" />)
        const svg = container.querySelector('svg')
        expect(svg).toHaveAttribute('width', '28')
        expect(svg).toHaveAttribute('height', '28')
    })
})
