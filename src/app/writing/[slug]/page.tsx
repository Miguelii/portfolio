import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ClientEnv } from '@/env/client'
import { BreadcrumbSchema } from '@/components/structured-data'
import { AuthorHeader } from '@/components/author-header'
import { WritingBody } from '@/components/writing-body'
import { getWritingPost } from '@/sanity/api/get-writing-post'
import { getWritingPosts } from '@/sanity/api/get-writing-posts'
import { runSanityService } from '@/sanity/lib/sanity-service'
import { formatLongDate } from '@/lib/utils'

// sanityClientFetch controls the revalidate time; posts published after the build render on first request
export const dynamic = 'force-static'

const WRITING_PATH = '/writing'

const WEBSITE_URL = ClientEnv.NEXT_PUBLIC_VERCEL_URL

type Props = PageProps<'/writing/[slug]'>

export async function generateStaticParams() {
    const posts = await runSanityService(getWritingPosts)
    return posts.flatMap((post) => (post.slug ? [{ slug: post.slug }] : []))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const post = await runSanityService(getWritingPost(slug))

    if (!post) return {}

    const url = `${WEBSITE_URL}${WRITING_PATH}/${post.slug}`

    return {
        title: post.title,
        description: post.summary,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: post.title,
            description: post.summary,
            type: 'article',
            publishedTime: post.publishedAt,
            url,
        },
        twitter: {
            title: post.title,
            description: post.summary,
            card: 'summary_large_image',
        },
    }
}

export default async function WritingPostPage({ params }: Props) {
    const { slug } = await params
    const post = await runSanityService(getWritingPost(slug))

    if (!post) notFound()

    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: 'Home', url: WEBSITE_URL },
                    { name: 'Writing', url: `${WEBSITE_URL}${WRITING_PATH}` },
                    { name: post.title ?? '', url: `${WEBSITE_URL}${WRITING_PATH}/${post.slug}` },
                ]}
            />

            <>
                <AuthorHeader linkToHome />

                <article>
                    <div className="mb-10 flex flex-col">
                        <h1 className="text-pretty font-medium text-primary">{post.title}</h1>
                        {post.publishedAt && (
                            <time className="text-neutral" dateTime={post.publishedAt}>
                                {formatLongDate(post.publishedAt)}
                            </time>
                        )}
                    </div>

                    {post.body && <WritingBody value={post.body} />}
                </article>

                <footer className="mt-16 border-t border-divider pt-6">
                    <Link
                        className="text-neutral transition-colors hover:text-primary"
                        prefetch={false}
                        href={WRITING_PATH}
                    >
                        ← All writing
                    </Link>
                </footer>
            </>
        </>
    )
}
