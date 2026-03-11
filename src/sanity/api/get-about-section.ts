import { tryCatch } from '@/lib/try-catch'
import { sanityClientFetch } from '@/sanity/lib/client'
import { ABOUT_SECTION_GROQ } from '@/sanity/querys/about-parahraph.groq'
import type { AboutSection } from '../generated/sanity.types'
import type { PortableTextBlock } from '@portabletext/react'

export type AboutSectionQuery = {
    title: AboutSection['title']
    paragraphs: Array<{
        id: NonNullable<AboutSection['paragraphs']>[number]['key']
        text: PortableTextBlock[]
    }>
} | null

export async function getAboutSection(): Promise<AboutSectionQuery> {
    const { data } = await tryCatch(async () => {
        return await sanityClientFetch<AboutSectionQuery>(ABOUT_SECTION_GROQ)
    }, 'getAboutSection')
    return data ?? null
}
