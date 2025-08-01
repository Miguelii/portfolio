import { cn } from '@/utils/cn'
import { PropsWithChildren } from 'react'

type BadgeProps = PropsWithChildren<{
   className?: string
}>

export function Badge({ children, className }: BadgeProps) {
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
