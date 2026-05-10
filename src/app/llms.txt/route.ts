import { Effect } from 'effect'
import { toPlainText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/react'
import { ClientEnv } from '@/env/client'
import { getAboutSection } from '@/sanity/api/get-about-section'
import type { AboutSectionDTO } from '@/sanity/api/get-about-section'
import { getLandingSection } from '@/sanity/api/get-landing-section'
import type { LandingSectionDTO } from '@/sanity/api/get-landing-section'
import { getWorkExperienceSection } from '@/sanity/api/get-work-experience-section'
import type { WorkExperienceSectionDTO } from '@/sanity/api/get-work-experience-section'

export const dynamic = 'force-static'

const LINKS = [
    `Website: ${ClientEnv.NEXT_PUBLIC_VERCEL_URL}`,
    'LinkedIn: https://www.linkedin.com/in/migueligoncal',
    'GitHub: https://github.com/migueligoncal',
    'Twitter: https://twitter.com/migueligoncal',
]

const TECHNOLOGIES = [
    'Next.js',
    'React.js',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Sanity CMS',
    'Tailwind CSS',
    'Supabase',
    'Web Development',
    'Full-Stack Development',
    'Software Engineering',
]

function blocksToText(blocks: PortableTextBlock[] | undefined): string {
    if (!blocks || blocks.length === 0) return ''
    return toPlainText(blocks)
}

function buildAboutSection(about: AboutSectionDTO): string {
    if (!about?.paragraphs?.length) return ''

    const text = about.paragraphs
        .map((p) => blocksToText(p.text))
        .filter(Boolean)
        .join('\n\n')

    if (!text) return ''
    return `## About\n\n${text}`
}

function buildExperienceSection(experience: WorkExperienceSectionDTO): string {
    if (!experience?.items?.length) return ''

    const items = experience.items.map((item) => {
        const lines: string[] = [`### ${item.company}`]
        if (item.totalTime) lines.push(item.totalTime)

        for (const position of item.positions) {
            const timeLabel = position.timeLabel ? ` (${position.timeLabel})` : ''
            lines.push(`\n**${position.jobTitle}**${timeLabel}`)

            if (position.achievements?.length) {
                for (const achievement of position.achievements) {
                    const text = blocksToText(achievement.text)
                    if (text) lines.push(`- ${text}`)
                }
            }
        }

        return lines.join('\n')
    })

    return `## Work Experience\n\n${items.join('\n\n')}`
}

function buildLlmsTxt(
    landing: LandingSectionDTO,
    about: AboutSectionDTO,
    experience: WorkExperienceSectionDTO
): string {
    const title = landing?.title
    const subtitle = landing?.subtitle

    const sections = [
        '# Miguel Goncalves - Full-Stack Software Engineer',
        `${title} - ${subtitle}`,
        buildAboutSection(about),
        buildExperienceSection(experience),
        `## Links\n\n${LINKS.map((l) => `- ${l}`).join('\n')}`,
        `## Technologies\n\n${TECHNOLOGIES.join(', ')}`,
    ].filter(Boolean)

    return sections.join('\n\n')
}

export async function GET() {
    const [landing, about, experience] = await Effect.runPromise(
        Effect.all([getLandingSection, getAboutSection, getWorkExperienceSection], {
            concurrency: 'unbounded',
        })
    )

    const content = buildLlmsTxt(landing, about, experience)

    return new Response(content, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
}
