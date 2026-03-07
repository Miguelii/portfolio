type LogLevel = 'log' | 'warn' | 'error' | 'info'

type Props = {
    level: LogLevel
    error?: unknown
    context?: string
    prefix?: string
}

export function Logger({ prefix = 'Logger', level, error, context }: Props): void {
    const logPrefix = '[' + prefix + ']'
    const contextInfo = context ? ' in ' + context + ':' : ''
    const finalMessage = logPrefix + contextInfo

    console[level](finalMessage, {
        message: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString(),
    })
}
