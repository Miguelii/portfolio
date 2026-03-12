import { tryCatch } from '@/lib/try-catch'
import { sanityClientFetch } from '@/sanity/lib/client'
import { PRIVACY_NOTICE_SECTION_GROQ } from '@/sanity/queries/privacy-notice-section.groq'
import type { PrivacyNoticeSection } from '../generated/sanity.types'
import type { PortableTextBlock } from '@portabletext/react'

export type PrivacyNoticeSectionDTO = {
    title: PrivacyNoticeSection['title']
    paragraphs: Array<{
        id: NonNullable<PrivacyNoticeSection['paragraphs']>[number]['_key']
        text: PortableTextBlock[]
    }>
    _updatedAt: PrivacyNoticeSection['_updatedAt']
} | null

export async function getPrivacyNoticeSection(): Promise<PrivacyNoticeSectionDTO> {
    const { data } = await tryCatch(async () => {
        return await sanityClientFetch<PrivacyNoticeSectionDTO>(PRIVACY_NOTICE_SECTION_GROQ)
    }, 'getPrivacyNoticeSection')
    return data ?? null
}
