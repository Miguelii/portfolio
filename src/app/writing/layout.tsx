import { cn } from '@/lib/utils'
import { Instrument_Serif } from 'next/font/google'

// Serif italic used for inline emphasis in posts, loaded only for /writing
const instrumentSerif = Instrument_Serif({
    variable: '--font-instrument-serif',
    subsets: ['latin'],
    weight: '400',
    style: 'italic',
    display: 'swap',
})

export default function WritingLayout({ children }: LayoutProps<'/writing'>) {
    return (
        <main
            id="main"
            className={cn(
                'flex flex-col mx-auto max-w-173 w-full overflow-x-hidden px-6 py-12 text-gray-1200 antialiased sm:py-32 md:overflow-x-visible md:py-28 gap-14 md:gap-20',
                instrumentSerif.variable
            )}
        >
            {children}
        </main>
    )
}
