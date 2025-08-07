export type ProjectType = {
    id: string
    workProject: boolean
    title: string
    projectUrl: string
    imageUrl: string | null
    description: string
    longDescription: string
    techStack: string[]
    label: string
    year: string
    nextProject?: string
    priority?: number
    disableLink?: boolean
}
