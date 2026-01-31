import type { NavItem } from '@/types/NavItem'

export const NavList: NavItem[] = [
    {
        title: 'OO',
        url: '/',
    },
    {
        title: 'OSS',
        url: '/open-source',
    },
    {
        title: 'Clients',
        url: '/clients',
    },
    /* {
        title: 'Labs',
        url: '/labs',
    }, */
    {
        title: 'linkedin',
        url: 'https://www.linkedin.com/in/miguelgoncalves18/',
        external: true,
    },
    {
        title: 'Github',
        url: 'https://github.com/Miguelii',
        external: true,
    },
] as const
