import type { NavItem } from '@/components/header/types/NavItem'

export const NavList: NavItem[] = [
    {
        title: 'OO',
        url: '/',
    },
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
