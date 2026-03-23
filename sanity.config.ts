'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { ClientEnv } from '@/env/client'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { schema } from '@/sanity/schemaTypes'
import { SANITY_API_VERSION, structure } from '@/sanity/lib/constants'

export default defineConfig({
    basePath: '/studio',
    projectId: ClientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: ClientEnv.NEXT_PUBLIC_SANITY_DATASET!,
    // Add and edit the content schema in the './sanity/schemaTypes' folder
    schema,
    plugins: [
        structureTool({ structure }),
        // Vision is for querying with GROQ from inside the Studio
        // https://www.sanity.io/docs/the-vision-plugin
        visionTool({ defaultApiVersion: SANITY_API_VERSION }),
    ],
})
