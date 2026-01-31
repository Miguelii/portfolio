import type { GTMWithoutPrefix } from '@/types/GTM'

export const GTM_ID = 'G-GRCH01BRT9'

export const GTM_ID_WITHOUT_G: GTMWithoutPrefix<typeof GTM_ID> = GTM_ID.replace(
    'G-',
    ''
) as GTMWithoutPrefix<typeof GTM_ID>
