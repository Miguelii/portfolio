import 'server-only'

import { PRIVACY_NOTICE_SECTION_GROQ } from '@/sanity/queries/privacy-notice-section.groq'
import type { PrivacyNoticeSection } from '@/sanity/generated/sanity.types'
import type { PortableTextBlock } from '@portabletext/react'
import { SanityService } from '@/sanity/lib/sanity-service'
import { Effect } from 'effect'
import { Logger } from '@/lib/logger'

type PrivacyNoticeSectionDTO = {
    title: PrivacyNoticeSection['title']
    paragraphs: Array<{
        id: NonNullable<PrivacyNoticeSection['paragraphs']>[number]['_key']
        text: PortableTextBlock[]
    }>
    _updatedAt: PrivacyNoticeSection['_updatedAt']
} | null

export const getPrivacyNoticeSection: Effect.Effect<PrivacyNoticeSectionDTO, never, SanityService> =
    Effect.gen(function* () {
        const { fetch } = yield* SanityService
        return yield* fetch<PrivacyNoticeSectionDTO>(PRIVACY_NOTICE_SECTION_GROQ).pipe(
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
    })
