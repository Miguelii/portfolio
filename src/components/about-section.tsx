export function AboutSection() {
   return (
      <div className="flex flex-col gap-4 max-w-3xl">
         <span className="block text-neutral font-normal text-base">About</span>

         <div className="flex flex-col gap-5 justify-center h-full">
            <h1 className="text-primary text-3xl/snug xl:text-5xl/snug font-bold">
               A little about myself
            </h1>

            <p className="text-pretty text-neutral text-lg leading-relaxed">
               Software Engineer specializing in full-stack development, with strong expertise in
               JavaScript, TypeScript, and Node.js.
            </p>

            <p className="text-pretty text-neutral text-lg leading-relaxed">
               Passionate about creating new products that improve the lives of others through code.
            </p>

            <p className="text-pretty text-neutral text-lg leading-relaxed">
               Background in Computer Science from University of Minho (Braga - Portugal).
            </p>
         </div>
      </div>
   )
}
