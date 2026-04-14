import { sanityClientFetch } from '@/sanity/lib/client'
import type { QuoteSection } from '@/sanity/generated/sanity.types'
import { QUOTE_SECTION_GROQ } from '@/sanity/queries/quote-section.groq'
import { Effect } from 'effect'
import { Logger } from '@/lib/logger'

export type QuoteSectionDTO = {
    quote: QuoteSection['quote']
} | null

export const getQuoteSection = Effect.tryPromise({
    try: () => sanityClientFetch<QuoteSectionDTO>(QUOTE_SECTION_GROQ),
    catch: (error) => {
        Logger({
            level: 'error',
            error,
            context: 'getQuoteSection',
        })
        return error
    },
}).pipe(
    Effect.map((data) => data ?? null),
    Effect.catchAll(() => Effect.succeed(null))
)
