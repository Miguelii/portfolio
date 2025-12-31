'use client'

import { type NavItem } from '@/types/NavItem'
import { cn } from '@/shared/utils/cn'
import { normalizePath } from '@/shared/utils/normalize-path'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { sendGTMEvent } from '@next/third-parties/google'

type HeaderNavDesktopProps = {
    navList: NavItem[]
}

export default function HeaderNavDesktop({ navList }: HeaderNavDesktopProps) {
    const currPath = usePathname()

    return (
        <nav className="hidden md:flex flex-row gap-5">
            {navList?.map((item, index) => {
                const currPathNormalized = normalizePath(currPath || '/')

                const itemPathNormalized = normalizePath(item.url)

                const isSelected = itemPathNormalized === currPathNormalized

                return (
                    <Link
                        key={`nav-item-${itemPathNormalized}-${item.title}-${index}-${isSelected}`}
                        href={item.url}
                        aria-current={isSelected ? 'page' : undefined}
                        prefetch={!item.external}
                        target={item.external ? '_blank' : '_self'}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        className={cn(
                            'relative font-mono uppercase font-semibold text-base group transition-colors duration-300',
                            isSelected ? '!text-neutral' : '!text-primary'
                        )}
                        onClick={() =>
                            sendGTMEvent({
                                event: 'buttonClicked',
                                value: `header_nav_desktop_${item.title}`,
                            })
                        }
                    >
                        {item.title}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-out group-hover:w-full"></span>
                    </Link>
                )
            })}
        </nav>
    )
}
