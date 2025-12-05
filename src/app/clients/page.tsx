import type { Metadata } from 'next'
import * as motion from 'motion/react-client'
import ProjectService from '@/shared/services/project-service'
import { ProjectsSectionItem } from '@/features/projects/projects-section-item'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Miguel Gonçalves - Clients',
}

export default function ClientsPage() {
    const projects = ProjectService.getAllSideProjects()
    
    return (
        <main className="main-container flex flex-col gap-6 max-w-3xl border-x border-x-divider min-h-[calc(100vh-130px)] container-padding">
            <span className="block text-neutral font-normal text-base">
                Clients, Clients, Clients
            </span>

            <div className="flex flex-col gap-5 justify-center h-full">
                <h1 className="text-primary text-xl/snug md:text-2xl/snug xl:text-3xl/snug font-bold">
                    Some of the freelance projects I’ve worked on.
                </h1>
            </div>

            <span className="block text-neutral font-normal text-base mb-4">
                Interested in working together? React out at <Link className='underline font-bold' prefetch={false} href={'mailto:miguelgoncalves18@hotmail.com'}>miguelgoncalves18@hotmail.com</Link>
            </span>

            <section className="flex flex-col gap-12 ">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-8 md:gap-4"
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
