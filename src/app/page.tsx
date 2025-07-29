import { ExperienceSection } from '@/components/experience-section'
import { LandingSectionWithBand } from '@/components/landing-section-with-band'
import { ProjectsSection } from '@/components/projects-section'
import { QuoteCard } from '@/components/quote-card'
import { SectionDivider } from '@/components/section-divider'
import ProjectsService from '@/lib/projects-service'

export const dynamic = 'force-static'
export const revalidate = 3600 // 1h

export default function Home() {
   const workProjects = ProjectsService.getWorkProjects()

   const personalProjects = ProjectsService.getPersonalProjects()

   return (
      <main className="main-container">
         <LandingSectionWithBand />

         <SectionDivider />

         <ExperienceSection />

         <SectionDivider />

         <QuoteCard />

         <SectionDivider />

         <ProjectsSection
            title="Professional Work"
            description="Worked on 20+ projects — only the best made it here."
            projects={workProjects ?? []}
         />

         <SectionDivider />

         <ProjectsSection
            title="Personal Projects"
            description="Built out of curiosity, learning, or just for fun."
            projects={personalProjects ?? []}
         />
      </main>
   )
}
