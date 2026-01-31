import * as motion from 'motion/react-client'
import type { AboutParagraph } from './types/AboutParagraph'

export function AboutSection() {
    const startYear = 2022
    const currentYear = new Date().getFullYear()
    const yearDiff = currentYear - startYear

    const paragraphs: AboutParagraph[] = [
        {
            id: 'intro',
            text: `Software Engineer (Front-End) with a background in <strong>Computer Science Engineering</strong> and over <strong>${yearDiff}+ years</strong> of experience building SaaS products used by millions of users worldwide.`,
        },
        {
            id: 'stack',
            text: `Specialized in <strong>JavaScript</strong> and <strong>TypeScript</strong>, with strong expertise in <strong>React.js</strong> and <strong>Next.js</strong>, always focused on performance, clean architecture, and best practices.`,
        },
        {
            id: 'passion',
            text: `I&apos;m passionate about creating products that make a real impact on people’s lives through code.`,
        },
    ]

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
