import type { GTMWithoutPrefix } from '@/types/GTM'
import type { MotionNodeTapHandlers, Transition } from 'motion'

export const NEXT_STATIC_PATH = '/_next/static'

export const NEXT_IMAGE_PATH = '/_next/image'

export const STATIC_PREFIXES = [
    '/_next',
    '/api/',
    '/assets',
    '/logos',
    '/models',
    '/favicon',
    '/robots.txt',
    '/script',
]

export const GTM_ID = 'G-GRCH01BRT9'

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
