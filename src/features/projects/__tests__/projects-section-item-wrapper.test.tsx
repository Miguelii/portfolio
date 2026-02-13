import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { Project } from '@/features/projects/types/Project'
import { ProjectsSectionItemWrapper } from '../components/projects-section-item-wrapper'

vi.mock('@next/third-parties/google', () => ({
    sendGTMEvent: vi.fn(),
}))

describe('ProjectsSectionItemWrapper', () => {
    //@ts-expect-error no need to mock everthing
    const mockProject: Project = {
        id: '1',
        title: 'Test Project',
        description: 'Test description',
        link: 'https://example.com',
    }

    //@ts-expect-error no need to mock everthing
    const mockProjectWithoutLink: Project = {
        id: '2',
        title: 'Test Project',
        description: 'Test description',
    }

    it('should render as a link when project has a link', () => {
        render(
            <ProjectsSectionItemWrapper project={mockProject}>
                <div>Test Content</div>
            </ProjectsSectionItemWrapper>
        )
        const link = screen.getByRole('link')
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', 'https://example.com')
    })

    it('should have target="_blank" an rel="noopener" when project has a link', () => {
        render(
            <ProjectsSectionItemWrapper project={mockProject}>
                <div>Test Content</div>
            </ProjectsSectionItemWrapper>
        )
        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener')
    })

    it('should render as a div when project does not have a link', () => {
        const { container } = render(
            <ProjectsSectionItemWrapper project={mockProjectWithoutLink}>
                <div>Test Content</div>
            </ProjectsSectionItemWrapper>
        )
        const div = container.querySelector('div')
        expect(div).toBeInTheDocument()
    })

    it('should render children content', () => {
        render(
            <ProjectsSectionItemWrapper project={mockProject}>
                <p>Test Content</p>
            </ProjectsSectionItemWrapper>
        )
        expect(screen.getByText('Test Content')).toBeInTheDocument()
    })
})
