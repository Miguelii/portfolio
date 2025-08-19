import { ExperienceSection } from '@/features/experience/components/experience-section'
import { QuoteCard } from '@/features/quote/quote-card'
import ProjectsService from '@/shared/services/projects-service'
import { ProjectsShowcase } from '@/features/projects/components/projects-showcase'
import { LandingSectionWithBand } from '@/features/landing/components/landing-section-with-band'
import { PreloaderWrapper } from '@/features/landing/components/preloader-wrapper'
import { LineDivider } from '@/shared/components/ui/line-divider'

export const dynamic = 'force-static'
export const revalidate = 86400 // 24h

export default function Home() {
    const workProjects = ProjectsService.getWorkProjects()

    return (
        <main className="main-container lg:mt-17">
            <PreloaderWrapper>
                <LandingSectionWithBand />

                <LineDivider />

                <ExperienceSection />

                <LineDivider />

                <QuoteCard />

                <LineDivider />

                <ProjectsShowcase
                    title="Professional Work"
                    description="Worked on 20+ projects — while most are under NDA, here’s a glimpse at some of the most impactful ones."
                    projects={workProjects ?? []}
                />
            </PreloaderWrapper>
        </main>
    )
}
