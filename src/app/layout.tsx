import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { ViewTransition } from 'react'
import { ReactLenis } from 'lenis/react'
import ProvidersWrapper from '@/providers/providers-wrapper'
import Header from '@/components/header'
import { WebAnalytics } from '@/components/web-analytics'
import { ClientEnv } from '@/env/client'
import { getBuildId } from '@/utils/get-build-id'
import { CookieConsent } from '@/components/cookie-consent'
import Footer from '@/components/footer'

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

export const DEFAULT_META_TITLE = 'Miguel Gonçalves - FullStack Software Engineer'

export const DEFAULT_META_DESCRIPTION =
    'Miguel Gonçalves, Full-Stack Software Engineer, specializing in high-performance SaaS applications with React.js, Next.js, Remix, JavaScript, TypeScript and Node.js. View projects on LinkedIn and GitHub. Innovative, scalable solutions. All rights reserved.'

const WEBSITE_URL = ClientEnv.NEXT_PUBLIC_WEBSITE_URL

const buildId = getBuildId()

export const metadata: Metadata = {
    metadataBase: WEBSITE_URL ? new URL(WEBSITE_URL) : undefined,
    title: {
        default: DEFAULT_META_TITLE,
        template: `%s | ${DEFAULT_META_TITLE}`,
    },
    description: DEFAULT_META_DESCRIPTION,
    keywords: [
        'Miguel Gonçalves',
        'BLIP',
        'CGI',
        'Full-Stack Engineer',
        'Software Developer',
        'React',
        'Next.js',
        'TypeScript',
        'SaaS Development',
        'Remix',
        'Node.js',
        'Tailwind CSS',
    ],
    creator: 'Miguel Gonçalves',
    authors: [{ name: 'Miguel Gonçalves', url: WEBSITE_URL }],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: WEBSITE_URL,
    },
    openGraph: {
        locale: 'en_US',
        siteName: DEFAULT_META_TITLE,
        title: DEFAULT_META_TITLE,
        description: DEFAULT_META_DESCRIPTION,
        type: 'website',
        url: WEBSITE_URL ? new URL(WEBSITE_URL) : undefined,
        images: [
            {
                url: `/opengraph-image.png?v=${buildId}`,
                width: 1200,
                height: 630,
                alt: DEFAULT_META_TITLE,
            },
        ],
    },
    twitter: {
        title: DEFAULT_META_TITLE,
        description: DEFAULT_META_DESCRIPTION,
        creator: '@migueligoncal',
        site: WEBSITE_URL,
        card: 'summary_large_image',
        images: `/twitter-image.png?v=${buildId}`,
    },
}

type Props = LayoutProps<'/'>

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
            <WebAnalytics />
            <ReactLenis root>
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                    <a
                        tabIndex={0}
                        aria-label="Skip to content"
                        className="sr-only sr-only-focusable"
                        id="acessibilitynav"
                        href="#main"
                    >
                        Skip to content
                    </a>
                    <ProvidersWrapper>
                        <CookieConsent />
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
