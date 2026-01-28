
export const NEXT_STATIC_PATH = '/_next/static'

export const NEXT_IMAGE_PATH = '/_next/image'

const STATIC_PREFIXES = [
    '/_next',
    '/api/',
    '/assets',
    '/logos',
    '/models',
    '/favicon',
    '/robots.txt',
    '/script',
]

export const isPathFromStaticFiles = (pathname: string): boolean => {
    return STATIC_PREFIXES.some((prefix) => pathname.startsWith(prefix))
}
