import { cn } from '@/utils/cn'
import Link from 'next/link'
import type { HTMLAttributeAnchorTarget } from 'react'

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

export default function Button(props: ButtonProps) {
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
            <button
                type={type}
                onClick={onClick}
                className={cn(
                    'relative px-4 w-full h-10 min-w-32 md:w-fit cursor-pointer',
                    currVariant.inner,
                    className
                )}
            >
                {content}
            </button>
        )
    }

    // default: link
    const { href, prefetch, target, scroll } = props

    return (
        <Link
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
        >
            {content}
        </Link>
    )
}
