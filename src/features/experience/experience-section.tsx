import { LinkPreview } from '@/components/ui/link-preview'
import { getBuildId } from '@/lib/get-build-id'
import { WorkExperience } from '@/types/WorkExperience'
import { cn } from '@/utils/cn'
import Image from 'next/image'

export function ExperienceSection() {
   const experiences: WorkExperience[] = [
      {
         period: '2025 - Present',
         jobTitle: 'Associate Software Engineer',
         company: 'Blip',
         logoUrl: '/logos/blip_pt_logo.webp',
         badgeColor: 'bg-slate-800 text-white',
         previewUrl: 'https://www.instagram.com/blip.pt',
         achievements: [],
      },
      {
         period: '2022 - 2025',
         jobTitle: 'Software Engineer',
         company: 'CGI',
         logoUrl: '/logos/cgi.webp',
         badgeColor: 'bg-[#8942a8] text-white',
         previewUrl: 'https://www.cgi.com/portugal/pt-pt',
         achievements: [
            'Lead developer for the Web Team, specializing in full-stack development.',
            'Developed and maintained multiple full-stack applications.',
            'Responsible for the architecture, good practices, security and development of scalable web applications.',
         ],
      },
      {
         period: '2018 - 2022',
         jobTitle: 'BSc in Computer Science Engineering',
         company: 'University of Minho',
         logoUrl: '/logos/Universitaet_Minho.webp',
         badgeColor: 'bg-neutral-100 text-neutral-800',
         previewUrl: 'https://www.uminho.pt/PT',
         achievements: [],
      },
   ]

   return (
      <section className="flex flex-col gap-12">
         <h2 className="text-3xl font-bold">Work Experience</h2>

         <div className="space-y-6">
            {experiences.map((item, index) => (
               <WorkExperienceItem {...item} key={`work-experience-${item.company}_${index}`} />
            ))}
         </div>
      </section>
   )
}

function WorkExperienceItem(experience: WorkExperience) {
   const buildId = getBuildId()

   return (
      <div className="flex gap-3 md:gap-8 flex-col md:flex-row">
         <div className="w-40 flex-shrink-0 mt-1">
            <span className="text-neutral text-base md:text-lg font-medium">
               {experience.period}
            </span>
         </div>

         <div className="flex-1">
            <div className="flex items-start md:items-center gap-2 mb-3 flex-col md:flex-row">
               <span className="text-primary font-medium text-base md:text-lg">
                  {experience.jobTitle}
               </span>
               <LinkPreview
                  url={experience.previewUrl}
                  className={cn(
                     'flex items-center gap-3 px-2.5 py-0.5 rounded-lg text-base font-medium',
                     experience.badgeColor
                  )}
               >
                  <Image
                     src={`${experience.logoUrl}?v=${buildId}`}
                     alt={`${experience.company} logo`}
                     width={16}
                     height={16}
                     className="w-4 h-4 object-contain"
                  />
                  <span>{experience.company}</span>
               </LinkPreview>
            </div>

            <ul className="space-y-2">
               {experience.achievements.map((achievement, index) => (
                  <li
                     key={index}
                     className="flex items-center gap-2 text-neutral text-base md:text-lg"
                  >
                     <span className="w-1 h-1 bg-neutral rounded-full flex-shrink-0"></span>
                     <span>{achievement}</span>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   )
}
