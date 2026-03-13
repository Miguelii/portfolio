import { tryCatch } from '@/lib/try-catch'
import { sanityClientFetch } from '@/sanity/lib/client'
import type { QuoteSection } from '@/sanity/generated/sanity.types'
import { QUOTE_SECTION_GROQ } from '@/sanity/queries/quote-section.groq'

export type QuoteSectionDTO = {
    quote: QuoteSection['quote']
} | null

export async function getQuoteSection(): Promise<QuoteSectionDTO> {
    const { data } = await tryCatch(async () => {
        return await sanityClientFetch<QuoteSectionDTO>(QUOTE_SECTION_GROQ)
    }, 'getQuoteSection')
    return data ?? null
}
