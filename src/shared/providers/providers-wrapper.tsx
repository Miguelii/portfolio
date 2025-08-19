import { ThemeProvider } from 'next-themes'
import { PropsWithChildren } from 'react'
import { HistoryProvider } from './history-provider'

type ProvidersWrapperProps = PropsWithChildren

export default function ProvidersWrapper({ children }: ProvidersWrapperProps) {
    return (
        <ThemeProvider
            defaultTheme="light"
            attribute="class"
            enableSystem={false}
            themes={['light', 'dark']}
            storageKey="miguel-goncalves-dev-theme"
            forcedTheme={'light'}
        >
            <HistoryProvider>{children}</HistoryProvider>
        </ThemeProvider>
    )
}
