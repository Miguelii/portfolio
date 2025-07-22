import { GithubIcon } from "./github-icon";
import { LinkedinIcon } from "./linkedin-icon";
import { SocialItem } from "./social-item";

export default function Footer() {
  return (
    <footer className="container mx-auto w-full px-5 my-8 md:px-0 flex flex-row justify-between items-center">
      <span className="text-sm">
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
  );
}
