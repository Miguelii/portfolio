import type { Metadata } from 'next'
import * as motion from 'motion/react-client'
import ProjectService from '@/shared/services/project-service'
import { ProjectsSectionItem } from '@/features/projects/projects-section-item'

export const metadata: Metadata = {
    title: 'Miguel Gonçalves - Work',
}

export default function WorkPage() {
    const projects = ProjectService.getAllWorkProjects()

    return (
        <main className="main-container flex flex-col gap-6 max-w-3xl border-x border-x-divider min-h-[calc(100vh-130px)] container-padding">
            <span className="block text-neutral font-normal text-base">
                Projects, Projects, Projects
            </span>

            <div className="flex flex-col gap-5 justify-center h-full mb-4">
                <h1 className="text-primary text-xl/snug md:text-2xl/snug xl:text-3xl/snug font-bold">
                Some of the work projects I’m proud to have architected, developed and
                delivered.
                </h1>
            </div>

            <section className="flex flex-col gap-12 ">
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
        </main>
    )
}
