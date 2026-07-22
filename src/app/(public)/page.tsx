import { ExperienceSection } from '@/components/experience-section'
import { LandingSection } from '@/components/landing-section'
import { ProfilePageSchema } from '@/components/structured-data'
import { AboutSection } from '@/components/about'
import { Suspense } from 'react'
import { Preloader } from '@/components/preloader'
import { PreloaderShell } from '@/components/preloader/preloader-shell'
import { getAboutSection } from '@/sanity/api/get-about-section'
import { getLandingSection } from '@/sanity/api/get-landing-section'
import { BandLazy } from '@/components/band/band-lazy'
import { getWorkExperienceSection } from '@/sanity/api/get-work-experience-section'
import { runSanityService } from '@/sanity/lib/sanity-service'

// sanityClientFetch controls the revalidate time
export const dynamic = 'force-static'

export default async function Home() {
    const landingSection = runSanityService(getLandingSection)
    const aboutSection = runSanityService(getAboutSection)
    const experienceSection = runSanityService(getWorkExperienceSection)

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
                <ExperienceSection modelPromise={experienceSection} />
            </main>
        </>
    )
}
