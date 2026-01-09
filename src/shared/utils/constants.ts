import { type NavItem } from '@/types/NavItem'

export const NavList: NavItem[] = [
    {
        title: 'OO',
        url: '/',
    },
    /* {
        title: 'Work',
        url: '/work',
    }, */
    {
        title: 'Clients',
        url: '/clients',
    },
    {
        title: 'Labs',
        url: '/labs',
    },
    {
        title: 'linkedin',
        url: 'https://www.linkedin.com/in/miguelgoncalves18/',
        external: true,
    },
] as const

export const GTM_ID = 'G-GRCH01BRT9' as const

export const GTM_ID_WITHOUT_G = 'GRCH01BRT9' as const
