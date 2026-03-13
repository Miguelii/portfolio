'use client'

import { AnimatePresence } from 'motion/react'
import { use, useEffect } from 'react'
import { PreloaderContext } from '@/providers/preloader-provider'
import { PreloaderContent } from './preloader-content'

/**
 * Removes the server-rendered preloader shell (`#preloader-shell`) once
 * the client-side React preloader has mounted and taken over rendering.
 *
 * The shell sits at z-index 98 (below this component's z-index 99), so
 * the handoff is visually seamless — both show the same dark overlay.
 */
function removePreloaderShell() {
    document.getElementById('preloader-shell')?.remove()
}

export function Preloader() {
    const context = use(PreloaderContext)
    const isLoading = context?.isLoading ?? false

    useEffect(() => {
        removePreloaderShell()
    }, [])

    return <AnimatePresence mode="wait">{isLoading && <PreloaderContent />}</AnimatePresence>
}
