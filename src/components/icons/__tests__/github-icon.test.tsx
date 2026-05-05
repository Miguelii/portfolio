import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { GithubIcon } from '@/components/icons/github-icon'

vi.mock('motion/react', () => ({
    motion: {
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

describe('GithubIcon', () => {
    it('should render with aria-label', () => {
        render(<GithubIcon aria-label="open github profile" />)
        expect(screen.getByLabelText('open github profile')).toBeInTheDocument()
    })

    it('should render svg with correct size', () => {
        const { container } = render(<GithubIcon aria-label="github" size={24} />)
        const svg = container.querySelector('svg')
        expect(svg).toHaveAttribute('width', '24')
        expect(svg).toHaveAttribute('height', '24')
    })

    it('should call onClick handler when clicked', () => {
        const onClick = vi.fn()
        render(<GithubIcon aria-label="github" onClick={onClick} />)
        fireEvent.click(screen.getByLabelText('github'))
        expect(onClick).toHaveBeenCalledOnce()
    })

    it('should use default size of 28', () => {
        const { container } = render(<GithubIcon aria-label="github" />)
        const svg = container.querySelector('svg')
        expect(svg).toHaveAttribute('width', '28')
        expect(svg).toHaveAttribute('height', '28')
    })
})
