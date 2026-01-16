import { cn } from '@/utils/cn'
import { getBuildId } from '@/utils/get-build-id'
import type { Project } from '@/types/Project'
import Image from 'next/image'
import ProjectsSectionItemWrapper from '../projects-section-item-wrapper'
import { memo } from 'react'

const buildId = getBuildId()

export const ProjectsSectionItem = memo(function ProjectsSectionItem(project: Project) {
    return (
        <ProjectsSectionItemWrapper project={project}>
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

                    <h3 className="text-primary font-semibold text-h3 mb-3 text-balance">
                        {project.title}
                    </h3>

                    <p
                        className="text-pretty text-neutral text-p-small mb-4"
                        dangerouslySetInnerHTML={{ __html: project.description }}
                    />

                    <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                        {project.techStack?.map((item, index) => {
                            return (
                                <span
                                    key={`project-${project.id}-techStack-${index}`}
                                    className="block text-neutral font-normal font-mono text-p-small"
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
        </ProjectsSectionItemWrapper>
    )
})
