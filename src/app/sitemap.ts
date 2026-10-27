import { ClientEnv } from '@/env/client'
import type { MetadataRoute } from 'next'
import { getWritingPosts } from '@/sanity/api/get-writing-posts'
import { runSanityService } from '@/sanity/lib/sanity-service'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const WEBSITE_URL = ClientEnv.NEXT_PUBLIC_VERCEL_URL!
    const posts = await runSanityService(getWritingPosts)

    return [
        {
            url: WEBSITE_URL,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${WEBSITE_URL}/cooler-version`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${WEBSITE_URL}/cooler-version/privacy-notice`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${WEBSITE_URL}/writing`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        ...posts.map((post) => ({
            url: `${WEBSITE_URL}/writing/${post.slug}`,
            lastModified: post.publishedAt ? new Date(post.publishedAt) : undefined,
            changeFrequency: 'yearly' as const,
            priority: 0.6,
        })),
    ]
}
