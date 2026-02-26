'use client'

import { type Variants } from 'motion'
import { useMemo, useState } from 'react'

const opacity: Variants = {
    initial: {
        opacity: 0,
    },
    enter: {
        opacity: 0.75,
        transition: { duration: 1, delay: 0.2 },
    },
} as const

const slideUp: Variants = {
    initial: {
        top: 0,
    },
    exit: {
        top: '-100vh',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
    },
} as const

export const usePreloaderAnimations = () => {
    const [index, setIndex] = useState(0)

    const [dimension, setDimension] = useState({
        width: globalThis?.window === undefined ? 1440 : window.innerWidth,
        height: globalThis?.window === undefined ? 900 : window.innerHeight,
    })

    const { initialPath, targetPath } = useMemo(
        () => ({
            initialPath: `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`,
            targetPath: `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`,
        }),
        [dimension]
    )

    const curve: Variants = useMemo(
        () => ({
            initial: {
                d: initialPath,
                transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
            },
            exit: {
                d: targetPath,
                transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
            },
        }),
        [initialPath, targetPath]
    )

    return { opacity, slideUp, setDimension, setIndex, index, dimension, curve } as const
}
