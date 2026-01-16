import type { ProjectType } from "./ProjectTypeEnum"

export type Project = {
    id: string
    title: string
    label: string
    description: string
    techStack: string[]
    order: number
    type: ProjectType
    img?: string
    link?: string
}
