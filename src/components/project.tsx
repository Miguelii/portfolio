import Image from "next/image";
import Link from "next/link";
import { CardContainer, CardBody, CardItem } from "./3d-card";
import { Badge } from "./Badge";
import { ProjectType } from "@/types/Project";

type ProjectProps = ProjectType;

export default function Project({
  title,
  projectUrl,
  imageUrl,
  techStack,
}: ProjectProps) {
  return (
    <Link href={projectUrl} prefetch={false} target="_blank">
      <CardContainer
        className="inter-var w-full cursor-pointer"
        containerClassName="w-full"
      >
        <CardBody className="relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] border-black/[0.1] w-full h-auto rounded-xl p-6 border bg-card">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-white flex flex-col justify-between w-full gap-2"
          >
            {title}
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src={imageUrl}
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>

          <CardItem
            as="div"
            translateZ="60"
            className="mt-8 flex flex-row gap-3 flex-wrap"
          >
            {techStack.map((label, index) => {
              return <Badge key={`tech-stack-${index}`}>{label}</Badge>;
            })}
          </CardItem>

          {/* 
                <div className="flex justify-between items-center mt-12">
                <CardItem
                    translateZ={20}
                    as="button"
                    className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold"
                >
                    {title}
                </CardItem>
                </div>
                */}
        </CardBody>
      </CardContainer>
    </Link>
  );

  return (
    <article className="p-5">
      <div className="pb-5 md:pb-8 w-full">
        <hr className="w-full bg-white" />
      </div>

      <div className="flex flex-col gap-8 md:flex-row md:justify-between md:pl-20">
        <div className="flex flex-col gap-6 items-center md:items-start">
          <div className="flex flex-col gap-4">
            <span className="text-xl font-mono font-bold">{title}</span>

            <span className="font-mono text-sm">
              Tech Stack: Next.js | Typescript | Tailwind | Supabase |
              CrafterCMS
            </span>
          </div>

          <Link
            href={projectUrl}
            target="_blank"
            className="h-11 w-28 border-white border items-center justify-center flex text-center mt-auto"
          >
            View
          </Link>
        </div>

        <Image
          height={200}
          width={350}
          className="w-[350px] h-[200px] md:w-[500px] md:h-[300px]"
          alt="project"
          src={imageUrl}
        />
      </div>

      <div className="pt-5 md:pt-8 w-full">
        <hr className="w-full bg-white" />
      </div>
    </article>
  );
}
