export type NextFetchOptions = {
    next?: {
        revalidate?: number | false
        tags?: string[]
    }
}
