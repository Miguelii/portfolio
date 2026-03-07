import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ExperienceSection } from '../components/experience-section'

vi.mock('@/lib/haptic', () => ({ haptic: vi.fn(), supportsHaptic: true }))

describe('ExperienceSection', () => {
    it('should render section title', () => {
        render(<ExperienceSection />)
        expect(screen.getByText('Work Experience')).toBeInTheDocument()
    })
})
