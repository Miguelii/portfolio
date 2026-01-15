import { type Variants } from 'motion'
import { useState } from 'react'

export const usePreloaderAnimations = () => {
    const [index, setIndex] = useState(0)
    const [dimension, setDimension] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1440,
        height: typeof window !== 'undefined' ? window.innerHeight : 900
    })

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`

    const curve: Variants = {
        initial: {
            d: initialPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
        },
        exit: {
            d: targetPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
        },
    }

    const opacity: Variants = {
        initial: {
            opacity: 0,
        },
        enter: {
            opacity: 0.75,
            transition: { duration: 1, delay: 0.2 },
        },
    }

    const slideUp: Variants = {
        initial: {
            top: 0,
        },
        exit: {
            top: '-100vh',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
        },
    }

    return { opacity, slideUp, setDimension, setIndex, index, dimension, curve } as const
}
