'use client'

import { type NavItem } from '@/types/NavItem'
import { normalizePath } from '@/utils/normalize-path'
import { AnimatePresence, motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { cn } from '@/utils/cn'
import Link from 'next/link'
import { CloseIcon } from '../icons/close-icon'
import { useHeaderNavMobileAnimations } from './use-header-nav-mobile-animations'
import { sendGTMEvent } from '@next/third-parties/google'

type Props = {
    isMenuOpen: boolean
    toggleMenu: () => void
    navList: NavItem[]
}

export default function HeaderNavMobile({ isMenuOpen, toggleMenu, navList }: Props) {
    const currPath = usePathname()

    const { menuVariants, itemVariants } = useHeaderNavMobileAnimations()

    return (
        <AnimatePresence>
            {isMenuOpen && (
                <motion.div
                    id="mobile-nav-menu"
                    className="fixed inset-0 bg-background z-50 flex flex-col overflow-hidden"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={menuVariants}
                    role="navigation"
                    aria-label="Mobile navigation menu"
                >
                    <div className="w-full pt-2 pr-5 justify-end flex md:hidden">
                        <button
                            className="w-12 h-12 items-center justify-center flex md:hidden shrink-0"
                            onClick={() => {
                                toggleMenu()
                                sendGTMEvent({
                                    event: 'buttonClicked',
                                    value: 'header_mobile_close_menu',
                                })
                            }}
                            aria-label={
                                isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
                            }
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-nav-menu"
                        >
                            <CloseIcon className="w-12 h-12 shrink-0" />
                        </button>
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
                                        rel={item.external ? 'noopener noreferrer' : undefined}
                                        className={cn(
                                            'relative text-4xl font-semibold group transition-colors duration-300 block uppercase text-primary [aria-current="page"]:text-neutral',
                                            isSelected ? '!text-neutral' : '!text-primary'
                                        )}
                                        onClick={() => {
                                            toggleMenu()
                                            sendGTMEvent({
                                                event: 'buttonClicked',
                                                value: `header_nav_mobile_${item.title}`,
                                            })
                                        }}
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
