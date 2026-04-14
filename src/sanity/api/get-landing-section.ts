import { sanityClientFetch } from '@/sanity/lib/client'
import type { LandingSection } from '@/sanity/generated/sanity.types'
import { LANDING_SECTION_GROQ } from '@/sanity/queries/landing-section.groq'
import { Effect } from 'effect'
import { Logger } from '@/lib/logger'

export type LandingSectionDTO = {
    title: LandingSection['title']
    subtitle: LandingSection['subtitle']
} | null

export const getLandingSection = Effect.tryPromise({
    try: () => sanityClientFetch<LandingSectionDTO>(LANDING_SECTION_GROQ),
    catch: (error) => {
        Logger({
            level: 'error',
            error,
            context: 'getLandingSection',
        })
        return error
    },
}).pipe(
    Effect.map((data) => data ?? null),
    Effect.catchAll(() => Effect.succeed(null))
)
