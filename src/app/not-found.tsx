import { Button } from '@/components/ui/button'

export default function NotFound() {
    return (
        <main
            id="main"
            className="main-container flex flex-col gap-6 max-w-3xl border-x border-x-divider min-h-[calc(100vh-130px)] container-padding"
        >
            <span className="block text-neutral font-normal text-p-small">Not Found</span>

            <div className="flex flex-col gap-5 justify-center h-full">
                <h1 className="text-primary text-h1">On no!</h1>
                <p className="text-pretty text-neutral text-p-regular leading-relaxed">
                    Seems like you are lost.
                </p>
            </div>

            <Button label="Go back" href={'/'} variant="primary" />
        </main>
    )
}
