'use client'

import { cn } from '@/lib/utils'
import { motionPressProps } from '@/lib/constants'
import { haptic } from '@/lib/haptic'
import { sendGTMEvent } from '@next/third-parties/google'
import { motion } from 'motion/react'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'

const MotionLink = motion.create(Link)

type Props = PropsWithChildren<{
    href: string
    ariaLabel: string
    className?: string
    eventName?: string
}>

export const SocialItem = ({ href, children, ariaLabel, className, eventName }: Props) => {
    return (
        <MotionLink
            href={href}
            prefetch={false}
            target="_blank"
            rel="noreferrer"
            aria-label={ariaLabel}
            className={cn(
                'w-12 h-12 flex justify-center items-center hover:bg-card cursor-pointer rounded-xl',
                className
            )}
            onClick={() => {
                haptic()
                if (eventName) sendGTMEvent({ event: 'social_item_click', value: eventName })
            }}
            {...motionPressProps}
        >
            {children}
        </MotionLink>
    )
}
