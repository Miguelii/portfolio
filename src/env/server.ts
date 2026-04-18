import { createEnv } from '@t3-oss/env-nextjs'
import * as z from 'zod/mini'

export const ServerEnv = createEnv({
    server: {
        NODE_ENV: z.enum(['development', 'production', 'test']),
        NEXT_UPDATE_CONTENT_SECRET_KEY: z.string(),
    },
    runtimeEnv: {
        // NODE_ENV is automatically set by Node.js runtime
        NODE_ENV: process.env.NODE_ENV,
        NEXT_UPDATE_CONTENT_SECRET_KEY: process.env.NEXT_UPDATE_CONTENT_SECRET_KEY,
    },
})
