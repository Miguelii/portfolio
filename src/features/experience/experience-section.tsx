import * as motion from 'motion/react-client'
import ExperienceService from '@/lib/experience-service'
import { WorkExperienceItem } from './experience-section-item'
import { useExperienceSectionAnimations } from './use-experience-section-animations'

export function ExperienceSection() {
   const workExperienceData = ExperienceService.getAllWorkExperience()

   const { container, item } = useExperienceSectionAnimations()

   return (
      <section className="flex flex-col gap-12">
         <motion.h2
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.6 }}
         >
            Work Experience
         </motion.h2>

         <motion.div
            className="space-y-6"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
         >
            {workExperienceData?.map((itemData, index) => (
               <motion.div key={`work-experience-${itemData.company}_${index}`} variants={item}>
                  <WorkExperienceItem {...itemData} />
               </motion.div>
            ))}
         </motion.div>
      </section>
   )
}
