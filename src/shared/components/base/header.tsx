'use client'

import Link from 'next/link'
import { MenuIcon } from '../icons/menu-icon'
import { useState } from 'react'
import { NavItem } from '@/shared/types/NavItem'
import HeaderNavDesktop from './header-nav-desktop'
import HeaderNavMobile from './header-nav-mobile'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const navList: NavItem[] = [
        {
            title: 'OO',
            url: '/',
        },
        {
            title: 'ABOUT',
            url: '/about',
        },
        {
            title: 'linkedin',
            url: 'https://www.linkedin.com/in/miguelgoncalves18/',
            external: true,
        },
        {
            title: 'github',
            url: 'https://github.com/Miguelii',
            external: true,
        },
    ]

    return (
        <header className="main-container mx-auto items-center my-5 md:my-10 w-full justify-between gap-6 flex flex-row">
            <Link href={'/'} prefetch={false} className="text-2xl font-bold">
                MG.
            </Link>

            <HeaderNavMobile isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} navList={navList} />

            <MenuIcon className="flex md:hidden w-12 h-12 shrink-0" onClick={toggleMenu} />

            <HeaderNavDesktop navList={navList} />
        </header>
    )
}
