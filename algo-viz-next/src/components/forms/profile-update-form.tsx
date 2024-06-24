'use client'

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {ButtonLoading} from "@/components/ui/button-loading";
import useProfileUpdate from "@/hooks/useProfileUpdate";
import {User} from "@/lib/types";
import {useEffect, useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {CalendarIcon} from "@radix-ui/react-icons";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";

export default function ProfileUpdateForm({user}: { user: User }) {
    const {form, handleSubmit, isLoading, setProfile} = useProfileUpdate();

    const [date, setDate] = useState<Date>();

    useEffect(() => {
        const {first_name, last_name, gender, institute} = user;
        setProfile({
            first_name,
            last_name,
            gender,
            institute: institute ? institute : "",
        });
    }, []);

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
                                            <SelectValue placeholder="Select your gender"/>
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
                </div>
                {
                    !isLoading ? <Button type={"submit"} className={'w-full mt-6'}>Save</Button>
                        : <ButtonLoading className={'w-full mt-6'}/>
                }

            </form>
        </Form>
    )
}
