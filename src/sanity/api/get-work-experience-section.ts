import { sanityClientFetch } from '@/sanity/lib/client'
import { WORK_EXPERIENCE_SECTION_GROQ } from '@/sanity/queries/work-experience-section.groq'
import type { WorkExperienceSection } from '@/sanity/generated/sanity.types'
import type { PortableTextBlock } from '@portabletext/react'
import { Effect } from 'effect'
import { Logger } from '@/lib/logger'

type WorkExperienceSectionDTOItem = NonNullable<WorkExperienceSection['items']>[number]
type WorkExperienceSectionDTOPosition = NonNullable<
    WorkExperienceSectionDTOItem['positions']
>[number]

export type WorkExperienceSectionDTO = {
    title: WorkExperienceSection['title']
    items: Array<{
        id: string
        company: WorkExperienceSectionDTOItem['company']
        logoUrl: WorkExperienceSectionDTOItem['logoUrl']
        previewUrl: WorkExperienceSectionDTOItem['previewUrl']
        totalTime: WorkExperienceSectionDTOItem['totalTime']
        positions: Array<{
            id: string
            jobTitle: WorkExperienceSectionDTOPosition['jobTitle']
            timeLabel?: WorkExperienceSectionDTOPosition['timeLabel']
            achievements?: Array<{
                id: string
                text: PortableTextBlock[]
            }>
        }>
    }>
} | null

export const getWorkExperienceSection = Effect.tryPromise({
    try: () => sanityClientFetch<WorkExperienceSectionDTO>(WORK_EXPERIENCE_SECTION_GROQ),
    catch: (error) => {
        Logger({
            level: 'error',
            error,
            context: 'getWorkExperienceSection',
        })
        return error
    },
}).pipe(
    Effect.map((data) => data ?? null),
    Effect.catchAll(() => Effect.succeed(null))
)
