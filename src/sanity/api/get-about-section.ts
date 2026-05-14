import 'server-only'

import { ABOUT_SECTION_GROQ } from '@/sanity/queries/about-parahraph.groq'
import type { AboutSection } from '@/sanity/generated/sanity.types'
import type { PortableTextBlock } from '@portabletext/react'
import { Effect } from 'effect'
import { Logger } from '@/lib/logger'
import { SanityService } from '@/sanity/lib/sanity-service'

export type AboutSectionDTO = {
    title: AboutSection['title']
    paragraphs: Array<{
        id: NonNullable<AboutSection['paragraphs']>[number]['_key']
        text: PortableTextBlock[]
    }>
} | null

export const getAboutSection: Effect.Effect<AboutSectionDTO, never, SanityService> = Effect.gen(
    function* () {
        const { fetch } = yield* SanityService
        return yield* fetch<AboutSectionDTO>(ABOUT_SECTION_GROQ).pipe(
            Effect.map((data) => data ?? null),
            Effect.catchAll((error) => {
                Logger({
                    level: 'error',
                    error,
                    context: `getAboutSection [${error._tag}]`,
                })
                return Effect.succeed(null)
            })
        )
    }
)
