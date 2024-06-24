'use client'

import {useAppSelector} from "@/redux/hooks";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import ProfileUpdateForm from "@/components/forms/profile-update-form";

export default function Page() {
    const {user} = useAppSelector(state => state.auth);

    return (
        <div>
            <h1 className={'text-2xl font-medium'}>Welcome!</h1>

            <Card className={'max-w-[600px] rounded-sm'}>
                <CardHeader>
                    <CardTitle>Update profile</CardTitle>
                    <CardDescription>Use this form to update your informations.</CardDescription>
                </CardHeader>

                <CardContent>
                    {user && <ProfileUpdateForm user={user}/>}
                </CardContent>
            </Card>
        </div>
    )
}