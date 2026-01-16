export type Result<T, E = Error> = {
    data: T | null
    error: E | null
}

export async function tryCatch<T, E = Error>(
    fn: () => Promise<T>,
    context?: string
): Promise<Result<T, E>> {
    try {
        const data = await fn()
        return { data, error: null }
    } catch (error) {
        console.error(`[tryCatch Error] ${context ? `in ${context}:` : ''}`, {
            message: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined,
            timestamp: new Date().toISOString(),
        })
        return { data: null, error: error as E }
    }
}
