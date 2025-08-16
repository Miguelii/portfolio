import * as motion from 'motion/react-client'

export function QuoteCard() {
    return (
        <motion.section
            style={{ willChange: 'transform' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.4 }}
            className="p-8 md:p-14 flex flex-col gap-4 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-2xl shadow-xl"
        >
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.4 }}
                className="text-white/85 text-2xl/snug xl:text-3xl/snug font-bold"
            >
                &quot;First, solve the problem. Then, write the code.&quot;
            </motion.h2>
        </motion.section>
    )
}
