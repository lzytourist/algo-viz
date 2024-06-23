'use client'

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ButtonLoading} from "@/components/ui/button-loading";
import useResetPassword from "@/hooks/useResetPassword";


export default function ResetPasswordForm({uid, token}: { uid: string, token: string }) {
    const {form, handleSubmit, isLoading} = useResetPassword({uid, token})

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div
                    className={'capitalize'}
                >
                    <FormField
                        control={form.control}
                        name={'new_password'}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="********" type={'password'} {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={'re_new_password'}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Re-type New Password</FormLabel>
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