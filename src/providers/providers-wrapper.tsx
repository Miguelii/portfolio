import type { PropsWithChildren } from 'react'
import { PreloaderProvider } from './preloader-provider'

type Props = PropsWithChildren

export function ProvidersWrapper({ children }: Props) {
    return <PreloaderProvider>{children}</PreloaderProvider>
}
