import { ExperienceSection } from '@/features/experience/experience-section'
import { LandingSectionWithBand } from '@/features/landing/landing-section-with-band'
import { QuoteCard } from '@/features/quote/quote-card'
import ProjectsService from '@/services/projects-service'
import { ProjectsSection } from '@/features/projects/projects-section'
import { PreloaderWrapper } from '@/features/landing/preloader-wrapper'
import { LineDivider } from '@/components/ui/line-divider'

export const dynamic = 'force-static'
export const revalidate = 86400 // 24h

export default function Home() {
    const personalProjects = ProjectsService.getPersonalProjects()

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

                <ProjectsSection
                    title="Professional Work"
                    description="Worked on 20+ projects — while most are under NDA, here’s a glimpse at some of the most impactful ones."
                    projects={workProjects ?? []}
                />

                <LineDivider />

                <ProjectsSection
                    title="Personal Projects"
                    description="Built out of curiosity, learning, or just for fun."
                    projects={personalProjects ?? []}
                />
            </PreloaderWrapper>
        </main>
    )
}
