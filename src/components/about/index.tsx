import * as motion from 'motion/react-client'
import { PortableText } from '@portabletext/react'
import type { AboutSectionQuery } from '@/sanity/api/get-about-section'
import { use } from 'react'

type Props = {
    modelPromise: Promise<AboutSectionQuery>
}

export function AboutSection({ modelPromise }: Props) {
    const model = use(modelPromise)

    return (
        <section className="flex flex-col gap-5 md:gap-8 lg:gap-12 container-padding border-b border-b-divider">
            <motion.h2
                className="text-h2"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.6 }}
            >
                {model?.title}
            </motion.h2>

            <div className="flex flex-col gap-3">
                {model?.paragraphs?.map((item, i) => (
                    <motion.div
                        key={`about-paragraph-${item.id}`}
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 * i, ease: 'easeOut' }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="text-pretty text-neutral text-p-regular"
                    >
                        <PortableText value={item?.text} />
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
