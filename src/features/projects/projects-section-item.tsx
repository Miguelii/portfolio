import { ProjectType } from '@/types/Project'

export function ProjectsSectionItem(project: ProjectType) {
    return (
        <div className="flex flex-col p-4 border gap-4 border-divider h-full">
            <div className="w-full h-40 bg-divider flex items-center justify-center">NDA</div>

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
        </div>
    )
}
