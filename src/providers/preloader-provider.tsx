'use client'

import { createContext, useEffect, useState, type PropsWithChildren } from 'react'
import { usePathname } from 'next/navigation'
import { COOLER_VERSION_URL } from '@/lib/constants'

/**
 * Preloader lifecycle:
 * - `idle`     — no preloader needed, content visible immediately
 * - `loading`  — preloader overlay is showing (first visit to home)
 * - `complete` — preloader finished, content animates in with entrance delays
 */
export type PreloaderPhase = 'idle' | 'loading' | 'complete'

export const PreloaderContext = createContext<PreloaderPhase>('idle')

export function PreloaderProvider({ children }: Readonly<PropsWithChildren>) {
    const currPath = usePathname()

    // The preloader only shows on the very first page load when it's the portfolio page.
    // On the first render there is no navigation history yet, so "first load on the
    // portfolio page" reduces to the initial path being that page; the initializer runs once.
    const [phase, setPhase] = useState<PreloaderPhase>(() =>
        currPath === COOLER_VERSION_URL ? 'loading' : 'idle'
    )

    useEffect(() => {
        if (phase !== 'loading') return

        const timer = setTimeout(() => {
            setPhase('complete')
        }, 2000)

        return () => clearTimeout(timer)
    }, [phase])

    return <PreloaderContext value={phase}>{children}</PreloaderContext>
}
