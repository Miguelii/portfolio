import * as motion from 'motion/react-client'
import type { AboutParagraph } from './types/AboutParagraph'

const paragraphs: AboutParagraph[] = [
    {
        id: 'intro',
        text: `<strong>Software Engineer (Front-End)</strong> building products used by millions of users worldwide.`,
    },
    {
        id: 'stack',
        text: `Mainly working with <strong>JavaScript/TypeScript</strong>, specializing in <strong>React.js</strong> and <strong>Next.js</strong>.`,
    },
    {
        id: 'stack-v2',
        text: `Focused on performance, clean architecture and best practices, with active open-source contributions to the React world.`,
    },
    {
        id: 'passion',
        text: `I&apos;m passionate about creating products that make a real impact on people’s lives through code.`,
    },
] as const

export function AboutSection() {
    return (
        <section className="flex flex-col gap-12 container-padding border-b border-b-divider">
            <motion.h2
                className="text-h2"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.6 }}
                style={{ willChange: 'transform' }}
            >
                About
            </motion.h2>

            <div className="flex flex-col gap-3">
                {paragraphs?.map((item, i) => (
                    <motion.p
                        key={`about-paragraph-${item.id}`}
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 * i, ease: 'easeOut' }}
                        className="text-pretty text-neutral text-p-regular"
                        dangerouslySetInnerHTML={{ __html: item.text }}
                    ></motion.p>
                ))}
            </div>
        </section>
    )
}
