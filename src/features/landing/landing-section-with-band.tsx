import BandCanvas from '@/components/ui/Band'
import * as motion from 'motion/react-client'

export function LandingSectionWithBand() {
    return (
        <section className="h-[540px] relative mb-0 ">
            <motion.div
                initial={{ x: -100, opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="flex flex-col w-full max-w-[615px] gap-4 justify-center h-full"
            >
                <motion.h1
                    role="presentation"
                    aria-hidden="true"
                    style={{ willChange: 'transform' }}
                    initial={{ x: -0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-4xl md:text-5xl lg:text-[3.625rem] font-bold text-start w-full leading-snug"
                >
                    Crafting Experiences, Delivering Results
                </motion.h1>

                <motion.p
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-xl lg:text-2xl font-medium text-neutral leading-relaxed"
                >
                    Delivered products that have reached over a million users worldwide.
                </motion.p>
            </motion.div>

            <div className="hidden lg:block absolute -inset-5">
                <div className="relative w-full h-[700px]">
                    <BandCanvas />
                </div>
            </div>
        </section>
    )
}
