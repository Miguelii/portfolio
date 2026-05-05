import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { CookieConsent } from '@/components/cookie-consent'

const mockRefresh = vi.fn()

vi.mock('next/navigation', () => ({
    usePathname: () => '/',
    useRouter: () => ({ push: vi.fn(), refresh: mockRefresh }),
}))

vi.mock('next/link', () => ({
    default: ({ children, href }: React.PropsWithChildren<{ href: string }>) => (
        <a href={href}>{children}</a>
    ),
}))

vi.mock('@next/third-parties/google', () => ({
    sendGTMEvent: vi.fn(),
}))

vi.mock('@/actions/create-cookie-consent-action', () => ({
    createCookieConsentAction: vi.fn(),
}))

vi.mock('@/lib/utils', () => ({
    cn: (...args: unknown[]) => args.filter(Boolean).join(' '),
    getClientSideCookieConsent: () => null,
}))

vi.mock('@/lib/haptic', () => ({
    haptic: vi.fn(),
    supportsHaptic: false,
}))

vi.mock('@/lib/constants', () => ({
    HOME_PAGE_URL: '/',
}))

vi.mock('@/components/ui/button', () => ({
    Button: ({ label, onClick }: { label: string; onClick: () => void }) => (
        <button onClick={onClick}>{label}</button>
    ),
}))

vi.mock('lucide-react', () => ({
    CookieIcon: (props: Record<string, unknown>) => <span data-testid="cookie-icon" {...props} />,
}))

vi.mock('effect', () => {
    const mockEffect = {
        sleep: () => mockEffect,
        flatMap: (fn: (val: unknown) => unknown) => {
            fn(null)
            return mockEffect
        },
        sync: (fn: () => unknown) => {
            fn()
            return mockEffect
        },
        andThen: () => mockEffect,
        runFork: () => ({}),
        runSync: () => {},
    }

    return {
        Effect: mockEffect,
        Fiber: {
            interrupt: vi.fn(),
        },
        pipe: (..._args: unknown[]) => mockEffect,
    }
})

describe('CookieConsent', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.stubGlobal('gtag', vi.fn())
    })

    it('should render cookie consent heading', () => {
        render(<CookieConsent />)
        expect(screen.getByText('We use cookies')).toBeInTheDocument()
    })

    it('should render Accept and Decline buttons', () => {
        render(<CookieConsent />)
        expect(screen.getByRole('button', { name: 'Accept' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Decline' })).toBeInTheDocument()
    })

    it('should render privacy notice link', () => {
        render(<CookieConsent />)
        expect(screen.getByText('cookie policy')).toBeInTheDocument()
    })

    it('should call handler when Accept is clicked', () => {
        render(<CookieConsent />)
        fireEvent.click(screen.getByRole('button', { name: 'Accept' }))
        expect(globalThis.gtag).toHaveBeenCalledWith('consent', 'update', {
            ad_storage: 'granted',
            analytics_storage: 'granted',
        })
    })

    it('should call handler with denied when Decline is clicked', () => {
        render(<CookieConsent />)
        fireEvent.click(screen.getByRole('button', { name: 'Decline' }))
        expect(globalThis.gtag).toHaveBeenCalledWith('consent', 'update', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
        })
    })
})
