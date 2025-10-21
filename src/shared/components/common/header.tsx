'use client'

import Link from 'next/link'
import { MenuIcon } from '../icons/menu-icon'
import { useState } from 'react'
import { NavItem } from '@/types/NavItem'
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
        <section className="border-b border-b-divider w-full flex">
            <header className="w-full flex-1 mx-auto main-container border-x border-x-divider px-5 md:px-10">
                <nav className="flex justify-between items-center h-16">
                    <Link href={'/'} prefetch={false} className="text-base font-semibold">
                        MG.
                    </Link>

                    <HeaderNavMobile
                        isMenuOpen={isMenuOpen}
                        toggleMenu={toggleMenu}
                        navList={navList}
                    />

                    <MenuIcon
                        className="flex md:hidden w-12 h-12 shrink-0"
                        size={24}
                        onClick={toggleMenu}
                    />

                    <HeaderNavDesktop navList={navList} />
                </nav>
            </header>
        </section>
    )
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
