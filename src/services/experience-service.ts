import { ExperiencesData } from '@/data/experience-data'
import type { WorkExperience } from '@/features/experience/types/WorkExperience'

export default class ExperienceService {
    private static readonly experience: WorkExperience[] = ExperiencesData ?? []

    /**
     * Retrieves all work experience, sorted by period in descending order (most recent first).
     * @returns {WorkExperience[]} Sorted list of all work experience.
     */
    static getAllWorkExperience(): WorkExperience[] {
        return this?.experience
    }
}
