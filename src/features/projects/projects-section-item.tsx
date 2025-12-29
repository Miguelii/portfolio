import { cn } from '@/shared/utils/cn'
import { getBuildId } from '@/shared/utils/get-build-id'
import { ProjectType } from '@/types/Project'
import Image from 'next/image'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

export function ProjectsSectionItem(project: ProjectType) {
    const buildId = getBuildId()

    const Wrapper = (props: PropsWithChildren) => {
        if (project.link) {
            return (
                <Link
                    href={project.link}
                    prefetch={false}
                    target="_blank"
                    className="flex flex-col p-6 sm:p-10 border gap-4 border-divider h-full hover:shadow-xl"
                >
                    {props.children}
                </Link>
            )
        }

        return (
            <div className="flex flex-col p-6 sm:p-10 border gap-4 border-divider h-full">
                {props.children}
            </div>
        )
    }

    return (
        <Wrapper>
            <div
                className={cn(
                    'grid grid-cols-1 gap-8 md:gap-12 items-center justify-between w-full'
                    //project.img ? 'md:grid-cols-2' : 'md:grid-cols-1'
                )}
            >
                {/* Left Column: Title/Text */}
                <div className="flex flex-col justify-center h-full w-full">
                    <span className="text-xs font-semibold tracking-widest text-neutral uppercase mb-4">
                        {project.label}
                    </span>

                    <h3 className="text-primary font-semibold text-xl md:text-2xl mb-4 text-balance">
                        {project.title}
                    </h3>

                    <p
                        className="text-pretty text-neutral font-text text-sm/normal md:text-base/normal mb-6"
                        dangerouslySetInnerHTML={{ __html: project.description }}
                    />

                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                        {project.techStack?.map((item, index) => {
                            return (
                                <span
                                    key={`project-${project.id}-techStack-${index}`}
                                    className="block text-neutral font-normal font-mono md:text-sm text-xs"
                                >
                                    {item}
                                </span>
                            )
                        })}
                    </div>
                </div>

                {/* Right Column: Image */}
                {project.img && (
                    <div className="flex w-full justify-end px-5">
                        <div className="flex relative h-[200px] w-full rounded-none overflow-hidden shadow-xl">
                            {project.img && (
                                <Image
                                    src={`${project.img}?v=${buildId}`}
                                    alt={`${project.title} - ${project.label} screenshot`}
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Wrapper>
    )
}
