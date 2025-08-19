import Button from '@/shared/components/ui/button'
import { type ProjectType } from '@/shared/types/Project'
import { getBuildId } from '@/shared/utils/get-build-id'
import Image from 'next/image'

type ProjectsShowcaseItemProps = {
    project: ProjectType
}

export default function ProjectsShowcaseItem({ project }: ProjectsShowcaseItemProps) {
    const buildId = getBuildId()

    const showProjectShowcase = (project?.showcaseFeatures?.length ?? 0) > 0

    return (
        <article className="p-6 md:p-10 flex flex-col-reverse md:flex-row gap-6 lg:gap-12 border border-neutral-200 not-last:border-b-0">
            <div className="flex flex-col gap-6 flex-1">
                <div className="flex flex-col gap-2">
                    <h2 className="text-pretty text-primary text-2xl/tight font-bold">
                        {project.title}
                    </h2>
                    <div
                        className="text-pretty text-neutral font-text text-base/relaxed"
                        dangerouslySetInnerHTML={{ __html: project.description }}
                    />
                </div>

                {showProjectShowcase && (
                    <div className="flex flex-col md:flex-row gap-5 md:gap-10">
                        {project.showcaseFeatures?.map((item, index) => (
                            <div
                                className="w-full xl:max-w-[180px] 2xl flex flex-col gap-1"
                                key={`project-showcase-feature-${project.title}-${index}`}
                            >
                                <span className="block text-primary font-semibold font-mono md:text-lg text-base">
                                    {item.value}
                                </span>
                                <p className="text-pretty text-neutral font-mono text-xs/normal md:text-sm/normal">
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                <Button
                    label="View Details"
                    href={`/${project.id}`}
                    prefetch={true}
                    scroll={false}
                    variant="primary"
                />
            </div>

            <div className="h-full shink-0 w-full md:min-w-[40%] md:max-w-[40%] lg:max-w-[398px] lg:min-w-[398px] flex bg-linear-to-t border border-neutral-200 from-black/10 to-white">
                {project.imageUrl && (
                    <Image
                        src={`${project.imageUrl}?v=${buildId}`}
                        alt={`${project.title} project preview`}
                        width={400}
                        height={240}
                        className="h-60 w-full object-cover"
                    />
                )}
                {project.nda && (
                    <div className="h-[180px] md:h-[200px] lg:h-[220px] w-full object-cover bg-neutral-100 flex justify-center items-center">
                        <span className="font-bold text-xl">NDA</span>
                    </div>
                )}
            </div>
        </article>
    )
}
