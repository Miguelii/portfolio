import { type Variants } from 'motion/react'

export const useExperienceSectionAnimations = () => {
    const container: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const item: Variants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'tween',
                ease: 'easeOut',
                duration: 0.6,
            },
        },
    }

    return {
        container,
        item,
    }
}
