import { ClientEnv } from '@/env/client'
import type { WorkExperience } from '@/types/WorkExperience'

const WEBSITE_URL = ClientEnv.NEXT_PUBLIC_WEBSITE_URL

export const ExperiencesData: WorkExperience[] = [
    {
        totalTime: 'Sep 2025 - Present',
        company: 'Blip - Portugal',
        logoUrl: '/assets/blip_pt_logo.webp',
        url: 'https://www.blip.pt/',
        previewUrl: `${WEBSITE_URL}/assets/blip_web.webp`,
        positions: [
            {
                jobTitle: 'Associate Software Engineer | Front-End',
                achievements: [
                    'Currently at FanDuel, building cool, innovative and high-impact products for the sports betting world.',
                ],
            },
        ],
    },
    {
        company: 'CGI - Portugal',
        totalTime: 'Sep 2022 - Set 2025 · 3 yrs 2 mos',
        logoUrl: '/assets/cgi.webp',
        previewUrl: 'https://www.cgi.com/portugal/pt-pt',
        positions: [
            {
                jobTitle: 'Software Engineer | Full-Stack',
                timeLabel: 'Sep 2023 - Set 2025 · 2 yrs 8 mos',
                achievements: [
                    'Lead Developer for the Web Team, specializing in building client portals and public websites.',
                    'Delivered products that have reached over million users worldwide, primarily using <b>React.js, Next.js and TypeScript.</b>',
                    'Responsible for applications architecture, good practices and technical decisions.',
                    'Engaged directly with clients through meetings and delivered training sessions on the products we developed.',
                    'Mentored junior developers through code reviews and pair programming.',
                ],
            },
            {
                jobTitle: 'Junior Software Engineer | Front-End',
                timeLabel: 'Sep 2022 - Fev 2023 · 6 mos',
            },
        ],
    },
]
