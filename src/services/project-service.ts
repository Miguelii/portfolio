import { ProjectsData } from '@/data/projects-data'
import type { Project } from '@/features/projects/types/Project'
import { ProjectType } from '@/features/projects/types/ProjectTypeEnum'

export default class ProjectService {
    private static experience: Project[] = ProjectsData

    /**
     * Retrieves all work projects, sorted by order param.
     * @returns {Project[]} Sorted list of all projects.
     */
    static getAllWorkProjects(): Project[] {
        const data = this?.experience ?? []
        return data
            .filter((e) => e.type === ProjectType.WORK)
            .sort((a, b) => {
                return a.order - b.order
            })
    }

    /**
     * Retrieves all clients projects, sorted by order param.
     * @returns {Project[]} Sorted list of all projects.
     */
    static getAllClientsProjects(): Project[] {
        const data = this?.experience ?? []
        return data
            .filter((e) => e.type === ProjectType.CLIENT)
            .sort((a, b) => {
                return a.order - b.order
            })
    }

    /**
     * Retrieves all labs projects, sorted by order param.
     * @returns {Project[]} Sorted list of all projects.
     */
    static getAllLabsProjects(): Project[] {
        const data = this?.experience ?? []
        return data
            .filter((e) => e.type === ProjectType.LABS)
            .sort((a, b) => {
                return a.order - b.order
            })
    }

    /**
     * Retrieves all OSS projects, sorted by order param.
     * @returns {Project[]} Sorted list of all projects.
     */
    static getAllOssProjects(): Project[] {
        const data = this?.experience ?? []
        return data
            .filter((e) => e.type === ProjectType.OSS)
            .sort((a, b) => {
                return a.order - b.order
            })
    }
}
