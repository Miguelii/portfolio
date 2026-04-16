'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { Logger } from '@/lib/logger'
import { Effect, pipe } from 'effect'
import { CookieStoreError, ValidationError, GTM_ID_WITHOUT_G } from '@/lib/constants'

const cookieConsentSchema = z.object({
    allowAnalytics: z.boolean(),
})

type Props = z.infer<typeof cookieConsentSchema>

export async function createCookieConsentAction(input: Props) {
    return pipe(
        Effect.try({
            try: () => cookieConsentSchema.parse(input),
            catch: (error) => new ValidationError({ cause: error }),
        }),

        Effect.flatMap(({ allowAnalytics }) =>
            Effect.tryPromise({
                try: async () => {
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
                        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                    })

                    if (!allowAnalytics) {
                        cookieStore.delete('stats_ga')
                        cookieStore.delete(`stats_ga_${GTM_ID_WITHOUT_G}`)
                    }

                    revalidatePath('/', 'layout')
                },
                catch: (error) => new CookieStoreError({ cause: error }),
            })
        ),

        Effect.tapError((error) =>
            Effect.sync(() =>
                Logger({
                    level: 'error',
                    error: error,
                    context: 'createCookieConsentAction',
                })
            )
        ),

        Effect.runPromise
    )
}
