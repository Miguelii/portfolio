import type { PropsWithChildren } from 'react'
import { HistoryProvider } from './history-provider'

type ProvidersWrapperProps = PropsWithChildren

export default function ProvidersWrapper({ children }: ProvidersWrapperProps) {
    return <HistoryProvider>{children}</HistoryProvider>
}
