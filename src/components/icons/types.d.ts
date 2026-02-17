import type { HTMLAttributes } from 'react'

export interface IconHandle {
    startAnimation: () => void
    stopAnimation: () => void
}

interface IconProps extends HTMLAttributes<HTMLButtonElement> {
    size?: number
}
