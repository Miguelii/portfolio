import { LinkPreview } from '@/components/ui/link-preview'
import { ClientEnv } from '@/env/client'
import { cn, getBuildId } from '@/lib/utils'
import type { WorkExperienceSectionDTO } from '@/sanity/api/get-work-experience-section'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { memo } from 'react'

const buildId = getBuildId()

export const WorkExperienceItem = memo(function WorkExperienceItem(
    experience: NonNullable<WorkExperienceSectionDTO>['items'][number]
) {
    const previewUrl =
        experience.previewUrl?.replaceAll('##BASE_URL##', ClientEnv.NEXT_PUBLIC_WEBSITE_URL) ?? ''

    return (
        <div className="flex flex-col gap-5">
            <LinkPreview
                url={previewUrl}
                imageSrc={previewUrl}
                className={cn('flex flex-row gap-3 sm:gap-3 items-start justify-start w-fit')}
            >
                <Image
                    src={`${experience.logoUrl}?v=${buildId}`}
                    alt={`${experience.company} logo`}
                    width={52}
                    height={52}
                    className="w-13 h-13 object-contain"
                    sizes="52px"
                />
                <div className="flex flex-col gap-1">
                    <span className="font-bold text-p-regular">{experience.company}</span>
                    <span className="text-neutral text-p-smallest font-medium">
                        {experience.totalTime}
                    </span>
                </div>
            </LinkPreview>

            <div className="flex flex-col">
                {experience?.positions?.map((pos, index) => {
                    const positionsLength = experience?.positions?.length || 0

                    const isFirst = index === 0
                    const isLast = index === positionsLength - 1

                    const hasAchievements = (pos?.achievements?.length ?? 0) > 0

                    return (
                        <div
                            key={`work-exp-pos-${index}-${pos.jobTitle}`}
                            className="flex gap-3 sm:gap-6 relative"
                        >
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
                                    <span className="text-primary font-semibold text-p-regular">
                                        {pos.jobTitle}
                                    </span>
                                    {pos.timeLabel && (
                                        <span className="text-neutral text-p-smallest font-medium">
                                            {pos.timeLabel}
                                        </span>
                                    )}
                                </div>

                                {hasAchievements && (
                                    <ul className="space-y-2">
                                        {pos?.achievements?.map((item) => (
                                            <li
                                                key={`work-item-achievement-${item.id}`}
                                                className="flex items-center gap-2 text-neutral text-p-smallest"
                                            >
                                                <span className="w-1 h-1 bg-neutral rounded-full flex-shrink-0"></span>
                                                <PortableText key={item.id} value={item.text} />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
})
