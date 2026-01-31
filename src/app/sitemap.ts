import { ClientEnv } from '@/env/client'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'
export const revalidate = 86400 // 24h

export default function sitemap(): MetadataRoute.Sitemap {
    const WEBSITE_URL = ClientEnv.NEXT_PUBLIC_WEBSITE_URL

    return [
        {
            url: WEBSITE_URL,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${WEBSITE_URL}/open-source`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${WEBSITE_URL}/labs`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: `${WEBSITE_URL}/clients`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${WEBSITE_URL}/privacy-notice`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
    ]
}
