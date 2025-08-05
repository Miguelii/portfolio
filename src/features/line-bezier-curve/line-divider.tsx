'use client'

import { useLineDivider } from './use-line-divider'

export const LineDivider = () => {
    const { path, manageMouseEnter, manageMouseLeave, manageMouseMove } = useLineDivider()

    return (
        <div className="relative w-full h-px my-10 lg:my-12 xl:my-14 z-1">
            <div
                onMouseEnter={() => {
                    manageMouseEnter()
                }}
                onMouseMove={(e) => {
                    manageMouseMove(e)
                }}
                onMouseLeave={() => {
                    manageMouseLeave()
                }}
                className="relative z-1 h-10 w-full top-[-40px]"
            ></div>
            <svg className="absolute w-full h-[500px] top-[-250px]">
                <path
                    ref={path}
                    className="stroke-current text-neutral-300 stroke-[1px] fill-none"
                ></path>
            </svg>
        </div>
    )
}
