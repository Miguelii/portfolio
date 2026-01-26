'use client'

import { PreloaderContext } from '@/providers/preloader-provider'
import * as motion from 'motion/react-client'
import dynamic from 'next/dynamic'
import { use, useEffect, useState } from 'react'

const BandCanvas = dynamic(() => import('@/components/ui/band'), {
    ssr: false,
    loading: () => <div className="w-full canvas-h" />,
})

export function LandingSectionWithBand() {
    const context = use(PreloaderContext)
    const isPreloaderLoading = context?.isLoading ?? false
    const showPreloader = context?.showPreloader ?? false
    const [shouldAnimate, setShouldAnimate] = useState(!showPreloader ? true : false)

    useEffect(() => {
        if (!showPreloader) return
        if (!isPreloaderLoading) {
            setShouldAnimate(true)
        }
    }, [isPreloaderLoading, showPreloader])

    return (
        <div className="w-full flex-1 mx-auto p-5 md:p-8 lg:p-10 border-b border-b-divider">
            <section className="h-[540px] relative flex flex-col justify-center">
                <motion.div
                    initial={{ x: -25, opacity: 1 }}
                    animate={shouldAnimate ? { x: 0, opacity: 1 } : { x: -25, opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="flex flex-col w-full max-w-lg 2xl:max-w-2xl gap-4 justify-center"
                >
                    <motion.h1
                        role="presentation"
                        aria-hidden="true"
                        style={{ willChange: 'transform' }}
                        initial={{ x: -0 }}
                        animate={shouldAnimate ? { x: 0, opacity: 1 } : { x: 0, opacity: 0 }}
                        transition={{ duration: 0.8, delay: shouldAnimate ? 0.6 : 0 }}
                        className="text-hero text-start w-full"
                    >
                        Crafting Experiences, Delivering Results
                    </motion.h1>

                    <motion.p
                        initial={{ x: -30, opacity: 0 }}
                        animate={shouldAnimate ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
                        transition={{ duration: 0.6, delay: shouldAnimate ? 0.8 : 0 }}
                        className="text-p-large font-medium text-neutral leading-relaxed"
                    >
                        Delivered products that have reached over a million users worldwide.
                    </motion.p>
                </motion.div>

                {shouldAnimate && (
                    <motion.div
                        className="hidden lg:block absolute -inset-10"
                        initial={{ opacity: 0 }}
                        animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
                        transition={{
                            duration: 0.4,
                            delay: !shouldAnimate || !showPreloader ? 0 : 0.8,
                        }}
                    >
                        <div className="relative w-full canvas-h">
                            <BandCanvas />
                        </div>
                    </motion.div>
                )}
            </section>
        </div>
    )
}
