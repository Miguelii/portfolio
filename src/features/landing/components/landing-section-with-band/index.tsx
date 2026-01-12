import BandCanvas from '@/components/ui/band'
import * as motion from 'motion/react-client'

type LandingSectionWithBandProps = {
    hideBand?: boolean
}

export function LandingSectionWithBand({ hideBand = false }: LandingSectionWithBandProps) {
    return (
        <div className="w-full flex-1 mx-auto p-5 md:p-8 lg:p-10 border-b border-b-divider">
            <section className="h-[540px] relative">
                <motion.div
                    initial={{ x: -25, opacity: 1 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="flex flex-col w-full max-w-lg 2xl:max-w-2xl gap-4 justify-center h-full"
                >
                    <motion.h1
                        role="presentation"
                        aria-hidden="true"
                        style={{ willChange: 'transform' }}
                        initial={{ x: -0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-hero text-start w-full"
                    >
                        Crafting Experiences, Delivering Results
                    </motion.h1>

                    <motion.p
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="text-p-large font-medium text-neutral leading-relaxed"
                    >
                        Delivered products that have reached over a million users worldwide.
                    </motion.p>
                </motion.div>

                {!hideBand && (
                    <div className="hidden lg:block absolute -inset-10">
                        <div className="relative w-full h-[620px]">
                            <BandCanvas />
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}
