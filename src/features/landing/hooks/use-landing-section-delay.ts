export const useLandingSectionDelay = (showPreloader: boolean) => {
    const H1_DELAY = showPreloader ? 0.6 : 0

    const P_DELAY = showPreloader ? 0.8 : 0

    const CANVAS_DELAY = showPreloader ? 0.8 : 0

    return {
        H1_DELAY,
        P_DELAY,
        CANVAS_DELAY,
    } as const
}
