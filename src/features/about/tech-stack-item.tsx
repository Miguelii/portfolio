import { getBuildId } from '@/lib/get-build-id'
import Image from 'next/image'

type SocialItemProps = {
   imageUrl: string
   label: string
}

export const TechStackItem = ({ imageUrl, label }: SocialItemProps) => {
   const id = getBuildId()

   return (
      <div className="flex flex-row gap-3.5 items-center">
         <Image
            width={144}
            height={144}
            src={`${imageUrl}?v=${id}`}
            alt={`${label} logo`}
            className="w-8 h-8"
         />
         <span className="font-bold">{label}</span>
      </div>
   )
}
