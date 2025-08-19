import { cn } from '@/shared/utils/cn'
import Link from 'next/link'
import type { HTMLAttributeAnchorTarget } from 'react'

type ButtonProps = {
    href: string
    prefetch?: boolean
    target?: HTMLAttributeAnchorTarget | undefined
    variant?: VARIANT
    label: string
    scroll?: boolean | undefined
}

type VARIANT = 'primary' | 'secondary'

export default function Button({
    href,
    prefetch = true,
    target,
    variant = 'primary',
    label,
    scroll,
}: ButtonProps) {
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

    const currVariant = VARIANTS[variant]

    return (
        <Link
            scroll={scroll}
            href={href}
            target={target}
            rel={target === '_blank' ? 'noreferrer' : undefined}
            prefetch={prefetch ?? false}
            className={cn(
                'relative px-4 w-full h-14 md:h-12 min-w-32 md:w-fit cursor-pointer',
                currVariant.inner
            )}
        >
            {label}
            <div
                className={cn(
                    'absolute transition-transform flex items-center justify-center inset-0 focus:translate-0 hover:-translate-0.5 -translate-1',
                    currVariant.outer
                )}
            >
                {label}
            </div>
        </Link>
    )
}
