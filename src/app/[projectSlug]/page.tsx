import ProjectsService from '@/shared/services/projects-service'
import { notFound } from 'next/navigation'
import { ProjectType } from '@/shared/types/Project'
import ProjectDetail from '@/features/projects/components/project-detail'
import Link from 'next/link'
import { ChevronLeftIcon } from 'lucide-react'

export const dynamic = 'force-static'
export const revalidate = 86400 // 24h

type ProjectSlugPageProps = Readonly<{
    params: Promise<{
        projectSlug: ProjectType['id']
    }>
}>

/**
 * Generates static paths for all individual project slugs
 * This function is used by Next.js to pre-render dynamic routes at build time
 *
 * @returns An object containing the list of paths to pre-render
 */
export async function generateStaticParams() {
    const projectsData = ProjectsService.getAllProjects()

    const paths = projectsData?.map((item) => {
        return { projectSlug: item.id }
    })

    return paths
}

export default async function ProjectSlugPage(props: ProjectSlugPageProps) {
    const params = await props.params

    const projectSlug = params?.projectSlug ?? null

    const project = ProjectsService.getProjectById(projectSlug)

    if (!project) return notFound()

    return (
        <main className="main-container h-fit relative mt-12 md:mt-14 lg:mt-16 xl:mt-24 flex flex-col gap-8 md:gap-9">
            <Link
                href={'/'}
                prefetch={false}
                className="flex flex-row gap-1 items-center text-base font-semibold text-neutral-dark hover:text-neutral"
            >
                <ChevronLeftIcon className="w-4 h-4" />
                Back
            </Link>
            <ProjectDetail project={project} />
        </main>
    )
}
