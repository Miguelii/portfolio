'use client'

import { createContext, useState, useLayoutEffect, type PropsWithChildren, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { useIsMounted } from '@/hooks/use-is-mounted'

type HistoryContextProps = {
    history: string[]
}

export const HistoryContext = createContext<HistoryContextProps>({ history: [] })

type HistoryProviderProps = PropsWithChildren

export const HistoryProvider = ({ children }: HistoryProviderProps) => {
    const [history, setHistory] = useState<string[]>([])
    const pathname = usePathname()

    const isMounted = useIsMounted()

    useLayoutEffect(() => {
        if (isMounted()) {
            if (pathname !== history.at(-1)) setHistory((prevHistory) => [...prevHistory, pathname])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, isMounted])

    const value: HistoryContextProps = useMemo(() => ({ history }), [history])

    return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
}
