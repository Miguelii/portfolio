import { PortableText } from '@portabletext/react'
import { getAboutSection } from '@/sanity/api/get-about-section'
import { runSanityService } from '@/sanity/lib/sanity-service'
import Link from 'next/link'
import { GITHUB_URL, LINKEDIN_URL } from '@/lib/constants'

// sanityClientFetch controls the revalidate time
export const dynamic = 'force-static'

export default async function HomePage() {
    const about = await runSanityService(getAboutSection)

    return (
        <main
            id="main"
            className="flex flex-col mx-auto max-w-173 overflow-x-hidden px-6 py-12 text-gray-1200 antialiased sm:py-32 md:overflow-x-visible md:py-28 gap-14 md:gap-20"
        >
            <header>
                <h1 className="text-primary font-medium">Miguel Gonçalves</h1>
                <p className="text-neutral ">Software Engineer</p>
            </header>

            <section className="flex flex-col gap-5">
                <h2 className="text-primary font-medium">Today</h2>
                <div className="flex flex-col gap-6 text-pretty text-neutral">
                    {about?.paragraphs?.map((paragraph) => (
                        <PortableText key={paragraph.id} value={paragraph.text} />
                    ))}
                </div>
            </section>

            <section className="flex flex-col gap-5">
                <h2 className="text-primary font-medium">More</h2>
                <div className="flex flex-col gap-2">
                    <span className="text-pretty text-neutral">
                        You can see all my work on{' '}
                        <Link
                            className="font-bold underline"
                            prefetch={false}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="see github profile"
                            href={GITHUB_URL}
                        >
                            GitHub
                        </Link>
                        .
                    </span>
                    <span className="text-pretty text-neutral">
                        You can also find me on{' '}
                        <Link
                            className="font-bold underline"
                            prefetch={false}
                            target="_blank"
                            rel="noreferrer"
                            href={LINKEDIN_URL}
                            aria-label="open linkedin profile"
                        >
                            Linkedin
                        </Link>
                        .
                    </span>
                </div>
            </section>

            <section className="flex flex-col gap-5">
                <h2 className="text-primary font-medium">Cooler version</h2>
                <span className="text-pretty text-neutral">
                    You can find a cooler version of this website{' '}
                    <Link
                        className="font-bold underline"
                        prefetch={false}
                        aria-label="see cooler version"
                        href="/cooler-version"
                    >
                        here
                    </Link>
                    .
                </span>
            </section>
        </main>
    )
}
