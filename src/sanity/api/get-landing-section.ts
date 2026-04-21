import { sanityClientFetch } from '@/sanity/lib/client'
import type { LandingSection } from '@/sanity/generated/sanity.types'
import { LANDING_SECTION_GROQ } from '@/sanity/queries/landing-section.groq'
import { Effect } from 'effect'
import { Logger } from '@/lib/logger'
import { SanityFetchError } from '@/lib/constants'

export type LandingSectionDTO = {
    title: LandingSection['title']
    subtitle: LandingSection['subtitle']
} | null

export const getLandingSection = Effect.tryPromise({
    try: () => sanityClientFetch<LandingSectionDTO>(LANDING_SECTION_GROQ),
    catch: (error) => new SanityFetchError({ cause: error }),
}).pipe(
    Effect.map((data) => data ?? null),
    Effect.catchAll((error) => {
        Logger({
            level: 'error',
            error,
            context: `getLandingSection [${error._tag}]`,
        })
        return Effect.succeed(null)
    })
)
