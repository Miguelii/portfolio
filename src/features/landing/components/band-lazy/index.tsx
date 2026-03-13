'use client'

import dynamic from 'next/dynamic'
import * as motion from 'motion/react-client'
import { PreloaderContext } from '@/providers/preloader-provider'
import { use } from 'react'
import { useLandingSectionDelay } from '../../hooks/use-landing-section-delay'

const BandCanvas = dynamic(() => import('@/components/ui/band'), {
    ssr: false,
    loading: () => <div className="w-full canvas-h bg-background" />,
})

export function BandLazy() {
    const { shouldAnimate, showPreloader } = use(PreloaderContext)
    const { CANVAS_DELAY } = useLandingSectionDelay(showPreloader)

    return (
        <div className="canvas-container">
            <div className="relative w-full canvas-h">
                {shouldAnimate && (
                    <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.4,
                            delay: showPreloader ? CANVAS_DELAY : 0,
                        }}
                    >
                        <BandCanvas />
                    </motion.div>
                )}
            </div>
        </div>
    )
}
