'use client'

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {ButtonLoading} from "@/components/ui/button-loading";
import useRegister from "@/hooks/useRegister";


export default function RegisterForm() {
    const {form, handleSubmit, isLoading} = useRegister();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div
                    className={'grid grid-cols-1 lg:grid-cols-2 gap-4 capitalize'}
                >
                    <FormField
                        control={form.control}
                        name={'first_name'}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>First name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={'last_name'}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Last name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={'gender'}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a verified email to display"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={'institute'}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Institute</FormLabel>
                                <FormControl>
                                    <Input placeholder="Dhaka City College" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="********" type={'password'} {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={'re_password'}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Re-type Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="********" type={'password'} {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                {
                    !isLoading ? <Button type={"submit"} className={'w-full mt-6'}>Sign up</Button>
                        : <ButtonLoading className={'w-full mt-6'}/>
                }

            </form>
        </Form>
    )
}