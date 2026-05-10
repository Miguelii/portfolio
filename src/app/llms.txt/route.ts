import { Effect } from 'effect'
import { toPlainText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/react'
import { ClientEnv } from '@/env/client'
import { Logger } from '@/lib/logger'
import { SanityFetchError } from '@/lib/data-tagged-errors'
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

const blocksToText = Effect.fn('blocksToText')(function* (blocks: PortableTextBlock[] | undefined) {
    if (!blocks || blocks.length === 0) return ''
    return yield* Effect.sync(() => toPlainText(blocks))
})

const buildAboutSection = Effect.fn('buildAboutSection')(function* (about: AboutSectionDTO) {
    if (!about?.paragraphs?.length) return ''

    const paragraphs = yield* Effect.forEach(about.paragraphs, (p) => blocksToText(p.text))

    const text = paragraphs.filter(Boolean).join('\n\n')

    if (!text) return ''
    return `## About\n\n${text}`
})

const buildExperienceSection = Effect.fn('buildExperienceSection')(function* (
    experience: WorkExperienceSectionDTO
) {
    if (!experience?.items?.length) return ''

    const items = yield* Effect.forEach(experience.items, (item) =>
        Effect.gen(function* () {
            const lines: string[] = [`### ${item.company}`]
            if (item.totalTime) lines.push(item.totalTime)

            for (const position of item.positions) {
                const timeLabel = position.timeLabel ? ` (${position.timeLabel})` : ''
                lines.push(`\n**${position.jobTitle}**${timeLabel}`)

                if (position.achievements?.length) {
                    const achievements = yield* Effect.forEach(
                        position.achievements,
                        (achievement) => blocksToText(achievement.text)
                    )
                    for (const text of achievements) {
                        if (text) lines.push(`- ${text}`)
                    }
                }
            }

            return lines.join('\n')
        })
    )

    return `## Work Experience\n\n${items.join('\n\n')}`
})

const buildLlmsTxt = Effect.fn('buildLlmsTxt')(function* (
    landing: LandingSectionDTO,
    about: AboutSectionDTO,
    experience: WorkExperienceSectionDTO
) {
    const title = landing?.title
    const subtitle = landing?.subtitle

    const aboutSection = yield* buildAboutSection(about)
    const experienceSection = yield* buildExperienceSection(experience)

    const sections = [
        '# Miguel Goncalves - Full-Stack Software Engineer',
        `${title} - ${subtitle}`,
        aboutSection,
        experienceSection,
        `## Links\n\n${LINKS.map((l) => `- ${l}`).join('\n')}`,
        `## Technologies\n\n${TECHNOLOGIES.join(', ')}`,
    ].filter(Boolean)

    return sections.join('\n\n')
})

export async function GET(): Promise<Response> {
    return Effect.runPromise(
        Effect.gen(function* () {
            const [landing, about, experience] = yield* Effect.all(
                [getLandingSection, getAboutSection, getWorkExperienceSection],
                { concurrency: 'unbounded' }
            )

            const content = yield* buildLlmsTxt(landing, about, experience)

            return new Response(content, {
                headers: { 'Content-Type': 'text/plain; charset=utf-8' },
            })
        }).pipe(
            Effect.catchAllDefect((defect) => {
                Logger({
                    level: 'error',
                    error: new SanityFetchError({ cause: defect }),
                    context: 'llms.txt [unexpected defect]',
                })
                return Effect.succeed(new Response('Internal Server Error', { status: 503 }))
            })
        )
    )
}
