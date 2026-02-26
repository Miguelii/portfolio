export const useLandingSectionDelay = (showPreloader: boolean) => {
    const TITLE_DIV_DELAY = showPreloader ? 0.8 : 0

    const H1_DELAY = showPreloader ? 0.6 : 0

    const P_DELAY = showPreloader ? 0.8 : 0

    const CANVAS_DELAY = showPreloader ? 0.8 : 0

    return {
        TITLE_DIV_DELAY,
        H1_DELAY,
        P_DELAY,
        CANVAS_DELAY,
    } as const
}
