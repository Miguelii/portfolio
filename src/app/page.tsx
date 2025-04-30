import ContactMeCard from "@/components/contact-me-card";
import Project from "@/components/project";
import { ProjectType } from "@/types/Project";
import { Suspense } from "react";

const PROJECTS: ProjectType[] = [
  {
    title: "EUROMAR Portal",
    projectUrl: "https://www.eu-registry.com/euromar/",
    description: 'Developed a public website power by CrafterCMS and a private portal with a admin backoffice.',
    imageUrl: "/euromar.png",
    techStack: ["Next.js", "Tailwind", "Typescript", "Supabase", "CrafterCMS"],
  },

  {
    title: "Portuguese Embassies Appointments Portal",
    projectUrl: "https://agendamentos.mne.gov.pt/en/login",
    description: 'Developed the new scheduling website for consulates and embassies of Portugal.',
    imageUrl: "/appointments.png",
    techStack: ["Next.js", "Tailwind", "Typescript"],
  },

  {
    title: "GasSU Contract Form",
    projectUrl: "https://www.gassu.pt/gassu/contratar/",
    description: 'Delevoped a contract form for new customers of GasSU.',
    imageUrl: "/gassu.png",
    techStack: ["Next.js", "Tailwind", "Typescript"],
  },

  {
    title: "Luisa Mendes - Makeup Portfolio ",
    projectUrl: "https://luisamendes.vercel.app",
    description: 'Developed a portfolio website for a makeup artist.',
    imageUrl: "/luisamendes.png",
    techStack: ["Next.js", "Tailwind", "Typescript", "Framer-Motion"],
  },

  {
    title: "Geometrix",
    projectUrl: "https://www.hypatiamat.com/jogos/geometrixv7/index.html",
    description: 'Developed a game for Hypatiamat, a platform with various games for elementary school students. The game aims to teach students basic geometry while they have fun and climb our rankings.',
    imageUrl: "/geometrix.png",
    techStack: ["Javascript", "Phaser.js"],
  },
];

export const dynamic = "force-static";
export const revalidate = 60000; // 5min

export default function Home() {
  return (
    <main className="container w-full mx-auto px-5 md:px-20">

      <div className="mb-16 flex flex-col items-center">
        <span
          className="inline-flex items-center justify-center bg-neutral-100 px-4 py-2 rounded-full text-sm font-medium mb-4 text-blue shadow-sm"
        >
          Portfolio
        </span>
        <h2 className="text-2xl font-bold text-center uppercase mb-6">Checkout my latest work and personal projects:</h2>
        <div className="w-16 h-1 bg-primary rounded"></div>
      </div>
     
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-1 md:gap-x-12 md:gap-y-12">
        {PROJECTS.map((item, index) => {
          return (
            <Suspense key={`project-${index}`}>
              <Project
                index={index}
                title={item.title}
                projectUrl={item.projectUrl}
                imageUrl={item.imageUrl}
                description={item.description}
                techStack={item.techStack}
              />
            </Suspense>
          );
        })}
      </div>

      <ContactMeCard />
    </main>
  );
}
