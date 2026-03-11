/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { ClientEnv } from '@/env/client'
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
    api: {
        projectId: ClientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: ClientEnv.NEXT_PUBLIC_SANITY_DATASET,
    },
    typegen: {
        path: './src/**/*.{ts,tsx}',
        schema: './src/sanity/generated/schema.json',
        generates: './src/sanity/generated/sanity.types.ts',
    },
})
