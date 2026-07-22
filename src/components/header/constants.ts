import { COOLER_VERSION_URL, GITHUB_URL, LINKEDIN_URL } from '@/lib/constants'
import type { NavItem } from './types'

export const NavList: NavItem[] = [
    {
        title: 'OO',
        url: COOLER_VERSION_URL,
    },
    {
        title: 'linkedin',
        url: LINKEDIN_URL,
        external: true,
    },
    {
        title: 'Github',
        url: GITHUB_URL,
        external: true,
    },
] as const
