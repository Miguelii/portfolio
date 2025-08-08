import { Badge } from '@/components/ui/badge'
import Button from '@/components/ui/button'
import { type ProjectType } from '@/types/Project'
import { cn } from '@/utils/cn'
import { getBuildId } from '@/utils/get-build-id'
import Image from 'next/image'
import * as motion from 'motion/react-client'
import { useProjectDetailAnimation } from './use-project-detail-animation'
import type { Variants } from 'motion'
import { LineDivider } from '../../components/ui/line-divider'

type ProjectDetailProps = {
    project: ProjectType
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
    const { container, fadeInUp } = useProjectDetailAnimation()

    return (
        <>
            <motion.section
                className="grid lg:grid-cols-2 gap-12 items-center"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {/* Left Side */}
                <motion.div className="h-full flex flex-col gap-6" variants={container}>
                    <ProjectTitleAndDescription project={project} fadeInUp={fadeInUp} />

                    {/* Mobile Image */}
                    {project.imageUrl && (
                        <motion.div variants={fadeInUp} className="relative flex md:hidden">
                            <ProjectImage project={project} />
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
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <ProjectImage project={project} />
                    </motion.div>
                )}
            </motion.section>

            {project.techStack.length > 0 && (
                <>
                    <LineDivider />

                    <TechnologiesSection project={project} />
                </>
            )}
        </>
    )
}

type ProjectTitleAndDescriptionProps = ProjectDetailProps & {
    fadeInUp: Variants
}

function ProjectTitleAndDescription({ project, fadeInUp }: ProjectTitleAndDescriptionProps) {
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
        </>
    )
}

type ProjectDetailButtonsProps = ProjectDetailProps & {
    fadeInUp: Variants
}

function ProjectDetailButtons({ project, fadeInUp }: ProjectDetailButtonsProps) {
    return (
        <motion.div
            className="mt-auto w-full justify-between py-12 flex flex-col-reverse md:flex-row gap-8"
            variants={fadeInUp}
        >
            {project.nextProject && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                    <Button href={`/${project.nextProject}`} prefetch variant="secondary">
                        Explore More Projects
                    </Button>
                </motion.div>
            )}
            {project.projectUrl && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                    <Button href={project.projectUrl!} target="_blank">
                        Open Project
                    </Button>
                </motion.div>
            )}
        </motion.div>
    )
}

function TechnologiesSection({ project }: ProjectDetailProps) {
    return (
        <motion.section
            className="flex flex-col gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <h2 className="text-3xl font-bold">Technologies Used</h2>
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
        </motion.section>
    )
}

function ProjectImage({ project }: ProjectDetailProps) {
    const buildId = getBuildId()

    return (
        <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl w-full max-h-[350px]">
            <Image
                src={`${project.imageUrl}?v=${buildId}`}
                alt={`${project.title} project preview`}
                width={530}
                height={350}
                className="w-full h-full object-cover"
            />
        </div>
    )
}
