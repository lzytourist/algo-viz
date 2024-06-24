'use client'

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {useResetPasswordMutation} from "@/redux/features/authApiSlice";
import {ButtonLoading} from "@/components/ui/button-loading";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {FormEvent, useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";

export default function Page() {

    const [resetPassword, {isLoading}] = useResetPasswordMutation();
    const [email, setEmail] = useState<string>('');
    const {toast} = useToast();
    const router = useRouter();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        resetPassword({email})
            .unwrap()
            .finally(() => {
                toast({
                    title: 'Password reset link has been sent to your email.'
                });
                router.push('/login');
            });
    };

    return (
        <div className={'flex justify-center'}>
            <Card className={'max-w-[600px] rounded-sm'}>
                <CardHeader>
                    <CardTitle>Reset password</CardTitle>
                    <CardDescription>Please enter your registered email address to receive a password change
                        link.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Label>Email address</Label>
                        <Input
                            type={'email'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={'w-full'}
                            placeholder={'jhondoe@example.com'}/>
                        {
                            isLoading ? <ButtonLoading className={'w-full mt-2'}/>
                                : <Button type={'submit'} className={'w-full mt-2'}>Send</Button>
                        }
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}