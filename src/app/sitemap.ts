import { ClientEnv } from '@/env/client'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
    const WEBSITE_URL = ClientEnv.NEXT_PUBLIC_VERCEL_URL!

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
    ]
}
