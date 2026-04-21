import { sanityClientFetch } from '@/sanity/lib/client'
import { ABOUT_SECTION_GROQ } from '@/sanity/queries/about-parahraph.groq'
import type { AboutSection } from '@/sanity/generated/sanity.types'
import type { PortableTextBlock } from '@portabletext/react'
import { Effect } from 'effect'
import { Logger } from '@/lib/logger'
import { SanityFetchError } from '@/lib/constants'

export type AboutSectionDTO = {
    title: AboutSection['title']
    paragraphs: Array<{
        id: NonNullable<AboutSection['paragraphs']>[number]['_key']
        text: PortableTextBlock[]
    }>
} | null

export const getAboutSection = Effect.tryPromise({
    try: () => sanityClientFetch<AboutSectionDTO>(ABOUT_SECTION_GROQ),
    catch: (error) => new SanityFetchError({ cause: error }),
}).pipe(
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
