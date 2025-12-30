import { ClientEnv } from '@/env/client'

const WEBSITE_URL = ClientEnv.NEXT_PUBLIC_WEBSITE_URL

export function PersonSchema() {
    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Miguel Gonçalves',
        jobTitle: 'Full-Stack Software Engineer',
        url: WEBSITE_URL,
        sameAs: [
            'https://www.linkedin.com/in/migueligoncal',
            'https://github.com/migueligoncal',
            'https://twitter.com/migueligoncal',
        ],
        knowsAbout: [
            'Next.js',
            'React.js',
            'TypeScript',
            'JavaScript',
            'Node.js',
            'Remix',
            'Tailwind CSS',
            'Supabase',
            'Web Development',
            'Full-Stack Development',
            'Software Engineering',
        ],
        description:
            'Full-Stack Software Engineer specializing in modern SaaS applications using React.js, Next.js, Remix, JavaScript, TypeScript, and Node.js.',
    }

    return (
        <script
            id='person-schema'
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
    )
}

export function WebSiteSchema() {
    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Miguel Gonçalves - Software Engineer',
        url: WEBSITE_URL,
        description:
            'Portfolio of Miguel Gonçalves, Full-Stack Software Engineer building modern SaaS applications with React, Next.js, and TypeScript.',
        author: {
            '@type': 'Person',
            name: 'Miguel Gonçalves',
        },
        inLanguage: 'en-US',
    }

    return (
        <script
            id='website-schema'
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
    )
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    }

    return (
        <script
            id='breadcrumb-schema'
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
    )
}

export function ProfilePageSchema() {
    const profileSchema = {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        mainEntity: {
            '@type': 'Person',
            name: 'Miguel Gonçalves',
            jobTitle: 'Full-Stack Software Engineer',
            url: WEBSITE_URL,
        },
    }

    return (
        <script
            id='profile-schema'
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
        />
    )
}
