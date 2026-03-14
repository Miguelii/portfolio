import { ExperienceSection } from '@/features/experience/components/experience-section'
import { LandingSection } from '@/features/landing/components/landing-section'
import { ProfilePageSchema } from '@/components/structured-data'
import { AboutSection } from '@/components/about'
import { Suspense } from 'react'
import { Preloader } from '@/features/landing/components/preloader'
import { PreloaderShell } from '@/features/landing/components/preloader/preloader-shell'
import { getAboutSection } from '@/sanity/api/get-about-section'
import { getLandingSection } from '@/sanity/api/get-landing-section'
import { BandLazy } from '@/features/landing/components/band-lazy'
import { getWorkExperienceSection } from '@/sanity/api/get-work-experience-section'
import { QuoteCard } from '@/components/quote'
import { getQuoteSection } from '@/sanity/api/get-quote-section'

// sanityClientFetch controls the revalidate time
export const dynamic = 'force-static'

export default async function Home() {
    const landingSection = getLandingSection()
    const aboutSection = getAboutSection()
    const experienceSection = getWorkExperienceSection()
    const quoteSection = getQuoteSection()

    return (
        <>
            <ProfilePageSchema />
            <main
                id="main"
                className="main-bottom-padding main-container border-x border-x-divider"
            >
                <PreloaderShell />
                <Preloader />
                <LandingSection modelPromise={landingSection}>
                    <Suspense
                        fallback={
                            <section className="canvas-container">
                                <div className="relative w-full canvas-h" />
                            </section>
                        }
                    >
                        <BandLazy />
                    </Suspense>
                </LandingSection>
                <AboutSection modelPromise={aboutSection} />
                <QuoteCard modelPromise={quoteSection} />
                <ExperienceSection modelPromise={experienceSection} />
            </main>
        </>
    )
}
