import type { Project } from '@/types/Project'
import { ProjectType } from '@/types/ProjectTypeEnum'

export const ProjectsData: Project[] = [
    {
        id: 'feedxboost',
        title: 'FeedxBoost - Founder',
        description:
            'Founder and lead developer of an AI-powered platform designed to help teachers evaluate their students, with detailed performance analytics and growth insights.',
        techStack: ['#next.js', '#react.js', '#typescript', '#tailwind', '#supabase'],
        order: 1,
        type: ProjectType.CLIENT,
        img: '/assets/feed_x_boost.webp',
        link: 'https://feedxboost.com/',
    },
    {
        id: 'dinis-cunha',
        title: 'Dinis Cunha Plumber - Private Client',
        description:
            'Designed and developed a website for a plumbing service company based in the Algarve. The main focus was on <b>SEO optimization</b> and <b>local discoverability</b>.',
        techStack: ['#next.js', '#react.js', '#typescript', '#tailwind'],
        order: 2,
        type: ProjectType.CLIENT,
        img: '/assets/dinis.webp',
        link: 'https://www.dinis-cunha.pt/en',
    },
    {
        id: 'luisa-mendes',
        title: 'Luisa Mendes - Private Client',
        description:
            'Designed and developed a personal portfolio website, with a minimal design, to showcase the client makeup work.',
        techStack: ['#next.js', '#react.js', '#typescript', '#tailwind'],
        order: 3,
        type: ProjectType.CLIENT,
        img: '/assets/luis_mendes.webp',
        link: 'https://luisamendes.vercel.app/',
    },
    {
        id: 'Nuvē',
        title: 'Nuvē - Premium Cars',
        description:
            'Test project designed as a premium digital showcase for exotic vehicles and high-performance supercars.',
        techStack: ['#next.js', '#react.js', '#typescript', '#tailwind', '#motion'],
        order: 1,
        type: ProjectType.LABS,
        img: '/assets/nuve_cars.webp',
        link: 'https://nuve-cars.vercel.app',
    },
    {
        id: 'Next.js + CrafterCMS Starter kit',
        title: 'Next.js + CrafterCMS Starter kit',
        description:
            'Migrated the official <b>CrafterCMS Next.js Blueprint</b> to the latest <b>Next.js</b> and <b>React.js</b> stack. Introducing <b>App Router, Server-Side Rendering (SSR), TypeScript, Tailwind CSS</b> and several performance and code quality improvements to help developers get started.',
        techStack: ['#next.js', '#react.js', '#typescript', '#tailwind', '#craftercms'],
        order: 1,
        type: ProjectType.OSS,
        img: '/assets/crafter_next.webp',
        link: 'https://github.com/Miguelii/craftercms-nextjs-blueprint',
    },
]
