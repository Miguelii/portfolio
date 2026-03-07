import { ProjectsData } from '@/data/projects-data'
import type { Project } from '@/features/projects/types/Project'
import { ProjectType } from '@/features/projects/types/ProjectTypeEnum'

export default class ProjectService {
    private static readonly experience: Project[] = ProjectsData ?? []

    private static getByType(type: ProjectType): Project[] {
        return this.experience.filter((e) => e.type === type).sort((a, b) => a.order - b.order)
    }

    /**
     * Retrieves all work projects, sorted by order param.
     * @returns {Project[]} Sorted list of all projects.
     */
    static getAllWorkProjects(): Project[] {
        return this.getByType(ProjectType.WORK)
    }

    /**
     * Retrieves all clients projects, sorted by order param.
     * @returns {Project[]} Sorted list of all projects.
     */
    static getAllClientsProjects(): Project[] {
        return this.getByType(ProjectType.CLIENT)
    }

    /**
     * Retrieves all labs projects, sorted by order param.
     * @returns {Project[]} Sorted list of all projects.
     */
    static getAllLabsProjects(): Project[] {
        return this.getByType(ProjectType.LABS)
    }

    /**
     * Retrieves all Open-Source projects, sorted by order param.
     * @returns {Project[]} Sorted list of all projects.
     */
    static getAllOssProjects(): Project[] {
        return this.getByType(ProjectType.OSS)
    }
}
