import { ExperienceSection } from "@/components/experience-section";
import { LandingSectionWithBand } from "@/components/landing-section-with-band";
import { ProjectSection } from "@/components/projects-section";
import { SectionDivider } from "@/components/section-divider";

export const dynamic = "force-static";
export const revalidate = 3600; // 1h

export default function Home() {
  return (
    <main className="main-container">
      <LandingSectionWithBand />

      <SectionDivider />

      <ExperienceSection />

      <SectionDivider />

      <ProjectSection />
    </main>
  );
}
