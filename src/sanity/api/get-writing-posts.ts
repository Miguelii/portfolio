import 'server-only'

import { WRITING_POSTS_GROQ } from '@/sanity/queries/writing-posts.groq'
import type { WritingPost } from '@/sanity/generated/sanity.types'
import { SanityService } from '@/sanity/lib/sanity-service'
import { Effect } from 'effect'
import { Logger } from '@/lib/logger'

type WritingPostsDTO = Array<{
    id: string
    title: WritingPost['title']
    slug: NonNullable<WritingPost['slug']>['current']
    publishedAt: WritingPost['publishedAt']
    summary: WritingPost['summary']
}>

export const getWritingPosts: Effect.Effect<WritingPostsDTO, never, SanityService> = Effect.gen(
    function* () {
        const { fetch } = yield* SanityService
        return yield* fetch<WritingPostsDTO | null>(WRITING_POSTS_GROQ).pipe(
            Effect.map((data) => data ?? []),
            Effect.catchAll((error) => {
                Logger({
                    level: 'error',
                    error,
                    context: `getWritingPosts [${error._tag}]`,
                })
                return Effect.succeed([])
            })
        )
    }
)
