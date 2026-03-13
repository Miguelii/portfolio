'use client'

import { cn } from '@/lib/utils'
import { motionPressProps } from '@/lib/constants'
import { haptic } from '@/lib/haptic'
import { motion } from 'motion/react'
import Link from 'next/link'
import type { HTMLAttributeAnchorTarget } from 'react'

const MotionLink = motion.create(Link)

type BaseProps = {
    label: string
    variant?: VARIANT
    className?: string
}

type LinkProps = BaseProps & {
    as?: 'link' // default
    href: string
    prefetch?: boolean
    target?: HTMLAttributeAnchorTarget
    scroll?: boolean
}

type ActionButtonProps = BaseProps & {
    as: 'button'
    onClick: React.MouseEventHandler<HTMLButtonElement>
    type?: 'button' | 'submit' | 'reset'
}

type ButtonProps = LinkProps | ActionButtonProps

type VARIANT = 'primary' | 'secondary'

const VARIANTS = {
    primary: {
        inner: 'bg-neutral text-white/0',
        outer: 'text-background hover:bg-primary bg-primary',
    },
    secondary: {
        inner: 'bg-primary text-white/0',
        outer: 'text-background hover:bg-neutral bg-neutral',
    },
}

export function Button(props: ButtonProps) {
    const { label, variant = 'primary', className } = props

    const currVariant = VARIANTS[variant]

    const content = (
        <>
            {label}
            <div
                className={cn(
                    'absolute transition-transform flex items-center justify-center inset-0 focus:translate-0 hover:-translate-0.5 -translate-1',
                    currVariant.outer
                )}
            >
                {label}
            </div>
        </>
    )

    if (props.as === 'button') {
        const { onClick, type = 'button' } = props

        return (
            <motion.button
                type={type}
                onClick={(e) => {
                    haptic()
                    onClick(e)
                }}
                className={cn(
                    'relative px-4 w-full h-10 min-w-32 md:w-fit cursor-pointer',
                    currVariant.inner,
                    className
                )}
                {...motionPressProps}
            >
                {content}
            </motion.button>
        )
    }

    // default: link
    const { href, prefetch, target, scroll } = props

    return (
        <MotionLink
            onClick={() => haptic()}
            href={href}
            prefetch={prefetch ?? false}
            target={target}
            scroll={scroll}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            className={cn(
                'relative px-4 w-full h-10 min-w-32 md:w-fit cursor-pointer',
                currVariant.inner,
                className
            )}
            {...motionPressProps}
        >
            {content}
        </MotionLink>
    )
}
