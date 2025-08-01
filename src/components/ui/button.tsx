import { cn } from '@/utils/cn'
import Link from 'next/link'
import type { HTMLAttributeAnchorTarget, PropsWithChildren } from 'react'

type ButtonProps = PropsWithChildren<{
   href: string
   prefetch?: boolean
   target?: HTMLAttributeAnchorTarget | undefined
   className?: string
   variant?: VARIANT
}>

type VARIANT = 'primary' | 'secondary'

export default function Button({
   href,
   prefetch = true,
   children,
   target,
   className,
   variant = 'primary',
}: ButtonProps) {
   const VARIANTS = {
      primary: 'bg-primary hover:bg-neutral text-white  ',
      secondary:
         'bg-background border-1 border-primary text-primary hover:bg-neutral hover:text-white hover:border-neutral',
   }

   const currVariant = VARIANTS[variant]

   return (
      <Link
         href={href}
         target={target}
         prefetch={prefetch}
         className={cn(
            'w-full md:w-fit justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-10 px-4 py-2 group overflow-hidden relative group flex items-center',
            currVariant,
            className
         )}
      >
         {children}
      </Link>
   )
}
