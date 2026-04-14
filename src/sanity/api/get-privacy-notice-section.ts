import { sanityClientFetch } from '@/sanity/lib/client'
import { PRIVACY_NOTICE_SECTION_GROQ } from '@/sanity/queries/privacy-notice-section.groq'
import type { PrivacyNoticeSection } from '@/sanity/generated/sanity.types'
import type { PortableTextBlock } from '@portabletext/react'
import { Effect } from 'effect'
import { Logger } from '@/lib/logger'

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
    catch: (error) => {
        Logger({
            level: 'error',
            error,
            context: 'getPrivacyNoticeSection',
        })
        return error
    },
}).pipe(
    Effect.map((data) => data ?? null),
    Effect.catchAll(() => Effect.succeed(null))
)
