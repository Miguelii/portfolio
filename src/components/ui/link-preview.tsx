'use client'

import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import Image from 'next/image'
import { encode } from 'qss'
import React from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import Link from 'next/link'
import { cn } from '@/utils/cn'

type LinkPreviewProps = {
    children: React.ReactNode
    url: string
    imageSrc: string
    className?: string
    width?: number
    height?: number
    quality?: number
    layout?: string
}

export const LinkPreview = ({
    children,
    url,
    className,
    width = 200,
    height = 125,
    quality = 50,
    layout = 'fixed',
    imageSrc,
}: LinkPreviewProps) => {
    const params = encode({
        url: imageSrc,
        screenshot: true,
        meta: false,
        embed: 'screenshot.url',
        colorScheme: 'light',
        'viewport.isMobile': true,
        'viewport.deviceScaleFactor': 1,
        'viewport.width': width * 3,
        'viewport.height': height * 3,
    })

    const src = `https://api.microlink.io/?${params}`

    const [isOpen, setOpen] = React.useState(false)

    const [isMounted, setIsMounted] = React.useState(false)

    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    const springConfig = { stiffness: 100, damping: 15 }
    const x = useMotionValue(0)

    const translateX = useSpring(x, springConfig)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMouseMove = (event: any) => {
        const targetRect = event.target.getBoundingClientRect()
        const eventOffsetX = event.clientX - targetRect.left
        const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2 // Reduce the effect to make it subtle
        x.set(offsetFromCenter)
    }

    return (
        <>
            {isMounted ? (
                <div className="hidden">
                    <Image
                        src={`${src}`}
                        width={width}
                        height={height}
                        quality={quality}
                        layout={layout}
                        priority={true}
                        alt="hidden image"
                        loading="lazy"
                    />
                </div>
            ) : null}

            <HoverCardPrimitive.Root
                openDelay={50}
                closeDelay={100}
                onOpenChange={(open) => {
                    setOpen(open)
                }}
            >
                <HoverCardPrimitive.Trigger
                    onMouseMove={handleMouseMove}
                    className={cn('', className)}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                >
                    {children}
                </HoverCardPrimitive.Trigger>

                <HoverCardPrimitive.Content
                    className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
                    side="top"
                    align="center"
                    sideOffset={10}
                >
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        type: 'spring',
                                        stiffness: 260,
                                        damping: 20,
                                    },
                                }}
                                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                                className="shadow-xl rounded-xl"
                                style={{
                                    x: translateX,
                                }}
                            >
                                <Link
                                    href={url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block p-1 bg-background border-2 border-transparent shadow rounded-xl cursor-pointer"
                                    style={{ fontSize: 0 }}
                                >
                                    <Image
                                        src={`${src}`}
                                        width={width}
                                        height={height}
                                        quality={quality}
                                        layout={layout}
                                        priority={true}
                                        className="rounded-lg"
                                        alt="preview image"
                                    />
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
        </>
    )
}
