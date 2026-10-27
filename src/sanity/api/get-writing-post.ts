import 'server-only'

import { WRITING_POST_GROQ } from '@/sanity/queries/writing-post.groq'
import type { WritingPost } from '@/sanity/generated/sanity.types'
import { SanityService } from '@/sanity/lib/sanity-service'
import { Effect } from 'effect'
import { Logger } from '@/lib/logger'

type WritingPostDTO = {
    id: string
    title: WritingPost['title']
    slug: NonNullable<WritingPost['slug']>['current']
    publishedAt: WritingPost['publishedAt']
    summary: WritingPost['summary']
    _updatedAt: WritingPost['_updatedAt']
    body: WritingPost['body']
} | null

export const getWritingPost = (slug: string): Effect.Effect<WritingPostDTO, never, SanityService> =>
    Effect.gen(function* () {
        const { fetch } = yield* SanityService
        return yield* fetch<WritingPostDTO>(WRITING_POST_GROQ, { slug }).pipe(
            Effect.map((data) => data ?? null),
            Effect.catchAll((error) => {
                Logger({
                    level: 'error',
                    error,
                    context: `getWritingPost [${error._tag}]`,
                })
                return Effect.succeed(null)
            })
        )
    })
