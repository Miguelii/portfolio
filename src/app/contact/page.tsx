import ContactForm from "@/components/contact-form";
import { Cover } from "@/components/cover";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Miguel Gonçalves",
};

export const dynamic = "force-static";
export const revalidate = 60000; // 5min

export default function ContactPage() {
  return (
    <main className="container w-full mx-auto flex flex-col gap-6 md:gap-10 md:flex-col px-5 md:px-20 mb-24 md:mb-16 lg:mb-32">
    <h1 className="font-mono text-lg md:text-xl uppercase font-semibold text-start relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-white/75 via-white to-white">
        New project in mind? <Cover>LET’S CHAT</Cover>
    </h1>
      <ContactForm />
    </main>
  );
}
