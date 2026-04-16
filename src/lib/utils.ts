import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { CookieConsent } from '@/types/CookieConsent'
import { Logger } from '@/lib/logger'
import { Effect, pipe } from 'effect'
import { CookieParseError, HOME_PAGE_URL } from '@/lib/constants'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getBuildId = () => {
    return process.env.NEXT_PUBLIC_BUILD_TIMESTAMP ?? '1'
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

export function normalizeWebsiteUrl(normalized = 'http://localhost:3000'): string {
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
