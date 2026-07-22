import 'server-only'

export const getIsDev = (): boolean => {
    return process.env.NODE_ENV === 'development'
}
