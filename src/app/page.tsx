import { ExperienceSection } from '@/features/experience/experience-section'
import { LandingSectionWithBand } from '@/features/landing/landing-section-with-band'
import { QuoteCard } from '@/components/misc/quote-card'
import { SectionDivider } from '@/components/ui/section-divider'
import ProjectsService from '@/lib/projects-service'
import { ProjectsSection } from '@/features/projects/projects-section'

export const dynamic = 'force-static'
export const revalidate = 3600 // 1h

export default function Home() {
   const workProjects = ProjectsService.getWorkProjects()

   const personalProjects = ProjectsService.getPersonalProjects()

   return (
      <main className="main-container lg:mt-32">
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
