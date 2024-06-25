'use client'

import {FormEvent, useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useResendActivationMutation} from "@/redux/features/api/authApiSlice";
import {useToast} from "@/components/ui/use-toast";


export default function ResendActivation() {
    const [resendActivation] = useResendActivationMutation();

    const {toast} = useToast();

    const [email, setEmail] = useState<string>('');
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        resendActivation({email})
            .unwrap()
            .then(() => {
                toast({
                    title: 'Activation mail sent.',
                    description: 'Please activate your account before the link expires.'
                })
            })
            .catch(() => {
                toast({
                    title: 'Something went wrong!',
                    variant: 'destructive'
                })
            })
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={'flex items-center gap-2 my-6'}>
                <Input
                    size={30}
                    type={'email'}
                    placeholder={'johndoe@example.com'}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button type={'submit'} variant={'outline'}>Send</Button>
            </div>
        </form>
    )
}