import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { WorkExperienceItem } from '@/components/experience-section/experience-section-item'
import type { WorkExperienceSectionDTO } from '@/sanity/api/get-work-experience-section'
import type { PortableTextBlock } from '@portabletext/react'

vi.mock('@/env/client', () => ({
    ClientEnv: {
        NEXT_PUBLIC_WEBSITE_URL: 'https://miguel-goncalves.pt',
    },
}))

vi.mock('next/image', () => ({
    default: ({ src, alt }: { src: string; alt: string }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} data-testid="experience-logo" />
    ),
}))

vi.mock('@/components/ui/link-preview', () => ({
    LinkPreview: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

vi.mock('@portabletext/react', () => ({
    PortableText: ({ value }: { value: PortableTextBlock[] }) => {
        const text = value
            .flatMap((block) =>
                'children' in block
                    ? (block.children as Array<{ text: string }>).map((c) => c.text)
                    : []
            )
            .join('')
        return <span>{text}</span>
    },
}))

describe('WorkExperienceItem', () => {
    const mockExperience: NonNullable<WorkExperienceSectionDTO>['items'][number] = {
        id: '1',
        totalTime: 'Sep 2025 - Present',
        company: 'Blip - Portugal',
        logoUrl: '/assets/blip_pt_logo.webp',
        previewUrl: '##BASE_URL##/assets/blip_web.webp',
        positions: [
            {
                id: 'pos-1',
                jobTitle: 'Software Engineer | Front-End',
                achievements: [
                    {
                        id: 'ach-1',
                        text: [
                            {
                                _type: 'block',
                                _key: 'block-1',
                                children: [
                                    {
                                        _type: 'span',
                                        _key: 'span-1',
                                        text: 'Led development of new features',
                                        marks: [],
                                    },
                                ],
                                markDefs: [],
                                style: 'normal',
                            },
                        ],
                    },
                    {
                        id: 'ach-2',
                        text: [
                            {
                                _type: 'block',
                                _key: 'block-2',
                                children: [
                                    {
                                        _type: 'span',
                                        _key: 'span-2',
                                        text: 'Mentored junior developers',
                                        marks: [],
                                    },
                                ],
                                markDefs: [],
                                style: 'normal',
                            },
                        ],
                    },
                ],
            },
        ],
    }

    it('should render company name', () => {
        render(<WorkExperienceItem {...mockExperience} />)
        expect(screen.getByText(mockExperience.company!)).toBeInTheDocument()
    })

    it('should render totalTime information', () => {
        render(<WorkExperienceItem {...mockExperience} />)
        expect(screen.getByText(mockExperience.totalTime!)).toBeInTheDocument()
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
