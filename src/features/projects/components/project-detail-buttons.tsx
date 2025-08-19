import Button from '@/shared/components/ui/button'
import { ProjectType } from '@/shared/types/Project'
import type { Variants } from 'motion/react'
import * as motion from 'motion/react-client'

type ProjectDetailButtonsProps = {
    fadeInUp: Variants
    project: ProjectType
}

export default function ProjectDetailButtons({ fadeInUp, project }: ProjectDetailButtonsProps) {
    return (
        <motion.div
            className="mt-auto w-full justify-between pt-6 md:pt-12 flex flex-col-reverse md:flex-row gap-8"
            variants={fadeInUp}
        >
            {project.nextProject && (
                <Button
                    label="Explore More Projects"
                    href={`/${project.nextProject}`}
                    variant="secondary"
                    prefetch
                />
            )}
            {project.projectUrl && (
                <Button label="View Project" href={project.projectUrl!} prefetch target="_blank" />
            )}
        </motion.div>
    )
}
