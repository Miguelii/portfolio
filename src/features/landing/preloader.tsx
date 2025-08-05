'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePreloaderAnimations } from './use-preloader-animations'

const words = ['Hello', 'Bonjour', 'Ciao', 'やあ', 'Hallå', 'Guten tag', 'Hallo', 'Olá']

export default function Preloader() {
    const { slideUp, opacity, setDimension, setIndex, index, dimension, curve } =
        usePreloaderAnimations()

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight })
    }, [])

    useEffect(() => {
        if (index == words.length - 1) return
        setTimeout(
            () => {
                setIndex(index + 1)
            },
            index == 0 ? 1000 : 150
        )
    }, [index])

    return (
        <motion.div
            variants={slideUp}
            initial="initial"
            exit="exit"
            className="fixed top-0 left-0 z-[99] flex h-screen w-screen items-center justify-center bg-neutral-dark"
        >
            {dimension.width > 0 && (
                <>
                    <motion.p
                        className="absolute z-[1] flex items-center text-background text-[42px]"
                        variants={opacity}
                        initial="initial"
                        animate="enter"
                    >
                        <span className="mr-2 block h-[10px] w-[10px] rounded-full bg-background"></span>
                        {words[index]}
                    </motion.p>
                    <svg
                        className="absolute top-0 h-[calc(100%+300px)] w-full"
                        color="currentColor"
                    >
                        <motion.path
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
