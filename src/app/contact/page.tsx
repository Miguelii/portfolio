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

      <div className="flex flex-col items-center">
        <span
          className="inline-flex items-center justify-center bg-neutral-100 px-4 py-2 rounded-full text-sm font-medium mb-4 text-blue shadow-sm"
        >
          New project in mind?
        </span>
        <h2 className="text-2xl font-bold text-center uppercase mb-6"><Cover>LET’S CHAT</Cover></h2>
        <div className="w-16 h-1 bg-primary rounded"></div>
      </div>
      <ContactForm />
    </main>
  );
}
