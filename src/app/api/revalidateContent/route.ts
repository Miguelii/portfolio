import { ServerEnv } from '@/env/server'
import { HOME_PAGE_URL, UnauthorizedError } from '@/lib/constants'
import { Logger } from '@/lib/logger'
import { verifyApiKey } from '@/lib/utils.server'
import { SANITY_QUERY_REVALIDATE_KEY } from '@/sanity/lib/constants'
import { Effect } from 'effect'
import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest): Promise<NextResponse> {
    return Effect.runPromise(
        Effect.gen(function* () {
            const apiKey = request.headers.get('x-api-key')

            const isAuthorized = yield* verifyApiKey(
                apiKey,
                ServerEnv.NEXT_UPDATE_CONTENT_SECRET_KEY
            ).pipe(Effect.mapError((error) => new UnauthorizedError({ cause: error })))

            if (!isAuthorized) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
            }

            revalidateTag(SANITY_QUERY_REVALIDATE_KEY, 'max')
            revalidatePath(HOME_PAGE_URL, 'layout')

            return NextResponse.json({ status: 200 })
        }).pipe(
            Effect.catchAll((error) => {
                Logger({
                    level: 'error',
                    error,
                    context: `revalidateContent [${error._tag}]`,
                })
                return Effect.succeed(NextResponse.json({ status: 503 }))
            })
        )
    )
}
