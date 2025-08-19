import { type ProjectType } from '@/shared/types/Project'
import * as motion from 'motion/react-client'
import ProjectsShowcaseItem from './project-showcase-item'

type ProjectsShowcaseProps = {
    title: string
    description: string
    projects: ProjectType[]
}

export function ProjectsShowcase({ title, description, projects }: ProjectsShowcaseProps) {
    return (
        <section className="flex flex-col gap-12">
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.4 }}
                className="flex flex-col gap-2"
                style={{ willChange: 'transform' }}
            >
                <motion.h1
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-3xl font-bold"
                >
                    {title}
                </motion.h1>

                <motion.p
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-lg font-medium text-neutral leading-relaxed"
                >
                    {description}
                </motion.p>
            </motion.div>

            <div className="flex flex-col">
                {projects?.map((item, index) => (
                    <motion.div
                        key={`project-showcase-${item.title}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{
                            duration: 0.4,
                            delay: index * 0.2,
                        }}
                    >
                        <ProjectsShowcaseItem project={item} />
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
