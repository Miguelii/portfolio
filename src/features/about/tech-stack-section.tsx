import PortfolioTechStack from './portfolio-tech-stack'
import * as motion from 'motion/react-client'

export function TechStackSection() {
    return (
        <section className="flex flex-col gap-12">
            <motion.h2
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                className="text-3xl font-bold"
                viewport={{ once: true, amount: 0.4 }}
            >
                Skills & Technologies
            </motion.h2>
            <PortfolioTechStack />
        </section>
    )
}
