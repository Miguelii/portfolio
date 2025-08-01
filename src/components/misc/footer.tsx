import { GithubIcon } from '../icons/github-icon'
import { LinkedinIcon } from '../icons/linkedin-icon'
import { SocialItem } from '../ui/social-item'

export default function Footer() {
   return (
      <div className="mt-32">
         <footer className="main-container mx-auto w-full my-5 md:my-10 flex flex-row justify-between items-center">
            <span className="text-base font-mono">
               &copy; {new Date().getFullYear()}. All rights reserved.
            </span>

            <div className="flex flex-row justify-center gap-2">
               <SocialItem
                  href="https://www.linkedin.com/in/miguelgoncalves18/"
                  ariaLabel="see linkedin profile"
                  className="w-8 h-8"
               >
                  <LinkedinIcon className="w-8 h-8" />
               </SocialItem>
               <SocialItem
                  href="https://github.com/Miguelii"
                  ariaLabel="see github profile"
                  className="w-8 h-8"
               >
                  <GithubIcon className="w-8 h-8" />
               </SocialItem>
            </div>
         </footer>
      </div>
   )
}
