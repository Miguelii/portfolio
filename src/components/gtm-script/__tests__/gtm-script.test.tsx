import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { GtmScript } from '@/components/gtm-script'

vi.mock('next/script', () => ({
    default: ({
        id,
        src,
        dangerouslySetInnerHTML,
    }: {
        id: string
        src?: string
        dangerouslySetInnerHTML?: { __html: string }
        // oxlint-disable-next-line nextjs/no-sync-scripts - test file
    }) => <script id={id} src={src} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />,
}))

vi.mock('@/lib/constants', () => ({
    GTM_ID: 'G-TEST123',
}))

describe('GtmScript', () => {
    it('should render gtm script tag with correct src', () => {
        const { container } = render(<GtmScript />)
        const script = container.querySelector('#gtm-script')
        expect(script).toBeInTheDocument()
        expect(script).toHaveAttribute(
            'src',
            'https://www.googletagmanager.com/gtag/js?id=G-TEST123'
        )
    })

    it('should render google analytics inline script', () => {
        const { container } = render(<GtmScript />)
        const script = container.querySelector('#google-analytics')
        expect(script).toBeInTheDocument()
    })

    it('should configure consent defaults as denied', () => {
        const { container } = render(<GtmScript />)
        const script = container.querySelector('#google-analytics')
        const html = script?.innerHTML ?? ''
        expect(html).toContain("'ad_storage': 'denied'")
        expect(html).toContain("'analytics_storage': 'denied'")
    })

    it('should configure GTM ID in config', () => {
        const { container } = render(<GtmScript />)
        const script = container.querySelector('#google-analytics')
        const html = script?.innerHTML ?? ''
        expect(html).toContain("'G-TEST123'")
    })
})
