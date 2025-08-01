import { ClientEnv } from '@/env/client'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
   const BASE_URL = ClientEnv.NEXT_PUBLIC_VERCEL_URL ?? ''

   return [
      {
         url: BASE_URL,
         lastModified: new Date(),
         changeFrequency: 'weekly',
         priority: 1,
      },
      {
         url: `${BASE_URL}/about`,
         lastModified: new Date(),
         changeFrequency: 'monthly',
         priority: 0.9,
      },
   ]
}
