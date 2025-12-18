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
        return data.filter((e) => e.type === 'work').sort((a, b) => {
            return a.order - b.order
        })
    }


    /**
     * Retrieves all clients projects, sorted by order param.
     * @returns {ProjectType[]} Sorted list of all projects.
     */
    static getAllClientsProjects(): ProjectType[] {
        const data = this?.experience ?? []
        return data.filter((e) => e.type === 'client').sort((a, b) => {
            return a.order - b.order
        })
    }


    /**
     * Retrieves all labs projects, sorted by order param.
     * @returns {ProjectType[]} Sorted list of all projects.
     */
    static getAllLabsProjects(): ProjectType[] {
        const data = this?.experience ?? []
        return data.filter((e) => e.type === 'labs').sort((a, b) => {
            return a.order - b.order
        })
    }
}
