import { Badge } from '@/shared/components/ui/badge'
import { ProjectType } from '@/shared/types/Project'
import { cn } from '@/shared/utils/cn'
import type { Variants } from 'motion/react'
import * as motion from 'motion/react-client'

type ProjectDetailTitleAndDescriptionProps = {
    fadeInUp: Variants
    project: ProjectType
}

export default function ProjectDetailTitleAndDescription({
    project,
    fadeInUp,
}: ProjectDetailTitleAndDescriptionProps) {
    return (
        <>
            <motion.div className="flex flex-col gap-2">
                <motion.div variants={fadeInUp}>
                    <Badge className={cn('w-fit bg-primary text-white')}>{project.label}</Badge>
                </motion.div>

                <motion.h1
                    className="text-primary text-3xl/snug xl:text-5xl/snug font-bold"
                    variants={fadeInUp}
                >
                    {project.title}
                </motion.h1>
            </motion.div>

            <motion.div
                variants={fadeInUp}
                className="text-base text-neutral leading-relaxed project-html"
                dangerouslySetInnerHTML={{ __html: project.longDescription }}
            />

            <div className="flex flex-wrap gap-3">
                {project?.techStack?.map((tech, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * index, duration: 0.4 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <Badge className="px-4 py-2 text-[14px] leading-snug">{tech}</Badge>
                    </motion.div>
                ))}
            </div>
        </>
    )
}
