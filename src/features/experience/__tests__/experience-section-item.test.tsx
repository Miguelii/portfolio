import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { WorkExperienceItem } from '../components/experience-section-item'
import type { WorkExperience } from '@/types/WorkExperience'

vi.mock('next/image', () => ({
    default: ({ src, alt }: { src: string; alt: string }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} data-testid="experience-logo" />
    ),
}))

vi.mock('@/components/ui/link-preview', () => ({
    LinkPreview: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

describe('WorkExperienceItem', () => {
    const mockExperience: WorkExperience = {
        company: 'Tech Company',
        jobTitle: 'Senior Developer',
        period: '2023 - 2024',
        periodTime: '(3yrs)',
        url: 'https://techcompany.com',
        logoUrl: '/assets/tech-company.png',
        previewUrl: 'https://techcompany.com/preview.jpg',
        badgeColor: 'bg-blue-500',
        achievements: [
            'Led development of new features',
            'Improved performance by <strong>40%</strong>',
            'Mentored junior developers',
        ],
    }

    it('should render job title', () => {
        render(<WorkExperienceItem {...mockExperience} />)
        expect(screen.getByText('Senior Developer')).toBeInTheDocument()
    })

    it('should render company name', () => {
        render(<WorkExperienceItem {...mockExperience} />)
        expect(screen.getByText('Tech Company')).toBeInTheDocument()
    })

    it('should render period information', () => {
        render(<WorkExperienceItem {...mockExperience} />)
        expect(screen.getByText('2023 - 2024')).toBeInTheDocument()
    })

    it('should render period time when provided', () => {
        render(<WorkExperienceItem {...mockExperience} />)
        expect(screen.getByText('(3yrs)')).toBeInTheDocument()
    })

    it('should not render period time when not provided', () => {
        const experience = { ...mockExperience, periodTime: undefined }
        render(<WorkExperienceItem {...experience} />)
        expect(screen.queryByText('(3yrs)')).not.toBeInTheDocument()
    })

    it('should render all achievements', () => {
        render(<WorkExperienceItem {...mockExperience} />)
        expect(screen.getByText('Led development of new features')).toBeInTheDocument()
        expect(screen.getByText('Mentored junior developers')).toBeInTheDocument()
    })

    it('should render logo image', () => {
        render(<WorkExperienceItem {...mockExperience} />)
        const logo = screen.getByTestId('experience-logo')
        expect(logo).toHaveAttribute('alt', 'Tech Company logo')
    })
})
