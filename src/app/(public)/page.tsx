import { ExperienceSection } from '@/features/experience/components/experience-section'
import { LandingSection } from '@/features/landing/components/landing-section'
import { ProfilePageSchema } from '@/components/structured-data'
import { AboutSection } from '@/components/about'
import { Suspense } from 'react'
import { Preloader } from '@/features/landing/components/preloader'
import { getAboutSection } from '@/sanity/api/get-about-section'
import { getLandingSection } from '@/sanity/api/get-landing-section'
import { BandLazy } from '@/features/landing/components/band-lazy'
import { getWorkExperienceSection } from '@/sanity/api/get-work-experience-section'
import { QuoteCard } from '@/components/quote'

// sanityClientFetch controls the revalidate time
export const dynamic = 'force-static'

export default async function Home() {
    const landingSection = getLandingSection()
    const aboutSection = getAboutSection()
    const experienceSection = getWorkExperienceSection()

    return (
        <>
            <ProfilePageSchema />
            <main
                id="main"
                className="main-bottom-padding main-container border-x border-x-divider"
            >
                <Preloader />
                <LandingSection modelPromise={landingSection}>
                    <Suspense
                        fallback={
                            <div className="px-10 md:px-0 mt-6 lg:mt-0 relative lg:absolute lg:left-[35%] xl:left-[60%] 2xl:left-[45%] xl:-inset-10 w-full xl:w-auto">
                                <div className="relative w-full canvas-h" />
                            </div>
                        }
                    >
                        <BandLazy />
                    </Suspense>
                </LandingSection>
                <AboutSection modelPromise={aboutSection} />
                <QuoteCard />
                <ExperienceSection modelPromise={experienceSection} />
            </main>
        </>
    )
}
