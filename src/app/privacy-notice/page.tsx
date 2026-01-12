import { ClientEnv } from '@/env/client'
import { BreadcrumbSchema } from '@/components/structured-data'
import type { Metadata } from 'next'
import * as motion from 'motion/react-client'

export const dynamic = 'force-static'
export const revalidate = 86400 // 24h

const WEBSITE_URL = ClientEnv.NEXT_PUBLIC_WEBSITE_URL

const META_TITLE = `Privacy Notice`

const META_DESCRIPTION =
    'Privacy Notice to understand how personal data is collected, used, and protected on this website. Your privacy is important to us.'

export const metadata: Metadata = {
    title: META_TITLE,
    description: META_DESCRIPTION,
    alternates: {
        canonical: `${WEBSITE_URL}/privacy-notice`,
    },
    openGraph: {
        title: META_TITLE,
        description: META_DESCRIPTION,
        type: 'website',
        url: `${WEBSITE_URL}/privacy-notice`,
    },
    twitter: {
        title: META_TITLE,
        description: META_DESCRIPTION,
        card: 'summary_large_image',
    },
}

export default function PrivacyNoticePage() {
    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: 'Home', url: WEBSITE_URL },
                    { name: 'Labs', url: `${WEBSITE_URL}/privacy-notice` },
                ]}
            />

            <main
                id="main"
                className="main-bottom-padding main-container flex flex-col gap-6 max-w-3xl border-x border-x-divider min-h-[calc(100vh-130px)] container-padding"
            >
                <div className="flex flex-col gap-5 justify-center h-full">
                    <h1 className="text-primary text-h1">Privacy Notice</h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col gap-2  text-neutral max-w-[1000px] items-start text-p-regular"
                >
                    <p>
                        We fully respect the privacy of visitors to this website. We do not collect,
                        store, or share any personal data.
                    </p>
                    <p>
                        This website is for informational purposes only and is intended to present
                        our plumbing services in the Algarve. We only use Google analytical cookies
                        for statistical purposes, namely to analyze traffic and improve the user
                        experience. No personal data is collected for commercial or marketing
                        purposes.
                    </p>
                    <p>
                        If, in the future, features are added that involve data collection, this
                        policy will be updated to reflect the new privacy practices.
                    </p>
                    <p>If you have any questions about this notice, please contact us.</p>
                </motion.div>
            </main>
        </>
    )
}
