import 'server-only'

import { timingSafeEqual } from 'node:crypto'
import { Effect } from 'effect'

class ApiKeyError extends Error {
    readonly _tag = 'ApiKeyError'
}

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
        if (!apiKey || !expected) yield* Effect.fail(new ApiKeyError('Invalid Request'))

        if (apiKey!.length !== expected!.length)
            yield* Effect.fail(new ApiKeyError('Keys Mismatch'))

        return timingSafeEqual(Buffer.from(apiKey!), Buffer.from(expected!))
    })
}
