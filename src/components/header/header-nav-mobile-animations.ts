import { type Variants } from 'motion/react'

export const menuVariants: Variants = {
    closed: {
        opacity: 0,
        transition: {
            ease: 'easeOut',
            duration: 0.2,
        },
    },
    open: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
            when: 'beforeChildren',
        },
    },
}

export const itemVariants: Variants = {
    closed: {
        opacity: 0,
        y: 20,
    },
    open: {
        opacity: 1,
        y: 0,
        transition: {
            ease: 'easeOut',
            duration: 0.2,
        },
    },
}
