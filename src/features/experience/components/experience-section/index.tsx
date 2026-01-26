import * as motion from 'motion/react-client'
import ExperienceService from '@/services/experience-service'
import { useExperienceSectionAnimations } from '../../hooks/use-experience-section-animations'
import { WorkExperienceItem } from '../experience-section-item'

export function ExperienceSection() {
    const workExperienceData = ExperienceService.getAllWorkExperience()

    const { container, item } = useExperienceSectionAnimations()

    return (
        <section className="flex flex-col gap-12 container-padding border-b-0 border-b-divider">
            <motion.h2
                className="text-h2"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
                style={{ willChange: 'transform' }}
            >
                Work Experience
            </motion.h2>

            <motion.div
                style={{ willChange: 'transform' }}
                className="flex flex-col gap-10"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {workExperienceData?.map((itemData, index) => (
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
