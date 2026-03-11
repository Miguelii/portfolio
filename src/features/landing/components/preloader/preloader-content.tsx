'use client'

import { useEffect } from 'react'
import { usePreloaderAnimations } from '@/features/landing/hooks/use-preloader-animations'
import { motion } from 'motion/react'

const words = ['Hello', 'Bonjour', 'Ciao', 'やあ', 'Hallå', 'Guten tag', 'Hallo', 'Olá'] as const

export function PreloaderContent() {
    const { slideUp, opacity, setDimension, setIndex, index, dimension, curve } =
        usePreloaderAnimations()

    useEffect(() => {
        const handler = () => setDimension({ width: window.innerWidth, height: window.innerHeight })

        handler()

        window.addEventListener('resize', handler)
        return () => window.removeEventListener('resize', handler)
    }, [setDimension])

    useEffect(() => {
        if (index >= words.length - 1) return
        const timeout = setTimeout(() => setIndex(index + 1), index === 0 ? 1000 : 150)
        return () => clearTimeout(timeout)
    }, [index, setIndex])

    return (
        <motion.div
            aria-hidden="true"
            variants={slideUp}
            initial="initial"
            exit="exit"
            className="fixed inset-0 z-[99] flex h-screen w-screen items-center justify-center bg-neutral-dark"
        >
            {dimension.width > 0 && (
                <>
                    <motion.p
                        className="min-h-[63px] absolute z-[1] flex items-center text-background text-[42px]"
                        variants={opacity}
                        initial="initial"
                        animate="enter"
                        aria-hidden="true"
                        exit="exit"
                    >
                        <span className="mr-2 block h-[10px] w-[10px] rounded-full bg-background"></span>
                        {words[index]}
                    </motion.p>
                    <svg
                        className="absolute top-0 h-[calc(100%+300px)] w-full"
                        color="currentColor"
                        aria-hidden="true"
                    >
                        <motion.path
                            suppressHydrationWarning
                            fill={'var(--neutral-dark)'}
                            variants={curve}
                            initial="initial"
                            exit="exit"
                        ></motion.path>
                    </svg>
                </>
            )}
        </motion.div>
    )
}
