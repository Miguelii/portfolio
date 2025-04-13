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
    <main className="container w-full mx-auto flex flex-col gap-6 md:flex-row px-5 md:px-20 mb-16 md:mb-16 lg:mb-32">
      <article className="text-base font-mono flex flex-col gap-10">
        <div className="flex flex-col gap-2 text-xl font-semibold">
          <h1>Miguel</h1>
          <h2>Software Engineer</h2>
        </div>

        <div className="flex flex-col gap-2">
          <span>
            Background in Computer Science from{" "}
            <LinkPreview
              url="https://www.uminho.pt/PT"
              className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
            >
              University of Minho (Braga - Portugal).
            </LinkPreview>
          </span>

          <span>
            Specializing in full stack development, with a strong focus on
            JavaScript/TypeScript and Node.Js. Experienced in building SaaS
            applications using modern frameworks such as React and Next.Js.
          </span>
        </div>

        <span>
          Currently at{" "}
          <LinkPreview
            url="https://www.cgi.com/portugal/pt-pt"
            className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
          >
            @CGI
          </LinkPreview>{" "}
          (2022 - Present) as Software Engineer.
        </span>

        <PortfolioTechStack />
      </article>
    </main>
  );
}
