import { ViewTransition } from 'react'
import { ReactLenis } from 'lenis/react'
import { Header } from '@/components/header'
import { ProvidersWrapper } from '@/providers/providers-wrapper'
import { Footer } from '@/components/footer'

type Props = LayoutProps<'/'>

export default async function PublicLayout({ children }: Props) {
    return (
        <ReactLenis root>
            <ProvidersWrapper>
                <Header />
                <div className="flex-1 w-full">
                    <ViewTransition>{children}</ViewTransition>
                </div>
                <Footer />
            </ProvidersWrapper>
        </ReactLenis>
    )
}
