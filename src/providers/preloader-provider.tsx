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

type Props = {
    isLoading: boolean
    showPreloader: boolean
}

export const PreloaderContext = createContext<Props | undefined>(undefined)

export function PreloaderProvider({ children }: Readonly<PropsWithChildren>) {
    const currPath = usePathname()
    const { history } = use(HistoryContext)

    // Lazy initializer runs once at mount: preloader only shows when the very
    // first page of the session is HOME_PAGE_URL, never on subsequent navigations to HOME_PAGE_URL.
    const [showPreloader] = useState(() => history.length === 0 && currPath === HOME_PAGE_URL)

    const [isLoading, setIsLoading] = useState(showPreloader)

    const hasRun = useRef(false)

    useEffect(() => {
        if (!showPreloader || hasRun.current) return
        hasRun.current = true

        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [showPreloader])

    const value: Props = useMemo(() => ({ isLoading, showPreloader }), [isLoading, showPreloader])

    return <PreloaderContext.Provider value={value}>{children}</PreloaderContext.Provider>
}
