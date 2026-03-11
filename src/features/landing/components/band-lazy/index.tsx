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
        <>
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
        </>
    )
}
