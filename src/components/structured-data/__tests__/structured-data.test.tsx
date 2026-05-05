import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import {
    PersonSchema,
    WebSiteSchema,
    BreadcrumbSchema,
    ProfilePageSchema,
} from '@/components/structured-data'

vi.mock('@/env/client', () => ({
    ClientEnv: {
        NEXT_PUBLIC_VERCEL_URL: 'https://miguel-goncalves.pt',
    },
}))

describe('PersonSchema', () => {
    it('should render script tag with person JSON-LD', () => {
        const { container } = render(<PersonSchema />)
        const script = container.querySelector('#person-schema')
        expect(script).toBeInTheDocument()
        expect(script).toHaveAttribute('type', 'application/ld+json')

        const data = JSON.parse(script?.innerHTML ?? '{}')
        expect(data['@type']).toBe('Person')
        expect(data.name).toBe('Miguel Gonçalves')
        expect(data.jobTitle).toBe('Full-Stack Software Engineer')
    })

    it('should include social links in sameAs', () => {
        const { container } = render(<PersonSchema />)
        const script = container.querySelector('#person-schema')
        const data = JSON.parse(script?.innerHTML ?? '{}')
        expect(data.sameAs).toContain('https://www.linkedin.com/in/migueligoncal')
        expect(data.sameAs).toContain('https://github.com/migueligoncal')
    })

    it('should include knowsAbout skills', () => {
        const { container } = render(<PersonSchema />)
        const script = container.querySelector('#person-schema')
        const data = JSON.parse(script?.innerHTML ?? '{}')
        expect(data.knowsAbout).toContain('Next.js')
        expect(data.knowsAbout).toContain('TypeScript')
    })
})

describe('WebSiteSchema', () => {
    it('should render script tag with website JSON-LD', () => {
        const { container } = render(<WebSiteSchema />)
        const script = container.querySelector('#website-schema')
        expect(script).toBeInTheDocument()

        const data = JSON.parse(script?.innerHTML ?? '{}')
        expect(data['@type']).toBe('WebSite')
        expect(data.url).toBe('https://miguel-goncalves.pt')
        expect(data.inLanguage).toBe('en-US')
    })
})

describe('BreadcrumbSchema', () => {
    it('should render breadcrumb items in correct order', () => {
        const items = [
            { name: 'Home', url: 'https://miguel-goncalves.pt' },
            { name: 'Privacy', url: 'https://miguel-goncalves.pt/privacy-notice' },
        ]

        const { container } = render(<BreadcrumbSchema items={items} />)
        const script = container.querySelector('#breadcrumb-schema')
        const data = JSON.parse(script?.innerHTML ?? '{}')

        expect(data['@type']).toBe('BreadcrumbList')
        expect(data.itemListElement).toHaveLength(2)
        expect(data.itemListElement[0].position).toBe(1)
        expect(data.itemListElement[0].name).toBe('Home')
        expect(data.itemListElement[1].position).toBe(2)
        expect(data.itemListElement[1].name).toBe('Privacy')
    })
})

describe('ProfilePageSchema', () => {
    it('should render profile page JSON-LD', () => {
        const { container } = render(<ProfilePageSchema />)
        const script = container.querySelector('#profile-schema')
        const data = JSON.parse(script?.innerHTML ?? '{}')

        expect(data['@type']).toBe('ProfilePage')
        expect(data.mainEntity['@type']).toBe('Person')
        expect(data.mainEntity.name).toBe('Miguel Gonçalves')
    })
})
