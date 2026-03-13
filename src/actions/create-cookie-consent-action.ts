'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { GTM_ID_WITHOUT_G } from '@/lib/constants'
import { tryCatch } from '@/lib/try-catch'
import { Logger } from '@/lib/logger'

const cookieConsentSchema = z.object({
    allowAnalytics: z.boolean(),
})

type Props = z.infer<typeof cookieConsentSchema>

export async function createCookieConsentAction(input: Props) {
    const parsed = cookieConsentSchema.safeParse(input)

    if (!parsed.success) {
        Logger({
            level: 'error',
            error: new Error(parsed.error.message),
            context: 'createCookieConsentAction',
        })
        return
    }

    const { allowAnalytics } = parsed.data

    await tryCatch(async () => {
        const cookieStore = await cookies()

        cookieStore.set({
            name: 'cookieConsent',
            value: JSON.stringify({
                necessary: true,
                analytics: allowAnalytics,
            }),
            httpOnly: false,
            secure: true,
            sameSite: 'lax',
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
        })

        if (!allowAnalytics) {
            cookieStore.delete('stats_ga')
            cookieStore.delete(`stats_ga_${GTM_ID_WITHOUT_G}`)
        }

        revalidatePath('/', 'layout')
    }, 'createCookieConsentAction')
}
