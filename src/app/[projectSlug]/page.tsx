import { Badge } from '@/components/badge'
import ProjectsService from '@/lib/projects-service'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { SectionDivider } from '@/components/section-divider'
import Button from '@/components/button'
import { ProjectType } from '@/types/Project'
import { cn } from '@/utils/cn'

export const dynamic = 'force-static'
export const revalidate = 3600 // 1h

type ProjectSlugPageProps = Readonly<{
   params: Promise<{
      projectSlug: ProjectType['id']
   }>
}>

export default async function ProjectSlugPage(props: ProjectSlugPageProps) {
   const params = await props.params

   const projectSlug = params?.projectSlug ?? null

   const project = ProjectsService.getProjectById(projectSlug)

   if (!project) return notFound()

   return (
      <main className="main-container h-fit relative mt-36">
         <section>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
               {/* Left side with project title and text*/}
               <div className="h-full flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                     <Badge
                        className={cn(
                           'w-fit bg-primary text-white',
                        )}
                     >
                        {project.label}
                     </Badge>
                     <h1 className="text-primary text-3xl/snug xl:text-5xl/snug font-bold">
                        {project.title}
                     </h1>
                  </div>

                  <div
                     className="text-base text-neutral leading-relaxed project-html"
                     dangerouslySetInnerHTML={{ __html: project.longDescription }}
                  />

                  <div className="mt-auto w-full justify-end py-12">
                     <Button href={project.projectUrl} target="_blank">
                        Open Project
                     </Button>
                  </div>
               </div>

               {/* Right side with project image*/}
               <div className="relative">
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                     <Image
                        src={project.imageUrl}
                        alt={`${project.title} project preview`}
                        width={530}
                        height={240}
                        className="w-full h-full object-cover"
                     />
                  </div>
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
