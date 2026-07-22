import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { HOME_PAGE_URL } from '@/lib/constants'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const normalizePath = (path: string) => path.replace(/\/$/, '') || HOME_PAGE_URL
