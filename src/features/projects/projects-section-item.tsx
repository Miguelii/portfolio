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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Left Column: Content */}
                <div className="flex flex-col justify-center h-full">
                    {/* Category Label */}
                    <span className="text-xs font-semibold tracking-widest text-neutral uppercase mb-4">
                        {project.label}
                    </span>

                    {/* Title */}
                    <h3 className="text-primary font-semibold text-xl md:text-2xl mb-4 text-balance">
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p
                        className="text-pretty text-neutral font-text text-sm/normal md:text-base/normal mb-6"
                        dangerouslySetInnerHTML={{ __html: project.description }}
                    />

                    {/* Tags */}
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

                {/* Right Column: Image Showcase */}
                <div className="relative h-80 rounded-none overflow-hidden shadow-xl w-full">
                    {project.img && (
                        <Image
                            src={project.img}
                            alt={`Project ${project.title} Preview`}
                            fill
                            className="object-cover"
                        />
                    )}
                    {!project.img && (
                        <span className='text-primary font-semibold text-xl md:text-2xl flex justify-center items-center h-full w-full'>NDA</span>
                    )}
                </div>
            </div>
        </Wrapper>
    )
}
