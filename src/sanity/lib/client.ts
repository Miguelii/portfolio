import { ClientEnv } from '@/env/client'
import { createClient } from 'next-sanity'
import {
    SANITY_API_VERSION,
    SANITY_QUERY_REVALIDATE_KEY,
    SANITY_QUERY_REVALIDATE_TIME_H,
} from '@/sanity/lib/constants'
import type { NextFetchOptions } from '@/types/NextFetchOptions'

const options: NextFetchOptions = {
    next: { revalidate: SANITY_QUERY_REVALIDATE_TIME_H, tags: [SANITY_QUERY_REVALIDATE_KEY] },
}

const client = createClient({
    projectId: ClientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: ClientEnv.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: SANITY_API_VERSION,
    useCdn: false,
})

/**
 * Fetches data from Sanity using a GROQ query.
 *
 * @template T - The expected return type of the query
 * @param query - A GROQ query string
 * @returns The query result typed as `T`
 */
export async function sanityClientFetch<T>(query: string): Promise<T> {
    return client.fetch<T>(query, {}, options)
}
