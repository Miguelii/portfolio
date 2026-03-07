'use client'

import { useCallback, useSyncExternalStore } from 'react'

// Server snapshot always returns false — no matchMedia on the server.
// This avoids hydration mismatches: server and first client render agree on false,
// then useSyncExternalStore syncs to the real value synchronously before paint.
function getServerSnapshot() {
    return false
}

export function useMediaQuery(query: string): boolean {
    const subscribe = useCallback(
        (callback: () => void) => {
            const media = globalThis.matchMedia?.(query)
            if (!media) return () => {}
            media.addEventListener('change', callback)
            return () => media.removeEventListener('change', callback)
        },
        [query]
    )

    const getSnapshot = useCallback(() => globalThis.matchMedia?.(query)?.matches ?? false, [query])

    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
