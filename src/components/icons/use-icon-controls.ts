import { useImperativeHandle, useRef, type Ref } from 'react'
import type { IconHandle } from './types'

type IconAnimationHandlers = {
    start: () => void
    stop: () => void
}

// Wires the imperative ref handle shared by every animated icon and exposes the
// `isControlledRef` so icons can tell hover-driven from parent-controlled animation.
export function useIconControls(ref: Ref<IconHandle>, { start, stop }: IconAnimationHandlers) {
    const isControlledRef = useRef(false)

    useImperativeHandle(ref, () => {
        isControlledRef.current = true

        return {
            startAnimation: start,
            stopAnimation: stop,
        }
    })

    return isControlledRef
}
