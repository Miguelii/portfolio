'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Logger } from '@/lib/logger'

type Props = {
    error: Error & { digest?: string }
    reset: () => void
}

export default function PublicError({ error, reset }: Props) {
    useEffect(() => {
        Logger({ level: 'error', error, context: 'public segment error boundary' })
    }, [error])

    return (
        <main
            id="main"
            className="not-found-h main-container flex flex-col max-w-3xl border-x border-x-divider container-padding lg:pt-6! pb-14 lg:pb-24!"
        >
            <div className="flex flex-col gap-6 py-12 lg:py-20 text-center lg:text-left">
                <div className="flex flex-col gap-3">
                    <span className="font-mono text-p-smallest tracking-[0.2em] uppercase text-neutral">
                        Error
                    </span>
                    <h1 className="text-primary text-h1 font-bold leading-tight">
                        Something went wrong.
                    </h1>
                    <p className="text-neutral text-p-regular leading-relaxed">
                        An unexpected error occurred. You can try again or head back home.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button
                        as="button"
                        label="Try again"
                        onClick={() => reset()}
                        variant="primary"
                    />
                    <Button label="Go to home" href="/" variant="secondary" />
                </div>
            </div>
        </main>
    )
}
