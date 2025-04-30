import Image from "next/image";
import { ProjectType } from "@/types/Project";
import { getBuildId } from "@/utils/getBuildId";
import Button from "./button";
import { cn } from "@/utils/cn";

type ProjectProps = ProjectType & {
  index: number
};

export default function Project({
  title,
  projectUrl,
  imageUrl,
  techStack,
  index,
  description
}: ProjectProps) {
  const id = getBuildId();

  const isEven = index % 2 !== 0;

  return (
    <div className={cn(
      "flex flex-col bg-transparent rounded-2xl overflow-hidden shadow-2xl border border-neutral-100 group h-fit lg:h-[368px]",
      isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
    )}>
      <div className="lg:w-1/2 relative overflow-hidden">
        <div className="aspect-video lg:aspect-auto lg:h-full">
          <Image
            src={`${imageUrl}?v=${id}`}
            height={240}
            width={358}
            quality={100}
            unoptimized
            className="w-full h-full object-cover object-center"
            alt="Project url preview"
          />
        </div>
      </div>
      <div className="lg:w-1/2 p-8 flex flex-col justify-start bg-gradient-to-br from-background to-neutral-50">
        <div className="space-y-6 h-full justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-3 flex items-center">
              {title}
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </h3>
            <p className="">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {techStack.map((label, index) => {
              return (
                <span
                  key={`tech-stack-${index}`}
                  className="bg-neutral-100 px-3 py-1 rounded-full text-sm font-medium text-primary shadow-sm"
                >
                  {label}
                </span>
              );
            })}
          </div>

          
        </div>

        <div className={cn(
            "w-full flex mt-auto",
            isEven ? 'justify-start' : 'justify-end'
          )}>
            <Button prefetch={false} href={projectUrl} target="_blank">
              <span className="relative z-10">View Project</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right relative z-10"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Button>
          </div>
      </div>
    </div>
  );
}
