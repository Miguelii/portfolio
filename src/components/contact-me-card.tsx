import Button from "./button";

export default function ContactMeCard() {
  return (
    <section className="container mx-auto w-full py-50 items-center justify-center flex flex-col gap-16">
      <div className="text-center">
        <span className="inline-flex items-center justify-center bg-neutral-100 px-4 py-2 rounded-full text-sm font-medium mb-4 text-blue shadow-sm">
          Let&apos;s Connect
        </span>

        <h3 className="text-2xl font-bold text-center uppercase mb-6">
          Get in Touch
        </h3>

        <p className="text-base max-w-2xl mx-auto">
          Always up for new opportunities, collabs, or idea exchanges. Reach out and i&apos;ll get back to you ASAP!
        </p>
      </div>

      <Button prefetch={true} href={'/contact'} className="px-8 py-2">
        <span className="relative z-10">Contact Me</span>
      </Button>
    </section>
  );
}
