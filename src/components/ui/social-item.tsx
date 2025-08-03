import { cn } from '@/utils/cn'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

type SocialItemProps = PropsWithChildren<{
    href: string
    ariaLabel: string
    className?: string
}>
export const SocialItem = ({ href, children, ariaLabel, className }: SocialItemProps) => {
    return (
        <Link
            href={href}
            prefetch={false}
            target="_blank"
            aria-label={ariaLabel}
            className={cn(
                'w-12 h-12 flex justify-center items-center hover:bg-card cursor-pointer rounded-xl',
                className
            )}
        >
            {children}
        </Link>
    )
}
