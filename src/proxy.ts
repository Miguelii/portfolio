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

export const config = {
    matcher: [
        '/((?!_next|api/|assets|models|favicon|opengraph-image|twitter-image|robots[.]txt).*)',
    ],
}
