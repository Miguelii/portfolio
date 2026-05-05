import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CookieConsentLazy } from '@/components/cookie-consent/cookie-consent-lazy'

vi.mock('next/dynamic', () => ({
    default: () => {
        const Component = () => <div data-testid="cookie-consent">Cookie Consent</div>
        return Component
    },
}))

describe('CookieConsentLazy', () => {
    it('should render the dynamically loaded CookieConsent', () => {
        render(<CookieConsentLazy />)
        expect(screen.getByTestId('cookie-consent')).toBeInTheDocument()
    })
})
