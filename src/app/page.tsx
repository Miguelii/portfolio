import { AboutSection } from '@/features/about/about-section'
import { ExperienceSection } from '@/features/experience/components/experience-section'
import { LandingSectionWithBand } from '@/features/landing/components/landing-section-with-band'
import { PreloaderWrapper } from '@/features/landing/components/preloader-wrapper'
import { QuoteCard } from '@/features/quote/quote-card'

export const dynamic = 'force-static'
export const revalidate = 86400 // 24h

export default function Home() {
    return (
        <main className="main-container border-x border-x-divider pb-14">
            <PreloaderWrapper>
                <LandingSectionWithBand />
                <AboutSection />
                <QuoteCard />
                <ExperienceSection />
            </PreloaderWrapper>
        </main>
    )
}
