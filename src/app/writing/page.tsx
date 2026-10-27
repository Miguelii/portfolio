import type { Metadata } from 'next'
import Link from 'next/link'
import { ClientEnv } from '@/env/client'
import { BreadcrumbSchema } from '@/components/structured-data'
import { AuthorHeader } from '@/components/author-header'
import { getWritingPosts } from '@/sanity/api/get-writing-posts'
import { runSanityService } from '@/sanity/lib/sanity-service'
import { formatLongDate } from '@/lib/utils'

// sanityClientFetch controls the revalidate time
export const dynamic = 'force-static'

const PATH = '/writing'

const WEBSITE_URL = ClientEnv.NEXT_PUBLIC_VERCEL_URL

const META_TITLE = 'Writing'

const META_DESCRIPTION =
    'Notes by Miguel Gonçalves on Next.js, React and TypeScript, mostly about the bugs that bit me so they do not bite you.'

export const metadata: Metadata = {
    title: META_TITLE,
    description: META_DESCRIPTION,
    alternates: {
        canonical: `${WEBSITE_URL}${PATH}`,
    },
    openGraph: {
        title: META_TITLE,
        description: META_DESCRIPTION,
        type: 'website',
        url: `${WEBSITE_URL}${PATH}`,
    },
    twitter: {
        title: META_TITLE,
        description: META_DESCRIPTION,
        card: 'summary_large_image',
    },
}

export default async function WritingPage() {
    const posts = await runSanityService(getWritingPosts)

    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: 'Home', url: WEBSITE_URL },
                    { name: META_TITLE, url: `${WEBSITE_URL}${PATH}` },
                ]}
            />

            <AuthorHeader linkToHome />

            <section className="flex flex-col gap-5">
                <div>
                    <h1 className="font-medium text-primary">Writing</h1>
                    <p className="text-neutral">Random notes on building for the web.</p>
                </div>

                <ul className="flex flex-col">
                    {posts.map((post) => (
                        <li key={post.id} className="border-b border-divider last:border-b-0">
                            <Link
                                className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                                prefetch={false}
                                href={`${PATH}/${post.slug}`}
                            >
                                <span className="underline text-pretty text-primary/90 transition-colors group-hover:text-primary">
                                    {post.title}
                                </span>
                                {post.publishedAt && (
                                    <time
                                        className="shrink-0 text-neutral tabular-nums"
                                        dateTime={post.publishedAt}
                                    >
                                        {formatLongDate(post.publishedAt)}
                                    </time>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}
