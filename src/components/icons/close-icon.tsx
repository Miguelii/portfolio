'use client'

import { cn } from '@/lib/utils'
import { motion, useAnimation, type Variants } from 'motion/react'
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import type { IconHandle, IconProps } from './types'
import { motionPressProps } from '@/lib/constants'

const pathVariants: Variants = {
    normal: {
        opacity: 1,
        pathLength: 1,
    },
    animate: {
        opacity: [0, 1],
        pathLength: [0, 1],
    },
}

const CloseIcon = forwardRef<IconHandle, Omit<IconProps, 'size'>>(
    ({ onMouseEnter, onMouseLeave, className, ...props }, ref) => {
        const controls = useAnimation()
        const isControlledRef = useRef(false)

        useImperativeHandle(ref, () => {
            isControlledRef.current = true

            return {
                startAnimation: () => controls.start('animate'),
                stopAnimation: () => controls.start('normal'),
            }
        })

        const handleMouseEnter = useCallback(
            (e: React.MouseEvent<HTMLButtonElement>) => {
                if (isControlledRef.current) {
                    onMouseEnter?.(e)
                } else {
                    controls.start('animate')
                }
            },
            [controls, onMouseEnter]
        )

        const handleMouseLeave = useCallback(
            (e: React.MouseEvent<HTMLButtonElement>) => {
                if (isControlledRef.current) {
                    onMouseLeave?.(e)
                } else {
                    controls.start('normal')
                }
            },
            [controls, onMouseLeave]
        )

        return (
            <motion.button
                className="w-12 h-12 items-center justify-center flex md:hidden shrink-0"
                onClick={props.onClick ?? undefined}
                aria-label={props['aria-label']}
                aria-expanded={props['aria-expanded']}
                aria-controls={props['aria-controls']}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
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
                        <motion.path variants={pathVariants} animate={controls} d="M18 6 6 18" />
                        <motion.path
                            transition={{ delay: 0.2 }}
                            variants={pathVariants}
                            animate={controls}
                            d="m6 6 12 12"
                        />
                    </svg>
                </div>
            </motion.button>
        )
    }
)

CloseIcon.displayName = 'CloseIcon'

export { CloseIcon }
