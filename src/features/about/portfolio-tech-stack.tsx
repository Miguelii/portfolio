import { PropsWithChildren } from 'react'
import { PortfolioTechStackItem } from './portfolio-tech-stack-item'
import * as motion from 'motion/react-client'

export default function PortfolioTechStack() {
    return (
        <>
            <SectionItem title="Front-End Tech Stack:">
                <PortfolioTechStackItem imageUrl="/tech/js.webp" label="Javascript" />
                <PortfolioTechStackItem imageUrl="/tech/ts.webp" label="Typescript" />
                <PortfolioTechStackItem imageUrl="/tech/react.webp" label="React" />
                <PortfolioTechStackItem imageUrl="/tech/nextjs-icon.png" label="Next.js" />
                <PortfolioTechStackItem imageUrl="/tech/tailwind.webp" label="Tailwind" />
            </SectionItem>

            <SectionItem title="Back-End Tech Stack:">
                <PortfolioTechStackItem imageUrl="/tech/node.webp" label="Node.js" />
                <PortfolioTechStackItem imageUrl="/tech/java.png" label="Java" />
            </SectionItem>

            <SectionItem title="Tools:">
                <PortfolioTechStackItem imageUrl="/tech/docker-icon.png" label="Docker" />
                <PortfolioTechStackItem imageUrl="/tech/supabase.svg" label="Supabase" />
                <PortfolioTechStackItem imageUrl="/tech/craftercms.png" label="CrafterCMS" />
            </SectionItem>
        </>
    )
}

type SectionItemProps = PropsWithChildren<{
    title: string
}>
const SectionItem = ({ title, children }: SectionItemProps) => {
    return (
        <div className="flex flex-col gap-4">
            <motion.h3
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.35 }}
                viewport={{ once: true, amount: 0.1 }}
                className="text-lg font-medium text-neutral"
            >
                {title}
            </motion.h3>
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.35 }}
                viewport={{ once: true, amount: 0.1 }}
                className="sm:col-span-7 flex gap-x-11 gap-y-9 flex-wrap"
            >
                {children}
            </motion.div>
        </div>
    )
}
