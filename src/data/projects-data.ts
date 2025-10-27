import type { ProjectType } from '@/types/Project'

export const ProjectsData: ProjectType[] = [
    {
        id: 'nda-01',
        title: 'Online Booking Platform - Lead',
        description:
            '<p><strong>Lead developer</strong> for a worldwide appointment scheduling booking platform in the public sector. <br/>Serving <strong>3M+ users worldwide</strong>, the app reduces phone line wait times by <strong>over 90%.</strong></p>',
        techStack: ['#next.js', '#react.js', '#typescript', '#tailwind'],
        order: 1,
        work: true
    },
    {
        id: 'nda-02',
        title: 'Multi-Tenant Client Portal - Lead',
        description:
            '<p><strong>Lead developer</strong> for a multi-tenant SaaS client portal in the utilities sector, serving 20+ companies. Each with its own theme and fully integrated with a headless CMS.</p>Serving <strong>1M+ users nationwide.</strong>',
        techStack: [
            '#next.js',
            '#react.js',
            '#typescript',
            '#tailwind',
            '#supabase',
            '#craftercms',
        ],
        order: 2,
        work: true
    },
    {
        id: 'nda-03',
        title: 'CMS‑Powered Website & Portal - Lead',
        description:
            '<p><strong>Lead developer</strong> responsible for the full-stack development of a public website (powered by a headless CMS), a private client portal and an admin back office.</p>',
        techStack: [
            '#next.js',
            '#react.js',
            '#typescript',
            '#tailwind',
            '#supabase',
            '#craftercms',
        ],
        order: 3,
        work: true
    },

    {
        id: 'feedxboost',
        title: 'FeedxBoost - Founder',
        description: 'Founder and lead developer of an AI-powered platform designed to help teachers evaluate their students, with detailed performance analytics and growth insights.',
        techStack: [
            '#next.js',
            '#react.js',
            '#typescript',
            '#tailwind',
            '#supabase',
        ],
        order: 1,
        work: false,
        img: "/logos/feedxboost.webp",
        link: "https://feedxboost.com/"
    },
    {
        id: 'dinis-cunha',
        title: 'Dinis Cunha Plumber - Private Client',
        description: 'Designed and developed a website for a plumbing service company based in the Algarve. The main focus was on <b>SEO optimization</b> and <b>local discoverability</b>.',
        techStack: [
            '#next.js',
            '#react.js',
            '#typescript',
            '#tailwind',
        ],
        order: 2,
        work: false,
        img: "/logos/dinis.webp",
        link: "https://www.dinis-cunha.pt/en"
    },
    {
        id: 'luisa-mendes',
        title: 'Luisa Mendes - Private Client',
        description: 'Designed and developed a personal portfolio website, with a minimal design, to showcase the client makeup work.',
        techStack: [
            '#next.js',
            '#react.js',
            '#typescript',
            '#tailwind',
        ],
        order: 3,
        work: false,
        img: "/logos/luisa.webp",
        link: "https://luisamendes.vercel.app/"
    },
]
