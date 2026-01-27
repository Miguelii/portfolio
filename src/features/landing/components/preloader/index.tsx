'use client'

import { AnimatePresence } from 'motion/react'
import { use } from 'react'
import { PreloaderContext } from '@/providers/preloader-provider'
import PreloaderContent from './preloader-content'

export function Preloader() {
    const context = use(PreloaderContext)
    const isLoading = context?.isLoading ?? false

    return <AnimatePresence mode="wait">{isLoading && <PreloaderContent />}</AnimatePresence>
}
