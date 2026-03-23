import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { HOME_PAGE_URL, STATIC_PREFIXES } from './constants'
import type { CookieConsent } from '@/types/CookieConsent'
import { Logger } from './logger'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getBuildId = () => {
    return process.env.NEXT_PUBLIC_BUILD_TIMESTAMP ?? '1'
}

export const normalizePath = (path: string) => path.replace(/\/$/, '') || HOME_PAGE_URL

export const isPathFromStaticFiles = (pathname: string): boolean => {
    return STATIC_PREFIXES.some((prefix) => pathname.startsWith(prefix))
}

export const getClientSideCookieConsent = (): CookieConsent | null => {
    // We dont use `tryCatch` here because we dont want the function to be async
    try {
        if (typeof document === 'undefined') {
            return null
        }

        const consentCookie = document.cookie
            .split('; ')
            .find((row) => row.startsWith('cookieConsent='))

        if (!consentCookie) {
            return null
        }

        const value = consentCookie.split('=')[1]
        const decodedValue = decodeURIComponent(value)

        const json: CookieConsent = JSON.parse(decodedValue)

        return json
    } catch (error) {
        Logger({
            level: 'error',
            error,
            context: 'getCookieConsent',
        })
        return null
    }
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
