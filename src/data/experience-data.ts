import { ClientEnv } from '@/env/client'
import { type WorkExperience } from '@/types/WorkExperience'

const WEBSITE_URL = ClientEnv.NEXT_PUBLIC_WEBSITE_URL

export const ExperiencesData: WorkExperience[] = [
    {
        period: '2025 - Present',
        jobTitle: 'Software Engineer | Front-End',
        company: 'Blip - Portugal',
        logoUrl: '/logos/blip_pt_logo.webp',
        badgeColor: 'bg-slate-800 text-white',
        url: 'https://www.blip.pt/',
        previewUrl: `${WEBSITE_URL}/assets/blip_web.webp`,
        achievements: ['Currently at FanDuel, building cool, innovative and high-impact products for the sports betting world.'],
    },
    {
        period: '2022 - 2025',
        periodTime: '(3yrs 1mo)',
        jobTitle: 'Software Engineer | Full-Stack',
        company: 'CGI - Portugal',
        logoUrl: '/logos/cgi.webp',
        badgeColor: 'bg-[#8942a8] text-white',
        previewUrl: 'https://www.cgi.com/portugal/pt-pt',
        achievements: [
            'Lead Developer for the Web Team, specializing in building client portals and public websites.',
            'Delivered products that have reached over million users worldwide, primarily using <b>React.js, Next.js and TypeScript.</b>',
            'Responsible for applications architecture, good practices and technical decisions.',
            'Engaged directly with clients through meetings and delivered training sessions on the products we developed.',
            'Mentored junior developers through code reviews and pair programming.',
        ],
    },
    /*
    {
        period: '2018 - 2022',
        jobTitle: 'BSc in Computer Science Engineering',
        company: 'University of Minho - Portugal',
        logoUrl: '/logos/Universitaet_Minho.webp',
        badgeColor: 'bg-neutral-100 text-neutral-800',
        previewUrl: 'https://www.uminho.pt/PT',
        achievements: [],
    },
    */
]
