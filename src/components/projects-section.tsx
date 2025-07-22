import { ProjectType } from "@/types/Project";
import Image from "next/image";
import Button from "./button";

const PROJECTS: ProjectType[] = [
  {
    title: "EUROMAR Portal",
    projectUrl: "https://www.eu-registry.com/euromar/",
    description:
      "Developed a public website power by CrafterCMS and a private portal with a admin backoffice.",
    imageUrl: "/euromar.png",
    techStack: ["Next.js", "Tailwind", "Typescript", "Supabase", "CrafterCMS"],
  },

  {
    title: "Portuguese Embassies Appointments Portal",
    projectUrl: "https://agendamentos.mne.gov.pt/en/login",
    description:
      "Developed the new scheduling website for consulates and embassies of Portugal.",
    imageUrl: "/appointments.png",
    techStack: ["Next.js", "Tailwind", "Typescript"],
  },

  {
    title: "GasSU Contract Form",
    projectUrl: "https://www.gassu.pt/gassu/contratar/",
    description: "Delevoped a contract form for new customers of GasSU.",
    imageUrl: "/gassu.png",
    techStack: ["Next.js", "Tailwind", "Typescript"],
  },

  {
    title: "Geometrix",
    projectUrl: "https://www.hypatiamat.com/jogos/geometrixv7/index.html",
    description:
      "Developed a game for Hypatiamat, a platform with various games for elementary school students. The game aims to teach students basic geometry while they have fun and climb our rankings.",
    imageUrl: "/geometrix.png",
    techStack: ["Javascript", "Phaser.js"],
  },
];

export function ProjectSection() {
  return (
    <section className="flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold">Projects</h2>
        <span className="text-lg font-medium text-neutral">
          Worked on 20+ projects — only the best made it here.
        </span>
      </div>

      <div className="px-5 md:10 xl:px-28 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {PROJECTS.map((project, index) => (
          <ProjectItem {...project} key={`project-${project.title}-${index}`} />
        ))}
      </div>
    </section>
  );
}

function ProjectItem(project: ProjectType) {
  return (
    <div className="flex flex-col-reverse md:flex-col-reverse p-5 md:p-10 gap-8 border border-neutral-200">
      <div className="flex flex-col gap-8 w-full h-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">{project.title}</h2>
          <span className="text-base font-medium text-neutral">
            {project.description}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project?.techStack?.map((label, index) => {
            return (
              <span
                key={`tech-stack-${index}`}
                className="bg-neutral-200 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
              >
                {label}
              </span>
            );
          })}
        </div>

        <Button
          prefetch={false}
          href={project.projectUrl}
          target="_blank"
          className="mt-auto"
        >
          <span className="relative z-10">View Project</span>
        </Button>
      </div>

      <div className="justify-start flex shrink-0 w-full h-60">
        <Image
          src={project.imageUrl}
          alt={`${project.title} project preview`}
          width={530}
          height={240}
          className="object-cover"
        />
      </div>
    </div>
  );
}
