import type { PropsWithChildren } from 'react'
import { HistoryProvider } from './history-provider'

type Props = PropsWithChildren

export default function ProvidersWrapper({ children }: Props) {
    return <HistoryProvider>{children}</HistoryProvider>
}
