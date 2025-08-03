import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/styles/globals.css'
import Header from '@/components/misc/header'
import Footer from '@/components/misc/footer'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { unstable_ViewTransition as ViewTransition } from 'react'
import { ThemeProvider } from 'next-themes'
import { ReactLenis } from 'lenis/react'
import { normalizeBaseUrl } from '@/utils/normalize-base-url'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const viewport: Viewport = {
    colorScheme: 'dark',
    width: 'device-width',
    initialScale: 1,
    height: 'device-height',
}

const WEBSITE_URL = normalizeBaseUrl()

export const metadata: Metadata = {
    metadataBase: WEBSITE_URL ? new URL(WEBSITE_URL) : undefined,
    title: 'Miguel Gonçalves - Software Engineer',
    description:
        'Portfolio of Miguel Gonçalves, a full-stack software engineer focused on building modern web applications with Next.js, TypeScript, and Node.js.',
    keywords:
        'Miguel Gonçalves, software engineer, full-stack developer, web developer, Next.js, TypeScript, JavaScript, React, Tailwind CSS, Supabase, CrafterCMS, portfolio',
    creator: 'Miguel Gonçalves',
    robots: { index: true, follow: true },
    openGraph: {
        locale: 'en_US',
        siteName: 'Miguel Gonçalves - Software Engineer',
        description:
            'Discover the portfolio of Miguel Gonçalves, showcasing real-world and personal projects built with modern web technologies.',
        type: 'website',
        url: WEBSITE_URL ? new URL(WEBSITE_URL) : undefined,
    },
    twitter: {
        title: 'Miguel Gonçalves - Software Engineer',
        creator: '@migueligoncal',
        site: '@migueligoncal',
        card: 'summary_large_image',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <ReactLenis root>
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                    <ThemeProvider
                        defaultTheme="light"
                        attribute="class"
                        enableSystem={false}
                        themes={['light', 'dark']}
                        storageKey="miguel-goncalves-dev-theme"
                        forcedTheme={'light'}
                    >
                        <Analytics />
                        <SpeedInsights />
                        <div className="min-h-[calc(100vh-192px)] w-full">
                            <Header />
                            <ViewTransition>{children}</ViewTransition>
                        </div>
                        <Footer />
                    </ThemeProvider>
                </body>
            </ReactLenis>
        </html>
    )
}
