import { ProjectsData } from '@/data/projects-data'
import { type ProjectType } from '@/shared/types/Project'

export default class ProjectsService {
    private static projects: ProjectType[] = ProjectsData.map((project, index, array) => ({
        ...project,
        nextProject: array[(index + 1) % array.length].id,
    }))

    private static sortProjectsHandler(projects: ProjectType[]): ProjectType[] {
        return projects?.sort((a, b) => {
            const priorityA = a.priority ?? Infinity
            const priorityB = b.priority ?? Infinity

            // Sort by priority first
            if (priorityA !== priorityB) {
                return priorityA - priorityB
            }

            // No priority -> sort by year
            return Number(b.year) - Number(a.year)
        })
    }

    /**
     * Retrieves all projects, sorted by year in descending order (most recent first).
     * @returns {ProjectType[]} Sorted list of all projects.
     */
    static getAllProjects(): ProjectType[] {
        const allProjects = [...this.projects]

        return this.sortProjectsHandler(allProjects)
    }

    /**
     * Retrieves only work-related projects, sorted by year in descending order.
     * A work project is defined as one where `workProject` is `true`.
     * @returns {ProjectType[]} Sorted list of work projects.
     */
    static getWorkProjects(): ProjectType[] {
        const onlyWorkProjects =
            this.projects?.filter((project) => project.workProject === true) ?? []

        return this.sortProjectsHandler(onlyWorkProjects)
    }

    /**
     * Retrieves only personal projects, sorted by year in descending order.
     * A personal project is defined as one where `workProject` is `false` or `null/undefined`.
     * @returns {ProjectType[]} Sorted list of personal projects.
     */
    static getPersonalProjects(): ProjectType[] {
        const onlyPersonalProjects =
            this.projects?.filter(
                (project) => project.workProject === false || project.workProject == null
            ) ?? []

        return this.sortProjectsHandler(onlyPersonalProjects)
    }

    /**
     * Retrieves a single project by its unique ID.
     * @param {ProjectType['id']} id - The ID of the project to retrieve.
     * @returns {ProjectType | null} The matching project, or `null` if not found.
     */
    static getProjectById(id: ProjectType['id']): ProjectType | null {
        return this.projects.find((project) => project.id === id) ?? null
    }
}
