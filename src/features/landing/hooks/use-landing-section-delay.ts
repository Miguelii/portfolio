import { useMemo } from 'react'

export const useLandingSectionDelay = (showPreloader: boolean) => {
    const H1_DELAY = useMemo(() => {
        return showPreloader ? 0.6 : 0
    }, [showPreloader])

    const P_DELAY = useMemo(() => {
        return showPreloader ? 0.8 : 0
    }, [showPreloader])

    const CANVAS_DELAY = useMemo(() => {
        return showPreloader ? 0.8 : 0
    }, [showPreloader])

    return {
        H1_DELAY,
        P_DELAY,
        CANVAS_DELAY,
    } as const
}
