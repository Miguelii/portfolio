import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const ClientEnv = createEnv({
    client: {
        NEXT_PUBLIC_VERCEL_URL: z.string().nullish(), // nullish becase its not available on localhost, only on vercel
        NEXT_PUBLIC_BUILD_TIMESTAMP: z.string().nullish(), // nullish becase its ony available on build
    },
    runtimeEnv: {
        NEXT_PUBLIC_VERCEL_URL: process?.env?.NEXT_PUBLIC_VERCEL_URL ?? undefined,
        NEXT_PUBLIC_BUILD_TIMESTAMP: process?.env?.NEXT_PUBLIC_BUILD_TIMESTAMP ?? undefined,
    },
})
