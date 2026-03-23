'use client'

import {
    createContext,
    use,
    useEffect,
    useMemo,
    useRef,
    useState,
    type PropsWithChildren,
} from 'react'
import { HistoryContext } from './history-provider'
import { usePathname } from 'next/navigation'
import { HOME_PAGE_URL } from '@/lib/constants'

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
    const { history } = use(HistoryContext)

    // Preloader only shows on the very first page load when it's the home page
    const needsPreloader = history.length === 0 && currPath === HOME_PAGE_URL

    const [phase, setPhase] = useState<PreloaderPhase>(() => (needsPreloader ? 'loading' : 'idle'))

    const hasRun = useRef(false)

    useEffect(() => {
        if (phase !== 'loading' || hasRun.current) return
        hasRun.current = true

        const timer = setTimeout(() => {
            setPhase('complete')
        }, 2000)

        return () => clearTimeout(timer)
    }, [phase])

    const values = useMemo(() => {
        return phase
    }, [phase])

    return <PreloaderContext value={values}>{children}</PreloaderContext>
}
