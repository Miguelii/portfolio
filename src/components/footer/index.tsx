import Link from 'next/link'
import { SocialItem } from '../ui/social-item'
import { LinkedinIcon } from '../icons/linkedin-icon'
import { GithubIcon } from '../icons/github-icon'

export default function Footer() {
    return (
        <section className="border-t border-t-divider w-full flex">
            <footer className="main-container mx-auto w-full h-24 border-x border-x-divider px-5 md:px-10 flex flex-row justify-between items-center">
                <div className="flex flex-col gap-3">
                    <span className="text-base font-mono">
                        &copy; {new Date().getFullYear()}. All rights reserved.
                    </span>
                    <Link
                        href="/privacy-notice"
                        prefetch={false}
                        className="underline text-base font-mono hover:font-semibold"
                    >
                        Privacy Notice
                    </Link>
                </div>

                <div className="flex flex-row justify-center gap-2">
                    <SocialItem
                        href="https://www.linkedin.com/in/miguelgoncalves18/"
                        ariaLabel="see linkedin profile"
                        className="w-8 h-8"
                        eventName="footer_social_linkedin"
                    >
                        <LinkedinIcon className="w-8 h-8" />
                    </SocialItem>
                    <SocialItem
                        href="https://github.com/Miguelii"
                        ariaLabel="see github profile"
                        className="w-8 h-8"
                        eventName="footer_social_github"
                    >
                        <GithubIcon className="w-8 h-8" />
                    </SocialItem>
                </div>
            </footer>
        </section>
    )
}
