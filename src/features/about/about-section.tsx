import * as motion from 'motion/react-client'

export function AboutSection() {
    const startYear = 2022
    const currentYear = new Date().getFullYear()
    const yearDiff = currentYear - startYear

    const paragraphs = [
        `Full-Stack Software Engineer with background in Computer Science Engineering.`,
        `<strong>${yearDiff + 1}+ years</strong> of experience in the tech industry, building SaaS products that have reached millions of users worldwide.`,
        `Expert in <strong>JavaScript | TypeScript | React.js | Next.js</strong> with a strong focus on performance and best practices.`,
        'I&apos;m passionate about creating products that positively impact people’s lives through code.',
    ]

    return (
        <section className="flex flex-col gap-12 container-padding border-b-0 border-b-divider">
            <motion.h2
                className="text-3xl font-bold"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.6 }}
                style={{ willChange: 'transform' }}
            >
                About
            </motion.h2>

            <div className="flex flex-col gap-3">
                {paragraphs?.map((text, i) => (
                    <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 * i, ease: 'easeOut' }}
                        className="text-pretty text-neutral text-base/normal md:text-lg/normal leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: text }}
                    ></motion.p>
                ))}
            </div>
        </section>
    )
}
