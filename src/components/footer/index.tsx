import Link from 'next/link'
import { SocialItem } from '../ui/social-item'
import { LinkedinIcon } from '../icons/linkedin-icon'
import { GithubIcon } from '../icons/github-icon'

export function Footer() {
    return (
        <section className="border-t border-t-divider w-full flex">
            <footer className="main-container mx-auto w-full h-fit sm:h-24 border-x border-x-divider py-8 sm:py-0 px-5 md:px-10 flex flex-col gap-6 sm:gap-0 sm:flex-row justify-between items-start sm:items-center">
                <div className="flex flex-col sm:flex-row gap-6">
                    <span className="text-sm font-mono">
                        &copy; {new Date().getFullYear()}. All rights reserved.
                    </span>
                    <Link
                        href="/privacy-notice"
                        prefetch={false}
                        className="underline text-sm font-mono hover:font-semibold"
                    >
                        Privacy Notice
                    </Link>
                </div>

                <div className="flex flex-row justify-center gap-2">
                    <SocialItem
                        href="https://www.linkedin.com/in/miguelgoncalves18/"
                        ariaLabel="see linkedin profile"
                        className="w-12 h-12 flex items-center justify-center"
                        eventName="footer_social_linkedin"
                    >
                        <LinkedinIcon className="w-8 h-8 shrink-0" />
                    </SocialItem>
                    <SocialItem
                        href="https://github.com/Miguelii"
                        ariaLabel="see github profile"
                        className="w-12 h-12 flex items-center justify-center"
                        eventName="footer_social_github"
                    >
                        <GithubIcon className="w-8 h-8 shrink-0" />
                    </SocialItem>
                </div>
            </footer>
        </section>
    )
}
