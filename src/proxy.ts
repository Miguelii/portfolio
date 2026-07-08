import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { setCSP } from '@/lib/set-csp'

export async function proxy(request: NextRequest) {
    const requestHeaders = new Headers(request.headers)

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })

    setCSP(response)

    return response
}

// Static assets are excluded via matcher and get their headers from
// next.config.ts headers() — served at the CDN level, no proxy invocation.
// Must be a plain string literal: the matcher is extracted by static analysis,
// so template literals/String.raw are silently dropped ([.] = literal dot)
export const config = {
    matcher: ['/((?!_next|api/|assets|models|favicon|robots[.]txt).*)'],
}
