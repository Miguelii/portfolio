'use client'

import { type NavItem } from '@/shared/types/NavItem'
import { normalizePath } from '@/shared/utils/normalize-path'
import { AnimatePresence, motion, type Variants } from 'motion/react'
import { usePathname } from 'next/navigation'
import { CloseIcon } from '../icons/close-icon'
import { cn } from '@/shared/utils/cn'
import Link from 'next/link'

type HeaderNavMobileProps = {
    isMenuOpen: boolean
    toggleMenu: () => void
    navList: NavItem[]
}

export default function HeaderNavMobile({ isMenuOpen, toggleMenu, navList }: HeaderNavMobileProps) {
    const currPath = usePathname()

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
                    <div className="w-full flex justify-end pt-2 pr-6">
                        <CloseIcon
                            className="w-12 h-12 shrink-0 text-primary"
                            onClick={toggleMenu}
                            size={24}
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
                                        rel={item.external ? 'noreferrer' : undefined}
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
