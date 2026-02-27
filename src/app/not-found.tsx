import { getBuildId } from '@/utils/get-build-id'

export const dynamic = 'force-dynamic'

const buildId = getBuildId()

const VIDEO_URL = `/assets/ezgif-482d65a8fea8d1e7.mp4?${buildId}`

export default function NotFound() {
    return (
        <>
            <head>
                <link
                    id="preload-not-found-video"
                    rel="preload"
                    as="fetch"
                    href={VIDEO_URL}
                    crossOrigin="anonymous"
                    fetchPriority="high"
                />
            </head>
            <main
                id="main"
                className="main-container flex flex-col gap-6 max-w-3xl border-x border-x-divider container-padding lg:pt-6! pb-14 lg:pb-24!"
            >
                <div className="relative flex flex-col items-center justify-center h-full overflow-hidden">
                    {/* Video — full size, behind everything */}
                    <video
                        muted
                        autoPlay
                        loop
                        playsInline
                        className="w-full object-scale-down z-[9] bg-background h-[350px] lg:h-[400px]"
                        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%ffffff00'%3E%3C/rect%3E%3C/svg%3E"
                    >
                        <source src={VIDEO_URL} type="video/mp4" />
                    </video>

                    {/* 404 overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <div className="flex items-center justify-center w-full">
                            <span className="text-8xl md:text-[15vw] font-black leading-none text-primary select-none z-10 left-[0%] lg:left-[7%] xl:left-[10%] top-[20%] xl:top-[18%] absolute [text-shadow:4px_4px_0px_rgba(0,0,0,0.4)]">
                                4
                            </span>
                            <span className="text-8xl md:text-[15vw] font-black leading-none text-primary select-none">
                                0
                            </span>
                            <span className="text-8xl md:text-[15vw] font-black leading-none text-primary select-none z-10 right-[2%] lg:right-[9%] xl:right-[12%] top-[20%] xl:top-[18%] absolute [text-shadow:4px_4px_0px_rgba(0,0,0,0.4)]">
                                4
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-center z-10 mt-8">
                        <div className="flex flex-col gap-5 justify-center h-full">
                            <h1 className="text-primary text-5xl font-bold">On no!</h1>
                            <p className="text-pretty text-neutral leading-relaxed text-4xl font-bold">
                                Seems like you are lost.
                            </p>
                        </div>
                        {/* <Button label="Go back" href={'/'} variant="primary" className='mt-6'/> */}
                    </div>
                </div>
            </main>
        </>
    )
}
