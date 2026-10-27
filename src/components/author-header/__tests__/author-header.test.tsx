import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AuthorHeader } from '@/components/author-header'

describe('AuthorHeader', () => {
    it('should render the name as the page heading by default', () => {
        render(<AuthorHeader />)
        expect(
            screen.getByRole('heading', { level: 1, name: 'Miguel Gonçalves' })
        ).toBeInTheDocument()
        expect(screen.queryByRole('link')).not.toBeInTheDocument()
        expect(screen.getByText('Software Engineer')).toBeInTheDocument()
    })

    it('should render the name as a link home when linkToHome is set', () => {
        render(<AuthorHeader linkToHome />)
        expect(screen.getByRole('link', { name: 'Miguel Gonçalves' })).toHaveAttribute('href', '/')
        expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })
})
