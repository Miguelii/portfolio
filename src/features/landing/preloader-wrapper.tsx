'use client'

import Preloader from '@/features/landing/preloader'
import { HistoryContext } from '@/providers/history-provider'
import { AnimatePresence } from 'motion/react'
import { use, useEffect, useState, type PropsWithChildren } from 'react'

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

    return <>{children}</>

    return (
        <>
            <AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>
            {!isLoading && <>{children}</>}
        </>
    )
}
