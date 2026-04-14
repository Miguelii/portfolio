import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { PreloaderShell } from '@/components/preloader/preloader-shell'

describe('PreloaderShell', () => {
    it('should render with id "preloader-shell"', () => {
        const { container } = render(<PreloaderShell />)
        expect(container.querySelector('#preloader-shell')).not.toBeNull()
    })

    it('should use z-index 98 (below client preloader at 99)', () => {
        const { container } = render(<PreloaderShell />)
        const shell = container.querySelector<HTMLElement>('#preloader-shell')
        expect(shell).toHaveStyle({ zIndex: '98' })
    })

    it('should use the dark background color', () => {
        const { container } = render(<PreloaderShell />)
        const shell = container.querySelector<HTMLElement>('#preloader-shell')
        expect(shell).toHaveStyle({ backgroundColor: '#1d1d1d' })
    })
})
