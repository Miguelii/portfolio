import type { MotionNodeTapHandlers, Transition } from 'motion'

export const BAND_CARD_MODEL_URL = '/models/card.glb' as const

export const HOME_PAGE_URL = '/' as const

export const motionPressProps: {
    whileTap: MotionNodeTapHandlers['whileTap']
    transition: Transition
} = {
    whileTap: { scale: 0.96 },
    transition: { type: 'spring', stiffness: 500, damping: 20 },
} as const
