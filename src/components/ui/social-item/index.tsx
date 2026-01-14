'use client'

import { cn } from '@/utils/cn'
import { sendGTMEvent } from '@next/third-parties/google'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
    href: string
    ariaLabel: string
    className?: string
    eventName?: string
}>

export const SocialItem = ({
    href,
    children,
    ariaLabel,
    className,
    eventName,
}: Props) => {
    return (
        <Link
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
                if (eventName) sendGTMEvent({ event: 'buttonClicked', value: eventName })
            }}
        >
            {children}
        </Link>
    )
}
