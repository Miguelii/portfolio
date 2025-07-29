import BandCanvas from './Band'

export function LandingSectionWithBand() {
   return (
      <section className="h-[540px] relative">
         <div className="flex flex-col w-full max-w-[615px] gap-4 justify-center h-full">
            <h1 className="text-4xl md:text-5xl font-bold text-start w-full leading-snug">
               Crafting Experiences, Delivering Results
            </h1>
            <span className="text-lg font-medium text-neutral leading-relaxed">
               Delivered products that have reached over a million users worldwide.
            </span>
         </div>

         <div className="hidden lg:block absolute -inset-5">
            <BandCanvas />
         </div>
      </section>
   )
}
