import 'server-only'

import { Effect } from 'effect'
import { sanityClientFetch } from '@/sanity/lib/client'
import { SanityFetchError } from '@/lib/data-tagged-errors'

export class SanityService extends Effect.Service<SanityService>()('SanityService', {
    effect: Effect.sync(() => ({
        fetch: <T>(query: string): Effect.Effect<T, SanityFetchError> =>
            Effect.tryPromise({
                try: () => sanityClientFetch<T>(query),
                catch: (error) => new SanityFetchError({ cause: error }),
            }),
    })),
}) {}

export const runSanityService = <A>(effect: Effect.Effect<A, never, SanityService>) =>
    Effect.runPromise(effect.pipe(Effect.provide(SanityService.Default)))
