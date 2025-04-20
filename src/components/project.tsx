import Image from "next/image";
import Link from "next/link";
import { CardContainer, CardBody, CardItem } from "./3d-card";
import { Badge } from "./Badge";
import { ProjectType } from "@/types/Project";
import { getBuildId } from "@/utils/getBuildId";

type ProjectProps = ProjectType;

export default function Project({
  title,
  projectUrl,
  imageUrl,
  techStack,
}: ProjectProps) {

  const id = getBuildId();
   
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
              src={`${imageUrl}?v=${id}`}
              height={240}
              width={358}
              quality={100}
              unoptimized
              className="h-60 w-full object-contain object-center rounded-xl group-hover/card:shadow-xl"
              alt="Project url preview"
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
}
