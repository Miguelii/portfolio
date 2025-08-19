import { type ProjectType } from '@/shared/types/Project'
import * as motion from 'motion/react-client'
import { useProjectDetailAnimation } from '../hooks/use-project-detail-animation'
import ProjectDetailTitleAndDescription from './project-detail-title-and-description'
import ProjectDetailButtons from './project-detail-buttons'
import ProjectDetailImage from './project-detail-image'

type ProjectDetailProps = {
    project: ProjectType
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
    const { container, fadeInUp } = useProjectDetailAnimation()

    return (
        <motion.section
            className="grid lg:grid-cols-2 gap-12 items-center"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {/* Left Side */}
            <motion.div className="h-full flex flex-col gap-6" variants={container}>
                <ProjectDetailTitleAndDescription project={project} fadeInUp={fadeInUp} />

                {/* Mobile Image */}
                {project.imageUrl && (
                    <motion.div variants={fadeInUp} className="relative flex md:hidden">
                        <ProjectDetailImage project={project} />
                    </motion.div>
                )}
                <ProjectDetailButtons project={project} fadeInUp={fadeInUp} />
            </motion.div>

            {/* Right Side Image (desktop) */}
            {project.imageUrl && (
                <motion.div
                    className="relative hidden md:flex w-full"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
                >
                    <ProjectDetailImage project={project} />
                </motion.div>
            )}
        </motion.section>
    )
}
