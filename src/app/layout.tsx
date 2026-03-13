import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { ClientEnv } from '@/env/client'
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import { SpeedInsights as VercelSpeedInsights } from '@vercel/speed-insights/next'
import { HeadMetadata } from '@/components/head-metadata'
import { GtmScript } from '@/components/gtm-script'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
    display: 'swap',
    preload: true,
    adjustFontFallback: true,
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
    display: 'swap',
    preload: true,
    adjustFontFallback: true,
})

export const viewport: Viewport = {
    colorScheme: 'light',
    width: 'device-width',
    initialScale: 1,
    height: 'device-height',
}

export const DEFAULT_META_TITLE = 'Miguel Gonçalves - Software Engineer (Full-Stack)'

export const DEFAULT_META_DESCRIPTION =
    'Miguel Gonçalves, Full-Stack Software Engineer, specializing in high-performance SaaS applications with React.js, Next.js, JavaScript, TypeScript and Node.js. View projects on LinkedIn and GitHub. Innovative, scalable solutions. All rights reserved.'

const WEBSITE_URL = ClientEnv.NEXT_PUBLIC_WEBSITE_URL

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
        'Sanity CMS',
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
    },
    twitter: {
        title: DEFAULT_META_TITLE,
        description: DEFAULT_META_DESCRIPTION,
        creator: '@migueligoncal',
        site: WEBSITE_URL,
        card: 'summary_large_image',
    },
}

type Props = LayoutProps<'/'>

export default async function RootLayout({ children }: Props) {
    return (
        <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
            <HeadMetadata />
            <GtmScript />
            <VercelAnalytics />
            <VercelSpeedInsights />
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-background font-sans antialiased text-primary! min-h-screen flex flex-col`}
            >
                {children}
            </body>
        </html>
    )
}
