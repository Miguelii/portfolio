import { ProjectsData } from '@/data/projects-data'
import type { ProjectType } from '../types/Project'

export default class ProjectService {
    private static experience: ProjectType[] = ProjectsData

    /**
     * Retrieves all projects, sorted by order param.
     * @returns {ProjectType[]} Sorted list of all projects.
     */
    static getAllProjects(): ProjectType[] {
        const data = this?.experience ?? []
        return data.sort((a, b) => {
            return a.order - b.order
        })
    }
}
