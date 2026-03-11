import { act, render, screen } from '@testing-library/react'
import { Suspense } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { ExperienceSection } from '../components/experience-section'
import type { WorkExperienceSectionDTO } from '@/sanity/api/get-work-experience-section'

vi.mock('@/lib/haptic', () => ({ haptic: vi.fn(), supportsHaptic: true }))

describe('ExperienceSection', () => {
    const mockModel: WorkExperienceSectionDTO = {
        title: 'Work Experience',
        items: [
            {
                id: '1',
                company: 'Blip',
                logoUrl: '/assets/blip.webp',
                previewUrl: '##BASE_URL##/assets/blip_web.webp',
                totalTime: 'Sep 2022 - Present · 3 yrs',
                positions: [
                    {
                        id: 'pos-1',
                        jobTitle: 'Software Engineer',
                        timeLabel: 'Sep 2022 - Present',
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
                        ],
                    },
                ],
            },
        ],
    }

    it('should render section title', async () => {
        await act(async () => {
            render(
                <Suspense fallback={null}>
                    <ExperienceSection modelPromise={Promise.resolve(mockModel)} />
                </Suspense>
            )
        })
        expect(screen.getByText('Work Experience')).toBeInTheDocument()
    })

    it('should render company name', async () => {
        await act(async () => {
            render(
                <Suspense fallback={null}>
                    <ExperienceSection modelPromise={Promise.resolve(mockModel)} />
                </Suspense>
            )
        })
        expect(screen.getByText('Blip')).toBeInTheDocument()
    })
})
