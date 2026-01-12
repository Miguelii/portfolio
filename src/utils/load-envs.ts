import { fileURLToPath } from 'node:url'
import path from 'node:path'
import createJiti from 'jiti'

const jiti = createJiti(__filename)

export function loadEnv() {
    const baseDir = path.dirname(fileURLToPath(import.meta.url))
    jiti(path.resolve(baseDir, '../env/client.ts'))
    jiti(path.resolve(baseDir, '../env/server.ts'))
}
