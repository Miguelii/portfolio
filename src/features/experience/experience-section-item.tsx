import { LinkPreview } from '@/shared/components/ui/link-preview'
import type { WorkExperience } from '@/types/WorkExperience'
import { cn } from '@/shared/utils/cn'
import { getBuildId } from '@/shared/utils/get-build-id'
import Image from 'next/image'

export function WorkExperienceItem(experience: WorkExperience) {
    const buildId = getBuildId()

    return (
        <div className="flex gap-3 md:gap-8 flex-col lg:flex-row">
            <div className="w-full sm:w-40 flex-shrink-0 mt-1 flex flex-row sm:flex-col sm:gap-2 items-center sm:justify-start sm:items-start gap-10 justify-between">
                <span className="text-neutral text-base md:text-lg font-medium">
                    {experience.period}
                </span>
                {experience.periodTime && (
                    <span className="text-xs text-neutral md:text-base font-medium">
                        {experience.periodTime}
                    </span>
                )}
            </div>

            <div className="flex-1">
                <div className="flex items-start md:items-center gap-2 mb-3 flex-col md:flex-row">
                    <span className="text-primary font-medium text-base md:text-lg">
                        {experience.jobTitle}
                    </span>
                    <LinkPreview
                        url={experience.url ?? experience.previewUrl}
                        imageSrc={experience.previewUrl}
                        className={cn(
                            'flex items-center gap-3 px-2.5 py-0.5 rounded-lg text-base font-medium',
                            experience.badgeColor
                        )}
                    >
                        <Image
                            src={`${experience.logoUrl}?v=${buildId}`}
                            alt={`${experience.company} logo`}
                            width={16}
                            height={16}
                            className="w-4 h-4 object-contain"
                        />
                        <span>{experience.company}</span>
                    </LinkPreview>
                </div>

                <ul className="space-y-2">
                    {experience.achievements.map((achievement, index) => (
                        <li
                            key={index}
                            className="flex items-center gap-2 text-neutral text-base md:text-lg"
                        >
                            <span className="w-1 h-1 bg-neutral rounded-full flex-shrink-0"></span>
                            <span
                                className="text-sm/normal md:text-base/normal"
                                dangerouslySetInnerHTML={{ __html: achievement }}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
