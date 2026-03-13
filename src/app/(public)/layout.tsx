import { ViewTransition } from 'react'
import { ReactLenis } from 'lenis/react'
import { CookieConsentLazy } from '@/components/cookie-consent/cookie-consent-lazy'
import { Header } from '@/components/header'
import { ProvidersWrapper } from '@/providers/providers-wrapper'
import { Footer } from '@/components/footer'

type Props = LayoutProps<'/'>

export default async function PublicLayout({ children }: Props) {
    return (
        <ReactLenis root>
            <a
                tabIndex={0}
                aria-label="Skip to content"
                className="sr-only sr-only-focusable"
                id="acessibilitynav"
                href="#main"
            >
                Skip to content
            </a>
            <ProvidersWrapper>
                <CookieConsentLazy />
                <Header />
                <div className="flex-1 w-full">
                    <ViewTransition>{children}</ViewTransition>
                </div>
                <Footer />
            </ProvidersWrapper>
        </ReactLenis>
    )
}
