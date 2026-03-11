import { tryCatch } from '@/lib/try-catch'
import { sanityClientFetch } from '@/sanity/lib/client'
import type { LandingSection } from '../generated/sanity.types'
import { LANDING_SECTION_GROQ } from '../querys/landing-section.groq'

export type LandingSectionQuery = {
    title: LandingSection['title']
    subtitle: LandingSection['subtitle']
} | null

export async function getLandingSection(): Promise<LandingSectionQuery> {
    const { data } = await tryCatch(async () => {
        return await sanityClientFetch<LandingSectionQuery>(LANDING_SECTION_GROQ)
    }, 'getLandingSection')
    return data ?? null
}
