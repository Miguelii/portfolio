'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MenuIcon } from '../icons/menu-icon'
import { AnimatePresence, motion, type Variants } from 'motion/react'
import { useState } from 'react'
import { CloseIcon } from '../icons/close-icon'
import { cn } from '@/utils/cn'

type NavItem = {
    title: string
    url: string
    external?: boolean
}

export default function Header() {
    const currPath = usePathname()

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
    ]

    return (
        <header className="main-container mx-auto items-center my-5 md:my-10 w-full justify-between gap-6 flex flex-row">
            <Link href={'/'} prefetch={false} className="text-2xl font-bold">
                MG.
            </Link>

            <MobileMenu
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}
                navList={navList}
                currPath={currPath}
            />

            <MenuIcon className="flex md:hidden w-12 h-12 shrink-0" onClick={toggleMenu} />

            <DesktopMenu navList={navList} currPath={currPath} />
        </header>
    )
}

type DesktopMenuProps = {
    navList: NavItem[]
    currPath: string
}
const DesktopMenu = ({ navList, currPath }: DesktopMenuProps) => {
    return (
        <nav className="hidden md:flex flex-row gap-6">
            {navList?.map((item, index) => {
                const currPathNormalized = normalizePath(currPath || '/')

                const itemPathNormalized = normalizePath(item.url)

                const isSelected = itemPathNormalized === currPathNormalized

                return (
                    <Link
                        key={`nav-item-${itemPathNormalized}-${item.title}-${index}`}
                        href={item.url}
                        aria-current={isSelected ? 'page' : undefined}
                        prefetch={!item.external}
                        target={item.external ? '_blank' : '_self'}
                        className={cn(
                            'relative font-mono uppercase font-bold text-lg group transition-colors duration-300',
                            isSelected ? '!text-neutral' : '!text-primary'
                        )}
                    >
                        {item.title}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-out group-hover:w-full"></span>
                    </Link>
                )
            })}
        </nav>
    )
}

type MobileMenuProps = {
    isMenuOpen: boolean
    toggleMenu: () => void
    navList: NavItem[]
    currPath: string
}
const MobileMenu = ({ isMenuOpen, toggleMenu, navList, currPath }: MobileMenuProps) => {
    const menuVariants: Variants = {
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

    const itemVariants: Variants = {
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
                    className="fixed inset-0 bg-background z-50 flex flex-col overflow-hidden"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={menuVariants}
                >
                    <div className="w-full flex justify-end pt-5 pr-5">
                        <CloseIcon
                            className="w-12 h-12 shrink-0 text-primary"
                            onClick={toggleMenu}
                        />
                    </div>

                    <nav className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
                        {navList?.map((item, index) => {
                            const currPathNormalized = normalizePath(currPath || '/')

                            const itemPathNormalized = normalizePath(item.url)

                            const isSelected = itemPathNormalized === currPathNormalized

                            return (
                                <motion.div variants={itemVariants} key={`mobile-nav-${index}`}>
                                    <Link
                                        key={`mobile-nav-item-${itemPathNormalized}-${index}-${isSelected}`}
                                        href={item.url}
                                        prefetch={!item.external}
                                        aria-current={isSelected ? 'page' : undefined}
                                        target={item.external ? '_blank' : '_self'}
                                        className={cn(
                                            'relative text-4xl font-semibold group transition-colors duration-300 block uppercase text-primary [aria-current="page"]:text-neutral',
                                            isSelected ? '!text-neutral' : '!text-primary'
                                        )}
                                        onClick={toggleMenu}
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
