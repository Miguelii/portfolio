'use client'

import { cn, normalizePath } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { sendGTMEvent } from '@next/third-parties/google'
import type { NavItem } from './types'
import { HOME_PAGE_URL, motionPressProps } from '@/lib/constants'
import { haptic } from '@/lib/haptic'
import { motion } from 'motion/react'

const MotionLink = motion.create(Link)

type Props = {
    navList: NavItem[]
}

export function HeaderNavDesktop({ navList }: Readonly<Props>) {
    const currPath = usePathname()

    return (
        <nav className="hidden md:flex flex-row gap-5">
            {navList?.map((item, index) => {
                const currPathNormalized = normalizePath(currPath || HOME_PAGE_URL)

                const itemPathNormalized = normalizePath(item.url)

                const isSelected = itemPathNormalized === currPathNormalized

                return (
                    <MotionLink
                        key={`nav-item-${itemPathNormalized}-${item.title}-${index}-${isSelected}`}
                        href={item.url}
                        aria-current={isSelected ? 'page' : undefined}
                        prefetch={!item.external}
                        target={item.external ? '_blank' : '_self'}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        className={cn(
                            'relative font-mono uppercase font-semibold text-p-small group transition-colors duration-300',
                            isSelected ? '!text-neutral' : '!text-primary'
                        )}
                        onClick={() => {
                            haptic()
                            sendGTMEvent({
                                event: 'buttonClicked',
                                value: `header_nav_desktop_${item.title}`,
                            })
                        }}
                        {...motionPressProps}
                    >
                        {item.title}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-out group-hover:w-full"></span>
                    </MotionLink>
                )
            })}
        </nav>
    )
}
