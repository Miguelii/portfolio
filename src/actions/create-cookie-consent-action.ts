'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { GTM_ID_WITHOUT_G } from '../utils/constants'
import { tryCatch } from '../utils/try-catch'

type Props = {
    allowAnalytics: boolean
}

export async function createCookieConsentAction({ allowAnalytics }: Props) {
    const { error } = await tryCatch(async () => {
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
            expires: new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000), // 1 year
        })

        if (!allowAnalytics) {
            cookieStore.delete('stats_ga')
            cookieStore.delete(`stats_ga_${GTM_ID_WITHOUT_G}`)
        }

        revalidatePath('/', 'layout')
    })

    if (error) {
        console.log('Error setting cookie consent:', error)
    }
}
