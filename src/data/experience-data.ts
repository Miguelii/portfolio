import { type WorkExperience } from '@/types/WorkExperience'
import { normalizeBaseUrl } from '@/utils/normalize-base-url'

const WEBSITE_URL = normalizeBaseUrl()

export const ExperiencesData: WorkExperience[] = [
    {
        period: '2025 - Present',
        jobTitle: 'Associate Software Engineer | Frontend Developer',
        company: 'Blip - Portugal',
        logoUrl: '/logos/blip_pt_logo.webp',
        badgeColor: 'bg-slate-800 text-white',
        url: 'https://www.blip.pt/',
        previewUrl: `${WEBSITE_URL}/assets/blip_web.webp`,
        achievements: [],
    },
    {
        period: '2022 - 2025',
        jobTitle: 'Software Engineer | Full Stack Developer',
        company: 'CGI - Portugal',
        logoUrl: '/logos/cgi.webp',
        badgeColor: 'bg-[#8942a8] text-white',
        previewUrl: 'https://www.cgi.com/portugal/pt-pt',
        achievements: [
            'Lead Developer for the Web Team, specializing in full-stack development.',
            'Developed and maintained several full-stack applications, mainly using React, Next.js, and TypeScript.',
            'Responsible for applications architecture, good practices and technical decisions.',
            'Engaged with clients through meetings and delivering training sessions on the applications we developed and delivered.',
            'Mentored junior developers through code reviews and pair programming.',
        ],
    },
    {
        period: '2018 - 2022',
        jobTitle: 'BSc in Computer Science Engineering',
        company: 'University of Minho - Portugal',
        logoUrl: '/logos/Universitaet_Minho.webp',
        badgeColor: 'bg-neutral-100 text-neutral-800',
        previewUrl: 'https://www.uminho.pt/PT',
        achievements: [],
    },
]
