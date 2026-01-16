'use client'

import { CookieIcon } from 'lucide-react'
import { useEffect, useEffectEvent, useState, useTransition } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createCookieConsentAction } from '@/actions/create-cookie-consent-action'
import { cn } from '../../utils/cn'
import Button from '../ui/button'
import { tryCatch } from '../../utils/try-catch'
import { sendGTMEvent } from '@next/third-parties/google'
import CookieConsentManager from '@/utils/cookie-consent-manager'

export function CookieConsent() {
    const [isOpen, setIsOpen] = useState(false)
    const [hide, setHideState] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const currPath = usePathname()

    const consentCookie = CookieConsentManager.getCookieConsent()

    const isHomePage = currPath === '/'

    const handler = (allow: boolean) => {
        setIsOpen(false)
        setHideState(true)

        startTransition(async () => {
            Promise.all([
                tryCatch(async () => {
                    // 1. updates google dataLayer analytics values
                    window?.gtag('consent', 'update', {
                        ad_storage: allow ? 'granted' : 'denied',
                        analytics_storage: allow ? 'granted' : 'denied',
                    })

                    // 2. sends event google analytics
                    sendGTMEvent({
                        event: 'consentUpdated',
                        value: allow ? 'granted' : 'denied',
                    })

                    // 3. Create cookie
                    createCookieConsentAction({ allowAnalytics: allow })
                }),
            ])
            router.refresh()
        })
    }

    const onConnected = useEffectEvent(() => {
        setTimeout(
            () => {
                const hasCookieConsent = consentCookie != null

                setIsOpen(hasCookieConsent ? false : true)
                if (hasCookieConsent) {
                    setIsOpen(false)
                    setTimeout(() => {
                        setHideState(true)
                    }, 700)
                }
            },
            // If its the home page we add a bit more delay so the banner displays after the preloader
            isHomePage ? 3500 : 700
        )
    })

    useEffect(() => {
        onConnected()
    }, [])

    return (
        <div
            className={cn(
                'fixed z-[999] bottom-0 left-0 right-0 p-4 sm:p-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md duration-700',
                !isOpen
                    ? 'transition-[opacity,transform] translate-y-8 opacity-0'
                    : 'transition-[opacity,transform] translate-y-0 opacity-100',
                hide && 'hidden'
            )}
        >
            <div className="bg-background rounded-lg sm:rounded-md border border-divider shadow-lg">
                <div className="grid gap-2">
                    <div className="border-b border-divider h-12 sm:h-14 flex items-center justify-between p-3 sm:p-4">
                        <h1 className="text-base sm:text-lg font-medium text-primary">
                            We use cookies
                        </h1>
                        <CookieIcon className="h-4 w-4 sm:h-[1.2rem] sm:w-[1.2rem] text-neutral-dark" />
                    </div>
                    <div className="p-3 sm:p-4">
                        <p className="text-xs sm:text-sm font-normal text-start text-neutral">
                            We use cookies to ensure you get the best experience on our website. For
                            more information on how we use cookies, please see our
                            <Link href={`/privacy-notice`} className="underline ml-1 text-primary">
                                cookie policy
                            </Link>
                            <br />
                            <br />
                            <span className="text-xs items-center ">
                                By clicking <span className="font-normal text-primary">Accept</span>
                                ,you agree to our use of cookies.
                            </span>
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-2 p-3 sm:p-4 sm:py-5 border-t border-divider">
                        <Button
                            as="button"
                            label="Decline"
                            onClick={() => handler(false)}
                            variant="secondary"
                            className="md:w-full"
                        />
                        <Button
                            as="button"
                            label="Accept"
                            onClick={() => handler(true)}
                            variant="primary"
                            className="md:w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
