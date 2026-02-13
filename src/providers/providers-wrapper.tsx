import type { PropsWithChildren } from 'react'
import { HistoryProvider } from './history-provider'
import { PreloaderProvider } from './preloader-provider'

type Props = PropsWithChildren

export function ProvidersWrapper({ children }: Props) {
    return (
        <HistoryProvider>
            <PreloaderProvider>{children}</PreloaderProvider>
        </HistoryProvider>
    )
}
