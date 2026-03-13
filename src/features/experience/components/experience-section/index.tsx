import * as motion from 'motion/react-client'
import { useExperienceSectionAnimations } from '@/features/experience/hooks/use-experience-section-animations'
import { WorkExperienceItem } from './experience-section-item'
import { use } from 'react'
import type { WorkExperienceSectionDTO } from '@/sanity/api/get-work-experience-section'

type Props = {
    modelPromise: Promise<WorkExperienceSectionDTO>
}

export function ExperienceSection({ modelPromise }: Props) {
    const model = use(modelPromise)

    const { container, item } = useExperienceSectionAnimations()

    return (
        <section className="below-fold flex flex-col gap-5 md:gap-8 lg:gap-12 container-padding border-b-0 border-b-divider">
            <motion.h2
                className="text-h2"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
            >
                {model?.title}
            </motion.h2>

            <motion.div
                className="flex flex-col gap-10"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {model?.items?.map((itemData, index) => (
                    <motion.div
                        key={`work-experience-${itemData.company}_${index}`}
                        variants={item}
                    >
                        <WorkExperienceItem {...itemData} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}
