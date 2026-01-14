'use client'

import Link from 'next/link'
import { useState } from 'react'
import { sendGTMEvent } from '@next/third-parties/google'
import { MenuIcon } from 'lucide-react'
import HeaderNavDesktop from './header-nav-desktop'
import HeaderNavMobile from './header-nav-mobile'
import { NavList } from './constants'
import Image from 'next/image'
import { getBuildId } from '@/utils/get-build-id'

const buildId = getBuildId()

export default function Header() {
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
                            quality={100}
                        />
                    </Link>

                    <HeaderNavMobile
                        isMenuOpen={isMenuOpen}
                        toggleMenu={toggleMenu}
                        navList={NavList}
                    />

                    <button
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
                    >
                        <MenuIcon className="w-6 h-6 shrink-0" />
                    </button>

                    <HeaderNavDesktop navList={NavList} />
                </nav>
            </header>
        </section>
    )
}
