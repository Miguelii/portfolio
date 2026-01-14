'use client'

import { AnimatePresence } from 'motion/react'
import { use } from 'react'
import Preloader from '.'
import { PreloaderContext } from '@/providers/preloader-provider'

export function PreloaderContent() {
    const context = use(PreloaderContext)
    const isLoading = context?.isLoading ?? false

    return <AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>
}
