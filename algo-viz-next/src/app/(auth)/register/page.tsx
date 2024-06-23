import RegisterForm from "@/components/forms/register-form";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
    return (
        <div className={'flex justify-center flex-1'}>
            <Card className={'rounded-sm shadow-none w-[600px]'}>
                <CardHeader>
                    <CardTitle>Registration</CardTitle>
                    <CardDescription>Create your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterForm/>
                </CardContent>
                <CardFooter>
                    <p>Already have an account? <Link className={'link-color'} href={'/login'}>Login here</Link></p>
                </CardFooter>
            </Card>
        </div>
    )
}