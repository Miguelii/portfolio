'use client'

import { createContext, use, useEffect, useState, type PropsWithChildren } from 'react'
import { HistoryContext } from './history-provider'
import { usePathname } from 'next/navigation'

type Props = {
    isLoading: boolean
    setIsLoading: (loading: boolean) => void
    showPreloader: boolean
}

export const PreloaderContext = createContext<Props | undefined>(undefined)

export function PreloaderProvider({ children }: PropsWithChildren) {
    const currPath = usePathname()
    const { history } = use(HistoryContext)

    const historyIsEmpty = history.length === 0

    const showPreloader = historyIsEmpty && currPath !== '/' ? false : historyIsEmpty

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

    return (
        <PreloaderContext.Provider value={{ isLoading, setIsLoading, showPreloader }}>
            {children}
        </PreloaderContext.Provider>
    )
}
