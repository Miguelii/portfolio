import type { ProjectType } from '@/types/Project'

export const ProjectsData: ProjectType[] = [
    {
        id: 'nda-01',
        title: 'Online Booking Platform',
        description:
            '<p><strong>Lead developer</strong> for a worldwide appointment scheduling booking platform in the public sector. <br/>Serving <strong>3M+ users worldwide</strong>, the app reduces phone line wait times by <strong>over 90%.</strong></p>',
        techStack: ['#next.js', '#react.js', '#typescript', '#tailwind'],
        order: 1,
    },
    {
        id: 'nda-02',
        title: 'Multi-Tenant Client Portal',
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
    },
    {
        id: 'nda-03',
        title: 'CMS‑Powered Website & Portal',
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
    },
]
