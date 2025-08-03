import ProjectsService from '@/lib/projects-service'
import { notFound } from 'next/navigation'
import { ProjectType } from '@/types/Project'
import ProjectDetail from '@/features/projects/project-detail'

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
        return { showroomId: item.id }
    })

    return paths
}

export default async function ProjectSlugPage(props: ProjectSlugPageProps) {
    const params = await props.params

    const projectSlug = params?.projectSlug ?? null

    const project = ProjectsService.getProjectById(projectSlug)

    if (!project) return notFound()

    return (
        <main className="main-container h-fit relative mt-12 md:mt-14 lg:mt-16 xl:mt-24">
            <ProjectDetail project={project} />
        </main>
    )
}
