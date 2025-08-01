import { type ProjectType } from '@/types/Project'
import { Project3dCard } from './project-3d-card'
import { Carousel } from '@/components/ui/apple-cards-carousel'

type ProjectsSectionProps = {
   title: string
   description: string
   projects: ProjectType[]
}

export function ProjectsSection({ title, description, projects }: ProjectsSectionProps) {
   const ProjectCard = projects?.map((project, index) => {
      return (
         <div
            key={`project-${title}-${index}`}
            className="relative z-10 flex h-[520px] w-3xs flex-col items-start justify-start overflow-hidden md:h-[520px] md:w-96"
         >
            <Project3dCard project={project} key={`personal-project-${index}`} />
         </div>
      )
   })

   return (
      <section className="flex flex-col gap-12">
         <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold">{title}</h2>
            <span className="text-lg font-medium text-neutral">{description}</span>
         </div>
         <Carousel items={ProjectCard} />
      </section>
   )
}
