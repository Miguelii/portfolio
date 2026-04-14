'use client'

import dynamic from 'next/dynamic'
import * as motion from 'motion/react-client'
import { PreloaderContext } from '@/providers/preloader-provider'
import { use } from 'react'

const BandCanvas = dynamic(() => import('@/components/band'), {
    ssr: false,
    loading: () => <div className="w-full canvas-h bg-background" />,
})

export function BandLazy() {
    const phase = use(PreloaderContext)

    const canAnimate = phase !== 'loading'
    const entranceDelay = phase === 'complete' ? 0.8 : 0

    return (
        <section className="canvas-container px-8 sm:px-0">
            <div className="relative w-full canvas-h">
                {canAnimate && (
                    <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.4,
                            delay: entranceDelay,
                        }}
                    >
                        <BandCanvas />
                    </motion.div>
                )}
            </div>
        </section>
    )
}
