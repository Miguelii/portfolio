import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { HeadMetadata } from '@/components/head-metadata'

vi.mock('@/components/structured-data', () => ({
    PersonSchema: () => <script id="person-schema" type="application/ld+json" />,
    WebSiteSchema: () => <script id="website-schema" type="application/ld+json" />,
}))

vi.mock('@/lib/constants', () => ({
    BAND_CARD_MODEL_URL: '/models/card.glb',
}))

describe('HeadMetadata', () => {
    it('should render preload link for GLB model', () => {
        render(<HeadMetadata />)
        const preload = document.querySelector('#preload-glb-model')
        expect(preload).toBeInTheDocument()
        expect(preload).toHaveAttribute('rel', 'preload')
        expect(preload).toHaveAttribute('as', 'fetch')
        expect(preload).toHaveAttribute('href', '/models/card.glb')
    })

    it('should render PersonSchema', () => {
        render(<HeadMetadata />)
        expect(document.querySelector('#person-schema')).toBeInTheDocument()
    })

    it('should render WebSiteSchema', () => {
        render(<HeadMetadata />)
        expect(document.querySelector('#website-schema')).toBeInTheDocument()
    })

    it('should render favicon', () => {
        render(<HeadMetadata />)
        const favicon = document.querySelector('link[rel="icon"]')
        expect(favicon).toBeInTheDocument()
        expect(favicon).toHaveAttribute('href', '/favicon.ico')
    })
})
