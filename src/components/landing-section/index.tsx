'use client'

import { PreloaderContext } from '@/providers/preloader-provider'
import * as motion from 'motion/react-client'
import { use, type PropsWithChildren } from 'react'
import type { LandingSectionDTO } from '@/sanity/api/get-landing-section'

type Props = PropsWithChildren<{
    modelPromise: Promise<LandingSectionDTO>
}>

export function LandingSection({ modelPromise, children }: Props) {
    const model = use(modelPromise)
    const phase = use(PreloaderContext)

    const canAnimate = phase !== 'loading'
    const entranceDelay = phase === 'complete'

    return (
        <div className="w-full flex-1 mx-auto px-5 pb-8 pt-12 md:p-8 lg:p-10 border-b border-b-divider">
            <section className="lg:h-135 relative flex flex-col justify-center">
                <motion.div className="flex flex-col w-full max-w-full md:max-w-lg 2xl:max-w-2xl gap-4 justify-center">
                    <motion.h1
                        initial={entranceDelay ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
                        animate={
                            canAnimate
                                ? { y: 0, opacity: 1, filter: 'blur(0px)' }
                                : { y: -30, opacity: 0, filter: 'blur(8px)' }
                        }
                        transition={{
                            type: 'spring',
                            stiffness: 60,
                            damping: 18,
                            delay: entranceDelay ? 0.6 : 0,
                        }}
                        className="text-hero text-start w-full text-balance"
                    >
                        {model?.title}
                    </motion.h1>

                    <motion.p
                        initial={entranceDelay ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
                        animate={
                            canAnimate
                                ? { y: 0, opacity: 1, filter: 'blur(0px)' }
                                : { y: -30, opacity: 0, filter: 'blur(8px)' }
                        }
                        transition={{
                            type: 'spring',
                            stiffness: 60,
                            damping: 18,
                            delay: entranceDelay ? 0.8 : 0,
                        }}
                        className="text-p-large font-medium text-neutral leading-relaxed"
                    >
                        {model?.subtitle}
                    </motion.p>
                </motion.div>

                {children}
            </section>
        </div>
    )
}
