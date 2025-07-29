import { type ProjectType } from '@/types/Project'
import { CardContainer, CardBody, CardItem } from './3d-card'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from './badge'
import { cn } from '@/utils/cn'

type Project3dCardProps = {
   project: ProjectType
}

export function Project3dCard({ project }: Project3dCardProps) {
   return (
      <CardContainer className="inter-var cursor-pointer">
         <CardBody className="bg-gray-50 w-full h-full relative group/card border-primary/[0.1] rounded-xl p-6 border">
            <Link className="contents" href={`/${project.id}`} prefetch={false}>
               <>
                  <CardItem translateZ="50" className="text-xl font-bold text-primary">
                     {project.title}
                  </CardItem>

                  <CardItem
                     className="flex items-center gap-2 flex-wrap mt-3 justify-between w-full"
                     translateZ="50"
                  >
                     {project.company && (
                        <Badge
                           className={cn(
                              'text-xs font-medium',
                              project.workProject ? 'bg-primary text-white' : ''
                           )}
                        >
                           {project.company}
                        </Badge>
                     )}
                     <span className="text-xs text-neutral ml-auto">{project.year}</span>
                  </CardItem>

                  <CardItem as="p" translateZ="60" className="text-sm max-w-sm mt-3 text-neutral">
                     {project.description}
                  </CardItem>

                  <CardItem translateZ="100" className="w-full mt-4">
                     <Image
                        src={project.imageUrl}
                        alt={`${project.title} project preview`}
                        width={530}
                        height={240}
                        className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                     />
                  </CardItem>

                  <CardItem className="flex flex-wrap gap-2 mt-3" translateZ={20}>
                     <>
                        {project?.techStack?.slice(0, 3).map((tech, index) => (
                           <Badge key={index}>{tech}</Badge>
                        ))}
                        {project?.techStack?.length > 3 && (
                           <Badge>+{project.techStack.length - 3}</Badge>
                        )}
                     </>
                  </CardItem>

                  <div className="flex justify-end items-center mt-12">
                     <CardItem
                        translateZ={20}
                        as="button"
                        className="px-4 py-2 rounded-xl bg-primary text-background text-xs font-bold cursor-pointer"
                     >
                        View Project
                     </CardItem>
                  </div>
               </>
            </Link>
         </CardBody>
      </CardContainer>
   )
}
