import type { GTMWithoutPrefix } from '@/types/GTM'

export const GTM_ID = 'G-GRCH01BRT9'

export const GTM_ID_WITHOUT_G: GTMWithoutPrefix<typeof GTM_ID> = GTM_ID.replace(
    'G-',
    ''
) as GTMWithoutPrefix<typeof GTM_ID>

export const BAND_MIN_WIDTH: `${number}px` = '1024px' as const

export const BAND_CARD_MODEL_URL = '/models/card.glb' as const
