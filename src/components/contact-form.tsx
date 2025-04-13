"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormField, FormItem, FormLabel } from "./form";
import { Input } from "./input";
import { cn } from "@/utils/cn";

const FormSchema = z.object({
    name: z.string().min(1).max(255),
    email: z.string().min(1).max(255),
    text: z.string().min(1).max(500),
});


export default function ContactForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        console.log({ data })
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
                        <Input type="string" {...field} className="w-full" maxLength={500}/>
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
                Submit
            </button>

            </form>
        </Form>
    )
}