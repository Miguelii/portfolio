import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { CookieConsent } from '@/types/CookieConsent'
import { Effect, pipe } from 'effect'
import { Logger } from '@/lib/logger'
import { HOME_PAGE_URL } from '@/lib/constants'
import { CookieParseError } from '@/lib/data-tagged-errors'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const normalizePath = (path: string) => path.replace(/\/$/, '') || HOME_PAGE_URL

export const getClientSideCookieConsent = (): CookieConsent | null => {
    return pipe(
        Effect.sync(() => typeof document !== 'undefined'),

        Effect.flatMap((isBrowser) =>
            isBrowser
                ? Effect.succeed(
                      document.cookie.split('; ').find((row) => row.startsWith('cookieConsent=')) ??
                          null
                  )
                : Effect.succeed(null)
        ),

        Effect.flatMap((consentCookie) => {
            if (!consentCookie) return Effect.succeed(null)

            return Effect.try({
                try: () => {
                    const value = consentCookie.split('=')[1]
                    return JSON.parse(decodeURIComponent(value)) as CookieConsent
                },
                catch: (error) => new CookieParseError({ cause: error }),
            })
        }),

        Effect.tapError((error) =>
            Effect.sync(() =>
                Logger({
                    level: 'error',
                    error: error,
                    context: 'getClientSideCookieConsent',
                })
            )
        ),

        Effect.orElse(() => Effect.succeed(null)),

        Effect.runSync
    )
}
