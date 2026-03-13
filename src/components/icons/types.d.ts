import type { HTMLAttributes } from 'react'

export interface IconHandle {
    startAnimation: () => void
    stopAnimation: () => void
}

// Omit event handlers that Motion overrides with incompatible signatures
type MotionConflictingProps = 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'

interface IconProps extends Omit<HTMLAttributes<HTMLButtonElement>, MotionConflictingProps> {
    size?: number
}
