import { describe, expect, it } from 'vitest'
import { useProjectsSectionAnimations } from '../hooks/use-projects-section-animations'

describe('useProjectsSectionAnimations', () => {
    it('should return container and item variants', () => {
        const { container, item } = useProjectsSectionAnimations()

        expect(container).toBeDefined()
        expect(item).toBeDefined()
    })
})
