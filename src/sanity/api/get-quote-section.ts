import { sanityClientFetch } from '@/sanity/lib/client'
import type { QuoteSection } from '@/sanity/generated/sanity.types'
import { QUOTE_SECTION_GROQ } from '@/sanity/queries/quote-section.groq'
import { Effect } from 'effect'
import { Logger } from '@/lib/logger'
import { SanityFetchError } from '@/lib/constants'

export type QuoteSectionDTO = {
    quote: QuoteSection['quote']
} | null

export const getQuoteSection = Effect.tryPromise({
    try: () => sanityClientFetch<QuoteSectionDTO>(QUOTE_SECTION_GROQ),
    catch: (error) => new SanityFetchError({ cause: error }),
}).pipe(
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
