import { type WorkExperience } from '@/types/WorkExperience'

export const ExperiencesData: WorkExperience[] = [
    {
        period: '2025 - Present',
        jobTitle: 'Associate Software Engineer',
        company: 'Blip',
        logoUrl: '/logos/blip_pt_logo.webp',
        badgeColor: 'bg-slate-800 text-white',
        previewUrl: 'https://www.instagram.com/blip.pt',
        achievements: [],
    },
    {
        period: '2022 - 2025',
        jobTitle: 'Software Engineer',
        company: 'CGI',
        logoUrl: '/logos/cgi.webp',
        badgeColor: 'bg-[#8942a8] text-white',
        previewUrl: 'https://www.cgi.com/portugal/pt-pt',
        achievements: [
            'Lead developer for the Web Team, specializing in full-stack development.',
            'Developed and maintained multiple full-stack applications.',
            'Responsible for the architecture, good practices, security and development of scalable web applications.',
        ],
    },
    {
        period: '2018 - 2022',
        jobTitle: 'BSc in Computer Science Engineering',
        company: 'University of Minho',
        logoUrl: '/logos/Universitaet_Minho.webp',
        badgeColor: 'bg-neutral-100 text-neutral-800',
        previewUrl: 'https://www.uminho.pt/PT',
        achievements: [],
    },
]
