import { ClientEnv } from '@/env/client'
import type { WorkExperience } from '@/features/experience/types/WorkExperience'

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
                    {
                        id: 'achievements-blip-1',
                        text: 'Currently at FanDuel, building cool, innovative and high-impact products for the sports betting / finance world.',
                    },
                ],
            },
        ],
    },
    {
        company: 'CGI - Portugal',
        totalTime: 'Sep 2022 - Set 2025 · 3 yrs 1 mos',
        logoUrl: '/assets/cgi.webp',
        previewUrl: 'https://www.cgi.com/portugal/pt-pt',
        positions: [
            {
                jobTitle: 'Software Engineer | Full-Stack',
                timeLabel: 'May 2023 - Set 2025 · 2 yrs 5 mos',
                achievements: [
                    {
                        text: 'Lead Developer for the Web Team, specializing in building client portals and public websites.',
                        id: 'achievement-cgi-1',
                    },
                    {
                        text: 'Delivered products that have reached over million users worldwide, primarily using <b>React.js, Next.js and TypeScript.</b>',
                        id: 'achievement-cgi-2',
                    },
                    {
                        text: 'Responsible for applications architecture, good practices and technical decisions.',
                        id: 'achievement-cgi-3',
                    },
                    {
                        text: 'Engaged directly with clients through meetings and delivered training sessions on the products we developed.',
                        id: 'achievement-cgi-4',
                    },
                    {
                        text: 'Mentored junior developers through code reviews and pair programming.',
                        id: 'achievement-cgi-5',
                    },
                ],
            },
            {
                jobTitle: 'Junior Software Engineer | Full-Stack',
                timeLabel: 'Sep 2022 - May 2023 · 9 mos',
            },
        ],
    },
]
