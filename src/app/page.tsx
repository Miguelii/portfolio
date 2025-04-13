import Footer from "@/components/footer";
import Project from "@/components/project";
import { ProjectType } from "@/types/Project";

const PROJECTS: ProjectType[] = [
  {
    title: "EUROMAR Portal",
    projectUrl: "https://www.eu-registry.com/euromar/",
    imageUrl: '/euromar.png?v=1',
    techStack: [
      'Next.js',
      'Tailwind',
      'Typescript',
      'Supabase',
      'CrafterCMS'
    ]
  },

  {
    title: "Portuguese Embassies Appointments Portal",
    projectUrl: "https://agendamentos.mne.gov.pt/en/login",
    imageUrl: '/appointments.png?v=2',
    techStack: [
      'Next.js',
      'Tailwind',
      'Typescript',
    ]
  },

  {
    title: "GasSU Contract Form",
    projectUrl: "https://www.gassu.pt/gassu/contratar/",
    imageUrl: '/gassu.png?v=3',
    techStack: [
      'Next.js',
      'Tailwind',
      'Typescript',
    ]
  },

  {
    title: "Luisa Mendes - Makeup Portfolio ",
    projectUrl: "https://luisamendes.vercel.app",
    imageUrl: '/luisamendes.png?v=4',
    techStack: [
      'Next.js',
      'Tailwind',
      'Typescript',
      'Framer-Motion'
    ]
  },

  {
    title: "Geometrix",
    projectUrl: "https://www.hypatiamat.com/jogos/geometrixv7/index.html",
    imageUrl: '/geometrix.png?v=5',
    techStack: [
      'Javascript',
      'Phaser.js',
    ]
  }
]

export const dynamic = 'force-static';
export const revalidate = 60000; // 5min

export default function Home() {
  return (
    <main className="container w-full mx-auto px-5 md:px-20">

      <h1 className="text-lg font-mono mb-10 uppercase">Checkout my latest projects</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 md:gap-x-12 md:gap-y-12">
        {PROJECTS.map((item,index) => {
          return (
            <Project 
              key={`project-${index}`}
              title={item.title}
              projectUrl={item.projectUrl}
              imageUrl={item.imageUrl}
              techStack={item.techStack}
            />
          )
        })}
      </div>

      <Footer />

    </main>
  );
}
