import Link from 'next/link'
import { HOME_PAGE_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'

const AUTHOR_NAME = 'Miguel Gonçalves'

const AUTHOR_ROLE = 'Software Engineer'

type Props = Readonly<{
    /** On subpages the page title is the h1, so the name links back home instead */
    linkToHome?: boolean
    className?: string
}>

export function AuthorHeader({ linkToHome = false, className }: Props) {
    return (
        <header className={cn('flex flex-col items-start', className)}>
            {linkToHome ? (
                <Link
                    className="font-medium text-primary transition-opacity hover:opacity-80"
                    prefetch={false}
                    href={HOME_PAGE_URL}
                >
                    {AUTHOR_NAME}
                </Link>
            ) : (
                <h1 className="font-medium text-primary">{AUTHOR_NAME}</h1>
            )}
            <p className="text-neutral">{AUTHOR_ROLE}</p>
        </header>
    )
}
