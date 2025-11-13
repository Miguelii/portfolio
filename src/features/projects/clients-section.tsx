import * as motion from 'motion/react-client'
import { ProjectsSectionItem } from './projects-section-item'
import ProjectService from '@/shared/services/project-service'

export function ClientsSection() {
    const projects = ProjectService.getAllSideProjects()

    return (
        <section className="flex flex-col gap-12 container-padding border-b border-b-divider">
            <div className="flex flex-col gap-2">
                <motion.h2
                    className="text-3xl font-bold"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.6 }}
                    style={{ willChange: 'transform' }}
                >
                    Clients, Clients, Clients
                </motion.h2>
                <motion.span
                    className="text-lg text-neutral"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.6 }}
                    style={{ willChange: 'transform' }}
                >
                    Some of the freelance projects I’ve worked on.
                </motion.span>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 md:gap-4"
                initial={{ opacity: 0, x: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.2 }}
                style={{ willChange: 'transform' }}
            >
                {projects?.map((project, index) => (
                    <ProjectsSectionItem {...project} key={`project-${project.id}-${index}`} />
                ))}
            </motion.div>
        </section>
    )
}
