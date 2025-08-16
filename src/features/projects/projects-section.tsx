import { type ProjectType } from '@/types/Project'
import { Carousel } from '@/components/ui/apple-cards-carousel'
import { ProjectItemSection } from './project-section-item'
import * as motion from 'motion/react-client'

type ProjectsSectionProps = {
    title: string
    description: string
    projects: ProjectType[]
}

export function ProjectsSection({ title, description, projects }: ProjectsSectionProps) {
    const ProjectCard = projects?.map((project, index) => {
        return (
            <div
                key={`project-${title}-${index}`}
                className="relative z-10 flex h-[520px] w-3xs flex-col items-start justify-start overflow-hidden md:h-[520px] md:w-96"
            >
                <ProjectItemSection project={project} key={`personal-project-${index}`} />
            </div>
        )
    })

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

            <Carousel items={ProjectCard} />
        </section>
    )
}
