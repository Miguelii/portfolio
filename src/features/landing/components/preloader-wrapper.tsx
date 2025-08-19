'use client'

import { HistoryContext } from '@/shared/providers/history-provider'
import { AnimatePresence } from 'motion/react'
import { use, useEffect, useState, type PropsWithChildren } from 'react'
import { LandingSectionWithBand } from './landing-section-with-band'
import Preloader from './preloader'

type PreloaderWrapperProps = PropsWithChildren

export function PreloaderWrapper({ children }: PreloaderWrapperProps) {
    const { history } = use(HistoryContext)

    // We only show the preloader if the history is empty, which means it's the first visit
    const showPreloader = history.length === 0

    const [isLoading, setIsLoading] = useState(showPreloader ? true : false)

    useEffect(() => {
        ;(async () => {
            if (!showPreloader) return

            setTimeout(() => {
                setIsLoading(false)
                document.body.style.cursor = 'default'
                window.scrollTo(0, 0)
            }, 2000)
        })()
    }, [showPreloader])

    if (!showPreloader) {
        return <>{children}</>
    }

    return (
        <>
            <AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>
            {!isLoading && <>{children}</>}
            {/*
             * Lighthouse complains about the Largest Contentful Paint (LCP) element.
             * It detects the <h1> inside <LandingSectionWithBand/> as the LCP.
             * Since we are doing `!isLoading && <>{children}</>`, there is a delay of about 2,210 ms in the score.
             * To fix this, while loading we render the <LandingSectionWithBand/> below.
             */}
            {isLoading && <LandingSectionWithBand hideBand />}
        </>
    )
}
