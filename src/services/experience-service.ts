import { ExperiencesData } from '@/data/experience-data'
import type { WorkExperience } from '@/features/experience/types/WorkExperience'

export default class ExperienceService {
    private static experience: WorkExperience[] = ExperiencesData

    /**
     * Retrieves all work experience, sorted by period in descending order (most recent first).
     * @returns {WorkExperience[]} Sorted list of all work experience.
     */
    static getAllWorkExperience(): WorkExperience[] {
        const data = this?.experience ?? []
        return data
    }
}
