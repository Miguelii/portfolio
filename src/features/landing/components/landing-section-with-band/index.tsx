'use client'

import { PreloaderContext } from '@/providers/preloader-provider'
import * as motion from 'motion/react-client'
import dynamic from 'next/dynamic'
import { use } from 'react'
import { useLandingSectionDelay } from '@/features/landing/hooks/use-landing-section-delay'

const BandCanvas = dynamic(() => import('@/components/ui/band'), {
    ssr: false,
    loading: () => <div className="w-full canvas-h bg-background" />,
})

export function LandingSectionWithBand() {
    const context = use(PreloaderContext)
    const isPreloaderLoading = context?.isLoading ?? false
    const showPreloader = context?.showPreloader ?? false

    const shouldAnimate = !showPreloader || !isPreloaderLoading

    const { P_DELAY, CANVAS_DELAY, H1_DELAY } = useLandingSectionDelay(showPreloader)

    return (
        <div className="w-full flex-1 mx-auto px-5 pb-8 pt-12 md:p-8 lg:p-10 border-b border-b-divider">
            <section className="lg:h-[540px] relative flex flex-col justify-center">
                <motion.div className="flex flex-col w-full max-w-lg 2xl:max-w-2xl gap-4 justify-center">
                    <motion.h1
                        initial={{ y: -30, opacity: 0, filter: 'blur(8px)' }}
                        animate={
                            shouldAnimate
                                ? { y: 0, opacity: 1, filter: 'blur(0px)' }
                                : { y: -30, opacity: 0, filter: 'blur(8px)' }
                        }
                        transition={{
                            type: 'spring',
                            stiffness: 60,
                            damping: 18,
                            delay: shouldAnimate ? H1_DELAY : 0,
                        }}
                        className="text-hero text-start w-full text-balance"
                    >
                        Crafting Experiences, Delivering Results
                    </motion.h1>

                    <motion.p
                        initial={{ y: -30, opacity: 0, filter: 'blur(8px)' }}
                        animate={
                            shouldAnimate
                                ? { y: 0, opacity: 1, filter: 'blur(0px)' }
                                : { y: -30, opacity: 0, filter: 'blur(8px)' }
                        }
                        transition={{
                            type: 'spring',
                            stiffness: 60,
                            damping: 18,
                            delay: shouldAnimate ? P_DELAY : 0,
                        }}
                        className="text-p-large font-medium text-neutral leading-relaxed"
                    >
                        Delivered products that have reached over a million users worldwide.
                    </motion.p>
                </motion.div>

                {shouldAnimate && (
                    <motion.div
                        className="px-10 md:px-0 mt-6 lg:mt-0 relative lg:absolute lg:left-[35%] xl:-inset-10 w-full xl:w-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.4,
                            delay: showPreloader ? CANVAS_DELAY : 0,
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
