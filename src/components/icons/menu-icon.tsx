'use client'

import { cn } from '@/lib/utils'
import type { Variants } from 'motion/react'
import { motion, useAnimation } from 'motion/react'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import type { IconHandle, IconProps } from './types'
import { motionPressProps } from '@/lib/constants'

const getRotation = (custom: number) => {
    if (custom === 1) return 45
    if (custom === 3) return -45
    return 0
}

const getY = (custom: number) => {
    if (custom === 1) return 6
    if (custom === 3) return -6
    return 0
}

const lineVariants: Variants = {
    normal: {
        rotate: 0,
        y: 0,
        opacity: 1,
    },
    animate: (custom: number) => ({
        rotate: getRotation(custom),
        y: getY(custom),
        opacity: custom === 2 ? 0 : 1,
        transition: {
            type: 'spring',
            stiffness: 260,
            damping: 20,
        },
    }),
}

const MenuIcon = forwardRef<IconHandle, Omit<IconProps, 'size'>>(({ className, ...props }, ref) => {
    const controls = useAnimation()
    const isControlledRef = useRef(false)

    useImperativeHandle(ref, () => {
        isControlledRef.current = true

        return {
            startAnimation: () => controls.start('animate'),
            stopAnimation: () => controls.start('normal'),
        }
    })

    return (
        <motion.button
            className="w-12 h-12 items-center justify-center flex md:hidden flex-shrink-0"
            onClick={props.onClick ?? undefined}
            aria-label={props['aria-label']}
            aria-expanded={props['aria-expanded']}
            aria-controls={props['aria-controls']}
            {...props}
            {...motionPressProps}
        >
            <div
                className={cn(
                    `cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
                    className
                )}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 lg:w-7 lg:h-7"
                >
                    <motion.line
                        x1="4"
                        y1="6"
                        x2="20"
                        y2="6"
                        variants={lineVariants}
                        animate={controls}
                        custom={1}
                    />
                    <motion.line
                        x1="4"
                        y1="12"
                        x2="20"
                        y2="12"
                        variants={lineVariants}
                        animate={controls}
                        custom={2}
                    />
                    <motion.line
                        x1="4"
                        y1="18"
                        x2="20"
                        y2="18"
                        variants={lineVariants}
                        animate={controls}
                        custom={3}
                    />
                </svg>
            </div>
        </motion.button>
    )
})

MenuIcon.displayName = 'MenuIcon'

export { MenuIcon }
