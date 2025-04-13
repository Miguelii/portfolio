"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormField, FormItem, FormLabel } from "./form";
import { Input } from "./input";
import { cn } from "@/utils/cn";
import { useTransition } from "react";
import SendContact from "@/services/send-contact";
import { useToast } from "@/utils/use-toast";
import { CloseIcon } from "./close-icon";
import { useRouter } from "next/navigation";
import { Spinner } from "./spinner";

const FormSchema = z.object({
    name: z.string().min(1).max(255),
    email: z.string().min(1).max(255),
    text: z.string().min(1).max(500),
});


export default function ContactForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const [isPending, startTransition] = useTransition()

    const { toast, dismiss  } = useToast();

    const router = useRouter();

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        startTransition(async () => {
            const res = await SendContact({
                email: data.email,
                name: data.name,
                text: data.text
            });

            if(res.status === 200) {
                toast({
                    variant: 'default',
                    title: "Thanks for your contact!",
                    description: "I'll be in touch as soon as possible.",
                    action: (
                        <CloseIcon onClick={() => dismiss()} className="w-8 h-8"/>
                    ),
                });
                form.reset({email: '', name: '', text: ''}, {keepValues: false});
                router.refresh();
            } else {
                toast({
                    title: "An error has occurred!",
                    description: "Please try again later.",
                    variant: 'destructive',
                    action: (
                        <CloseIcon onClick={() => dismiss()} className="w-8 h-8"/>
                    ),
                });
            }
        })
    }
      
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 md:gap-8">
            
            <div className="flex md:flex-row flex-col gap-6 md:gap-8 w-full">
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel htmlFor='name'>
                                Name
                            </FormLabel>
                            <Input type="string" {...field} maxLength={255}/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel htmlFor='email'>
                                Email
                            </FormLabel>
                            <Input type="email" {...field} maxLength={255}/>
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={form.control}
                name='text'
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel htmlFor='text'>
                            Message
                        </FormLabel>
                        <textarea {...field} className="w-full bg-card h-[100px] focus:border-0 outline-0 rounded-none p-2" maxLength={500}/>
                    </FormItem>
                )}
            />

            <button 
                type='submit' 
                className={cn(
                    "mt-4 h-10 w-full md:w-[150px] border border-card  rounded-full cursor-pointer",
                    form.formState.isValid ? 'bg-white text-black' : 'bg-card'
                )}
            >   
                {isPending && (
                    <Spinner size='medium'/>
                )}
                {!isPending && (
                    <>Submit</>
                )}
            </button>

            </form>
        </Form>
    )
}