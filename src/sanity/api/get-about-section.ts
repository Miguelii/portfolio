import { tryCatch } from '@/lib/try-catch'
import { sanityClientFetch } from '@/sanity/lib/client'
import { ABOUT_SECTION_GROQ } from '@/sanity/queries/about-parahraph.groq'
import type { AboutSection } from '../generated/sanity.types'
import type { PortableTextBlock } from '@portabletext/react'

export type AboutSectionDTO = {
    title: AboutSection['title']
    paragraphs: Array<{
        id: NonNullable<AboutSection['paragraphs']>[number]['_key']
        text: PortableTextBlock[]
    }>
} | null

export async function getAboutSection(): Promise<AboutSectionDTO> {
    const { data } = await tryCatch(async () => {
        return await sanityClientFetch<AboutSectionDTO>(ABOUT_SECTION_GROQ)
    }, 'getAboutSection')
    return data ?? null
}
