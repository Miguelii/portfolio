'use client'

import { useCallback, useEffect, useRef } from 'react'

/**
 *
 * @author usehooks-ts
 * @see {@link https://usehooks-ts.com/react-hook/use-is-mounted}
 *
 */
export function useIsMounted(): () => boolean {
    const isMounted = useRef(false)

    useEffect(() => {
        isMounted.current = true

        return () => {
            isMounted.current = false
        }
    }, [])

    return useCallback(() => isMounted.current, [])
}
