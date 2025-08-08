import { type ProjectType } from '@/types/Project'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/utils/cn'
import { Badge } from '@/components/ui/badge'
import { getBuildId } from '@/utils/get-build-id'
import { PropsWithChildren } from 'react'

type Project3dCardProps = {
    project: ProjectType
}

export function ProjectItemSection({ project }: Project3dCardProps) {
    const buildId = getBuildId()

    return (
        <article className="bg-gray-50 w-full h-full relative group/card border-primary/[0.1] rounded-3xl p-6 border">
            <LinkWrapper project={project}>
                <span className="text-xl font-bold text-primary">{project.title}</span>

                <div className="flex items-center gap-2 flex-wrap mt-3 justify-between w-full">
                    {project.label && (
                        <Badge className={cn('text-xs font-medium bg-primary text-background')}>
                            {project.label}
                        </Badge>
                    )}
                    <span className="text-xs text-neutral ml-auto">{project.year}</span>
                </div>

                <span
                    className={cn(
                        'text-sm max-w-sm mt-3 text-neutral flex tracking-wide leading-snug flex-col',
                        project.projectUrl ? 'line-clamp-2 md:line-clamp-3' : ''
                    )}
                    dangerouslySetInnerHTML={{ __html: project.description }}
                />

                <div className="w-full mt-4 mb-10">
                    {project.imageUrl && (
                        <Image
                            src={`${project.imageUrl}?v=${buildId}`}
                            alt={`${project.title} project preview`}
                            width={530}
                            height={240}
                            className="h-60 w-full object-cover rounded-xl"
                        />
                    )}
                    {project.nda && (
                        <div className="h-[180px] md:h-[200px] lg:h-[220px] w-full object-cover rounded-xl bg-neutral-100 flex justify-center items-center">
                            <span className="font-bold text-xl">NDA</span>
                        </div>
                    )}
                </div>

                {/* 
            <div className='flex flex-wrap gap-2 mt-3 mb-12'>
               <>
                  {project?.techStack?.slice(0, 3).map((tech, index) => (
                     <Badge key={index}>{tech}</Badge>
                  ))}
                  {project?.techStack?.length > 3 && (
                     <Badge>+{project.techStack.length - 3}</Badge>
                  )}
               </>
            </div>
            */}
                <div className="flex justify-end items-center mt-auto">
                    <span className="px-4 py-2 rounded-xl bg-primary text-background text-xs font-bold cursor-pointer">
                        View more details
                    </span>
                </div>
            </LinkWrapper>
        </article>
    )
}

type LinkWrapperProps = PropsWithChildren<{
    project: ProjectType
}>

function LinkWrapper({ children, project }: LinkWrapperProps) {
    return (
        <Link
            className={'flex flex-col h-full w-full'}
            href={`/${project.id}`}
            prefetch={true}
            scroll={false}
        >
            {children}
        </Link>
    )
}
