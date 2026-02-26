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

type Props = {
    isLoading: boolean
    setIsLoading: (loading: boolean) => void
    showPreloader: boolean
}

export const PreloaderContext = createContext<Props | undefined>(undefined)

export function PreloaderProvider({ children }: Readonly<PropsWithChildren>) {
    const currPath = usePathname()
    const { history } = use(HistoryContext)

    const historyIsEmpty = history.length === 0

    const showPreloader = historyIsEmpty && currPath !== '/' ? false : historyIsEmpty

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

    const value: Props = useMemo(
        () => ({ isLoading, setIsLoading, showPreloader }),
        [isLoading, setIsLoading, showPreloader]
    )

    return <PreloaderContext.Provider value={value}>{children}</PreloaderContext.Provider>
}
