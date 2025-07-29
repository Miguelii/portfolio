import { type ProjectType } from '@/types/Project'
import { Project3dCard } from './project-3d-card'

type ProjectsSectionProps = {
   title: string
   description: string
   projects: ProjectType[]
}

export function ProjectsSection({ title, description, projects }: ProjectsSectionProps) {
   return (
      <section className="flex flex-col gap-12">
         <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold">{title}</h2>
            <span className="text-lg font-medium text-neutral">{description}</span>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
            {projects?.map((project, index) => (
               <Project3dCard
                  project={project}
                  key={`personal-project-${project.title}-${index}`}
               />
            ))}
         </div>
      </section>
   )
}
