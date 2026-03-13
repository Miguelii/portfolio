'use client'

import { AnimatePresence, motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { cn, normalizePath } from '@/lib/utils'
import Link from 'next/link'
import { CloseIcon } from '@/components/icons/close-icon'
import { useHeaderNavMobileAnimations } from './use-header-nav-mobile-animations'
import { sendGTMEvent } from '@next/third-parties/google'
import type { NavItem } from './types'
import { HOME_PAGE_URL, motionPressProps } from '@/lib/constants'
import { haptic } from '@/lib/haptic'

const MotionLink = motion.create(Link)

type Props = {
    isMenuOpen: boolean
    toggleMenu: () => void
    navList: NavItem[]
}

export function HeaderNavMobile({ isMenuOpen, toggleMenu, navList }: Readonly<Props>) {
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
                        <CloseIcon
                            className="w-12 h-12 shrink-0"
                            onClick={() => {
                                haptic()
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
                        />
                    </div>

                    <nav className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
                        {navList?.map((item, index) => {
                            const currPathNormalized = normalizePath(currPath || HOME_PAGE_URL)

                            const itemPathNormalized = normalizePath(item.url)

                            const isSelected = itemPathNormalized === currPathNormalized

                            return (
                                <motion.div
                                    variants={itemVariants}
                                    key={`mobile-nav-item-${itemPathNormalized}-${index}-${isSelected}`}
                                >
                                    <MotionLink
                                        href={item.url}
                                        prefetch={!item.external}
                                        aria-current={isSelected ? 'page' : undefined}
                                        target={item.external ? '_blank' : '_self'}
                                        rel={item.external ? 'noopener noreferrer' : undefined}
                                        className={cn(
                                            'relative text-2xl lg:text-4xl font-semibold group transition-colors duration-300 block uppercase text-primary [aria-current="page"]:text-neutral',
                                            isSelected ? '!text-neutral' : '!text-primary'
                                        )}
                                        onClick={() => {
                                            haptic()
                                            toggleMenu()
                                            sendGTMEvent({
                                                event: 'buttonClicked',
                                                value: `header_nav_mobile_${item.title}`,
                                            })
                                        }}
                                        {...motionPressProps}
                                    >
                                        {item.title}
                                        <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-primary transition-all duration-300 ease-out group-hover:w-full"></span>
                                    </MotionLink>
                                </motion.div>
                            )
                        })}
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
