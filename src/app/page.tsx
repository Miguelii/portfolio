import { ExperienceSection } from '@/features/experience/components/experience-section'
import { LandingSectionWithBand } from '@/features/landing/components/landing-section-with-band'
import { ProfilePageSchema } from '@/components/structured-data'
import { AboutSection } from '@/components/about'
import { QuoteCard } from '@/components/quote'
import { PreloaderWrapper } from '@/features/landing/components/preloader-wrapper'

export const dynamic = 'force-static'
export const revalidate = 86400 // 24h

export default function Home() {
    return (
        <>
            <ProfilePageSchema />
            <main
                id="main"
                className="main-bottom-padding main-container border-x border-x-divider"
            >
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
