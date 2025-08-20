import { AboutSection } from '@/features/about/about-section'
import { type Metadata } from 'next'
import { TechStackSection } from '@/features/about/tech-stack-section'
import { LineDivider } from '@/shared/components/ui/line-divider'

export const metadata: Metadata = {
    title: 'About - Miguel Gonçalves',
}

export const dynamic = 'force-static'
export const revalidate = 86400 // 24h

export default function AboutPage() {
    return (
        <main className="main-container h-fit relative mt-12 md:mt-14 lg:mt-16 xl:mt-20">
            <AboutSection />
            <LineDivider />
            <TechStackSection />
        </main>
    )
}
