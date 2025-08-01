import * as motion from 'motion/react-client'

export function AboutSection() {
   const paragraphs = [
      'Software Engineer specializing in full-stack development, with strong expertise in JavaScript, TypeScript, and Node.js.',
      'Passionate about creating new products that improve the lives of others through code.',
      'Background in Computer Science from University of Minho (Braga - Portugal).',
   ]

   return (
      <div className="flex flex-col gap-4 max-w-3xl">
         <motion.label
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.45 }}
            className="block text-neutral font-normal text-base"
         >
            About
         </motion.label>

         <div className="flex flex-col gap-5 justify-center h-full">
            <motion.h1
               initial={{ opacity: 0, y: -30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.7, ease: 'easeOut' }}
               className="text-primary text-3xl/snug xl:text-5xl/snug font-bold"
            >
               A little about myself
            </motion.h1>

            {paragraphs?.map((text, i) => (
               <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 * i, ease: 'easeOut' }}
                  className="text-pretty text-neutral text-lg leading-relaxed"
               >
                  {text}
               </motion.p>
            ))}
         </div>
      </div>
   )
}
