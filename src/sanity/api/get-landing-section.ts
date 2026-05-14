import 'server-only'

import type { LandingSection } from '@/sanity/generated/sanity.types'
import { LANDING_SECTION_GROQ } from '@/sanity/queries/landing-section.groq'
import { SanityService } from '@/sanity/lib/sanity-service'
import { Effect } from 'effect'
import { Logger } from '@/lib/logger'

export type LandingSectionDTO = {
    title: LandingSection['title']
    subtitle: LandingSection['subtitle']
} | null

export const getLandingSection: Effect.Effect<LandingSectionDTO, never, SanityService> = Effect.gen(
    function* () {
        const { fetch } = yield* SanityService
        return yield* fetch<LandingSectionDTO>(LANDING_SECTION_GROQ).pipe(
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
    }
)
