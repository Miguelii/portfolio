import { tryCatch } from '@/lib/try-catch'
import { sanityClientFetch } from '@/sanity/lib/client'
import { WORK_EXPERIENCE_SECTION_GROQ } from '@/sanity/querys/work-experience-section.groq'
import type { WorkExperienceSection } from '../generated/sanity.types'
import type { PortableTextBlock } from '@portabletext/react'

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

export async function getWorkExperienceSection(): Promise<WorkExperienceSectionDTO> {
    const { data } = await tryCatch(async () => {
        return await sanityClientFetch<WorkExperienceSectionDTO>(WORK_EXPERIENCE_SECTION_GROQ)
    }, 'getWorkExperienceSection')
    return data ?? null
}
