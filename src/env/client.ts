import { normalizeWebsiteUrl } from '../lib/utils'
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const ClientEnv = createEnv({
    client: {
        NEXT_PUBLIC_VERCEL_URL: z.string().nullish(), // nullish becase its not available on localhost, only on vercel
        NEXT_PUBLIC_WEBSITE_URL: z.string(),
        NEXT_PUBLIC_SANITY_DATASET: z.string(),
        NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),
    },
    runtimeEnv: {
        NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
        NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        NEXT_PUBLIC_VERCEL_URL: process.env?.NEXT_PUBLIC_VERCEL_URL ?? undefined,
        NEXT_PUBLIC_WEBSITE_URL: normalizeWebsiteUrl(
            process?.env?.NEXT_PUBLIC_VERCEL_URL ?? undefined
        ),
    },
})
