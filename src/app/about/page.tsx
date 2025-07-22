import { AboutSection } from "@/components/about-section";
import PortfolioTechStack from "@/components/portfolio-tech-stack";
import { SectionDivider } from "@/components/section-divider";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Miguel Gonçalves",
};

export const dynamic = "force-static";
export const revalidate = 3600; // 1h

export default function AboutPage() {
  return (
    <main className="main-container h-fit relative">
      <AboutSection />

      <SectionDivider />

      <section className="flex flex-col gap-12">
        <h2 className="text-3xl font-bold">Skills & Technologies</h2>
        <PortfolioTechStack />
      </section>
    </main>
  );
}
