import { ExperienceSection } from '@/features/experience/components/experience-section'
import { LandingSectionWithBand } from '@/features/landing/components/landing-section-with-band'
import { ProfilePageSchema } from '@/components/structured-data'
import { AboutSection } from '@/components/about'
import { Suspense } from 'react'
import { Preloader } from '@/features/landing/components/preloader'

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
                <Preloader />
                <Suspense fallback={<div className="w-full canvas-h" />}>
                    <LandingSectionWithBand />
                </Suspense>
                <AboutSection />
                <ExperienceSection />
            </main>
        </>
    )
}
