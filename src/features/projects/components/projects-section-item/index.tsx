'use client'

import { cn } from '@/utils/cn'
import { getBuildId } from '@/utils/get-build-id'
import type { Project } from '@/types/Project'
import Image from 'next/image'
import ProjectsSectionItemWrapper from '../projects-section-item-wrapper'
import { memo } from 'react'

const buildId = getBuildId()

export const ProjectsSectionItem = memo(function ProjectsSectionItem(project: Project) {
    return (
        <ProjectsSectionItemWrapper
            project={project}
            className={cn(
                'project group',
                'transition-transform duration-400 hover:opacity-80 last:border-b',
                'w-full justify-between items-center border-t border-divider cursor-pointer',
                'flex flex-col gap-6 md:flex-row px-5 md:px-6 lg:px-10 xl:px-12 py-6 md:py-12'
            )}
        >
            <div className="flex flex-col gap-2">
                <h3 className="text-primary font-semibold text-h3 mb-3 text-balance transition-transform duration-400 group-hover:-translate-x-2.5">
                    {project.title}
                </h3>

                <p
                    className="text-pretty text-neutral text-p-small mb-4 transition-transform duration-400 group-hover:-translate-x-2.5"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                />

                <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                    {project.techStack?.map((item, index) => {
                        return (
                            <span
                                key={`project-${project.id}-techStack-${index}`}
                                className="block text-neutral font-normal font-mono text-sm transition-transform duration-400 group-hover:-translate-x-2.5"
                            >
                                {item}
                            </span>
                        )
                    })}
                </div>
            </div>
            {project.img && (
                <div className="flex w-full justify-end px-3">
                    <div className="flex rounded-none overflow-hidden shadow-xl w-full md:w-fit h-fit">
                        {project.img && (
                            <Image
                                src={`${project.img}?v=${buildId}`}
                                alt={`${project.title} screenshot`}
                                width={800}
                                height={150}
                                className="object-cover bg-transparent h-[150px] md:h-[150px] w-full md:w-[250px] lg:h-[180px] lg:w-[350px] shrink-0 flex"
                                sizes={`(max-width: 768px) 100vw, (max-width: 1024px) 250px, 350px`}
                            />
                        )}
                    </div>
                </div>
            )}
        </ProjectsSectionItemWrapper>
    )
})
