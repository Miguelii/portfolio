import { AboutSection } from '@/features/about/about-section'
import { ExperienceSection } from '@/features/experience/experience-section'
import { LandingSectionWithBand } from '@/features/landing/landing-section-with-band'
import { PreloaderWrapper } from '@/features/landing/preloader-wrapper'
import { QuoteCard } from '@/features/quote/quote-card'
import { ProfilePageSchema } from '@/shared/components/structured-data'

export const dynamic = 'force-static'
export const revalidate = 86400 // 24h

export default function Home() {
    return (
        <>
            <ProfilePageSchema />
            <main className="main-container border-x border-x-divider pb-14">
                <PreloaderWrapper>
                    <LandingSectionWithBand />
                    <ExperienceSection />
                    <QuoteCard />
                    <AboutSection />
                </PreloaderWrapper>
            </main>
        </>
    )
}
