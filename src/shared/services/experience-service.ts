import { ExperiencesData } from '@/data/experience-data'
import type { WorkExperience } from '@/types/WorkExperience'

export default class ExperienceService {
    private static experience: WorkExperience[] = ExperiencesData

    /**
     * Retrieves all work experience, sorted by period in descending order (most recent first).
     * @returns {WorkExperience[]} Sorted list of all work experience.
     */
    static getAllWorkExperience(): WorkExperience[] {
        const data = this?.experience ?? []

        return data.sort((a, b) => {
            const getEndYear = (period: string): number => {
                const end = period?.split(' - ')[1]
                return end === 'Present' ? new Date().getFullYear() : parseInt(end)
            }

            return getEndYear(b.period) - getEndYear(a.period)
        })
    }
}
