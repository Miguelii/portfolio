import 'server-only'

import { timingSafeEqual } from 'node:crypto'
import { Effect } from 'effect'
import { DataDefaultTaggedError } from '@/lib/data-tagged-errors'

class ApiKeyError extends DataDefaultTaggedError('ApiKeyError') {}

/**
 * Compares an API key against an expected value using a timing-safe comparison
 * to prevent timing attacks.
 *
 * @param apiKey - The API key to verify.
 * @param expected - The expected API key value.
 */
export function verifyApiKey(
    apiKey: string | null,
    expected: string | null
): Effect.Effect<boolean, ApiKeyError> {
    return Effect.gen(function* () {
        if (!apiKey)
            yield* Effect.fail(
                new ApiKeyError({ cause: 'Invalid Request', message: 'API key missing' })
            )

        if (!expected)
            yield* Effect.fail(
                new ApiKeyError({ cause: 'Invalid Request', message: 'Expected key missing' })
            )

        if (apiKey!.length !== expected!.length)
            yield* Effect.fail(new ApiKeyError({ cause: 'Keys Mismatch' }))

        return timingSafeEqual(Buffer.from(apiKey!), Buffer.from(expected!))
    })
}
