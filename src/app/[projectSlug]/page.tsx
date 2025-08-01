import { Badge } from '@/components/ui/badge'
import ProjectsService from '@/lib/projects-service'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { SectionDivider } from '@/components/ui/section-divider'
import Button from '@/components/ui/button'
import { ProjectType } from '@/types/Project'
import { cn } from '@/utils/cn'
import { getBuildId } from '@/utils/get-build-id'

export const dynamic = 'force-static'
export const revalidate = 3600 // 1h

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
         <section>
            <div className="grid lg:grid-cols-2 gap-12 items-center grid-col-">
               {/* Left side with project title and text*/}
               <div className="h-full flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                     <Badge className={cn('w-fit bg-primary text-white')}>{project.label}</Badge>
                     <h1 className="text-primary text-3xl/snug xl:text-5xl/snug font-bold">
                        {project.title}
                     </h1>
                  </div>

                  <div
                     className="text-base text-neutral leading-relaxed project-html"
                     dangerouslySetInnerHTML={{ __html: project.longDescription }}
                  />

                  <div className="relative flex md:hidden">
                     <ProjectImage project={project} />
                  </div>

                  <div className="mt-auto w-full justify-between py-12 flex flex-row">
                     <Button href={project.projectUrl} target="_blank">
                        Open Project
                     </Button>
                     {project.nextProject && (
                        <Button href={`/${project.nextProject}`} prefetch variant="secondary">
                           Explore More Projects
                        </Button>
                     )}
                  </div>
               </div>

               {/* Right side with project image*/}
               <div className="relative hidden md:flex">
                  <ProjectImage project={project} />
               </div>
            </div>
         </section>

         <SectionDivider />

         <section className="flex flex-col gap-8">
            <h2 className="text-3xl font-bold">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
               {project?.techStack?.map((tech, index) => (
                  <Badge key={index} className="px-4 py-2 text-[14px] leading-snug">
                     {tech}
                  </Badge>
               ))}
            </div>
         </section>
      </main>
   )
}

function ProjectImage({ project }: { project: ProjectType }) {
   const buildId = getBuildId()

   return (
      <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
         <Image
            src={`${project.imageUrl}?v=${buildId}`}
            alt={`${project.title} project preview`}
            width={530}
            height={240}
            className="w-full h-full object-cover"
         />
      </div>
   )
}
