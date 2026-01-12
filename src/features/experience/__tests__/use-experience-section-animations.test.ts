import { describe, expect, it } from 'vitest'
import { useExperienceSectionAnimations } from '../hooks/use-experience-section-animations'

describe('useExperienceSectionAnimations', () => {
    it('should return container and item variants', () => {
        const { container, item } = useExperienceSectionAnimations()

        expect(container).toBeDefined()
        expect(item).toBeDefined()
    })
})
