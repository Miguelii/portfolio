import { vi } from 'vitest'

vi.mock('next/link', () => ({
    default: ({ children, href }: React.PropsWithChildren<{ href: string }>) => (
        <a href={href}>{children}</a>
    ),
}))

vi.mock('next/navigation', () => ({
    usePathname: () => '/',
}))
