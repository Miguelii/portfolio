'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MenuIcon } from '../icons/menu-icon'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { CloseIcon } from '../icons/close-icon'

type NavItem = {
    title: string
    url: string
    external?: boolean
}

const NAV: NavItem[] = [
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
]

export default function Header() {
    const currPath = usePathname()

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <header className="main-container mx-auto items-center my-5 md:my-10 w-full justify-between gap-6 flex flex-row">
            <Link href={'/'} prefetch={false} className="text-2xl font-bold">
                MG.
            </Link>

            <MobileMenu
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}
                nav={NAV}
                currPath={currPath}
            />

            <MenuIcon className="flex md:hidden w-12 h-12 shrink-0" onClick={toggleMenu} />

            <nav className="hidden md:flex flex-row gap-6">
                {NAV?.map((item, index) => {
                    const currPathNormalized = normalizePath(currPath || '/')

                    const itemPathNormalized = normalizePath(item.url)

                    const isSelected = itemPathNormalized === currPathNormalized

                    return (
                        <Link
                            href={item.url}
                            aria-selected={isSelected}
                            prefetch={!item.external}
                            target={item.external ? '_blank' : '_self'}
                            className={
                                'relative font-mono uppercase font-bold text-lg group transition-colors duration-300 text-primary aria-selected:text-neutral'
                            }
                            key={`nav-item-${item?.url}-${index}-${isSelected}`}
                        >
                            {item.title}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-out group-hover:w-full"></span>
                        </Link>
                    )
                })}
            </nav>
        </header>
    )
}

type MobileMenuProps = {
    isMenuOpen: boolean
    toggleMenu: () => void
    nav: NavItem[]
    currPath: string
}
const MobileMenu = ({ isMenuOpen, toggleMenu, nav, currPath }: MobileMenuProps) => {
    const menuVariants = {
        closed: {
            opacity: 0,
            transition: {
                ease: 'easeOut',
                duration: 0.3,
            },
        },
        open: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
                when: 'beforeChildren',
            },
        },
    }

    const itemVariants = {
        closed: {
            opacity: 0,
            y: 20,
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                ease: 'easeOut',
                duration: 0.6,
            },
        },
    }

    return (
        <AnimatePresence>
            {isMenuOpen && (
                <motion.div
                    className="fixed inset-0 bg-white z-50 flex flex-col overflow-hidden"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    //@ts-expect-error erro de versão
                    variants={menuVariants}
                >
                    <div className="w-full flex justify-end pt-5 pr-5">
                        <CloseIcon
                            className="w-12 h-12 shrink-0 text-primary"
                            onClick={toggleMenu}
                        />
                    </div>

                    <nav className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
                        {nav?.map((item, index) => {
                            const currPathNormalized = normalizePath(currPath || '/')

                            const itemPathNormalized = normalizePath(item.url)

                            const isSelected = itemPathNormalized === currPathNormalized

                            return (
                                //@ts-expect-error erro de versão
                                <motion.div variants={itemVariants} key={`mobile-nav-${index}`}>
                                    <Link
                                        href={item.url}
                                        prefetch={!item.external}
                                        aria-selected={isSelected}
                                        target={item.external ? '_blank' : '_self'}
                                        className={
                                            'relative text-4xl font-semibold group transition-colors duration-300 block uppercase text-primary aria-selected:text-neutral'
                                        }
                                        onClick={toggleMenu}
                                        key={`mobile-nav-item-${item?.url}-${index}-${isSelected}`}
                                    >
                                        {item.title}
                                        <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-primary transition-all duration-300 ease-out group-hover:w-full"></span>
                                    </Link>
                                </motion.div>
                            )
                        })}
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

const normalizePath = (path: string) => path.replace(/\/$/, '') || '/'
