import 'server-only'

import type { QuoteSection } from '@/sanity/generated/sanity.types'
import { QUOTE_SECTION_GROQ } from '@/sanity/queries/quote-section.groq'
import { SanityService } from '@/sanity/lib/sanity-service'
import { Effect } from 'effect'
import { Logger } from '@/lib/logger'

export type QuoteSectionDTO = {
    quote: QuoteSection['quote']
} | null

export const getQuoteSection: Effect.Effect<QuoteSectionDTO, never, SanityService> = Effect.gen(
    function* () {
        const { fetch } = yield* SanityService
        return yield* fetch<QuoteSectionDTO>(QUOTE_SECTION_GROQ).pipe(
            Effect.map((data) => data ?? null),
            Effect.catchAll((error) => {
                Logger({
                    level: 'error',
                    error,
                    context: `getQuoteSection [${error._tag}]`,
                })
                return Effect.succeed(null)
            })
        )
    }
)
