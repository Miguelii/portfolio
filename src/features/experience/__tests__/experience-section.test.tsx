import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ExperienceSection } from '../components/experience-section'

describe('ExperienceSection', () => {
    it('should render section title', () => {
        render(<ExperienceSection />)
        expect(screen.getByText('Work Experience')).toBeInTheDocument()
    })
})
