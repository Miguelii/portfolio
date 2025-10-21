import * as motion from 'motion/react-client'
import { useProjectsSectionAnimations } from './use-projects-section-animations'
import { ProjectsSectionItem } from './projects-section-item'
import ProjectService from '@/shared/services/project-service'

export function ProjectsSection() {
    const { container, item } = useProjectsSectionAnimations()

    const projects = ProjectService.getAllProjects()

    return (
        <section className="flex flex-col gap-12 container-padding">
            <div className="flex flex-col gap-2">
                <motion.h2
                    className="text-3xl font-bold"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.6 }}
                    style={{ willChange: 'transform' }}
                >
                    Projects, Projects, Projects
                </motion.h2>
                <motion.span
                    className="text-lg text-neutral"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.6 }}
                    style={{ willChange: 'transform' }}
                >
                    Some of the work projects I’m proud to have architected, developed and delivered.
                </motion.span>
            </div>

            <motion.div
                style={{ willChange: 'transform' }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-4"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.8 }}
            >
                {projects?.map((project, index) => (
                    <motion.div key={`project-${project.id}-${index}`} variants={item}>
                        <ProjectsSectionItem {...project} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}
