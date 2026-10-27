import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { PortableTextBlock } from '@portabletext/react'
import { HOME_PAGE_URL, WORK_START_MONTH, WORK_START_YEAR } from '@/lib/constants'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const normalizePath = (path: string) => path.replace(/\/$/, '') || HOME_PAGE_URL

/** Formats an ISO date (YYYY-MM-DD) as e.g. "27 October 2026" */
export const formatLongDate = (isoDate: string) =>
    new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    })

/** URL-safe id from text, e.g. "The same applies to `use cache`" → "the-same-applies-to-use-cache" */
export const slugify = (text: string) =>
    text
        .normalize('NFKD')
        .replaceAll(/[\u0300-\u036F]/g, '')
        .toLowerCase()
        .replaceAll(/[^a-z0-9]+/g, '-')
        .replaceAll(/^-|-$/g, '')

type PortableTextSpan = Extract<PortableTextBlock['children'][number], { _type: 'span' }>

const isPortableTextSpan = (
    child: PortableTextBlock['children'][number]
): child is PortableTextSpan => child._type === 'span'

export const replaceTextWithWorkYears = (blocks: PortableTextBlock[]): PortableTextBlock[] => {
    const now = new Date()
    let years = now.getFullYear() - WORK_START_YEAR
    // getMonth() is 0-based, so add 1 to compare against the 1-based start month.
    if (now.getMonth() + 1 < WORK_START_MONTH) years -= 1
    const yearsOfExperience = String(years)

    return blocks.map((block) => {
        if (!Array.isArray(block.children)) return block

        return {
            ...block,
            children: block.children.map((child) =>
                isPortableTextSpan(child)
                    ? { ...child, text: child.text.replaceAll('##YEARS_EXP##', yearsOfExperience) }
                    : child
            ),
        }
    })
}
