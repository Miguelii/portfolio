'use client'

import Link from 'next/link'
import { useState } from 'react'
import { sendGTMEvent } from '@next/third-parties/google'
import { NavList } from './utils/constants'
import Image from 'next/image'
import { getBuildId } from '@/utils/get-build-id'
import { MenuIcon } from '../icons/menu-icon'
import { HeaderNavDesktop } from './header-nav-desktop'
import { HeaderNavMobile } from './header-nav-mobile'

const buildId = getBuildId()

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <section className="border-b border-b-divider w-full flex h-16">
            <header className="w-full flex-1 mx-auto main-container border-x border-x-divider px-5 md:px-10">
                <nav className="flex justify-between items-center h-16">
                    <Link
                        href={'/'}
                        prefetch={false}
                        onClick={() => sendGTMEvent({ event: 'buttonClicked', value: 'logo' })}
                    >
                        <Image
                            src={`/assets/signature.webp?v=${buildId}`}
                            alt="Miguel Goncalves signature logo"
                            width={96}
                            height={64}
                            className="h-14 w-24 sm:h-16 object-contain"
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
                        className="w-12 h-12 items-center justify-center flex md:hidden flex-shrink-0"
                        onClick={() => {
                            toggleMenu()
                            sendGTMEvent({
                                event: 'buttonClicked',
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
