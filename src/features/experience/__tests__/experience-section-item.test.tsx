import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { WorkExperienceItem } from '../components/experience-section-item'
import type { WorkExperience } from '@/types/WorkExperience'
import { ClientEnv } from '@/env/client'

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
    const WEBSITE_URL = ClientEnv.NEXT_PUBLIC_WEBSITE_URL

    const mockExperience: WorkExperience = {
        totalTime: 'Sep 2025 - Present',
        company: 'Blip - Portugal',
        logoUrl: '/assets/blip_pt_logo.webp',
        url: 'https://www.blip.pt/',
        previewUrl: `${WEBSITE_URL}/assets/blip_web.webp`,
        positions: [
            {
                jobTitle: 'Software Engineer | Front-End',
                achievements: ['Led development of new features', 'Mentored junior developers'],
            },
        ],
    }

    it('should render company name', () => {
        render(<WorkExperienceItem {...mockExperience} />)
        expect(screen.getByText(mockExperience.company)).toBeInTheDocument()
    })

    it('should render totalTime information', () => {
        render(<WorkExperienceItem {...mockExperience} />)
        expect(screen.getByText(mockExperience.totalTime)).toBeInTheDocument()
    })

    it('should render all achievements', () => {
        render(<WorkExperienceItem {...mockExperience} />)
        expect(screen.getByText('Led development of new features')).toBeInTheDocument()
        expect(screen.getByText('Mentored junior developers')).toBeInTheDocument()
    })

    it('should render logo image', () => {
        render(<WorkExperienceItem {...mockExperience} />)
        const logo = screen.getByTestId('experience-logo')
        expect(logo).toHaveAttribute('alt', `${mockExperience.company} logo`)
    })
})
