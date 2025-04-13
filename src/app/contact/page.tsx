import ContactForm from "@/components/contact-form";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact - Miguel Gonçalves",
};

export const dynamic = 'force-static';
export const revalidate = 60000; // 5min

export default function ContactPage() {

    return (
        <main className="container w-full mx-auto flex flex-col gap-6 md:flex-col px-5 md:px-20 mb-6 md:mb-12 lg:mb-16">
            <h1 className="text-base font-mono uppercase">New project in mind? LET’S CHAT</h1>
            <ContactForm />
        </main>
    )
}