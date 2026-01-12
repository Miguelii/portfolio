export type WorkExperience = {
    company: string
    logoUrl: string
    url?: string
    previewUrl: string
    totalTime: string
    positions: Array<{
        jobTitle: string
        timeLabel?: string
        achievements?: string[]
    }>
}
