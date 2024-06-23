'use client'

import {ReloadIcon} from "@radix-ui/react-icons";
import {useEffect, useState} from "react";
import {useActivationMutation} from "@/redux/features/authApiSlice";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import ResendActivation from "@/components/forms/resend-activation";

interface Props {
    params: {
        uid: string,
        token: string
    }
}

export default function Page({params: {uid, token}}: Props) {
    const [activation] = useActivationMutation();
    const {toast} = useToast();
    const router = useRouter();
    const [resend, setResend] = useState<boolean>(false);

    useEffect(() => {
        activation({uid, token})
            .unwrap()
            .then(() => {
                toast({
                    title: 'Account activated!',
                    description: 'Login to your account.'
                });
                router.push('/login');
            })
            .catch(() => {
                toast({
                    title: 'Activation failed!',
                    variant: 'destructive'
                });
                setResend(true);
            });
    }, []);

    return (
        <div className={'min-h-full flex flex-col justify-center items-center capitalize'}>
            <h1 className={'text-4xl font-medium'}>
                {
                    resend ? 'Resend activation link' : 'Activating your account'
                }
            </h1>
            {!resend && <ReloadIcon className={'animate-spin mt-6 h-8 w-8 text-zinc-600'}/>}
            {resend && <ResendActivation />}
        </div>
    )
}