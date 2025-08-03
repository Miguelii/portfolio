import { NextResponse } from 'next/server'
import { generateCSP } from './generate-csp'
import { isPathFromStaticFiler } from './is-path-from-static-files.ts'

export const addCSPToResponse = (response: NextResponse<unknown>, pathname: string) => {
    const csp = generateCSP()

    if (isPathFromStaticFiler(pathname)) {
        response.headers.set('Content-Security-Policy', csp.contentSecurityPolicyStaticFiles)
    } else {
        response.headers.set('Content-Security-Policy', csp.contentSecurityPolicyPages)
    }

    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('Referrer-Policy', 'no-referrer')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Ua-Compatible', 'IE=edge')
    response.headers.set('Strict-Transport-Security', 'max-age=15768000')
    response.headers.set('Cache-Control', 'public, max-age=31536000;')
    response.headers.set('X-Xss-Protection', '1; mode=block')

    return response
}
