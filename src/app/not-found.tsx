import { getBuildId } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import type { PropsWithChildren } from 'react'
import { NOT_FOUND_VIDEO_URL } from '@/lib/constants'

export const revalidate = 172800 // 48h

const buildId = getBuildId()

const VIDEO_URL = `${NOT_FOUND_VIDEO_URL}?${buildId}`

export default function NotFound() {
    return (
        <WithFooterAndHeader>
            <head>
                <link
                    id="preload-not-found-video"
                    rel="preload"
                    as="fetch"
                    href={VIDEO_URL}
                    crossOrigin="anonymous"
                    fetchPriority="high"
                />
            </head>
            <main
                id="main"
                className="not-found-h main-container flex flex-col max-w-3xl border-x border-x-divider container-padding lg:pt-6! pb-14 lg:pb-24!"
            >
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 py-12 lg:py-20">
                    {/* Text — below on mobile, left on desktop */}
                    <div className="flex flex-col gap-6 lg:flex-1 text-center lg:text-left order-2 lg:order-1">
                        <div className="flex flex-col gap-3">
                            <span className="font-mono text-p-smallest tracking-[0.2em] uppercase text-neutral">
                                404
                            </span>
                            <h1 className="text-primary text-h1 font-bold leading-tight">
                                You seem lost.
                            </h1>
                            <p className="text-neutral text-p-regular leading-relaxed">
                                Our monster looked everywhere. No page was found.
                            </p>
                        </div>
                        <div className="flex justify-center lg:justify-start">
                            <Button label="Go to home" href="/" variant="primary" />
                        </div>
                    </div>

                    {/* Monster — above on mobile, right on desktop */}
                    <div className="order-1 lg:order-2 lg:flex-1 flex items-center justify-center">
                        <video
                            muted
                            autoPlay
                            loop
                            playsInline
                            className="object-contain bg-background h-55 lg:h-80 w-auto"
                            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%ffffff00'%3E%3C/rect%3E%3C/svg%3E"
                        >
                            <source src={VIDEO_URL} type="video/mp4" />
                        </video>
                    </div>
                </div>
            </main>
        </WithFooterAndHeader>
    )
}

function WithFooterAndHeader({ children }: PropsWithChildren) {
    return (
        <>
            <Header />
            <div className="flex-1 w-full">{children}</div>
            <Footer />
        </>
    )
}
