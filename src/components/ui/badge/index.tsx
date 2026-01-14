import { cn } from '@/utils/cn'
import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
    className?: string
}>

export function Badge({ children, className }: Props) {
    return (
        <div
            className={cn(
                'text-xs bg-background border border-primary/[0.1] text-neutral transition-colors rounded-full px-2.5 py-0.5 font-semibold',
                className
            )}
        >
            {children}
        </div>
    )
}
