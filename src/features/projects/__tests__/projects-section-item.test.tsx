import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ProjectsSectionItem } from '../components/projects-section-item'
import type { Project } from '@/types/Project'

vi.mock('next/image', () => ({
    default: ({ src, alt }: { src: string; alt: string }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} data-testid="project-image" />
    ),
}))

vi.mock('../components/projects-section-item-wrapper', () => ({
    default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

describe('ProjectsSectionItem', () => {
    //@ts-expect-error no need to mock everthing
    const mockProject: Project = {
        id: '1',
        label: 'E-Commerce Platform',
        title: 'Modern Shopping Experience',
        description:
            'A full-featured e-commerce platform with <strong>React</strong> and <strong>Node.js</strong>',
        techStack: ['React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
        img: '/assets/ecommerce.png',
        link: 'https://example.com/project',
    }

    /* it('should render project label', () => {
        render(<ProjectsSectionItem {...mockProject} />)
        expect(screen.getByText('E-Commerce Platform')).toBeInTheDocument()
    }) */

    it('should render project title', () => {
        render(<ProjectsSectionItem {...mockProject} />)
        expect(screen.getByText('Modern Shopping Experience')).toBeInTheDocument()
    })

    it('should render all tech stack items', () => {
        const { container } = render(<ProjectsSectionItem {...mockProject} />)
        const techStackSpans = container.querySelectorAll('span.font-mono')
        expect(techStackSpans).toHaveLength(4)
    })

    it('should render project image when img is provided', () => {
        render(<ProjectsSectionItem {...mockProject} />)
        const image = screen.getByTestId('project-image')
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute(
            'alt',
            'Modern Shopping Experience - E-Commerce Platform screenshot'
        )
    })

    it('should not render image when img is not provided', () => {
        const projectWithoutImage = { ...mockProject, img: undefined }
        render(<ProjectsSectionItem {...projectWithoutImage} />)
        expect(screen.queryByTestId('project-image')).not.toBeInTheDocument()
    })
})
