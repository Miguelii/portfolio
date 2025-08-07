export type WorkExperience = {
    period: `${number} - ${number}` | `${number} - Present`
    jobTitle: string
    company: string
    logoUrl: string
    badgeColor: string
    url?: string
    previewUrl: string
    achievements: string[]
}
