import { normalizeBaseUrl } from '@/utils/normalize-base-url'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
   const WEBSITE_URL = normalizeBaseUrl()

   return [
      {
         url: WEBSITE_URL ?? '',
         lastModified: new Date(),
         changeFrequency: 'weekly',
         priority: 1,
      },
      {
         url: `${WEBSITE_URL ?? ''}/about`,
         lastModified: new Date(),
         changeFrequency: 'monthly',
         priority: 0.9,
      },
   ]
}
