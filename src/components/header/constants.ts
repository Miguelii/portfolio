import type { NavItem } from "@/types/NavItem";

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