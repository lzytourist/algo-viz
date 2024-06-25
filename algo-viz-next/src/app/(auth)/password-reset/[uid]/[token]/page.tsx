'use client'

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import ResetPasswordForm from "@/components/forms/reset-password-form";

interface Props {
    params: {
        uid: string,
        token: string
    }
}

export default function Page({params: {uid, token}}: Props) {

    return (
        <div className={'mx-auto w-full md:w-3/4 lg:w-2/5'}>
            <Card className={'rounded-sm shadow-none'}>
                <CardHeader>
                    <CardTitle>Reset password</CardTitle>
                    <CardDescription>Please enter your registered email address to receive a password change
                        link.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResetPasswordForm uid={uid} token={token}/>
                </CardContent>
            </Card>
        </div>
    )
}