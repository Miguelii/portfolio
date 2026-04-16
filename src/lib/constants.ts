import type { GTMWithoutPrefix } from '@/types/GTM'
import { Data } from 'effect'
import type { MotionNodeTapHandlers, Transition } from 'motion'

export const GTM_ID = 'G-N6QNF85PTV'

export const GTM_ID_WITHOUT_G: GTMWithoutPrefix<typeof GTM_ID> = GTM_ID.replace(
    'G-',
    ''
) as GTMWithoutPrefix<typeof GTM_ID>

export const BAND_CARD_MODEL_URL = '/models/card.glb' as const

export const HOME_PAGE_URL = '/' as const

export const motionPressProps: {
    whileTap: MotionNodeTapHandlers['whileTap']
    transition: Transition
} = {
    whileTap: { scale: 0.96 },
    transition: { type: 'spring', stiffness: 500, damping: 20 },
} as const

export const NOT_FOUND_VIDEO_URL = `/assets/ezgif-482d65a8fea8d1e7.mp4` as const

const DataDefaultTaggedError = <T extends string>(tag: T) =>
    Data.TaggedError(tag)<{ cause: unknown; message?: string }>

export class ValidationError extends DataDefaultTaggedError('ValidationError') {}

export class CookieStoreError extends DataDefaultTaggedError('CookieStoreError') {}

export class CookieParseError extends DataDefaultTaggedError('CookieParseError') {}
