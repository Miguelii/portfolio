import { LinkPreview } from '@/components/ui/link-preview'
import type { WorkExperience } from '@/types/WorkExperience'
import { cn } from '@/utils/cn'
import { getBuildId } from '@/utils/get-build-id'
import Image from 'next/image'

export function WorkExperienceItem(experience: WorkExperience) {
    const buildId = getBuildId()

    return (
        <div className="flex flex-col gap-5">
            <LinkPreview
                url={experience.url ?? experience.previewUrl}
                imageSrc={experience.previewUrl}
                className={cn('flex flex-row gap-3 sm:gap-6 items-start justify-start w-fit')}
            >
                <Image
                    src={`${experience.logoUrl}?v=${buildId}`}
                    alt={`${experience.company} logo`}
                    width={52}
                    height={52}
                    className="w-13 h-13 object-contain"
                />
                <div className="flex flex-col gap-1">
                    <span className="font-bold text-p-regular">{experience.company}</span>
                    <span className="text-neutral text-p-small font-medium">
                        {experience.totalTime}
                    </span>
                </div>
            </LinkPreview>

            <div className="flex flex-col">
                {experience?.positions?.map((pos, index) => {
                    const positionsLength = experience?.positions?.length || 0

                    const isFirst = index === 0
                    const isLast = index === positionsLength - 1

                    return (
                        <div key={index} className="flex gap-3 sm:gap-6 relative">
                            <div className="flex flex-col items-center w-13 shrink-0 relative">
                                {positionsLength > 1 && (
                                    <>
                                        {!isLast && (
                                            <div
                                                className={cn(
                                                    'absolute w-[2px] bg-neutral/40 left-1/2 -translate-x-1/2 bottom-0 z-10',
                                                    isFirst ? 'top-3' : 'top-0'
                                                )}
                                            />
                                        )}

                                        {isLast && (
                                            <div className="absolute w-[2px] bg-neutral/40 left-1/2 -translate-x-1/2 top-0 h-3 z-10" />
                                        )}

                                        <div className="w-3 h-3 rounded-full bg-neutral mt-2 z-[11] relative shrink-0" />
                                    </>
                                )}
                            </div>

                            <div className={cn('flex flex-col gap-2', !isLast && 'pb-8')}>
                                <div className="flex flex-col gap-1">
                                    <span className="text-primary font-semibold text-p-large">
                                        {pos.jobTitle}
                                    </span>
                                    <span className="text-neutral text-p-small font-medium">
                                        {pos.timeLabel}
                                    </span>
                                </div>

                                <ul className="space-y-2">
                                    {pos?.achievements?.map((achievement, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-2 text-neutral text-p-regular"
                                        >
                                            <span className="w-1 h-1 bg-neutral rounded-full flex-shrink-0"></span>
                                            <span
                                                dangerouslySetInnerHTML={{ __html: achievement }}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
