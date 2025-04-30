import { LinkPreview } from "@/components/link-preview";
import PortfolioTechStack from "@/components/portfolio-tech-stack";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Miguel Gonçalves",
};

export const dynamic = "force-static";
export const revalidate = 60000; // 5min

export default function AboutPage() {


  return (
    <main className="container w-full mx-auto px-5 md:px-20 mb-16 md:mb-16 lg:mb-32 flex flex-col gap-10">

      <div className="flex-1 flex flex-col items-start gap-4 min-w-[280px]">

        <div className="uppercase text-xs text-blue pb-1 font-semibold tracking-widest">
          Software Engineer
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          Hey, Im <span className="inline-block">Miguel</span>{" "}
          <span className="inline-block">👋</span>
        </h1>

      </div>

      <div className="flex flex-col gap-5">
        <span className="">
          Background in Computer Science from{" "}
          <LinkPreview
            url="https://www.uminho.pt/PT"
            className="font-bold bg-clip-text"
          >
            University of Minho (Braga - Portugal).
          </LinkPreview>
        </span>

        <span className="">
          Specializing in full stack development, with a strong focus on
          TypeScript, React.js, Next.js and Node.Js. Experienced in building SaaS
          applications using modern frameworks such as React and Next.Js.
        </span>

        <span className="">
          Currently at{" "}
          <LinkPreview
            url="https://www.cgi.com/portugal/pt-pt"
            className="font-bold bg-clip-text"
          >
            @CGI (2022 - Present)
          </LinkPreview>{" "}
          as Software Engineer.
        </span>

      </div>

      <PortfolioTechStack />

    </main>
  )

}
