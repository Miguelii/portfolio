'use client'

import Link from 'next/link'
import { useState } from 'react'
import { sendGTMEvent } from '@next/third-parties/google'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { getBuildId } from '@/lib/utils'
import { MenuIcon } from '@/components/icons/menu-icon'
import { HeaderNavDesktop } from './header-nav-desktop'
import { HOME_PAGE_URL } from '@/lib/constants'
import { NavList } from './constants'
import { haptic } from '@/lib/haptic'

const HeaderNavMobile = dynamic(
    () => import('./header-nav-mobile').then((mod) => ({ default: mod.HeaderNavMobile })),
    { ssr: false }
)

const buildId = getBuildId()

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev)
    }

    return (
        <section className="border-b border-b-divider w-full flex h-16">
            <header className="w-full flex-1 mx-auto main-container border-x border-x-divider px-5 md:px-10">
                <nav className="flex justify-between items-center h-16">
                    <Link
                        href={HOME_PAGE_URL}
                        prefetch={false}
                        onClick={() => {
                            haptic()
                            sendGTMEvent({ event: 'logo_click', value: 'logo' })
                        }}
                    >
                        <Image
                            src={`/assets/signature.webp?v=${buildId}`}
                            alt="Miguel Goncalves signature logo"
                            width={96}
                            height={64}
                            className="h-12 w-24 md:h-16 object-contain"
                            sizes="(max-width: 640px) 96px, 96px"
                            priority
                            placeholder="empty"
                        />
                    </Link>

                    <HeaderNavMobile
                        isMenuOpen={isMenuOpen}
                        toggleMenu={toggleMenu}
                        navList={NavList}
                    />

                    <MenuIcon
                        className="w-12 h-12 items-center justify-center flex md:hidden shrink-0"
                        onClick={() => {
                            haptic()
                            toggleMenu()
                            sendGTMEvent({
                                event: 'header_menu_click',
                                value: 'header_mobile_open_menu',
                            })
                        }}
                        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-nav-menu"
                    />

                    <HeaderNavDesktop navList={NavList} />
                </nav>
            </header>
        </section>
    )
}
