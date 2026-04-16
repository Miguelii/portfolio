import 'server-only'

import { STATIC_PREFIXES } from '@/lib/constants.server'

export const isPathFromStaticFiles = (pathname: string): boolean => {
    return STATIC_PREFIXES.some((prefix) => pathname.startsWith(prefix))
}
