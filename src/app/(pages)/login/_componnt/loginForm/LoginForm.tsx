"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { email, z } from "zod"
import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

const formSchema = z.object({
    email: z.email().nonempty('email is required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    password: z.string().nonempty('password is required')
})



export function LoginForm() {
    let searchParams = useSearchParams();
    const [isloading, setisloading] = useState(false);
    console.log(searchParams.get("status"));


    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ''
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setisloading(true)
        let response = await signIn("credentials", {
            redirect: false,
            callbackUrl: '/products',
            email: values.email,
            password: values.password
        });
        if (response?.ok) {
            location.href = '/products';
        } else {
            toast(searchParams.get('error'));
        }
        setisloading(false)
        console.log(response);

    }

    return (
        <Card className="w-100 p-7 text-center">
            <Form {...form}>
                {searchParams.get('error') ? <h1 className="text-center text-2xl text-red-600">{searchParams.get('error')}</h1> : ''}
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name@gmail.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name@1234" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={isloading} type="submit">{isloading ? <Loader2 className="animate-spin"></Loader2> : ''} Login In</Button>
                </form>
            </Form>
        </Card>
    )
}
