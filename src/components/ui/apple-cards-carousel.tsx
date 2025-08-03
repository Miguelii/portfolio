'use client'

import React, { useEffect, useState, createContext, JSX, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { cn } from '@/utils/cn'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from 'lucide-react'

interface CarouselProps {
    items: JSX.Element[]
    initialScroll?: number
}

export const CarouselContext = createContext<{
    onCardClose: (index: number) => void
    currentIndex: number
}>({
    onCardClose: () => {},
    currentIndex: 0,
})

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
    const carouselRef = React.useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = React.useState(false)
    const [canScrollRight, setCanScrollRight] = React.useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = initialScroll
            checkScrollability()
        }
    }, [initialScroll])

    const checkScrollability = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth)
        }
    }

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' })
        }
    }

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' })
        }
    }

    const handleCardClose = (index: number) => {
        if (carouselRef.current) {
            const cardWidth = isMobile() ? 230 : 384 // (md:w-96)
            const gap = isMobile() ? 4 : 8
            const scrollPosition = (cardWidth + gap) * (index + 1)
            carouselRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth',
            })
            setCurrentIndex(index)
        }
    }

    const isMobile = () => {
        return window && window.innerWidth < 768
    }

    const itemsLength = items?.length ?? 0

    return (
        <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
            <div className="relative w-full flex flex-col gap-6">
                <div
                    className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none]"
                    ref={carouselRef}
                    onScroll={checkScrollability}
                >
                    <div
                        className={cn(
                            'absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l'
                        )}
                    ></div>

                    <div
                        className={cn(
                            'flex flex-row justify-start gap-4',
                            'mx-auto max-w-7xl',

                            itemsLength < 3 ? 'mx-0' : ''
                        )}
                    >
                        {items?.map((item, index) => {
                            return <CarouselItem key={'card' + index} index={index} item={item} />
                        })}
                    </div>
                </div>
                <CarouselButtons
                    scrollLeft={scrollLeft}
                    scrollRight={scrollRight}
                    canScrollLeft={canScrollLeft}
                    canScrollRight={canScrollRight}
                />
            </div>
        </CarouselContext.Provider>
    )
}

type CarouselButtonsProps = {
    scrollLeft: () => void
    canScrollLeft: boolean
    scrollRight: () => void
    canScrollRight: boolean
}

function CarouselButtons({
    scrollLeft,
    canScrollLeft,
    scrollRight,
    canScrollRight,
}: CarouselButtonsProps) {
    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.4 }}
            className="md:mr-0 flex justify-end gap-2"
        >
            <button
                className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-30 cursor-pointer disabled:cursor-auto text-neutral"
                onClick={scrollLeft}
                disabled={!canScrollLeft}
            >
                <ArrowLeftCircleIcon className="h-6 w-6" />
            </button>
            <button
                className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-30 cursor-pointer disabled:cursor-auto text-neutral"
                onClick={scrollRight}
                disabled={!canScrollRight}
            >
                <ArrowRightCircleIcon className="h-6 w-6" />
            </button>
        </motion.div>
    )
}

type CarouselItemProps = {
    index: number
    item: JSX.Element
}

function CarouselItem({ index, item }: CarouselItemProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 'some' })

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={
                isInView
                    ? {
                          opacity: 1,
                          y: 0,
                          transition: {
                              duration: 0.5,
                              delay: 0.2 * index,
                              ease: 'easeOut',
                          },
                      }
                    : {}
            }
            key={'card' + index}
            className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
        >
            {item}
        </motion.div>
    )
}
