import { ClientEnv } from '@/env/client'
import { BreadcrumbSchema } from '@/components/structured-data'
import type { Metadata } from 'next'
import * as motion from 'motion/react-client'
import { getPrivacyNoticeSection } from '@/sanity/api/get-privacy-notice-section'
import { PortableText } from '@portabletext/react'

// sanityClientFetch controls the revalidate time
export const dynamic = 'force-static'

const PATH = '/privacy-notice'

const WEBSITE_URL = ClientEnv.NEXT_PUBLIC_WEBSITE_URL

const META_TITLE = 'Privacy Notice'

const META_DESCRIPTION =
    'Privacy Notice to understand how personal data is collected, used, and protected on this website. Your privacy is important to us.'

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

export default async function PrivacyNoticePage() {
    const model = await getPrivacyNoticeSection()

    const date = model?._updatedAt?.split('T')[0] ?? new Date().toISOString().split('T')[0]

    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: 'Home', url: WEBSITE_URL },
                    { name: META_TITLE, url: `${WEBSITE_URL}${PATH}` },
                ]}
            />

            <main
                id="main"
                className="main-bottom-padding main-container flex flex-col gap-6 max-w-3xl border-x border-x-divider min-h-[calc(100vh-130px)] container-padding"
            >
                <div className="flex flex-col gap-5 justify-center h-full">
                    <h1 className="text-primary text-h1">{model?.title}</h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col gap-2  text-neutral max-w-[1000px] items-start text-p-regular"
                >
                    {model?.paragraphs.map((block) => (
                        <PortableText key={block.id} value={block.text} />
                    ))}
                    <p className="mt-2">
                        <span className="font-bold">Last update: </span>
                        {date}
                    </p>
                </motion.div>
            </main>
        </>
    )
}
