import type { Metadata } from 'next'
import * as motion from 'motion/react-client'
import ProjectService from '@/services/project-service'
import { BreadcrumbSchema } from '@/components/structured-data'
import { ClientEnv } from '@/env/client'
import { ProjectsSectionItem } from '@/features/projects/components/projects-section-item'

export const dynamic = 'force-static'
export const revalidate = 86400 // 24h

const WEBSITE_URL = ClientEnv.NEXT_PUBLIC_WEBSITE_URL

const META_TITLE = `Labs`

const META_DESCRIPTION =
    'Explore experimental side projects and technology explorations by Miguel Gonçalves. Innovative web applications built with Next.js, React, and TypeScript.'

export const metadata: Metadata = {
    title: META_TITLE,
    description: META_DESCRIPTION,
    alternates: {
        canonical: `${WEBSITE_URL}/labs`,
    },
    openGraph: {
        title: META_TITLE,
        description: META_DESCRIPTION,
        type: 'website',
        url: `${WEBSITE_URL}/labs`,
    },
    twitter: {
        title: META_TITLE,
        description: META_DESCRIPTION,
        card: 'summary_large_image',
    },
}

export default function LabsPage() {
    const projects = ProjectService.getAllLabsProjects()

    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: 'Home', url: WEBSITE_URL },
                    { name: 'Labs', url: `${WEBSITE_URL}/labs` },
                ]}
            />
            <main
                id="main"
                className="main-container flex flex-col gap-6 max-w-3xl border-x border-x-divider min-h-[calc(100vh-130px)] container-padding"
            >
                <span className="block text-neutral font-normal text-base">Labs</span>

                <div className="flex flex-col gap-5 justify-center h-full">
                    <h1 className="text-primary text-xl/snug md:text-2xl/snug xl:text-3xl/snug font-bold">
                        Some side projects created to explore ideas and technologies.
                    </h1>
                </div>

                <section className="flex flex-col gap-12 ">
                    <motion.div
                        className="project-section-grid"
                        initial={{ opacity: 0, x: 0 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        viewport={{ once: true, amount: 0.2 }}
                        style={{ willChange: 'transform' }}
                    >
                        {projects?.map((project, index) => (
                            <ProjectsSectionItem
                                {...project}
                                key={`project-${project.id}-${index}`}
                            />
                        ))}
                    </motion.div>
                </section>
            </main>
        </>
    )
}
