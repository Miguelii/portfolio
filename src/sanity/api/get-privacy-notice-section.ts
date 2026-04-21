import { sanityClientFetch } from '@/sanity/lib/client'
import { PRIVACY_NOTICE_SECTION_GROQ } from '@/sanity/queries/privacy-notice-section.groq'
import type { PrivacyNoticeSection } from '@/sanity/generated/sanity.types'
import type { PortableTextBlock } from '@portabletext/react'
import { Effect } from 'effect'
import { Logger } from '@/lib/logger'
import { SanityFetchError } from '@/lib/constants'

export type PrivacyNoticeSectionDTO = {
    title: PrivacyNoticeSection['title']
    paragraphs: Array<{
        id: NonNullable<PrivacyNoticeSection['paragraphs']>[number]['_key']
        text: PortableTextBlock[]
    }>
    _updatedAt: PrivacyNoticeSection['_updatedAt']
} | null

export const getPrivacyNoticeSection = Effect.tryPromise({
    try: () => sanityClientFetch<PrivacyNoticeSectionDTO>(PRIVACY_NOTICE_SECTION_GROQ),
    catch: (error) => new SanityFetchError({ cause: error }),
}).pipe(
    Effect.map((data) => data ?? null),
    Effect.catchAll((error) => {
        Logger({
            level: 'error',
            error,
            context: `getPrivacyNoticeSection [${error._tag}]`,
        })
        return Effect.succeed(null)
    })
)
