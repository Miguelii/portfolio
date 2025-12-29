export type ProjectType = {
    id: string
    title: string
    label: string
    description: string
    techStack: string[]
    order: number
    type: 'work' | 'client' | 'labs'
    img?: string
    link?: string
}
