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
                    className="flex flex-col p-5 sm:p-6 md:p-8 border gap-3 border-divider h-full hover:shadow-xl"
                >
                    {props.children}
                </Link>
            )
        }

        return (
            <div className="flex flex-col p-5 sm:p-6 md:p-8 border gap-3 border-divider h-full">
                {props.children}
            </div>
        )
    }

    return (
        <Wrapper>
            <div
                className={cn(
                    'grid grid-cols-1 gap-5 md:gap-8 items-center justify-between w-full'
                )}
            >
                {/* Left Column: Title/Text */}
                <div className="flex flex-col justify-center h-full w-full">
                    <span className="text-xs font-semibold tracking-widest text-neutral uppercase mb-3">
                        {project.label}
                    </span>

                    <h3 className="text-primary font-semibold text-lg md:text-xl mb-3 text-balance">
                        {project.title}
                    </h3>

                    <p
                        className="text-pretty text-neutral font-text text-sm/normal md:text-base/normal mb-4"
                        dangerouslySetInnerHTML={{ __html: project.description }}
                    />

                    <div className="flex flex-wrap gap-2 mb-4 mt-auto">
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
                    <div className="flex w-full justify-end px-3">
                        <div className="flex relative h-[160px] md:h-[180px] w-[80%] mx-auto rounded-none overflow-hidden shadow-xl">
                            {project.img && (
                                <Image
                                    src={`${project.img}?v=${buildId}`}
                                    alt={`${project.title} - ${project.label} screenshot`}
                                    fill
                                    className="object-cover bg-transparent"
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Wrapper>
    )
}
