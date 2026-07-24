import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { PortableTextBlock } from '@portabletext/react'
import { HOME_PAGE_URL, WORK_START_MONTH, WORK_START_YEAR } from '@/lib/constants'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const normalizePath = (path: string) => path.replace(/\/$/, '') || HOME_PAGE_URL

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
                typeof child.text === 'string'
                    ? { ...child, text: child.text.replaceAll('##YEARS_EXP##', yearsOfExperience) }
                    : child
            ),
        }
    })
}
