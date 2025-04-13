import Image from "next/image";
import Link from "next/link";
import { LinkedinIcon } from "./linkedin-icon";
import { GithubIcon } from "./github-icon";
import { SocialItem } from "./social-item";

export default function ContactMeCard() {
  return (
    <section className="container mx-auto w-full py-50 items-center justify-center flex flex-col gap-12">
      <Link href={"/"} prefetch={false} className="">
        <Image
          width={160}
          height={120}
          src={"/signature.png"}
          alt="Miguel Gonçalves Signature"
          className="w-40 h-30"
        />
      </Link>

      <div className="flex flex-col gap-4">
        <Link
          href={"/contact"}
          className="h-12 w-40 rounded-xl tex-center justify-center items-center flex border-white border hover:bg-white hover:text-black"
        >
          CONTACT ME
        </Link>

        <div className="flex flex-row w-full justify-center gap-1">
          <SocialItem href="https://www.linkedin.com/in/miguelgoncalves18/" ariaLabel="see linkedin profile">
            <LinkedinIcon className="w-8 h-8" />
          </SocialItem>
          <SocialItem href="https://github.com/Miguelii" ariaLabel="see github profile">
            <GithubIcon className="w-8 h-8" />
          </SocialItem>
        </div>
      </div>
    </section>
  );
}

