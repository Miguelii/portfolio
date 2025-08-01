import { AboutSection } from '@/features/about/about-section'
import PortfolioTechStack from '@/features/about/portfolio-tech-stack'
import { SectionDivider } from '@/components/ui/section-divider'
import { type Metadata } from 'next'

export const metadata: Metadata = {
   title: 'About - Miguel Gonçalves',
}

export const dynamic = 'force-static'
export const revalidate = 3600 // 1h

export default function AboutPage() {
   return (
      <main className="main-container h-fit relative mt-12 md:mt-14 lg:mt-16 xl:mt-24">
         <AboutSection />

         <SectionDivider />

         <section className="flex flex-col gap-12">
            <h2 className="text-3xl font-bold">Skills & Technologies</h2>
            <PortfolioTechStack />
         </section>
      </main>
   )
}
