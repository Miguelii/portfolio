import { PropsWithChildren } from "react";
import { TechStackItem } from "./tech-stack-item";

export default function PortfolioTechStack() {
  return (
    <>
      <Item title="Front-End Tech Stack:">
        <TechStackItem imageUrl="/js.webp" label="Javascript" />
        <TechStackItem imageUrl="/ts.webp" label="Typescript" />
        <TechStackItem imageUrl="/react.webp" label="React" />
        <TechStackItem imageUrl="/next.webp" label="Next.js" />
        <TechStackItem imageUrl="/tailwind.webp" label="Tailwind" />
      </Item>

      <Item title="Back-End Tech Stack:">
        <TechStackItem imageUrl="/node.webp" label="Node.js" />
        <TechStackItem imageUrl="/java.png" label="Java" />
      </Item>

      <Item title="Tools:">
        <TechStackItem imageUrl="/docker.svg" label="Docker" />
        <TechStackItem imageUrl="/supabase.svg" label="Supabase" />
        <TechStackItem imageUrl="/craftercms.png" label="CrafterCMS" />
      </Item>
    </>
  );
}

type ItemProps = PropsWithChildren<{
  title: string;
}>;
const Item = ({ title, children }: ItemProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-base">{title}</h2>
      <div className="sm:col-span-7 flex gap-x-11 gap-y-9 flex-wrap">
        {children}
      </div>
    </div>
  );
};
