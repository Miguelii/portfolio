import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { type PropsWithChildren, unstable_ViewTransition as ViewTransition } from 'react'
import { ReactLenis } from 'lenis/react'
import { normalizeBaseUrl } from '@/shared/utils/normalize-base-url'
import ProvidersWrapper from '@/shared/providers/providers-wrapper'
import { VercelAnalytics } from '@/shared/analytics/vercel-analytics'
import Header from '@/shared/components/base/header'
import Footer from '@/shared/components/base/footer'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const viewport: Viewport = {
    colorScheme: 'light',
    width: 'device-width',
    initialScale: 1,
    height: 'device-height',
}

const WEBSITE_URL = normalizeBaseUrl()

const META_DESCRIPTION =
    'Miguel Gonçalves, Full-Stack Software Engineer, builds modern SaaS apps using React, Next, JavaScript, TypeScript, and Node.js. View projects on LinkedIn and GitHub. Innovative, scalable solutions. All rights reserved.'

const META_TITLE = 'Miguel Gonçalves - Software Engineer'

export const metadata: Metadata = {
    metadataBase: WEBSITE_URL ? new URL(WEBSITE_URL) : undefined,
    title: META_TITLE,
    description: META_DESCRIPTION,
    keywords:
        'Miguel Gonçalves, software engineer and full-stack web developer, builds modern apps with Next.js, TypeScript, JavaScript, React, Tailwind CSS, Supabase, and CrafterCMS. See portfolio on LinkedIn and GitHub. All rights reserved.',
    creator: 'Miguel Gonçalves',
    robots: { index: true, follow: true },
    openGraph: {
        locale: 'en_US',
        siteName: META_TITLE,
        description: META_DESCRIPTION,
        type: 'website',
        url: WEBSITE_URL ? new URL(WEBSITE_URL) : undefined,
    },
    twitter: {
        title: META_TITLE,
        creator: '@migueligoncal',
        site: '@migueligoncal',
        card: 'summary_large_image',
    },
}

type RootLayoutProps = Readonly<PropsWithChildren>

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <ReactLenis root>
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                    <ProvidersWrapper>
                        <VercelAnalytics />
                        <div className="min-h-[calc(100vh-240px)] w-full">
                            <Header />
                            <ViewTransition>{children}</ViewTransition>
                        </div>
                        <Footer />
                    </ProvidersWrapper>
                </body>
            </ReactLenis>
        </html>
    )
}
