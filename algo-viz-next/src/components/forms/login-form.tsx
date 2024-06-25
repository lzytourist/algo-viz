'use client'

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ButtonLoading} from "@/components/ui/button-loading";
import useLogin from "@/hooks/useLogin";
import Link from "next/link";


export default function LoginForm() {
    const {form, handleSubmit, isLoading} = useLogin();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div
                    className={'capitalize'}
                >
                    <FormField
                        control={form.control}
                        name={'email'}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email address</FormLabel>
                                <FormControl>
                                    <Input placeholder="johndoe@example.com" type={'email'} {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={'password'}
                        render={({field}) => (
                            <FormItem>
                                <div className={'flex justify-between items-center mt-2'}>
                                    <FormLabel>Password</FormLabel>
                                    <Link href={'/password-reset'} className={'app-text-color font-light text-sm'}>Forgot password?</Link>
                                </div>
                                <FormControl>
                                    <Input placeholder="********" type={'password'} {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                {
                    !isLoading ? <Button type={"submit"} className={'w-full mt-6'}>Sign in</Button>
                        : <ButtonLoading className={'w-full mt-6'}/>
                }

            </form>
        </Form>
    )
}