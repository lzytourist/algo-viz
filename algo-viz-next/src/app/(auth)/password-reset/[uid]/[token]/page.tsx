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
        <div className={'flex justify-center'}>
            <Card className={'max-w-[600px]'}>
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