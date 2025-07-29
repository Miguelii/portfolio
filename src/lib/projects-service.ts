import { type ProjectType } from '@/types/Project'
import { ProjectsLib } from './projects-lib'

export default class ProjectsService {
   /**
    * Retrieves all projects, sorted by year in descending order (most recent first).
    * @returns {ProjectType[]} Sorted list of all projects.
    */
   static getAllProjects(): ProjectType[] {
      return [...ProjectsLib].sort((a, b) => Number(b.year) - Number(a.year))
   }

   /**
    * Retrieves only work-related projects, sorted by year in descending order.
    * A work project is defined as one where `workProject` is `true`.
    * @returns {ProjectType[]} Sorted list of work projects.
    */
   static getWorkProjects(): ProjectType[] {
      const onlyWorkProjects = ProjectsLib?.filter((project) => project.workProject === true) ?? []

      return onlyWorkProjects.sort((a, b) => Number(b.year) - Number(a.year))
   }

   /**
    * Retrieves only personal projects, sorted by year in descending order.
    * A personal project is defined as one where `workProject` is `false` or `null/undefined`.
    * @returns {ProjectType[]} Sorted list of personal projects.
    */
   static getPersonalProjects(): ProjectType[] {
      const onlyPersonalProjects =
         ProjectsLib?.filter(
            (project) => project.workProject === false || project.workProject == null
         ) ?? []

      return onlyPersonalProjects.sort((a, b) => Number(b.year) - Number(a.year))
   }

   /**
    * Retrieves a single project by its unique ID.
    * @param {ProjectType['id']} id - The ID of the project to retrieve.
    * @returns {ProjectType | null} The matching project, or `null` if not found.
    */
   static getProjectById(id: ProjectType['id']): ProjectType | null {
      return ProjectsLib.find((project) => project.id === id) ?? null
   }
}
