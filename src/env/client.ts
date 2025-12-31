import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const ClientEnv = createEnv({
    client: {
        NEXT_PUBLIC_VERCEL_URL: z.string().nullish(), // nullish becase its not available on localhost, only on vercel
        NEXT_PUBLIC_WEBSITE_URL: z.string(),
    },
    runtimeEnv: {
        NEXT_PUBLIC_VERCEL_URL: process?.env?.NEXT_PUBLIC_VERCEL_URL ?? undefined,
        NEXT_PUBLIC_WEBSITE_URL: normalizeWebsiteUrl(
            process?.env?.NEXT_PUBLIC_VERCEL_URL ?? undefined
        ),
    },
})

function normalizeWebsiteUrl(url: string | null | undefined): string {
    let normalized = url ?? 'http://localhost:3000'

    // Always returns https
    if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
        normalized = `https://${normalized}`
    }

    // Always returns without final slash
    if (normalized.endsWith('/')) {
        normalized = normalized.slice(0, -1)
    }

    return normalized
}
