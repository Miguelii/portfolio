import { type ProjectType } from '@/shared/types/Project'
import { getBuildId } from '@/shared/utils/get-build-id'
import Image from 'next/image'

type ProjectDetailImageProps = {
    project: ProjectType
}

export default function ProjectDetailImage({ project }: ProjectDetailImageProps) {
    const buildId = getBuildId()

    return (
        <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl w-full max-h-[350px]">
            <Image
                src={`${project.imageUrl}?v=${buildId}`}
                alt={`${project.title} project preview`}
                width={530}
                height={350}
                className="w-full h-full object-cover"
            />
        </div>
    )
}
