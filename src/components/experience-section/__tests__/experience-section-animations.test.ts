import { describe, expect, it } from 'vitest'
import { container, item } from '@/components/experience-section/experience-section-animations'

describe('experience section animations', () => {
    it('should define container and item variants', () => {
        expect(container).toBeDefined()
        expect(item).toBeDefined()
    })
})
