'use client'

import { useCallback, useEffect } from 'react'
import { usePreloaderAnimations } from '@/features/landing/hooks/use-preloader-animations'
import { motion } from 'motion/react'
import { useEventListener } from 'usehooks-ts'

const words = ['Hello', 'Bonjour', 'Ciao', 'やあ', 'Hallå', 'Guten tag', 'Hallo', 'Olá'] as const

export function PreloaderContent() {
    const { slideUp, opacity, setDimension, setIndex, index, dimension, curve } =
        usePreloaderAnimations()

    const handler = useCallback(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight })
    }, [setDimension])

    useEventListener('resize', handler)

    useEffect(
        function callHandlerForInitialValue() {
            handler()
        },
        [handler]
    )

    useEffect(
        function changeWords() {
            if (index >= words.length - 1) return
            const timeout = setTimeout(() => setIndex(index + 1), index === 0 ? 1000 : 150)
            return () => clearTimeout(timeout)
        },
        [index, setIndex]
    )

    return (
        <motion.div
            aria-hidden="true"
            variants={slideUp}
            initial="initial"
            exit="exit"
            className="fixed inset-0 z-99 flex h-screen w-screen items-center justify-center bg-neutral-dark"
        >
            {dimension.width > 0 && (
                <>
                    <motion.p
                        className="min-h-15.75 absolute z-1 flex items-center text-background text-[42px]"
                        variants={opacity}
                        initial="initial"
                        animate="enter"
                        aria-hidden="true"
                        exit="exit"
                    >
                        <span className="mr-2 block h-2.5 w-2.5 rounded-full bg-background"></span>
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
