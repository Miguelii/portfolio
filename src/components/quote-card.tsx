import { cn } from '@/utils/cn'

export function QuoteCard() {
   return (
      <section
         className={cn(
            'p-8 md:p-14 flex flex-col gap-4 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900'
         )}
      >
         <h2 className="text-white/85 text-2xl/snug xl:text-3xl/snug font-bold">
            &quot;First, solve the problem. Then, write the code.&quot;
         </h2>
      </section>
   )
}
