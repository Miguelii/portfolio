import { ProjectType } from '@/types/Project'
import Image from 'next/image'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

export function ProjectsSectionItem(project: ProjectType) {
    const Wrapper = (props: PropsWithChildren) => {
        if (project.link) {
            return (
                <Link
                    href={project.link}
                    prefetch={false}
                    target="_blank"
                    className="flex flex-col p-4 border gap-4 border-divider h-full hover:shadow-xl"
                >
                    {props.children}
                </Link>
            )
        }

        return (
            <div className="flex flex-col p-4 border gap-4 border-divider h-full">
                {props.children}
            </div>
        )
    }

    return (
        <Wrapper>
            {project.img && (
                <div className="w-full h-40 bg-divider">
                    <Image
                        className="w-full h-full object-scale-down"
                        height={160}
                        width={312}
                        src={project.img}
                        alt={`Project ${project.title} Preview`}
                    />
                </div>
            )}
            {!project.img && (
                <div className="w-full h-40 bg-divider flex items-center justify-center font-semibold">
                    NDA
                </div>
            )}

            <div className="flex flex-col gap-2">
                <span className="block text-primary font-semibold md:text-lg text-base">
                    {project.title}
                </span>
                <p
                    className="text-pretty text-neutral font-text text-xs/normal md:text-sm/normal"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                />
            </div>

            <div className="flex gap-2 mt-auto flex-wrap">
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
        </Wrapper>
    )
}
