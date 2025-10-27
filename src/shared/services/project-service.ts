import { ProjectsData } from '@/data/projects-data'
import type { ProjectType } from '../../types/Project'

export default class ProjectService {
    private static experience: ProjectType[] = ProjectsData

    /**
     * Retrieves all work projects, sorted by order param.
     * @returns {ProjectType[]} Sorted list of all projects.
     */
    static getAllWorkProjects(): ProjectType[] {
        const data = this?.experience ?? []
        return data.filter((e) => e.work).sort((a, b) => {
            return a.order - b.order
        })
    }


    /**
     * Retrieves all side projects, sorted by order param.
     * @returns {ProjectType[]} Sorted list of all projects.
     */
    static getAllSideProjects(): ProjectType[] {
        const data = this?.experience ?? []
        return data.filter((e) => !e.work).sort((a, b) => {
            return a.order - b.order
        })
    }
}
