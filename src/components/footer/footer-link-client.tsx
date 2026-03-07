'use client'

import { cn } from '@/lib/utils'
import { motionPressProps } from '@/lib/constants'
import { haptic } from '@/lib/haptic'
import { motion } from 'motion/react'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'

const MotionLink = motion.create(Link)

type Props = PropsWithChildren & {
    href: string
    className?: string
}

export function FooterLinkClient({ children, href, className }: Props) {
    return (
        <MotionLink
            onClick={() => haptic()}
            href={href}
            prefetch={false}
            className={cn('underline text-sm font-mono hover:font-semibold', className)}
            {...motionPressProps}
        >
            {children}
        </MotionLink>
    )
}
